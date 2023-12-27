export default function FormDokter() {
  const handleSubmitDokter = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmitDokter}>
      <div className="mt-3">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          className="input input-bordered block w-full max-w-xs mt-2"
          placeholder="Masukkan username "
        />
      </div>
      <div className="mt-3">
        <label htmlFor="username">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="input input-bordered block w-full max-w-xs mt-2"
          placeholder="Masukkan password "
        />
      </div>

      <div className="modal-action">
        <button type="submit" className="btn btn-accent ">
          Masuk
        </button>
        {/* <form method="dialog">
          <button className="btn">Close</button>
        </form> */}
      </div>
    </form>
  );
}
