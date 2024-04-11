import { cache } from "react";
import { prisma } from "./prisma";
import { auth } from "@clerk/nextjs";

export const getCourses = cache(async () => {
    const data = await prisma.courses.findMany()

    return data
})

export const getUserProgress = cache(async () => {
    const {userId} = await auth()

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

export const getCourseById = cache(async (id: number | undefined) => {
    const data = await prisma.courses.findFirst({
        where: {
            id
        }
    })

    return data
})