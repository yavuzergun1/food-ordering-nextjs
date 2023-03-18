const Input = (props) => {
  const { type, placeholder, ...inputProps } = props;
  return (
    <div className="w-full">
      <label className="relative block cursor-text w-full">
        <input
          type={type}
          className={`h-14 w-full border focus:border-primary outline-none px-4 peer ${
            type !== "datetime-local" && "pt-2"
          }`}
          required
          {...inputProps}
        />
        {type !== "datetime-local" && (
          <span className="absolute top-0 left-0 px-4 font-josefin text-sm flex items-center h-full peer-focus:h-7 peer-focus:text-xs peer-valid:h-7 peer-valid:text-xs transition-all text-primary peer-focus:text-slate-500 ">
            {placeholder}
          </span>
        )}
      </label>
    </div>
  );
};

export default Input;
