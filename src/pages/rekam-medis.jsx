import Button from "@/components/Button";
import AppLayout from "@/components/Layouts/AppLayout";
import RekamMedisPrint from "@/components/Print/RekamMedisPrint";
import { useAuth } from "@/hooks/auth";
import axios from "@/lib/axios";
import Head from "next/head";
import { FaPrint } from "react-icons/fa";
import useSWR from "swr";
import { useReactToPrint } from "react-to-print";
import { useCallback, useRef, useState } from "react";

const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function RekamMedis() {
  const { data } = useSWR("/api/rekam-medis", fetcher, {
    refreshInterval: 15000,
  });
  const { data: RMPasien } = useSWR("/api/rekam-medis-pasien", fetcher, {
    refreshInterval: 15000,
  });
  const { data: RMDokter } = useSWR("/api/rekam-medis-dokter", fetcher, {
    refreshInterval: 15000,
  });
  const { user } = useAuth();
  const [dataPrint, setDataPrint] = useState(null);

  const componentPrintRef = useRef();

  const reactToPrintContent = useCallback(() => {
    return componentPrintRef.current;
  }, [componentPrintRef.current]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "Rekam Medis",
    removeAfterPrint: true,
  });

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Rekam Medis
        </h2>
      }
    >
      <Head>
        <title>Citra Husada - </title>
      </Head>

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <table className="table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>No Rekam</th>
                    <th>Nama Pasien</th>
                    <th>Nama Dokter</th>
                    <th>Jenis Rawat</th>
                    <th>Tanggal Kunjungan</th>
                    <th>Diagnosa</th>
                    <th>Resep</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                {user?.role[0] === "operator" && (
                  <>
                    {data?.data.map((rekamMedis, index) => (
                      <tbody key={rekamMedis.id}>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{rekamMedis.no_rekam}</td>
                          <td>{rekamMedis.pasien}</td>
                          <td>{rekamMedis.dokter}</td>
                          <td>{rekamMedis.jenis_rawat}</td>
                          <td>{rekamMedis.tgl_kun}</td>
                          <td>{rekamMedis.diagnosa}</td>
                          <td>{rekamMedis.resep}</td>
                          <td>
                            <Button
                              title="Print"
                              onClick={() => {
                                document
                                  .getElementById("my_modal_1")
                                  .showModal();
                                setDataPrint(rekamMedis);
                              }}
                            >
                              <FaPrint />
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </>
                )}
                {user?.role[0] === "pasien" && (
                  <>
                    {RMPasien?.data.map((rekamMedis, index) => (
                      <tbody key={rekamMedis.id}>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{rekamMedis.no_rekam}</td>
                          <td>{rekamMedis.pasien}</td>
                          <td>{rekamMedis.dokter}</td>
                          <td>{rekamMedis.jenis_rawat}</td>
                          <td>{rekamMedis.tgl_kun}</td>
                          <td>{rekamMedis.diagnosa}</td>
                          <td>{rekamMedis.resep}</td>
                          <td>
                            <Button
                              title="Print"
                              onClick={() => {
                                document
                                  .getElementById("my_modal_1")
                                  .showModal();
                                setDataPrint(rekamMedis);
                              }}
                            >
                              <FaPrint />
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </>
                )}
                {user?.role[0] === "dokter" && (
                  <>
                    {RMDokter?.data.map((rekamMedis, index) => (
                      <tbody key={rekamMedis.id}>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{rekamMedis.no_rekam}</td>
                          <td>{rekamMedis.pasien}</td>
                          <td>{rekamMedis.dokter}</td>
                          <td>{rekamMedis.jenis_rawat}</td>
                          <td>{rekamMedis.tgl_kun}</td>
                          <td>{rekamMedis.diagnosa}</td>
                          <td>{rekamMedis.resep}</td>
                          <td>
                            <Button
                              title="Print"
                              onClick={() => {
                                document
                                  .getElementById("my_modal_1")
                                  .showModal();
                                setDataPrint(rekamMedis);
                              }}
                            >
                              <FaPrint />
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </>
                )}
              </table>
            </div>
          </div>
        </div>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <div className="py-4 border border-black">
              <RekamMedisPrint
                innerRef={componentPrintRef}
                dataPrint={dataPrint}
              />
            </div>
            <div className="modal-action">
              <Button onClick={handlePrint}>Print</Button>
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </AppLayout>
  );
}
