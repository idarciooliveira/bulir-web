"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { ServiceForm } from "../page";

const ServiceSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().min(0),
  description: z.string().min(10),
});

type ServiceSchemaFormValues = z.infer<typeof ServiceSchema>;

export default function EditService() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { toast } = useToast();

  const [service, setService] = useState<ServiceForm | null>(null);

  useEffect(() => {
    api
      .get<ServiceForm>(`/services/${params.id}`)
      .then((response) => {
        console.log(response.data);
        setService(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const form = useForm<ServiceSchemaFormValues>({
    resolver: zodResolver(ServiceSchema),
    values: {
      name: service?.name ?? "",
      price: service?.price ?? 0,
      description: service?.description ?? "",
    },
  });

  async function onSubmit({
    description,
    name,
    price,
  }: ServiceSchemaFormValues) {
    try {
      const response = await api.put(`/services/${service?.id}`, {
        description,
        price,
        name,
      });

      if (response?.status == 200) {
        toast({
          variant: "default",
          title: "Service edited!",
        });
        router.push("/dashboard/services");
      } else {
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "Invalid email or password. Please try again.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again later.",
      });
    }
  }

  return (
    <div className="container flex flex-col items-center justify-center">
      <Card className="w-full max-w-[350px]">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="space-y-1">
            <div className="text-center">
              <h1 className="text-2xl font-bold">Edit Service</h1>
              <p className="text-sm text-muted-foreground">Edit Service</p>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input {...form.register("name")} id="name" type="text" />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input {...form.register("price")} id="price" type="number" />
              {form.formState.errors.price && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.price.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                {...form.register("description")}
                id="description"
                type="text"
              />
              {form.formState.errors.description && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Saving..." : "Save"}
            </Button>
          </CardContent>
        </form>
        <CardFooter className="flex flex-wrap items-center justify-center border-t px-6 py-4">
          <div className="text-sm text-muted-foreground">
            <Link
              href="/dashboard/services"
              className="text-primary underline-offset-4 hover:underline"
            >
              Cancel
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
