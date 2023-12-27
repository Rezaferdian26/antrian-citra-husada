import Button from "@/components/Button";
import AppLayout from "@/components/Layouts/AppLayout";
import EditPoli from "@/components/poli/EditPoli";
import TambahPoli from "@/components/poli/TambahPoli";
import { useAuth } from "@/hooks/auth";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import toastr from "toastr";

const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function Poli() {
  const { data, error, mutate } = useSWR("/api/poli", fetcher);
  const [addPoli, setAddPoli] = useState(false);
  const [editPoli, setEditPoli] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { user } = useAuth();

  const handleDeletepoli = async (id) => {
    try {
      setLoading(true);
      await axios.get("sanctum/csrf-cookie");
      await axios.delete(`api/poli/${id}`, {
        headers: {
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      });
      mutate();
      setLoading(false);
      toastr.success("Poli berhasil di hapus");
    } catch (error) {
      toastr.error("Poli gagal di hapus");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role[0] !== "operator") {
      router.replace("/404");
    }
  }, []);

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Poli
        </h2>
      }
    >
      <Head>
        <title>Citra Husada - Poli</title>
      </Head>

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {addPoli && (
            <div className="bg-white overflow-hidden mb-5 shadow-sm sm:rounded-lg">
              <TambahPoli setAddPoli={setAddPoli} mutate={mutate} />
            </div>
          )}
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            {editPoli ? (
              <EditPoli
                editPoli={editPoli}
                setEditPoli={setEditPoli}
                mutate={mutate}
              />
            ) : (
              <div className="p-6 bg-white border-b border-gray-200">
                <Button onClick={() => setAddPoli(true)}>Tambah Poli</Button>
                <table className="table w-[800px]">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama Poli</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data.map((poli, index) => (
                      <tr key={poli.id}>
                        <td>{index + 1}</td>
                        <td>{poli.pilpol}</td>
                        <td>
                          <button
                            className="btn btn-warning"
                            onClick={() => {
                              setEditPoli(poli);
                              setAddPoli(false);
                            }}
                          >
                            Edit
                          </button>{" "}
                          <button
                            className="btn btn-error disabled:btn-error disabled:opacity-70 disabled:cursor-not-allowed"
                            onClick={() => handleDeletepoli(poli.id)}
                            disabled={loading}
                          >
                            Hapus
                            {loading && (
                              <span className="loading loading-spinner loading-md"></span>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
