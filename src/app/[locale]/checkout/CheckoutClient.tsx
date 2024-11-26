"use client";
import { useCart } from "@/hooks/useCart";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CheckoutClient = () => {
  const { paymentIntend, handleSetPaymentIntend, cartItems } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const router = useRouter();
  const locale = useLocale();
  console.log("clientSecret" + clientSecret);
  console.log("paymentIntend" + paymentIntend);
  useEffect(() => {
    setLoading(true);
    setError(false);

    fetch("/api/create-payment-intent/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        items: cartItems,
        payment_intend_id: paymentIntend,
      }),
    })
      .then((res) => {
        setLoading(false);
        if (res.status === 401) return router.push(`/${locale}/login`);
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.paymentIntend.client_secret);
        handleSetPaymentIntend(data.paymentIntend.id);
      })
      .catch((error) => {
        setError(true);
        console.log("payment" + error);
        toast.error("payment" + error);
      });
  }, [cartItems, paymentIntend]);
  return <div>checkoutClient</div>;
};

export default CheckoutClient;
