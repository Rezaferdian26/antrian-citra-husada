import AppLayout from "@/components/Layouts/AppLayout";
import axios from "@/lib/axios";
import Head from "next/head";
import useSWR from "swr";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import RekapitulasiPrint from "@/components/Print/RekapitulasiPrint";
import Button from "@/components/Button";
import { FaPrint } from "react-icons/fa";

export default function Rekapitulasi() {
  const [startDate, setStartDate] = useState(new Date());
  const [data, setData] = useState([]);

  const dateChange = (date, startDate) => {
    let newDate = date;
    newDate.setDate(newDate.getDate() + 1);
    getRekapitulisasi(newDate.toISOString().split("T")[0]);
    date.setDate(date.getDate() - 1);
    setStartDate(date);
  };

  const getRekapitulisasi = async (date) => {
    const rekap = await axios.get(`api/operator/rekapitulasi/${date}`);
    setData(rekap.data);
  };

  const componentPrintRef = useRef();

  const reactToPrintContent = useCallback(() => {
    return componentPrintRef.current;
  }, [componentPrintRef.current]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "Rekapitulasi Data",
    removeAfterPrint: true,
  });

  useEffect(() => {
    getRekapitulisasi(startDate.toISOString().split("T")[0]);
  }, []);
  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Rekapitulasi
        </h2>
      }
    >
      <Head>
        <title>Citra Husada - Rekapitulasi</title>
      </Head>

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="flex justify-between">
                <DatePicker
                  locale={"id"}
                  selected={startDate}
                  onChange={(date) => dateChange(date, startDate)}
                  className="input input-bordered"
                />
                <Button onClick={handlePrint} disabled={data.length === 0}>
                  <FaPrint /> Print
                </Button>
              </div>
              <RekapitulasiPrint
                innerRef={componentPrintRef}
                dataPrint={data}
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
