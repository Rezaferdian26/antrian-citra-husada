import AppLayout from "@/components/Layouts/AppLayout";
import PasienView from "@/components/dashboard/PasienView";
import { useAuth } from "@/hooks/auth";
import axios from "@/lib/axios";
import Head from "next/head";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);
const Dashboard = () => {
  const { user } = useAuth({ middleware: "auth" });
  const { data: antrian } = useSWR("api/antrian", fetcher);
  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head>
        <title>Citra Husada - Dashboard</title>
      </Head>

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {user?.role[0] === "pasien" ? (
            <PasienView />
          ) : (
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="grid grid-cols-4 gap-5 p-4">
                <div className="bg-accent p-4 rounded-lg text-center ">
                  <p>Jumlah Antrian Pasien Saat ini</p>
                  <p>{antrian ? antrian?.data?.length : 0}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
