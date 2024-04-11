"use server"

import { prisma } from "@/prisma/prisma"
import { getCourseById, getUserProgress } from "@/prisma/queries"
import { auth, currentUser } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const upsertUserProgress = async (courseId: number) => {
    const { userId } = await auth()
    const user = await currentUser()

    if (!userId) {
        throw new Error("Unauthorized")
    }

    const course = await getCourseById(courseId)

    if (!course) {
        throw new Error("Course not found")
    }

    // if(!course.units.length || !course.units[0].lessons.length) {
    //     throw new Error("Course is empty")
    // }

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