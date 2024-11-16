import BookingList, { Booking } from "@/components/custom/booking-list";
import { authConfig } from "@/lib/auth.config";
import { api } from "@/services/api";
import { getServerSession } from "next-auth";
import { unstable_noStore } from "next/cache";
import React from "react";

const getBookings = async () => {
  const session = await getServerSession(authConfig);
  if (session?.user.role == "CUSTUMER") {
    const response = await api.get<Booking[]>(
      `/bookings/${session?.user.id}/custumers`
    );
    return response.data;
  } else {
    const response = await api.get<Booking[]>(
      `/bookings/${session?.user.id}/providers`
    );
    return response.data;
  }
};

unstable_noStore();

export default async function BookingsPage() {
  const bookings = await getBookings();
  const session = await getServerSession(authConfig);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>
      <BookingList userRole={session?.user.role} Bookings={bookings} />
    </div>
  );
}
