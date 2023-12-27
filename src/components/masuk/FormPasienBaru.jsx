import { useFormik } from "formik";
import * as Yup from "yup";

export default function FormPasienBaru() {
  const handleSelectChange = () => {};
  const handleSubmitPasienBaru = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  const formik = useFormik({
    initialValues: {
      nama: "",
      no_identitas: "",
      no_bpjs: "",
      jenis_kelamin: "",
      tgl_lahir: "",
      umur: "",
      alamat: "",
      no_hp: "",
      poli: "",
    },
    validationSchema: Yup.object({
      nama: Yup.string().required("Nama harus diisi"),
      no_identitas: Yup.number().required("Nomor identitias harus diisi"),
      no_bpjs: Yup.number().required("Nomor BPJS harus diisi"),
      jenis_kelamin: Yup.string().required("Jenis kelamin harus diisi"),
      tgl_lahir: Yup.date().required("Tanggal lahir harus diisi"),
      umur: Yup.number().required("Umur harus diisi"),
      alamat: Yup.string().required("Alamat harus diisi"),
      no_hp: Yup.string().required("Nomor Hp harus diisi"),
      poli: Yup.string().required("Poli Hp harus diisi"),
    }),
    onSubmit: handleSubmitPasienBaru,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mt-3">
        <label htmlFor="nama">Nama</label>
        <input
          type="text"
          name="nama"
          id="nama"
          className="input input-bordered w-full max-w-xs block"
          placeholder="Tuliskan Nama Lengkap"
          {...formik.getFieldProps("nama")}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500">{formik.errors.name}</div>
        ) : null}
      </div>
      <div className="mt-3">
        <label htmlFor="no_identitas">Nomor Identitas</label>
        <input
          type="text"
          name="no_identitas"
          id="no_identitas"
          className="input input-bordered w-full max-w-xs block"
          placeholder="Tuliskan nomor identitas"
        />
      </div>
      <div className="mt-3">
        <label htmlFor="no_identitas">Nomor BPJS</label>
        <input
          type="text"
          name="no_bpjs"
          id="no_bpjs"
          className="input input-bordered w-full max-w-xs block"
          placeholder="Tuliskan nomor BPJS"
        />
      </div>
      <div className="mt-3">
        <label htmlFor="no_identitas" className="mb-3">
          Jenis Kelamin
        </label>
        <div className="flex items-center my-2">
          <input
            type="radio"
            name="radio-1"
            id="laki"
            className="radio me-2"
            checked
          />
          <label htmlFor="laki">Laki-laki</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            name="radio-1"
            id="perempuan"
            className="radio me-2"
          />
          <label htmlFor="perempuan">Perempuan</label>
        </div>
      </div>
      <div className="mt-3">
        <label htmlFor="tgl_lahir">Tanggal Lahir</label>
        <input
          type="date"
          id="tgl_lahir"
          className="input input-bordered w-full max-w-xs block"
        />
      </div>
      <div className="mt-3">
        <label htmlFor="umur">Umur</label>
        <input
          type="text"
          className="input input-bordered w-full max-w-xs block"
          id="umur"
          placeholder="Tuliskan umur anda"
        />
      </div>
      <div className="mt-3">
        <label htmlFor="alamat">Alamat</label>
        <textarea
          name="alamat"
          id="alamat"
          cols="30"
          placeholder="Tuliskan alamat anda"
          className="textarea textarea-bordered block w-full max-w-xs"
        ></textarea>
      </div>
      <div className="mt-3">
        <label htmlFor="no_hp">Nomor Hp/WA</label>
        <input
          type="text"
          id="no_hp"
          placeholder="Tuliskan nomor HP/Whatsapp"
          className="input input-bordered w-full max-w-xs block"
        />
      </div>
      <div className="mt-3">
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={handleSelectChange}
        >
          <option disabled selected>
            Pilih Poli
          </option>
          <option value={"poli 1"}>Poli 1</option>
          <option value={"poli 2"}>Poli 2</option>
        </select>
      </div>
      <div className="modal-action">
        <button type="submit" className="btn btn-accent ">
          Daftar
        </button>
        <button
          className="btn"
          onClick={() => document.getElementById("modal_pasien").close()}
        >
          Close
        </button>
      </div>
    </form>
  );
}
