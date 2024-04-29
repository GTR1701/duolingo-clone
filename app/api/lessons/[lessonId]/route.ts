import { getIsAdmin } from "@/lib/admin"
import { prisma } from "@/prisma/prisma"
import { NextResponse } from "next/server"

export const GET = async (req: Request, { params }: { params: { lessonId: string } }) => {
    if (!getIsAdmin()) return new NextResponse("Unauthorized", { status: 401 })
        
    const lessonId = parseInt(params.lessonId)
    const data = await prisma.lessons.findFirst({
        where: {
            id: lessonId
        }
    })

    return NextResponse.json(data)
}

export const PUT = async (req: Request, { params }: { params: { lessonId: string } }) => {
    if (!getIsAdmin()) return new NextResponse("Unauthorized", { status: 401 })

    const body = await req.json()
    const lessonId = parseInt(params.lessonId)

    const data = await prisma.lessons.update({
        data: body,
        where: {
            id: lessonId
        }
    })

    return NextResponse.json(data)
}

export const DELETE = async (req: Request, { params }: { params: { lessonId: string } }) => {
    if (!getIsAdmin()) return new NextResponse("Unauthorized", { status: 401 })

    const courseId = parseInt(params.lessonId)

    const data = await prisma.lessons.delete({
        where: {
            id: courseId
        }
    })

    return NextResponse.json(data)
}

