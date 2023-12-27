export default function RekamMedisPrint({ innerRef, dataPrint }) {
  return (
    <div ref={innerRef}>
      <div className="p-4 bg-white">
        <div className="text-center font-bold">
          <h1 className="uppercase text-xl">Rekam Medis Pasien</h1>
          <h2 className="capitalize">
            Jalan Prof. A. Majid Ibrahim Lampeudeu Baroh Tijue, Pidie
          </h2>
          <h2 className="uppercase">Rumah Sakit citra husada sigli</h2>
        </div>

        <div className="text-right my-3">
          <p>No Rekam : {dataPrint?.no_rekam}</p>
        </div>

        <table>
          <tbody>
            <tr className="mb-3">
              <td>Nama Pasien</td>
              <td>:</td>
              <td>{dataPrint?.pasien}</td>
            </tr>
            <tr className="mb-3">
              <td>Tanggal Lahir</td>
              <td>:</td>
              <td>{dataPrint?.tgl_lahir_pasien}</td>
            </tr>
            <tr className="mb-3">
              <td>Alamat</td>
              <td>:</td>
              <td>{dataPrint?.alamat}</td>
            </tr>
            <tr className="mb-3">
              <td>Dokter</td>
              <td>:</td>
              <td>{dataPrint?.dokter}</td>
            </tr>
            <tr className="mb-3">
              <td>Jenis Kelamin</td>
              <td>:</td>
              <td>{dataPrint?.jenis_kelamin}</td>
            </tr>
            <tr className="mb-3">
              <td>Tanggal Kunjungan</td>
              <td>:</td>
              <td>{dataPrint?.tgl_kun}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
