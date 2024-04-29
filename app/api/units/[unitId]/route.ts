import { getIsAdmin } from "@/lib/admin"
import { prisma } from "@/prisma/prisma"
import { NextResponse } from "next/server"

export const GET = async (req: Request, { params }: { params: { unitId: string } }) => {
    if (!getIsAdmin()) return new NextResponse("Unauthorized", { status: 401 })
        
    const unitId = parseInt(params.unitId)
    const data = await prisma.units.findFirst({
        where: {
            id: unitId
        }
    })

    return NextResponse.json(data)
}

export const PUT = async (req: Request, { params }: { params: { unitId: string } }) => {
    if (!getIsAdmin()) return new NextResponse("Unauthorized", { status: 401 })

    const body = await req.json()
    const unitId = parseInt(params.unitId)

    const data = await prisma.units.update({
        data: body,
        where: {
            id: unitId
        }
    })

    return NextResponse.json(data)
}

export const DELETE = async (req: Request, { params }: { params: { unitId: string } }) => {
    if (!getIsAdmin()) return new NextResponse("Unauthorized", { status: 401 })

    const courseId = parseInt(params.unitId)

    const data = await prisma.units.delete({
        where: {
            id: courseId
        }
    })

    return NextResponse.json(data)
}

