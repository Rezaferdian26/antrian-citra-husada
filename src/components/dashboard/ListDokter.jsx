import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function ListDokter() {
  const { data: dokters } = useSWR("api/dokter", fetcher);
  return (
    <>
      <h1 className="text-center text-accent font-bold text-2xl mb-5">
        Daftar Nama Dokter
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Nama Poli</th>
              <th>Nama Dokter</th>
              <th>Jadwal Dokter</th>
            </tr>
          </thead>
          <tbody>
            {dokters?.data?.map((dokter) => (
              <tr key={dokter.id}>
                <td>{dokter.poli?.pilpol}</td>
                <td>{dokter.name}</td>
                <td>{dokter.jadwal_dokter}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
