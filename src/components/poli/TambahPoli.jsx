import { useFormik } from "formik";
import Button from "../Button";
import * as Yup from "yup";
import { FaBan, FaPlus } from "react-icons/fa";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import { useState } from "react";
import toastr from "toastr";

export default function TambahPoli({ setAddPoli, mutate }) {
  const [loading, setLoading] = useState(false);
  const handleSubmitPoli = async () => {
    setLoading(true);
    try {
      await axios.get("sanctum/csrf-cookie");
      await axios.post("api/poli", formik.values, {
        headers: {
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      });
      setLoading(false);
      mutate();
      toastr.success("Poli berhasil ditambahkan");
      formik.values.pilpol = "";
    } catch (error) {
      formik.setErrors(error.response.data.errors);
      setLoading(false);
      toastr.error("Poli gagal ditambahkan");
    }
  };

  const formik = useFormik({
    initialValues: {
      pilpol: "",
    },
    validationSchema: Yup.object({
      pilpol: Yup.string().required("Nama harus diisi"),
    }),
    onSubmit: handleSubmitPoli,
  });
  return (
    <div className="p-6 bg-white border-b border-gray-200">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nama">Nama</label>
          <input
            type="text"
            id="nama"
            className="input input-bordered block w-full max-w-xs"
            placeholder="Masukkan Nama Poli"
            {...formik.getFieldProps("pilpol")}
          />
          {formik.touched.pilpol && formik.errors.pilpol ? (
            <div className="text-red-500">{formik.errors.pilpol}</div>
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
          onClick={() => setAddPoli(false)}
        >
          Batal <FaBan />
        </button>
      </form>
    </div>
  );
}
