const Button = ({ type = "submit", className, ...props }) => (
  <button
    type={type}
    className={`${className} inline-flex items-center px-4 py-2 btn btn-accent border border-transparent rounded-md font-semibold text-xs  uppercase tracking-widest disabled:opacity-75 disabled:btn-accent transition ease-in-out duration-150`}
    {...props}
  />
);

export default Button;
