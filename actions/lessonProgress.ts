"use server"

import { prisma } from "@/prisma/prisma"
import { getUserProgress, getUserSubscription } from "@/prisma/queries"
import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"

export const upsertLessonProgress = async (lessonId: number) => {
    const { userId } = auth()

    if (!userId) {
        throw new Error("Unauthorized")
    }

    const currentUserProgress = await getUserProgress()

    if (!currentUserProgress) {
        throw new Error("User progress not found")
    }

    const lesson = await prisma.lessons.findFirst({
        where: {
            id: lessonId
        }
    })

    if (!lesson) {
        throw new Error("Lesson not found")
    }

    const existingLessonProgress = await prisma.lessonProgress.findFirst({
        where: {
            userId,
            lessonId
        }
    })

    const isPractice = !!existingLessonProgress

    if (isPractice) {
        await prisma.lessonProgress.update({
            where: {
                id: existingLessonProgress.id
            },
            data: {
                completed: true
            }
        })

        // TODO: Change exp to env variable
        await prisma.userProgress.update({
            data: {
                experience: currentUserProgress.experience + 10
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

    await prisma.lessonProgress.create({
        data: {
            userId,
            lessonId,
            completed: true
        }
    })

    // TODO: Change exp to env variable
    await prisma.userProgress.update({
        data: {
            experience: currentUserProgress.experience + 10
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
}