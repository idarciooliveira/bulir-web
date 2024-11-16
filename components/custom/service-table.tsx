"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ServiceForm } from "@/app/dashboard/services/page";
import Link from "next/link";
import { Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { toast } from "@/hooks/use-toast";

type Props = {
  services: ServiceForm[];
};

export default function ServiceTable({ services }: Props) {
  const router = useRouter();

  const handleRemoveService = async (serviceId: string) => {
    await api.delete(`/services/${serviceId}`).then(() => {
      router.refresh();
      toast({
        variant: "default",
        title: "Service Deleted!",
      });
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {services.map((service) => (
          <TableRow key={service.id}>
            <TableCell>{service.name}</TableCell>
            <TableCell>{service.description}</TableCell>
            <TableCell>{service.price}</TableCell>
            <TableCell className="flex flex-row space-x-2">
              <Link href={`/dashboard/services/${service.id}`}>
                <Pencil width={18} />
              </Link>
              <Trash
                width={18}
                className="hover:cursor-pointer"
                onClick={() => handleRemoveService(service.id)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
