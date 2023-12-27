import ApplicationLogo from "@/components/ApplicationLogo";
import AuthCard from "@/components/AuthCard";
import Button from "@/components/Button";
import GuestLayout from "@/components/Layouts/GuestLayout";
import Input from "@/components/Input";
import InputError from "@/components/InputError";
import Label from "@/components/Label";
import Link from "next/link";
import { useAuth } from "@/hooks/auth";
import { useState } from "react";
import Image from "next/image";

const Registrasi = () => {
  const { register } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [tglLahir, setTglLahir] = useState("");
  const [umur, setUmur] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noHp, setNoHp] = useState("");
  const [noIdentitasPasien, setNoIdentitasPasien] = useState("");
  const [noBpjsPasien, setNoBpjsPasien] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const submitForm = (event) => {
    event.preventDefault();
    setLoading(true);

    register({
      name,
      username,
      password,
      password_confirmation: passwordConfirmation,
      jenis_kelamin: jenisKelamin,
      tgl_lahir: tglLahir,
      umur,
      alamat,
      no_hp: noHp,
      no_identitas_pasien: noIdentitasPasien,
      no_bpjs_pasien: noBpjsPasien,
      setErrors,
      setLoading,
    });
  };

  return (
    <GuestLayout>
      <AuthCard
        className={"mt-20"}
        logo={
          <Link href="/">
            <Image
              src={"/logo.png"}
              width={300}
              height={200}
              alt="Logo Citra Husada"
              className="m-auto"
            />
          </Link>
        }
      >
        <h1 className="text-center font-bold text-lg">Daftar pasien</h1>
        <form onSubmit={submitForm}>
          {/* Name */}
          <div>
            <Label htmlFor="name">Name</Label>

            <Input
              id="name"
              type="text"
              value={name}
              className="block mt-1 w-full input input-bordered"
              onChange={(event) => setName(event.target.value)}
              required
              autoFocus
            />

            <InputError messages={errors.name} className="mt-2" />
          </div>

          {/* Username */}
          <div className="mt-4">
            <Label htmlFor="email">Username</Label>

            <Input
              id="username"
              type="text"
              value={username}
              className="block mt-1 w-full input input-bordered"
              onChange={(event) => setUsername(event.target.value)}
              required
            />

            <InputError messages={errors.username} className="mt-2" />
          </div>

          {/* Password */}
          <div className="mt-4">
            <Label htmlFor="password">Password</Label>

            <Input
              id="password"
              type="password"
              value={password}
              className="block mt-1 w-full input input-bordered"
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="new-password"
            />

            <InputError messages={errors.password} className="mt-2" />
          </div>

          {/* Confirm Password */}
          <div className="mt-4">
            <Label htmlFor="passwordConfirmation">Confirm Password</Label>

            <Input
              id="passwordConfirmation"
              type="password"
              value={passwordConfirmation}
              className="block mt-1 w-full input input-bordered"
              onChange={(event) => setPasswordConfirmation(event.target.value)}
              required
            />

            <InputError
              messages={errors.password_confirmation}
              className="mt-2"
            />
          </div>
          <div className="mt-4">
            <Label htmlFor="laki_laki">Jenis Kelamin</Label>
            <div>
              <input
                type="radio"
                name="jenis_kelamin"
                value="Laki-laki"
                id="laki_laki"
                checked={jenisKelamin === "Laki-laki"}
                className="me-2"
                onChange={(e) => setJenisKelamin(e.target.value)}
              />
              <label htmlFor="laki_laki">Laki-laki</label>
            </div>
            <div>
              <input
                type="radio"
                name="jenis_kelamin"
                value="Perempuan"
                id="perempuan"
                className="me-2"
                checked={jenisKelamin === "Perempuan"}
                onChange={(e) => setJenisKelamin(e.target.value)}
              />
              <label htmlFor="perempuan">Perempuan</label>
            </div>
            <InputError messages={errors.jenis_kelamin} className="mt-2" />
          </div>
          <div className="mt-4">
            <label htmlFor="tgl_lahir">Tanggal Lahir</label>
            <input
              type="date"
              name="tgl_lahir"
              id="tgl_lahir"
              value={tglLahir}
              className="block mt-1 w-full input input-bordered"
              onChange={(e) => setTglLahir(e.target.value)}
            />
            <InputError messages={errors.tgl_lahir} className="mt-2" />
          </div>
          <div className="mt-4">
            <label htmlFor="umur">Umur</label>
            <input
              type="text"
              name="umur"
              id="umur"
              value={umur}
              className="block mt-1 w-full input input-bordered"
              onChange={(e) => setUmur(e.target.value)}
            />
            <InputError messages={errors.umur} className="mt-2" />
          </div>
          <div className="mt-4">
            <label htmlFor="alamat">Alamat</label>
            <input
              type="text"
              id="alamat"
              name="alamat"
              value={alamat}
              className="block mt-1 w-full input input-bordered"
              onChange={(e) => setAlamat(e.target.value)}
            />
            <InputError messages={errors.alamat} className="mt-2" />
          </div>
          <div className="mt-4">
            <label htmlFor="noHp">No Hp/Wa</label>
            <input
              type="text"
              name="noHp"
              id="noHp"
              value={noHp}
              className="block mt-1 w-full input input-bordered"
              onChange={(e) => setNoHp(e.target.value)}
            />
            <InputError messages={errors.no_hp} className="mt-2" />
          </div>
          <div className="mt-4">
            <label htmlFor="noIdentitasPasien">NIK</label>
            <input
              type="text"
              name="noIdentitasPasien"
              id="noIdentitasPasien"
              value={noIdentitasPasien}
              className="block mt-1 w-full input input-bordered"
              onChange={(e) => setNoIdentitasPasien(e.target.value)}
            />
            <InputError
              messages={errors.no_identitas_pasien}
              className="mt-2"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="noBpjsPasien">No BPJS</label>
            <input
              type="text"
              name="noBpjsPasien"
              id="noBpjsPasien"
              value={noBpjsPasien}
              className="block mt-1 w-full input input-bordered"
              onChange={(e) => setNoBpjsPasien(e.target.value)}
            />
            <InputError messages={errors.no_bpjs_pasien} className="mt-2" />
          </div>
          <div className="flex items-center justify-end mt-4">
            <Link
              href="/login"
              className="underline text-sm text-gray-600 hover:text-gray-900"
            >
              Already registered?
            </Link>

            <Button className="ml-4" disabled={loading}>
              Register{" "}
              {loading && (
                <span className="loading loading-spinner loading-md"></span>
              )}
            </Button>
          </div>
        </form>
      </AuthCard>
    </GuestLayout>
  );
};

export default Registrasi;
