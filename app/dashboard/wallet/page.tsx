"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { api } from "@/services/api";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function Wallet() {
  const router = useRouter();
  const [amount, setAmount] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    api
      .post("/wallets/deposit", {
        amount: Number(amount),
      })
      .then(() => {
        setAmount("");
        toast({
          title: "Your wallet was charged",
          variant: "default",
        });
        router.push("/dashboard");
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          toast({
            variant: "destructive",
            title: "Booking error",
            description:
              error.response?.data.message || "Something went wrong.",
          });
        } else {
          console.error("Unexpected error:", error);
        }
      });
  };

  return (
    <div className="w-3/2">
      <h2 className="text-2xl font-bold">My Wallet</h2>
      <form onSubmit={onSubmit} className="space-y-2">
        <Label htmlFor="wallet-balance">Amount</Label>
        <Input
          min={10}
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button type="submit">Deposit</Button>
      </form>
    </div>
  );
}
