import { api } from "@/services/api";
import { Wallet } from "lucide-react";

type GetBalanceReponse = {
  balance: number;
};

const getWalletBalance = async () => {
  try {
    const response = await api.get<GetBalanceReponse>("/wallets/balance");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch wallet balance:", error);
    throw error; // or handle it appropriately
  }
};

export default async function WalletComponent() {
  const walletBalance = await getWalletBalance();

  return (
    <div className="hidden md:flex items-center gap-2 text-muted-foreground">
      <Wallet className="h-4 w-4" />
      <span>${walletBalance.balance} </span>
    </div>
  );
}
