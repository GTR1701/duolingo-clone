import { cache } from "react";
import { prisma } from "./prisma";
import { auth } from "@clerk/nextjs";
import { LessonButton } from '../app/(main)/learn/LessonButton';

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
                    Lessons: {
                        orderBy: {
                            order: "asc"
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
    const { userId } = await auth()
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

    const normalizedData = data.map((unit) => {
        const lessonsWithCompletedStatus = unit.Lessons.map((lesson) => {
            if (lesson.Challenges.length === 0) {
                return {
                    ...lesson,
                    completed: false
                }
            }
            const allCompletedChallenges = lesson.Challenges.every((challenge) => {
                return challenge.ChallengeProgress
                    && challenge.ChallengeProgress.length > 0
                    && challenge.ChallengeProgress.every((progress) => progress.completed)
            })

            return {
                ...lesson,
                completed: allCompletedChallenges
            }
        })

        return {
            ...unit,
            lessons: lessonsWithCompletedStatus
        }
    })


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
            Lessons: {
                orderBy: {
                    order: "asc"
                },
                include: {
                    unit: true,
                    Challenges: {
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

    const firstUncompletedLesson = unitsInActiveCourse.flatMap((unit) => unit.Lessons).find((lesson) => {
        return lesson.Challenges.some((challenge) => {
            return !challenge.ChallengeProgress
                || challenge.ChallengeProgress.length === 0
            // || !challenge.ChallengeProgress.some((progress) => progress.completed === false)
        })
    })
    return {
        activeLesson: firstUncompletedLesson,
        activeLessonId: firstUncompletedLesson?.id,
    }
})

export const getLesson = cache(async (id?: number) => {
    const { userId } = await auth()

    if (!userId) {
        return null
    }

    const courseProgress = await getCourseProgress()

    const lessonId = id || courseProgress?.activeLessonId

    if (!lessonId) {
        return null
    }

    const data = await prisma.lessons.findFirst({
        where: {
            id: lessonId
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

export type lesson = typeof getLesson extends (...args: any) => Promise<infer T> ? T : never

export const getLessonPercentage = cache(async () => {
    const courseProgress = await getCourseProgress()

    if (!courseProgress?.activeLessonId) {
        return 0
    }

    const lesson = await getLesson(courseProgress.activeLessonId)

    if (!lesson) {
        return 0
    }

    const completedChallenges = lesson.Challenges.filter((challenge) => challenge.completed)
    const percentage = Math.round((completedChallenges.length / lesson.Challenges.length) * 100)

    return percentage
})

export const getUserSubscription = cache(async () => {
    const {userId} = await auth()

    if (!userId) {
        return null
    }

    const data = await prisma.userSubscription.findFirst({
        where: {
            userId
        }
    })

    if(!data) {
        return null
    }

    const isActive = data.stripePriceId && data.stripeCurrentPeriodEnd?.getTime()! + 86_400_000 > Date.now()

    return {
        ...data,
        isActive: !!isActive
    }
})

export const getTopUsers = cache(async () => {
    const {userId} = await auth()

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