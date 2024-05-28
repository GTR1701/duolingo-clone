import { cache } from "react";
import { prisma } from "./prisma";
import { auth } from "@clerk/nextjs";
import { ExcerciseButton } from '../app/(main)/learn/ExcerciseButton';

export const getCourses = cache(async () => {
    const data = await prisma.courses.findMany()

    return data
})

export const getUserProgress = cache(async () => {
    const { userId } = await auth()

    if (!userId) {
        return null
    }

    const data = await prisma.userProgress.findFirst({
        where: {
            userId
        }
    })

    return data
})

export const getCourseById = cache(async (id: number) => {
    const data = await prisma.courses.findFirst({
        where: {
            id
        },
        include: {
            Units: {
                orderBy: {
                    order: "asc"
                },
                include: {
                    Excercises: {
                        orderBy: {
                            order: "asc"
                        },
                        include: {
                            Lessons: {
                                orderBy: {
                                    order: "asc"
                                }
                            }
                        }
                    }
                }

            }
        }
    })

    return data
})

export const getUnits = cache(async () => {
    const userProgress = await getUserProgress()
    const { userId } = auth()
    if (!userId || !userProgress?.activeCourseId) {
        return []
    }

    const data = await prisma.units.findMany({
        where: {
            courseId: userProgress.activeCourseId
        },
        orderBy: {
            order: "asc"
        },
        include: {
            Excercises: {
                orderBy: {
                    order: "asc"
                },
                include: {
                    Lessons: {
                        orderBy: {
                            order: "asc"
                        },
                        include: {
                            LessonProgress: {
                                where: {
                                    userId
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    // console.table(data)
    // console.table(data[0].Excercises)
    // console.table(data[0].Excercises[0].Lessons)
    // console.table(data[0].Excercises[0].Lessons[0].LessonProgress)

    const normalizedData = data.map((unit) => {
        const excercisesWithCompletedStatus = unit.Excercises.map((excercise) => {
            if (excercise.Lessons.length === 0) {
                return {
                    ...excercise,
                    completed: false
                }
            }

            const lessonsWithCompletedStatus = excercise.Lessons.map((lesson) => {
                const completed = lesson.LessonProgress
                    && lesson.LessonProgress.length > 0
                    && lesson.LessonProgress[0]?.completed

                return {
                    ...lesson,
                    completed
                }
            })

            const allLessonsCompleted = lessonsWithCompletedStatus.every((lesson) => lesson.completed)
            return{
                ...excercise,
                Lessons: lessonsWithCompletedStatus,
                completed: allLessonsCompleted
            }
        })

        return {
            ...unit,
            excercises: excercisesWithCompletedStatus
        }
    })

    // console.log(normalizedData[0].Excercises[0])

    return normalizedData
})

export const getCourseProgress = cache(async () => {
    const userProgress = await getUserProgress()
    const { userId } = await auth()
    if (!userId || !userProgress?.activeCourseId) {
        return null
    }

    const unitsInActiveCourse = await prisma.units.findMany({
        orderBy: {
            order: "asc",
        },
        where: {
            courseId: userProgress.activeCourseId
        },
        include: {
            Excercises: {
                orderBy: {
                    order: "asc"
                },
                include: {
                    unit: true,
                    Lessons: {
                        orderBy: {
                            order: "asc"
                        },
                        include: {
                            LessonProgress: {
                                where: {
                                    userId
                                }
                            },
                        }
                    }
                }
            }
        }
    })

    const firstUncompletedExcercise = unitsInActiveCourse.flatMap((unit) => unit.Excercises).find((excercise) => {
        return excercise.Lessons.some((lesson) => {
            return !lesson.LessonProgress
                || lesson.LessonProgress.length === 0
            // || !challenge.ChallengeProgress.some((progress) => progress.completed === false)
        })
    })

    return {
        activeExcercise: firstUncompletedExcercise,
        activeExcerciseId: firstUncompletedExcercise?.id,
    }
})

export const getExcerciseProgress = cache(async () => {
    const { userId } = auth()

    if (!userId) {
        return null
    }

    const courseProgress = await getCourseProgress()

    if (!courseProgress?.activeExcerciseId) {
        return null
    }

    const data = await prisma.excercises.findFirst({
        where: {
            id: courseProgress.activeExcerciseId
        },
        include: {
            Lessons: {
                orderBy: {
                    order: "asc"
                },
                include: {
                    LessonProgress: {
                        where: {
                            userId
                        }
                    },
                    Challenges: {
                        orderBy: {
                            order: "asc"
                        },
                        include: {
                            ChallengeProgress: {
                                where: {
                                    userId
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    if (!data || !data.Lessons) {
        return null
    }

    const firstUncompletedLesson = data.Lessons.find((lesson) => {
        return !lesson.LessonProgress
            || lesson.LessonProgress.length === 0
    })

    return {
        activeLesson: firstUncompletedLesson,
        activeLessonId: firstUncompletedLesson?.id
    }
})

export const getExcercise = cache(async (id?: number) => {
    const { userId } = auth()

    if (!userId) {
        return null
    }

    const courseProgress = await getCourseProgress()

    const excerciseId = id || courseProgress?.activeExcerciseId

    if (!excerciseId) {
        return null
    }

    const data = await prisma.excercises.findFirst({
        where: {
            id: excerciseId
        },
        include: {
            Lessons: {
                orderBy: {
                    order: "asc"
                },
                include: {
                    Challenges: {
                        orderBy: {
                            order: "asc"
                        },
                        include: {
                            ChallengeOptions: true,
                            ChallengeProgress: {
                                where: {
                                    userId
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    if (!data || !data.Lessons) {
        return null
    }

    const normalizedLessons = data.Lessons.map((lesson) => {
        const completed = lesson.Challenges
            && lesson.Challenges.length > 0
            && lesson.Challenges.every((challenge) => {
                return challenge.ChallengeProgress
                    && challenge.ChallengeProgress.length > 0
                    && challenge.ChallengeProgress.every((progress) => progress.completed)
            })

        return {
            ...lesson,
            completed
        }
    })

    return {
        ...data,
        Lessons: normalizedLessons
    }
})

export const getLesson = cache(async (id?: number) => {
    const { userId } = auth()

    if (!userId) {
        return null
    }

    const courseProgress = await getCourseProgress()

    const excerciseId = id || courseProgress?.activeExcerciseId

    if (!excerciseId) {
        return null
    }

    const data = await prisma.lessons.findFirst({
        where: {
            excerciseId: excerciseId
        },
        include: {
            Challenges: {
                orderBy: {
                    order: "asc"
                },
                include: {
                    ChallengeOptions: true,
                    ChallengeProgress: {
                        where: {
                            userId
                        }
                    }
                }
            },
            LessonProgress: {
                where: {
                    userId,
                    completed: false
                }
            }
        }
    })

    if (!data || !data.Challenges) {
        return null
    }

    const normalizedChallenges = data.Challenges.map((challenge) => {
        const completed = challenge.ChallengeProgress
            && challenge.ChallengeProgress.length > 0
            && challenge.ChallengeProgress.every((progress) => progress.completed)

        return {
            ...challenge,
            completed
        }
    })

    return {
        ...data,
        Challenges: normalizedChallenges
    }
})

export type excercise = typeof getExcercise extends (...args: any) => Promise<infer T> ? T : never

export const getExcercisePercentage = cache(async () => {
    const courseProgress = await getCourseProgress()

    if (!courseProgress?.activeExcerciseId) {
        return {
            percentage: 0,
            numberOfCompletedLessons: 0,
            numberOfLessons: 0
        }
    }

    const excercise = await getExcercise(courseProgress.activeExcerciseId)

    if (!excercise) {
        return {
            percentage: 0,
            numberOfCompletedLessons: 0,
            numberOfLessons: 0
        }
    }

    const completedLessons = excercise.Lessons.filter((lesson) => lesson.completed)
    const percentage = Math.round((completedLessons.length / excercise.Lessons.length) * 100)

    const numberOfCompletedLessons = completedLessons.length
    const numberOfLessons = excercise.Lessons.length

    return {
        percentage,
        numberOfCompletedLessons,
        numberOfLessons
    }
})

export const getUserSubscription = cache(async () => {
    const { userId } = await auth()

    if (!userId) {
        return null
    }

    const data = await prisma.userSubscription.findFirst({
        where: {
            userId
        }
    })

    if (!data) {
        return null
    }

    const isActive = data.stripePriceId && data.stripeCurrentPeriodEnd?.getTime()! + 86_400_000 > Date.now()

    return {
        ...data,
        isActive: !!isActive
    }
})

export const getTopUsers = cache(async () => {
    const { userId } = auth()

    if (!userId) {
        return []
    }

    const data = await prisma.userProgress.findMany({
        orderBy: {
            points: "desc"
        },
        take: 10,
        select: {
            userId: true,
            userName: true,
            userImageSrc: true,
            points: true,
        }
    })

    return data
})

export const getUserCompletedLessons = cache(async () => {
    const { userId } = auth()

    if (!userId) {
        return []
    }

    const data = await prisma.lessonProgress.findMany({
        where: {
            userId,
            completed: true
        }
    })

    return data.length
})

export const getUserQuests = cache(async () => {
    const { userId } = auth()

    if (!userId) {
        return []
    }

    const data = await prisma.userQuests.findMany({
        where: {
            userId
        },
        include:{
            Quests: true
        }
    })

    return data
})

