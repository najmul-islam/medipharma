import Register from "@/components/auth/Register";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <section className="py-16">
      <div className="max-w-sm mx-auto border p-6 rounded">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">Register</h1>
          <Link href="/login" className="text-sm text-sky-600 hover:underline">
            Have an account?
          </Link>
        </div>
        <Register />
      </div>
    </section>
  );
};
export default RegisterPage;
