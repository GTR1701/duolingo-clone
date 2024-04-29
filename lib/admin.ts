import { auth } from "@clerk/nextjs"

export const getIsAdmin =  () => {
    const { userId } = auth()

    if (!userId) return false

    return userId === "user_2fMTbAFvUSViE8AlUKMqyF8Qziz"
}