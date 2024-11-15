import ServiceList, { Service } from "@/components/custom/service-list";
import { api } from "@/services/api";

const getServices = async () => {
  const response = await api.get<Service[]>("/services");
  return response.data;
};

export default async function Dashboard() {
  const services = await getServices();
  return <ServiceList services={services} />;
}
