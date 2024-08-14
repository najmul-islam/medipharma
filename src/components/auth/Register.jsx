"use client";
import { useRegisterMutation } from "@/features/auth/authApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoImageOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Register = () => {
  const [fileName, setFileName] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const [registerMutation, { data, isSuccess, isError, error }] =
    useRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);

    if (data.photo && data.photo[0]) {
      formData.append("photo", data.photo[0]);
    }

    console.log(formData);
    try {
      registerMutation(formData);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  useEffect(() => {
    if (user && user.isVerified) {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      router.push(`/verify-code`);
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError, error, router]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Full Name Input */}
      <div className="flex flex-col">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className={`p-2 border rounded outline-none ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <span className="text-red-500 text-sm mt-1">
            {errors.name.message}
          </span>
        )}
      </div>

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
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500 text-sm mt-1">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* Profile Photo Input */}
      <div className="flex flex-col">
        <label
          htmlFor="photo"
          className={`flex gap-2 items-center border rounded p-2 cursor-pointer text-ellipsis overflow-hidden ${
            errors.photo ? "border-red-500" : "text-gray-400"
          }`}
        >
          <IoImageOutline className="text-xl" />{" "}
          {fileName ? fileName : "Upload profile photo"}
        </label>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          name="photo"
          id="photo"
          className="hidden"
          {...register("photo", {
            required: "Profile photo is required",
          })}
          onChange={handleFileChange}
        />
        {errors.photo && (
          <span className="text-red-500 text-sm mt-1">
            {errors.photo.message}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button type="submit" className="mt-4 p-2 bg-sky-600 text-white rounded">
        Create account
      </button>
    </form>
  );
};
export default Register;
