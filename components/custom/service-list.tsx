import Link from "next/link";
import React from "react";

export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  user: {
    id: string;
    fullname: string;
  };
};

type ServiceListProps = {
  services: Service[];
};
export default function ServiceList({ services }: ServiceListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <h1 className="text-2xl font-bold mb-6 col-span-full">
        Services Avaliables
      </h1>
      {services.map((service, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg p-4 flex flex-col"
        >
          <h2 className="text-lg font-semibold">{service.user.fullname}</h2>
          <p className="text-gray-600">{service.name}</p>
          <p className="text-green-500 font-bold">{service.price}</p>
          <p className="text-gray-500">{service.description}</p>
          <Link
            href={`/dashboard/bookings/reservation/${service.id}`}
            className="mt-auto bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600 transition"
          >
            Book Now
          </Link>
        </div>
      ))}
    </div>
  );
}
