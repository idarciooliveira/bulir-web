import ServiceTable from "@/components/custom/service-table";
import { Button } from "@/components/ui/button";
import { authConfig } from "@/lib/auth.config";
import { api } from "@/services/api";
import { getServerSession } from "next-auth";
import { unstable_noStore } from "next/cache";
import Link from "next/link";

export type ServiceForm = {
  id: string;
  name: string;
  description: string;
  price: number;
};

const getServicesByProvider = async () => {
  const session = await getServerSession(authConfig);
  const response = await api.get<ServiceForm[]>(
    `/services/${session?.user.id}/users`
  );
  return response.data;
};

unstable_noStore();

export default async function Services() {
  const services = await getServicesByProvider();

  return (
    <div className="m-auto">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-lg font-bold">Services</h2>
        <Button asChild>
          <Link href={"/dashboard/services/register"}>New Service</Link>
        </Button>
      </div>
      <ServiceTable services={services} />
    </div>
  );
}
