import axios from "@/lib/axios";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import * as Yup from "yup";

export default function FormOperator() {
  const handleSubmitOperator = async () => {
    try {
      await axios.get("sanctum/csrf-cookie");
      await axios.post(
        "/login",
        {
          username: formik.values.username,
          password: formik.values.password,
        },
        {
          headers: {
            "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
          },
        }
      );
    } catch (error) {
      formik.setErrors(error.response.data.errors);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username harus diisi"),
      password: Yup.string().required("Password harus diisi"),
    }),
    onSubmit: handleSubmitOperator,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mt-3">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          className="input input-bordered block w-full max-w-xs mt-2"
          placeholder="Masukkan username "
          {...formik.getFieldProps("username")}
        />
        {formik.touched.username && formik.errors.username ? (
          <div className="text-red-500">{formik.errors.username}</div>
        ) : null}
      </div>
      <div className="mt-3">
        <label htmlFor="password_operator">Password</label>
        <input
          type="password"
          name="password"
          id="password_operator"
          className="input input-bordered block w-full max-w-xs mt-2"
          placeholder="Masukkan password "
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500">{formik.errors.password}</div>
        ) : null}
      </div>

      <div className="modal-action">
        <button type="submit" className="btn btn-accent ">
          Masuk
        </button>
        <button
          className="btn"
          onClick={() => document.getElementById("modal_operator").close()}
        >
          Close
        </button>
      </div>
    </form>
  );
}
