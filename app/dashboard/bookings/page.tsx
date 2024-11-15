import BookingList, { Booking } from "@/components/custom/booking-list";
import { authConfig } from "@/lib/auth.config";
import { api } from "@/services/api";
import { getServerSession } from "next-auth";
import React from "react";

const getBookings = async () => {
  const session = await getServerSession(authConfig);
  const response = await api.get<Booking[]>(
    `/bookings/${session?.user.id}/custumers`
  );
  return response.data;
};

export default async function BookingsPage() {
  const bookings = await getBookings();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>
      <BookingList Bookings={bookings} />
    </div>
  );
}
