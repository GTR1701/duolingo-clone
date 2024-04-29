import { getIsAdmin } from "@/lib/admin"
import { prisma } from "@/prisma/prisma"
import { NextResponse } from "next/server"

export const GET = async (req: Request, { params }: { params: { courseId: string } }) => {
    if (!getIsAdmin()) return new NextResponse("Unauthorized", { status: 401 })
        
    const courseId = parseInt(params.courseId)
    const data = await prisma.courses.findFirst({
        where: {
            id: courseId
        }
    })

    return NextResponse.json(data)
}

export const PUT = async (req: Request, { params }: { params: { courseId: string } }) => {
    if (!getIsAdmin()) return new NextResponse("Unauthorized", { status: 401 })

    const body = await req.json()
    const courseId = parseInt(params.courseId)

    const data = await prisma.courses.update({
        data: body,
        where: {
            id: courseId
        }
    })

    return NextResponse.json(data)
}

export const DELETE = async (req: Request, { params }: { params: { courseId: string } }) => {
    if (!getIsAdmin()) return new NextResponse("Unauthorized", { status: 401 })

    const courseId = parseInt(params.courseId)

    const data = await prisma.courses.delete({
        where: {
            id: courseId
        }
    })

    return NextResponse.json(data)
}

