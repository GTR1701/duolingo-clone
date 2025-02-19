"use server"

import { prisma } from "@/prisma/prisma"
import { getUserProgress, getUserSubscription } from "@/prisma/queries"
import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"

export const upsertChallengeProgress = async (challengeId: number) => {
    const { userId } = auth()

    if (!userId) {
        throw new Error("Unauthorized")
    }

    const currentUserProgress = await getUserProgress()
    const userSubscription = await getUserSubscription()

    if (!currentUserProgress) {
        throw new Error("User progress not found")
    }

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

    if (currentUserProgress.hearts === 0 && !isPractice && !userSubscription?.isActive) {
        return { error: "hearts" }
    }

    if (isPractice) {
        await prisma.challengeProgress.update({
            where: {
                id: existingChallengeProgress.id
            },
            data: {
                completed: true
            }
        })

        await prisma.userProgress.update({
            data: {
                hearts: Math.min(currentUserProgress.hearts + 1, 5),
            },
            where: {
                userId
            }
        })

        revalidatePath('/learn')
        revalidatePath('/lesson')
        revalidatePath('/quests')
        revalidatePath('/leaderboard')
        revalidatePath(`/lesson/${lessonId}`)
        return
    }

    await prisma.challengeProgress.create({
        data: {
            userId,
            challengeId,
            completed: true
        }
    })

    revalidatePath('/learn')
    revalidatePath('/lesson')
    revalidatePath('/quests')
    revalidatePath('/leaderboard')
    revalidatePath(`/lesson/${lessonId}`)
}