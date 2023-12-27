import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../Button";
import { FaBan, FaPlus } from "react-icons/fa";
import { useState } from "react";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import toastr from "toastr";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function AddDokter({ setAddDokter, mutate }) {
  const { data } = useSWR("/api/poli", fetcher);
  const [loading, setLoading] = useState(false);
  const handleAddDokter = async () => {
    try {
      setLoading(true);
      await axios.get("sanctum/csrf-cookie");
      const response = await axios.post("/api/dokter", formik.values, {
        headers: {
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      });
      console.log(response.data);
      mutate();
      setLoading(false);
      setAddDokter(false);
      toastr.success("Dokter berhasil ditambahkan");
    } catch (error) {
      console.log(error);
      setLoading(false);
      formik.setErrors(error.response.data.errors);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      password: "",
      poli_id: "",
      no_hp: "",
      alamat: "",
      jadwal_dokter: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nama harus diisi"),
      username: Yup.string().required("Username harus diisi"),
      password: Yup.string().required("Password harus diisi"),
      poli_id: Yup.string().required("Poli harus diisi"),
      no_hp: Yup.string().required("Nomor Telepon harus diisi").max(15),
      alamat: Yup.string().required("Alamat harus diisi"),
      jadwal_dokter: Yup.string().required("Jadwal harus diisi"),
    }),
    onSubmit: handleAddDokter,
  });
  return (
    <div className="p-6 bg-white border-b border-gray-200">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name">Nama</label>
          <input
            type="text"
            id="name"
            className="input input-bordered block w-full max-w-xs"
            placeholder="Masukkan Nama Dokter"
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="input input-bordered block w-full max-w-xs"
            placeholder="Masukkan Username"
            {...formik.getFieldProps("username")}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="text-red-500">{formik.errors.username}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="input input-bordered block w-full max-w-xs"
            placeholder="Masukkan password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="no_hp">Nomor Telepon</label>
          <input
            type="text"
            id="no_hp"
            className="input input-bordered block w-full max-w-xs"
            placeholder="Masukkan no_hp"
            {...formik.getFieldProps("no_hp")}
          />
          {formik.touched.no_hp && formik.errors.no_hp ? (
            <div className="text-red-500">{formik.errors.no_hp}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="alamat">Alamat</label>
          <input
            type="text"
            id="alamat"
            className="input input-bordered block w-full max-w-xs"
            placeholder="Masukkan alamat"
            {...formik.getFieldProps("alamat")}
          />
          {formik.touched.alamat && formik.errors.alamat ? (
            <div className="text-red-500">{formik.errors.alamat}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="poli_id">Poli</label>
          <select
            className="select select-bordered w-full max-w-xs block"
            {...formik.getFieldProps("poli_id")}
          >
            <option disabled selected value={""}>
              Pilih Poli
            </option>
            {data?.data.map((poli) => (
              <option key={poli.id} value={poli.id}>
                {poli.pilpol}
              </option>
            ))}
          </select>
          {formik.touched.poli_id && formik.errors.poli_id ? (
            <div className="text-red-500">{formik.errors.poli_id}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="jadwal_dokter">Jadwal</label>
          <input
            type="time"
            id="jadwal_dokter"
            className="input input-bordered block w-full max-w-xs"
            placeholder="Masukkan jadwal_dokter"
            {...formik.getFieldProps("jadwal_dokter")}
          />
          {formik.touched.jadwal_dokter && formik.errors.jadwal_dokter ? (
            <div className="text-red-500">{formik.errors.jadwal_dokter}</div>
          ) : null}
        </div>
        <Button disabled={loading}>
          Tambah <FaPlus />{" "}
          {loading && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
        </Button>
        <button
          className="btn uppercase ms-2"
          onClick={() => setAddDokter(false)}
        >
          Batal <FaBan />
        </button>
      </form>
    </div>
  );
}
