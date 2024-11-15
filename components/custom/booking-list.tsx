import React from "react";

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
};
export default function BookingList({ Bookings }: BookingListProps) {
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
        </div>
      ))}
    </div>
  );
}
