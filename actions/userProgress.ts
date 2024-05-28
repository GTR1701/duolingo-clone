"use server"

import { prisma } from "@/prisma/prisma"
import { getCourseById, getUserProgress, getUserSubscription } from "@/prisma/queries"
import { auth, currentUser } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const upsertUserProgress = async (courseId: number) => {
    const { userId } = auth()
    const user = await currentUser()

    if (!userId) {
        throw new Error("Unauthorized")
    }

    const course = await getCourseById(courseId)

    if (!course) {
        throw new Error("Course not found")
    }

    if(!course.Units.length || !course.Units[0].Excercises.length) {
        throw new Error("Course is empty")
    }

    const existingUserProgress = await getUserProgress()

    if (existingUserProgress) {
        await prisma.userProgress.update({
            where: {
                userId: existingUserProgress.userId
            },
            data: {
                activeCourseId: courseId,
                userName: user?.firstName || "User",
                userImageSrc: user?.imageUrl || "/mascot.svg",
            }
        })

        revalidatePath("/courses")
        revalidatePath("/learn")
        redirect("/learn")
    }

    await prisma.userProgress.create({
        data: {
            userId,
            activeCourseId: courseId,
            userName: user?.firstName || "User",
            userImageSrc: user?.imageUrl || "/mascot.svg",
        }
    })

    revalidatePath("/courses")
    revalidatePath("/learn")
    redirect("/learn")
}

export const reduceHearts = async (challengeId: number) => {
    const { userId } = await auth()

    if (!userId) {
        throw new Error("Unauthorized")
    }

    const currentUserProgress = await getUserProgress()
    const userSubscription = await getUserSubscription()


    const challenge = await prisma.challenges.findFirst({
        where: {
            id: challengeId
        }
    })

    if (!challenge) {
        throw new Error("Challenge not found")
    }

    const lessonId = challenge.lessonId

    const existingChallengeProgress = await prisma.challengeProgress.findFirst({
        where: {
            userId,
            challengeId
        }
    })

    const isPractice = !!existingChallengeProgress

    if (isPractice) return { error: "practice" }

    if (!currentUserProgress) {
        throw new Error("User progress not found")
    }

    if(userSubscription?.isActive) {
        return { error: "subscription" }
    }

    if (currentUserProgress.hearts === 0) {
        return { error: "hearts" }
    }

    await prisma.userProgress.update({
        data: {
            hearts: Math.max(currentUserProgress.hearts - 1, 0)
        },
        where: {
            userId
        }
    })

    revalidatePath("/learn")
    revalidatePath("/shop")
    revalidatePath("/quests")
    revalidatePath("/leaderboard")
    revalidatePath(`/lesson/${lessonId}`)
}

export const refillHearts = async () => {
    const currentUserProgress = await getUserProgress()

    if(!currentUserProgress) {
        throw new Error("User progress not found")
    }

    if(currentUserProgress.hearts === 5) {
        throw new Error("Hearts are already full")
    }

    if(currentUserProgress.points < 50) {
        throw new Error("Not enough points")
    }

    await prisma.userProgress.update({
        data: {
            hearts: 5,
            points: currentUserProgress.points - 50
        },
        where: {
            userId: currentUserProgress.userId
        }
    })

    revalidatePath("/learn")
    revalidatePath("/shop")
    revalidatePath("/quests")
    revalidatePath("/leaderboard")
}