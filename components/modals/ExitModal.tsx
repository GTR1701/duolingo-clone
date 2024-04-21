"use client"

import { useExitModal } from "@/store/useExitModal"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "../ui/dialog"
import Image from "next/image"
import { Button } from "../ui/button"

export const ExitModal = () => {
    const router = useRouter()
    const [isClient, setIsClient] = useState(false)
    const {isOpen, open, close} = useExitModal()

    useEffect(() => {
        setIsClient(true)
    }, [])

    if(!isClient) return null

    return(
        <Dialog open={isOpen} onOpenChange={close} >
            <DialogContent className="max-w-md">
                <div className="flex items-center w-full justify-center mb-5">
                    <Image src="/mascot_sad.svg" alt="Mascot" height={80} width={80} />
                </div>
                <DialogTitle className="text-center font-bold text-2xl">
                    Wait, don&apos;t go!
                </DialogTitle>
                <DialogDescription className="text-center text-base">
                    You&apos;re about to leave this lesson. Are you sure?
                </DialogDescription>
                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button variant="primary" size="lg" className="w-full" onClick={close}>
                            Keep Learning
                        </Button>
                        <Button variant="dangerOutline" size="lg" className="w-full" onClick={() => {
                            close()
                            router.push("/learn")
                        }}>
                            End Session
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}