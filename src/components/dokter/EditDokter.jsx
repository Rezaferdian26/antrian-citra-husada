import { FaBan } from "react-icons/fa";
import Button from "../Button";
import { useFormik } from "formik";
import { useState } from "react";
import useSWR from "swr";
import * as Yup from "yup";
import axios from "@/lib/axios";
import toastr from "toastr";
import Cookies from "js-cookie";

const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function EditDokter({ editDokter, setEditDokter, mutate }) {
  console.log(editDokter);
  const { data } = useSWR(`/api/poli`, fetcher);
  const [loading, setLoading] = useState(false);
  const handleEditDokter = async () => {
    try {
      setLoading(true);
      await axios.get("sanctum/csrf-cookie");
      await axios.put(`api/dokter/${editDokter.id}`, formik.values, {
        headers: {
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      });
      setLoading(false);
      mutate();
      setEditDokter(false);
      toastr.success("Dokter berhasil diedit");
    } catch (error) {
      console.log(error);
      formik.setErrors(error.response.data.errors);
      toastr.error("Dokter gagal diedit");
      setLoading(false);
    }
  };
  const formik = useFormik({
    initialValues: {
      name: editDokter.name,
      username: editDokter.username,
      poli_id: editDokter.poli?.id,
      no_hp: editDokter.no_hp,
      alamat: editDokter.alamat,
      jadwal_dokter: editDokter.jadwal_dokter,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nama harus diisi"),
      username: Yup.string().required("Username harus diisi"),
      poli_id: Yup.string().required("Poli harus diisi"),
      no_hp: Yup.string().required("Nomor Telepon harus diisi").max(15),
      alamat: Yup.string().required("Alamat harus diisi"),
      jadwal_dokter: Yup.string().required("Jadwal harus diisi"),
    }),
    onSubmit: handleEditDokter,
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
            <option disabled value={""}>
              Pilih Poli
            </option>
            {data?.data.map((poli) => (
              <option
                key={poli.id}
                value={poli.id}
                selected={poli.id === editDokter.poli?.id}
              >
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
          Edit{" "}
          {loading && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
        </Button>
        <button
          className="btn uppercase ms-2"
          onClick={() => setEditDokter(false)}
        >
          Batal <FaBan />
        </button>
      </form>
    </div>
  );
}
