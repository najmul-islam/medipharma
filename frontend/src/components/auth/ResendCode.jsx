"use client";
import { useResendCodeQuery } from "@/features/auth/authApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ResendCode = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const email = searchParams.get("email");
  const { data, isLoading, isSuccess } = useResendCodeQuery(email);

  useEffect(() => {
    if (user && user.isVerified) {
      router.push("/");
    }
  }, [user]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isSuccess && data) {
    router.push("/verify-code");
  }
};
export default ResendCode;
