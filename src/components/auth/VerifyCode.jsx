"use client";
import Link from "next/link";
import { useVerifyCodeMutation } from "@/features/auth/authApi";
import { logout } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const VerifyCode = () => {
  const user = useSelector((state) => state.auth.user);
  const [timeLeft, setTimeLeft] = useState(0);

  const router = useRouter();
  const dispatch = useDispatch();

  const [verifyCode, { isLoading, isSuccess, isError, error }] =
    useVerifyCodeMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    verifyCode({ verificationCode: data.code });
  };

  useEffect(() => {
    if (!user?.verification?.expiresAt) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const expiresAt = new Date(user.verification.expiresAt);
      const difference = expiresAt - now;

      if (difference <= 0) {
        setTimeLeft(0);
        return;
      }

      setTimeLeft(Math.floor(difference / 1000));
    };

    calculateTimeLeft();

    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(timer);
  }, [user]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Code verify successfully");
      router.push("/login");
      dispatch(logout());
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError, error, router, dispatch]);

  useEffect(() => {
    if (user && user.isVerified) {
      router.push("/");
    }
  }, [user]);

  return (
    <>
      <h2 className="mb-2 text-center text-lg font-semibold">
        Remaining time: {formatTime(timeLeft)}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Full Name Input */}
        <div className="flex flex-col">
          <input
            type="text"
            name="code"
            placeholder="Code"
            className={`p-2 border rounded outline-none ${
              errors.code ? "border-red-500" : "border-gray-300"
            }`}
            {...register("code", { required: "Enter your code" })}
          />
          {errors.code && (
            <span className="text-red-500 text-sm mt-1">
              {errors.code.message}
            </span>
          )}
          <Link
            href={`/resend-code?email=${user?.email}`}
            className="text-sm text-sky-600 hover:underline self-end mt-2"
          >
            Resend code?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 p-2 bg-sky-600 text-white rounded"
        >
          Send Code
        </button>
      </form>
    </>
  );
};

export default VerifyCode;
