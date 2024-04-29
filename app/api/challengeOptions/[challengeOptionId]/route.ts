import { getIsAdmin } from "@/lib/admin"
import { prisma } from "@/prisma/prisma"
import { NextResponse } from "next/server"

export const GET = async (req: Request, { params }: { params: { challengeOptionId: string } }) => {
    if (!getIsAdmin()) return new NextResponse("Unauthorized", { status: 401 })
        
    const challengeOptionId = parseInt(params.challengeOptionId)
    const data = await prisma.challengeOptions.findFirst({
        where: {
            id: challengeOptionId
        }
    })

    return NextResponse.json(data)
}

export const PUT = async (req: Request, { params }: { params: { challengeOptionId: string } }) => {
    if (!getIsAdmin()) return new NextResponse("Unauthorized", { status: 401 })

    const body = await req.json()
    const challengeOptionId = parseInt(params.challengeOptionId)

    const data = await prisma.units.update({
        data: body,
        where: {
            id: challengeOptionId
        }
    })

    return NextResponse.json(data)
}

export const DELETE = async (req: Request, { params }: { params: { challengeOptionId: string } }) => {
    if (!getIsAdmin()) return new NextResponse("Unauthorized", { status: 401 })

    const courseId = parseInt(params.challengeOptionId)

    const data = await prisma.units.delete({
        where: {
            id: courseId
        }
    })

    return NextResponse.json(data)
}

