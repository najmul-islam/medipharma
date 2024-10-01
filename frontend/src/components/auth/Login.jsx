"use client";
import Link from "next/link";
import { useLoginMutation } from "@/features/auth/authApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Login = () => {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();

  const onSubmit = (data) => {
    login(data);
  };

  useEffect(() => {
    if (user && user.isVerified) {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successfully");
      router.push("/");
    }
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isSuccess, isError, error, router]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Email Input */}
      <div className="flex flex-col">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={`p-2 border rounded outline-none ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Please enter a valid email address",
            },
          })}
        />
        {errors.email && (
          <span className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* Password Input */}
      <div className="flex flex-col">
        <input
          type="password"
          name="password"
          placeholder="Password"
          className={`p-2 border rounded outline-none ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
          {...register("password", {
            required: "Password is required",
          })}
        />
        {errors.password && (
          <span className="text-red-500 text-sm mt-1">
            {errors.password.message}
          </span>
        )}
        <Link
          href="/forgot-password"
          className="text-sm text-sky-600 hover:underline self-end mt-2"
        >
          Forgot password
        </Link>
      </div>
      {/* Submit Button */}
      <button type="submit" className="mt-4 p-2 bg-sky-600 text-white rounded">
        Login
      </button>
    </form>
  );
};
export default Login;
