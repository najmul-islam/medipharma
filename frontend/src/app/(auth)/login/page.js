import Login from "@/components/auth/Login";
import Link from "next/link";

const LoginPage = () => {
  return (
    <section className="py-16">
      <div className="max-w-sm mx-auto border p-6 rounded">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">Login</h1>
          <Link
            href="/register"
            className="text-sm text-sky-600 hover:underline"
          >
            Don't have account?
          </Link>
        </div>
        <Login />
      </div>
    </section>
  );
};
export default LoginPage;
