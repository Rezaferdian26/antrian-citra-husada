export default function FormPasienLama() {
  const handleSubmitPasienLama = (e) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <form onSubmit={handleSubmitPasienLama}>
      <div className="mt-3">
        <label htmlFor="nomor">Nomor Rekam</label>
        <input
          type="text"
          name="nomor"
          id="nomor"
          className="input input-bordered block w-full max-w-xs"
          placeholder="Tuliskan No rekam "
        />
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
