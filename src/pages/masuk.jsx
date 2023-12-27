import GuestLayout from "@/components/Layouts/GuestLayout";
import FormDokter from "@/components/masuk/FormDokter";
import FormOperator from "@/components/masuk/FormOperator";
import FormPasienBaru from "@/components/masuk/FormPasienBaru";
import FormPasienLama from "@/components/masuk/FormPasienLama";
import { useAuth } from "@/hooks/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Masuk() {
  const [pasien, setPasien] = useState("");
  const { user } = useAuth();
  const router = useRouter();
  const handleSelectChange = (e) => {
    if (e.target.value === "lama") {
      setPasien("lama");
    }
    if (e.target.value === "baru") {
      setPasien("baru");
    }
  };

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [router, user]);

  return (
    <GuestLayout>
      <div className="h-screen flex flex-col sm:flex-row items-center justify-center">
        <div className="shadow-lg rounded-lg bg-white p-3 m-5">
          <Image
            src="/pasien.jpg"
            width={200}
            height={200}
            alt="Gambar Pasien"
            className=""
          />
          <h1 className="text-center text-accent font-bold mb-3">Pasien</h1>
          <div className="flex justify-center">
            <button
              className="btn btn-accent"
              onClick={() =>
                document.getElementById("modal_pasien").showModal()
              }
            >
              Masuk
            </button>
          </div>
        </div>

        <dialog id="modal_pasien" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Daftar dulu ya!</h3>
            <div className="py-4">
              <select
                className="select select-bordered w-full max-w-xs"
                onChange={handleSelectChange}
              >
                <option value={"lama"}>Pasien lama</option>
                <option value={"baru"}>Pasien Baru</option>
              </select>

              {pasien === "baru" ? <FormPasienBaru /> : <FormPasienLama />}
            </div>
          </div>
        </dialog>

        <div className="shadow rounded-lg bg-white p-3 m-5">
          <Image
            src="/operator.jpg"
            width={200}
            height={200}
            alt="Gambar Operator"
          />
          <h1 className="text-center text-accent font-bold mb-3">Operator</h1>
          <div className="flex justify-center">
            <button
              className="btn btn-accent"
              onClick={() =>
                document.getElementById("modal_operator").showModal()
              }
            >
              Masuk
            </button>
          </div>
        </div>

        <dialog id="modal_operator" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Masuk Sebagai Operator!</h3>
            <div className="py-4">
              <FormOperator />
            </div>
          </div>
        </dialog>

        <div className="shadow rounded-lg bg-white p-3 m-5">
          <Image
            src="/doktor.jpg"
            width={200}
            height={200}
            alt="Gambar Doktor"
          />
          <h1 className="text-center text-accent font-bold mb-3">Dokter</h1>
          <div className="flex justify-center">
            <button
              className="btn btn-accent"
              onClick={() =>
                document.getElementById("modal_dokter").showModal()
              }
            >
              Masuk
            </button>
          </div>
        </div>

        <dialog id="modal_dokter" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Masuk Sebagai Dokter!</h3>
            <div className="py-4">
              <FormDokter />
            </div>
          </div>
        </dialog>
      </div>
    </GuestLayout>
  );
}
