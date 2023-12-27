import Button from "@/components/Button";
import AppLayout from "@/components/Layouts/AppLayout";
import axios from "@/lib/axios";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import useSWR from "swr";
import * as Yup from "yup";
import toastr from "toastr";

const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function AntrianPasien() {
  const { data, mutate } = useSWR("api/get-antrian-by-dokter", fetcher, {
    refreshInterval: 15000,
  });
  const { data: pasien, mutate: mutatePasien } = useSWR(
    "api/pasien/" + data?.data[0]?.id_pasien,
    fetcher
  );

  const handleSubmitRekamMedis = async () => {
    formik.values.id_pasien = data?.data[0].id_pasien;
    formik.values.id_dokter = data?.data[0].id_dokter;
    formik.values.tgl_kun = data?.data[0].tgl_kun;

    try {
      await axios.get("sanctum/csrf-cookie");
      await axios.post("/api/rekam-medis", formik.values, {
        headers: {
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      });
      toastr.success("Rekam Medis berhasil ditambahkan");
      mutate();
      mutatePasien();
      formik.resetForm();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const formik = useFormik({
    initialValues: {
      no_rekam: "",
      id_pasien: "",
      id_dokter: "",
      jenis_rawat: "",
      tgl_kun: "",
      diagnosa: "",
      resep: "",
    },
    validationSchema: Yup.object({
      no_rekam: Yup.string().required("Nomor Rekam harus diisi"),
      jenis_rawat: Yup.string().required("Jenis Rawat harus diisi"),
      diagnosa: Yup.string().required("Diagnosa harus diisi"),
      resep: Yup.string().required("Resep harus diisi"),
    }),
    onSubmit: handleSubmitRekamMedis,
  });

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Antrian Pasien
        </h2>
      }
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              {data?.data.length ? (
                <>
                  <form
                    onSubmit={formik.handleSubmit}
                    className="max-w-lg m-auto"
                  >
                    <h1 className="font-bold text-center text-2xl text-accent">
                      Rekam Medis
                    </h1>
                    <div className="my-5">
                      <p className="capitalize mb-2">
                        Nama : {pasien?.data?.name}
                      </p>
                      <p>Tanggal Kunjungan : {data?.data[0]?.tgl_kun}</p>
                    </div>
                    <div className="my-3">
                      <label htmlFor="no_rekam">Nomor Rekam</label>
                      <input
                        type="text"
                        name="no_rekam"
                        id="no_rekam"
                        className="input input-bordered block w-full"
                        {...formik.getFieldProps("no_rekam")}
                      />
                      {formik.errors.no_rekam && formik.touched.no_rekam && (
                        <p className="text-red-500">{formik.errors.no_rekam}</p>
                      )}
                    </div>

                    <div className="my-3">
                      <label htmlFor="jenis_rawat">Jenis Rawat</label>
                      <input
                        type="text"
                        name="jenis_rawat"
                        id="jenis_rawat"
                        className="input input-bordered block w-full capitalize"
                        {...formik.getFieldProps("jenis_rawat")}
                      />
                      {formik.errors.jenis_rawat &&
                        formik.touched.jenis_rawat && (
                          <p className="text-red-500">
                            {formik.errors.jenis_rawat}
                          </p>
                        )}
                    </div>

                    <div className="my-3">
                      <label htmlFor="diagnosa">Diagnosa</label>
                      <input
                        type="text"
                        name="diagnosa"
                        id="diagnosa"
                        className="input input-bordered block w-full capitalize"
                        {...formik.getFieldProps("diagnosa")}
                      />
                      {formik.errors.diagnosa && formik.touched.diagnosa && (
                        <p className="text-red-500">{formik.errors.diagnosa}</p>
                      )}
                    </div>
                    <div className="my-3">
                      <label htmlFor="resep">Resep</label>
                      <input
                        type="text"
                        name="resep"
                        id="resep"
                        className="input input-bordered block w-full capitalize"
                        {...formik.getFieldProps("resep")}
                      />
                      {formik.errors.resep && formik.touched.resep && (
                        <p className="text-red-500">{formik.errors.resep}</p>
                      )}
                    </div>
                    <Button>Simpan</Button>
                  </form>
                  <h1 className="my-5 text-accent text-xl font-bold">
                    Antrian Pasien
                  </h1>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Antrian</th>
                        <th>Nama Pasien</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.data?.map((item) => (
                        <tr key={item.id}>
                          <td>{item.no_antrian}</td>
                          <td>{item.nama_pasien}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              ) : (
                <p>Tidak ada pasien</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
