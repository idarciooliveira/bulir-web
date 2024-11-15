import axios from "axios";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth.config";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(async (config) => {
  let token: string | undefined;

  // Check if we're on the client side
  if (typeof window !== 'undefined') {
    const session = await getSession();
      //@ts-expect-error undefined type
    token = session?.user?.accessToken;
  } else {
    // Server-side token retrieval
    const session = await getServerSession(authConfig);
      //@ts-expect-error undefined type
    token = session?.user?.accessToken;
  }
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export { api };