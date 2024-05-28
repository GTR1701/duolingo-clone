"use server"

import { prisma } from "@/prisma/prisma"
import { auth } from "@clerk/nextjs"
import { addPoints } from "./userProgress"
import { randomInt } from "crypto"
import { revalidatePath } from "next/cache"

export const upsertUserQuests = async (value: number, questType: string) => {
    const { userId } = auth()

    if (!userId) {
        throw new Error("Unauthorized")
    }

    const userQuests = await prisma.userQuests.findMany({
        where: {
            userId
        },
        include: {
            Quests: true
        }
    })

    for(const currentQuest of userQuests) {
        if (currentQuest) {
            if(currentQuest.Quests.type === questType && currentQuest.progress + value >= currentQuest.Quests.objective) {
                switch (currentQuest.Quests.rewardType) {
                    case "POINTS":
                        await addPoints(currentQuest.Quests.rewardValue)
                        break;
                }
    
                await prisma.userQuests.delete({
                    where: {
                        id: currentQuest.id
                    }
                })
    
                const quests = await prisma.quests.findMany()
                const newQuest = quests[randomInt(1, quests.length)]
    
                await prisma.userQuests.create({
                    data: {
                        userId,
                        questId: newQuest.id,
                    }
                })
    
                revalidatePath("/quests")
                revalidatePath("/learn")
                revalidatePath("/courses")
                revalidatePath("/profile")
                revalidatePath("/leaderboard")
            } else if(currentQuest.Quests.type === questType) {
                await prisma.userQuests.update({
                    data: {
                        progress: currentQuest.progress + value
                    },
                    where: {
                        id: currentQuest.id
                    }
                })
    
                revalidatePath("/quests")
                revalidatePath("/learn")
                revalidatePath("/courses")
                revalidatePath("/profile")
                revalidatePath("/leaderboard")
            } else return
        } else {
            throw new Error("Quest not found")
        }
    }
}