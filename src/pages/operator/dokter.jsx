import Button from "@/components/Button";
import AppLayout from "@/components/Layouts/AppLayout";
import AddDokter from "@/components/dokter/AddDokter";
import EditDokter from "@/components/dokter/EditDokter";
import { useAuth } from "@/hooks/auth";
import axios from "@/lib/axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import toastr from "toastr";

const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function Dokter() {
  const [addDokter, setAddDokter] = useState(false);
  const [editDokter, setEditDokter] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { user } = useAuth();

  const handleDeleteDokter = async (id) => {
    try {
      setLoading(true);
      await axios.get("sanctum/csrf-cookie");
      await axios.delete(`api/dokter/${id}`, {
        headers: {
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      });
      mutate();
      setLoading(false);
      toastr.success("Dokter berhasil di hapus");
    } catch (error) {
      toastr.error("Dokter gagal di hapus");
      setLoading(false);
    }
  };

  const { data, error, mutate } = useSWR("/api/dokter", fetcher);

  useEffect(() => {
    if (user?.role[0] !== "operator") {
      router.replace("/404");
    }
  }, []);
  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Dokter
        </h2>
      }
    >
      <Head>
        <title>Citra Husada - Dokter</title>
      </Head>

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-3">
            {addDokter && (
              <AddDokter setAddDokter={setAddDokter} mutate={mutate} />
            )}
          </div>
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              {editDokter ? (
                <EditDokter
                  editDokter={editDokter}
                  setEditDokter={setEditDokter}
                  mutate={mutate}
                />
              ) : (
                <div className="p-6 bg-white border-b border-gray-200">
                  <Button onClick={() => setAddDokter(true)}>
                    Tambah Dokter
                  </Button>
                  <table className="table w-full mt-3">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Username</th>
                        <th>Nama Poli</th>
                        <th>No Telepon</th>
                        <th>Alamat</th>
                        <th>Jadwal</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.data.map((dokter, index) => (
                        <tr key={dokter.id}>
                          <td>{index + 1}</td>
                          <td>{dokter.name}</td>
                          <td>{dokter.username}</td>
                          <td>{dokter.poli?.pilpol}</td>
                          <td>{dokter.no_hp}</td>
                          <td>{dokter.alamat}</td>
                          <td>{dokter.jadwal_dokter}</td>
                          <td>
                            <button
                              className="btn btn-warning"
                              onClick={() => {
                                setEditDokter(dokter);
                                setAddDokter(false);
                              }}
                            >
                              Edit
                            </button>{" "}
                            <button
                              className="btn btn-error disabled:btn-error disabled:opacity-70 disabled:cursor-not-allowed"
                              onClick={() => handleDeleteDokter(dokter.id)}
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
      </div>
    </AppLayout>
  );
}
