import { getIsAdmin } from "@/lib/admin"
import { prisma } from "@/prisma/prisma"
import { NextResponse } from "next/server"


export const GET = async () => {
    if(!getIsAdmin()) return new NextResponse("Unauthorized", { status: 401 }) 
    const data = await prisma.courses.findMany()


    return NextResponse.json(data)
}

export const POST = async (req: Request) => {
    if(!getIsAdmin()) return new NextResponse("Unauthorized", { status: 401 })

        const body = await req.json()

    const data = await prisma.courses.create({
        data: body
    })

    return NextResponse.json(data)
}