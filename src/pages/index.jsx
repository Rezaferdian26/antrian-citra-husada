import Head from "next/head";
import { useAuth } from "@/hooks/auth";
import GuestLayout from "@/components/Layouts/GuestLayout";
import { useRouter } from "next/router";

export default function Home() {
  const { user } = useAuth({ middleware: "guest" });
  const router = useRouter();

  const handleMasuk = () => {
    if (user) {
      router.push("dashboard");
    } else {
      router.push("login");
    }
  };

  return (
    <>
      <Head>
        <title>Laravel</title>
      </Head>

      <GuestLayout>
        <div className="min-h-screen bg-gray-100 ">
          <div className="h-screen bg-fixed bg-[url('/background.jpg')] bg-cover relative after:absolute after:top-0 after:left-0 after:bottom-0 after:right-0 after:bg-black after:opacity-60 bg-top flex items-center flex-col justify-center">
            <h1 className="text-5xl text-white font-bold z-10 text-center">
              Selamat Datang di Website <br />
              Citra Husada Sigli
            </h1>
            <p className="text-white text-center z-10 mt-5 text-xl capitalize">
              Cek antrian sekarang jadi lebih gampang
            </p>
            <button className="btn btn-accent z-10 mt-10" onClick={handleMasuk}>
              {user ? "Dashboard" : "Daftar Sekarang"}
            </button>
          </div>
        </div>
      </GuestLayout>
    </>
  );
}
