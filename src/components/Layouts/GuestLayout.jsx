import { useAuth } from "@/hooks/auth";
import Head from "next/head";

import Link from "next/link";
import Image from "next/image";

const GuestLayout = ({ children }) => {
  const { user } = useAuth({ middleware: "guest" });
  return (
    <div>
      <Head>
        <title>Laravel</title>
      </Head>
      <div className="fixed z-20 top-0 px-6 py-4 flex items-center justify-between bg-[#57ccc3] w-full">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={300} height={300} />
        </Link>
        <div>
          {user ? (
            <Link
              href="/dashboard"
              className="ml-4 text-sm text-gray-700 btn bg-white hover:bg-white"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-gray-700 btn  ml-4 bg-white hover:bg-white"
              >
                Masuk
              </Link>
            </>
          )}
        </div>
      </div>
      <main className="font-sans text-gray-900 antialiased">{children}</main>
    </div>
  );
};

export default GuestLayout;
