import ServiceList, { Service } from "@/components/custom/service-list";
import { authConfig } from "@/lib/auth.config";
import { api } from "@/services/api";
import { getServerSession } from "next-auth";
import { redirect, RedirectType } from "next/navigation";

const getServices = async () => {
  const session = await getServerSession(authConfig);

  if (session?.user.role !== "CUSTUMER")
    redirect("/dashboard/bookings", RedirectType.replace);

  const response = await api.get<Service[]>("/services");
  return response.data;
};

export default async function Dashboard() {
  const services = await getServices();
  return <ServiceList services={services} />;
}
