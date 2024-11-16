"use client";
import React from "react";
import { Button } from "../ui/button";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";

export type Booking = {
  id: string;
  code: string;
  status: string;
  startAt: string;
  total: number;
  provider: {
    id: string;
    fullname: string;
  };
  service: {
    id: string;
    name: string;
  };
};

type BookingListProps = {
  Bookings: Booking[];
  userRole: string;
};

export enum BookingStatus {
  COMPLETED = "COMPLETA",
  CANCELLED = "CANCELADO",
  CONFIRMED = "CONFIRMADO",
  PENDING = "PENDENTE",
}
export default function BookingList({ Bookings, userRole }: BookingListProps) {
  const router = useRouter();

  const approveBooking = async (bookingId: string) => {
    await api.patch(`/bookings/${bookingId}/confirm`);
    router.refresh();
  };

  const cancelBooking = async (bookingId: string) => {
    await api.patch(`/bookings/${bookingId}/cancel`);
    router.refresh();
  };

  const completeBooking = async (bookingId: string) => {
    await api.patch(`/bookings/${bookingId}/complete`);
    router.refresh();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Bookings.map((booking, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-4 m-2 flex flex-col"
        >
          <h3 className="text-lg font-semibold">{booking.service.name}</h3>
          <p>Status: {booking.status}</p>
          <p>Start Date: {new Date(booking.startAt).toLocaleDateString()}</p>
          <p>Provider: {booking.provider.fullname}</p>
          <p>Price: ${booking.total.toFixed(2)}</p>
          {userRole !== "CUSTUMER" && (
            <div className="w-full flex flex-row space-x-2 mt-4">
              {booking.status == BookingStatus.PENDING && (
                <Button
                  onClick={() => approveBooking(booking.id)}
                  type="button"
                  className="bg-green-500"
                >
                  Accept
                </Button>
              )}
              {booking.status == BookingStatus.CONFIRMED && (
                <Button
                  onClick={() => completeBooking(booking.id)}
                  type="button"
                  className="bg-orange-500"
                >
                  COMPLETE
                </Button>
              )}
              {booking.status !== BookingStatus.CANCELLED &&
                booking.status !== BookingStatus.COMPLETED && (
                  <Button
                    onClick={() => cancelBooking(booking.id)}
                    type="button"
                    variant={"destructive"}
                  >
                    Reject
                  </Button>
                )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
