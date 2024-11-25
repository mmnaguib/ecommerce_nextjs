import Stripe from "stripe";
import { prisma } from "../../../../lib/prisma";
import { ICartItem } from "@/interfaces";
import { getCurrentUser } from "../../../../actions/getCurrentUser";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.StripeKey as string, {
  apiVersion: "2024-11-20.acacia",
});

const calculateOrderAmount = (items: ICartItem[]) => {
  const totlaPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;
    return itemTotal + acc;
  }, 0);

  return totlaPrice;
};

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser == null) {
    return NextResponse.json({ error: "Unauthorized", status: "401" });
  }

  const body = await request.json();
  const { items, payment_intend_id } = body;
  const total = calculateOrderAmount(items) * 100;
  const orderDetail = {
    user: { connect: { id: currentUser.id } },
    amount: total,
    currency: "GBP",
    status: "Pending",
    delivaryStatus: "Pending",
    paymentIntendId: payment_intend_id,
    products: items,
  };

  if (payment_intend_id) {
    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intend_id
    );
    if (current_intent) {
      const update_intent = await stripe.paymentIntents.update(
        payment_intend_id,
        { amount: total }
      );
      const [existing_order, update_order] = await Promise.all([
        prisma.order.findFirst({
          where: { paymentIntendId: payment_intend_id },
        }),
        prisma.order.update({
          where: { paymentIntendId: payment_intend_id },
          data: {
            amount: total,
            products: items,
          },
        }),
      ]);
      if (!existing_order) {
        return NextResponse.json({
          error: "Invalid Payment Intent",
          status: "401",
        });
      }

      return NextResponse.json({ paymentIntend: update_intent });
    }
  } else {
    const paymentIntend = await stripe.paymentIntents.create({
      amount: total,
      currency: "GBP",
      automatic_payment_methods: { enabled: true },
    });

    orderDetail.paymentIntendId = paymentIntend.id;
    await prisma.order.create({
      data: orderDetail,
    });

    return NextResponse.json(paymentIntend);
  }
}
