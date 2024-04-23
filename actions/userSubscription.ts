"use server"

import { stripe } from "@/lib/stripe"
import { absoluteUrl } from "@/lib/utils"
import { getUserSubscription } from "@/prisma/queries"
import { auth, currentUser } from "@clerk/nextjs"

const returnUrl = absoluteUrl("/shop")

export const createStripeUrl = async () => {
    const {userId} = await auth()
    const user = await currentUser()

    if (!userId || !user) {
        return null
    }

    const userSubscription = await getUserSubscription()

    if(userSubscription && userSubscription.stripeCustomerId){
        const stripeSession = await stripe.billingPortal.sessions.create({
            customer: userSubscription.stripeCustomerId,
            return_url: returnUrl
        })

        return {data: stripeSession.url}
    }

    const stripeSession = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: "pln",
                    product_data: {
                        name: "Lingo Pro",
                        description: "Unlimited hearts",
                    },
                    unit_amount: 2000,
                    recurring: {
                        interval: "month"
                    }
                }
            }
        ],
        metadata: {
            userId
        },
        success_url: returnUrl,
        cancel_url: returnUrl
    })

    return {data: stripeSession.url}
}