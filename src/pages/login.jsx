import ApplicationLogo from "@/components/ApplicationLogo";
import AuthCard from "@/components/AuthCard";
import AuthSessionStatus from "@/components/AuthSessionStatus";
import Button from "@/components/Button";
import GuestLayout from "@/components/Layouts/GuestLayout";
import Input from "@/components/Input";
import InputError from "@/components/InputError";
import Label from "@/components/Label";
import Link from "next/link";
import { useAuth } from "@/hooks/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const Login = () => {
  const router = useRouter();

  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [shouldRemember, setShouldRemember] = useState(false);
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (router.query.reset?.length > 0 && errors.length === 0) {
      setStatus(atob(router.query.reset));
    } else {
      setStatus(null);
    }
  });

  const submitForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    login({
      username,
      password,
      remember: shouldRemember,
      setErrors,
      setStatus,
      setLoading,
    });
  };

  return (
    <GuestLayout>
      <AuthCard
        className={"mt-3"}
        logo={
          <Link href="/">
            <Image
              src={"/logo.png"}
              width={300}
              height={200}
              alt="Logo Citra Husada"
              className="m-auto"
            />
          </Link>
        }
      >
        {/* Session Status */}
        <AuthSessionStatus className="mb-4" status={status} />

        <form onSubmit={submitForm}>
          <div>
            <Label htmlFor="username">Username</Label>

            <Input
              id="username"
              type="username"
              value={username}
              className="block mt-1 w-full input-bordered input"
              onChange={(event) => setUsername(event.target.value)}
              required
              autoFocus
            />

            <InputError messages={errors.username} className="mt-2" />
          </div>

          {/* Password */}
          <div className="mt-4">
            <Label htmlFor="password">Password</Label>

            <Input
              id="password"
              type="password"
              value={password}
              className="block mt-1 w-full input input-bordered"
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
            />

            <InputError messages={errors.password} className="mt-2" />
          </div>

          {/* Remember Me */}
          <div className="block mt-4">
            <label htmlFor="remember_me" className="inline-flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                name="remember"
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(event) => setShouldRemember(event.target.checked)}
              />

              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
          </div>

          <div>
            <p className="text-sm mt-3">
              Belum punya akun? Daftar dulu{" "}
              <Link href={"/registrasi"} className="text-blue-500 underline">
                disini
              </Link>
            </p>
          </div>

          <div className="flex items-center justify-end mt-4">
            <Link
              href="/forgot-password"
              className="underline text-sm text-gray-600 hover:text-gray-900"
            >
              Forgot your password?
            </Link>

            <Button className="ml-3" disabled={loading}>
              Login
              {loading && (
                <span className="loading loading-spinner loading-md"></span>
              )}
            </Button>
          </div>
        </form>
      </AuthCard>
    </GuestLayout>
  );
};

export default Login;
