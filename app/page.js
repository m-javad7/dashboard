'use client'
import { Login } from "@/components/login/login";
import { QueryClient } from "react-query";
import { QueryClientProvider } from "react-query";
export default function Home() {
  const queryclient = new QueryClient();
  return (
   <>
   <QueryClientProvider client={queryclient}>

   <Login/>
   </QueryClientProvider>
   </>
  );
}
