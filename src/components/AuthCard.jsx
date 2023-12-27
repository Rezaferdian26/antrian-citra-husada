const AuthCard = ({ logo, children, className }) => (
  <div
    className={`min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 ${className}`}
  >
    <div className="sm:max-w-md w-full bg-[#57ccc3] rounded-lg shadow-lg overflow-hidden">
      {logo}
    </div>

    <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
      {children}
    </div>
  </div>
);

export default AuthCard;
