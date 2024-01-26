import moment from "moment";

export default function RekapitulasiPrint({ innerRef, dataPrint }) {
  return (
    <div ref={innerRef}>
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Dokter</th>
            <th>Jumlah Pasien</th>
            <th>Tanggal</th>
          </tr>
        </thead>
        <tbody>
          {dataPrint?.map((dokter, index) => (
            <tr key={dokter.id_dokter}>
              <td>{index + 1}</td>
              <td>{dokter.dokter}</td>
              <td>{dokter.total_pasien}</td>
              <td>{moment(dokter.tgl_kun).format("DD-MM-YYYY")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
