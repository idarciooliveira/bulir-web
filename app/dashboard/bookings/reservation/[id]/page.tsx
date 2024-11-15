"use client";

import { DateTimePicker } from "@/components/custom/datepickertime";
import { Service } from "@/components/custom/service-list";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { api } from "@/services/api";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Reservation() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [service, setService] = useState<Service>();

  useEffect(() => {
    api
      .get<Service>(`/services/${params.id}`)
      .then((response) => {
        setService(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [dateTime, setDateTime] = useState<Date | null>(null);

  const handleReservation = async () => {
    if (dateTime) {
      const startAt = new Date(dateTime.toISOString());
      try {
        await api.post("/bookings", {
          startAt,
          serviceId: params.id,
        });

        toast({
          variant: "default",
          title: "Booking created",
        });

        router.push("/dashboard");
      } catch (error) {
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
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{service?.name}</h2>
        <p className="text-gray-600">Provider - {service?.user.fullname}</p>
        <p className="text-lg font-semibold text-gray-800">
          Price: {service?.price}
        </p>
        <p className="text-gray-600">{service?.description}</p>
        <DateTimePicker
          value={dateTime}
          onChange={setDateTime}
          className="mt-4"
        />
        <Button
          onClick={handleReservation}
          className="mt-4 w-full bg-blue-500 text-white hover:bg-blue-600"
        >
          Book Now
        </Button>
        <Button
          asChild
          className="mt-4 w-full bg-gray-500 text-white hover:bg-gray-600"
        >
          <Link href={"/dashboard"}>Cancel</Link>
        </Button>
      </div>
    </div>
  );
}
