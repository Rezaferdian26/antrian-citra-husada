import axios from "@/lib/axios";
import Button from "../Button";
import useSWR from "swr";
import { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import toastr from "toastr";
import { useAuth } from "@/hooks/auth";
import ListDokter from "./ListDokter";

const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function PasienView() {
  const { user } = useAuth({ middleware: "auth" });
  const { data: poli } = useSWR("/api/poli", fetcher);
  const {
    data: antrian,
    error: antrianError,
    mutate,
  } = useSWR(`/api/antrian/${user.id}`, fetcher, {
    refreshInterval: 30000,
  });

  const [daftar, setDaftar] = useState(false);
  const [dokter, setDokter] = useState([]);
  const defaultSelectRef = useRef();

  const handleChangePoli = async (e) => {
    try {
      await axios.get("sanctum/csrf-cookie");
      const response = await axios.get(
        `api/get-dokter-by-poli/${e.target.value}`
      );
      if (!response.data.data.length) {
        formik.values.id_dokter = "";
        setDokter([]);
        defaultSelectRef.current.value = "";
      } else {
        setDokter(response.data.data);
      }
    } catch (error) {
      console.log(error);
      setDokter([]);
      formik.values.id_dokter = "";
    }
  };

  const handleSubmitAntrian = async () => {
    if (!defaultSelectRef.current.value) {
      formik.setErrors({ id_dokter: "Dokter harus diisi" });
      return;
    }
    try {
      await axios.get("sanctum/csrf-cookie");
      const response = await axios.post("/api/antrian", formik.values, {
        headers: {
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      });
      setDaftar(false);
      formik.resetForm();
      toastr.success("Antrian berhasil ditambahkan");
      mutate();
    } catch (error) {
      console.log(error);
      toastr.error("Antrian gagal ditambahkan");
    }
  };

  const formik = useFormik({
    initialValues: {
      id_poli: "",
      id_dokter: "",
      pembayaran: "",
      keterangan: "",
    },
    validationSchema: Yup.object({
      id_poli: Yup.string().required("Poli harus diisi"),
      id_dokter: Yup.string().required("Dokter harus diisi"),
      pembayaran: Yup.string().required("Pembayaran harus diisi"),
      keterangan: Yup.string().required("Keterangan harus diisi"),
    }),
    onSubmit: handleSubmitAntrian,
  });
  return (
    <>
      {daftar && (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            <ListDokter />
          </div>
        </div>
      )}
      <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
        <div className="p-6 bg-white border-b border-gray-200">
          {!antrianError ? (
            <div className="max-w-lg mx-auto">
              <div className="text-center">
                <h1 className="text-3xl font-bold">Antrian</h1>
                <p className="text-lg">{antrian?.data?.no_antrian}</p>
              </div>
              <p>Poli : {antrian?.data?.poli}</p>
              <p>Dokter : {antrian?.data?.dokter}</p>
            </div>
          ) : (
            <>
              {daftar ? (
                <form onSubmit={formik.handleSubmit}>
                  <label htmlFor="id_poli">Pilih Poli</label>
                  <select
                    id="id_poli"
                    name="id_poli"
                    className="select select-bordered w-full max-w-xs block"
                    onChange={(e) => {
                      formik.handleChange(e);
                      handleChangePoli(e);
                    }}
                    value={formik.values.id_poli}
                    onBlur={formik.handleBlur}
                  >
                    <option disabled selected value={""}>
                      Pilih Poli
                    </option>
                    {poli?.data.map((poli) => (
                      <option key={poli.id} value={poli.id}>
                        {poli.pilpol}
                      </option>
                    ))}
                  </select>
                  {formik.errors.id_poli && formik.touched.id_poli && (
                    <p className="text-red-500">{formik.errors.id_poli}</p>
                  )}
                  <label htmlFor="id_dokter">Dokter</label>
                  <select
                    id="id_dokter"
                    name="id_dokter"
                    className="select select-bordered w-full max-w-xs block"
                    {...formik.getFieldProps("id_dokter")}
                    ref={defaultSelectRef}
                  >
                    <option disabled selected value={""}>
                      Pilih Dokter
                    </option>
                    {dokter && (
                      <>
                        {dokter?.map((dokter) => (
                          <option key={dokter.id} value={dokter.id}>
                            {dokter.name} (Jadwal: {dokter.jadwal_dokter})
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                  {formik.errors.id_dokter && formik.touched.id_dokter && (
                    <p className="text-red-500">{formik.errors.id_dokter}</p>
                  )}
                  <label htmlFor="pembayaran">Pembayaran</label>
                  <select
                    id="pembayaran"
                    name="pembayaran"
                    className="select select-bordered w-full max-w-xs block"
                    {...formik.getFieldProps("pembayaran")}
                  >
                    <option disabled selected value={""}>
                      Pilih Pembayaran
                    </option>
                    <option value="bpjs">BPJS</option>
                    <option value="mandiri">Mandiri</option>
                  </select>
                  {formik.errors.pembayaran && formik.touched.pembayaran && (
                    <p className="text-red-500">{formik.errors.pembayaran}</p>
                  )}
                  <label htmlFor="keterangan">Keterangan</label>
                  <textarea
                    id="keterangan"
                    name="keterangan"
                    className="textarea textarea-bordered block"
                    {...formik.getFieldProps("keterangan")}
                  />
                  {formik.errors.keterangan && formik.touched.keterangan && (
                    <p className="text-red-500">{formik.errors.keterangan}</p>
                  )}
                  <Button className="me-2">Daftar</Button>
                  <button className="btn mt-3" onClick={() => setDaftar(false)}>
                    Batal
                  </button>
                </form>
              ) : (
                <Button onClick={() => setDaftar(true)}>Daftar ke Poli</Button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
