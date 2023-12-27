import { useState } from "react";
import Button from "../Button";
import { FaBan } from "react-icons/fa";
import { useFormik } from "formik";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import toastr from "toastr";

export default function EditPoli({ editPoli, setEditPoli, mutate }) {
  const [loading, setLoading] = useState(false);

  const handleEditPoli = async () => {
    setLoading(true);
    try {
      await axios.get("sanctum/csrf-cookie");
      await axios.put(`api/poli/${editPoli.id}`, formik.values, {
        headers: {
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      });
      setLoading(false);
      mutate();
      setEditPoli(false);
      toastr.success("Poli berhasil diedit");
    } catch (error) {
      console.log(error);
      formik.setErrors(error.response.data.errors);
      toastr.error("Poli gagal diedit");
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      pilpol: editPoli.pilpol,
    },
    validationSchema: Yup.object({
      pilpol: Yup.string().required("Poli harus diisi"),
    }),
    onSubmit: handleEditPoli,
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
          Tambah{" "}
          {loading && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
        </Button>
        <button
          className="btn uppercase ms-2"
          onClick={() => setEditPoli(false)}
        >
          Batal <FaBan />
        </button>
      </form>
    </div>
  );
}
