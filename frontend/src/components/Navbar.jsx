const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white ">
      <div className="mycontainer flex justify-between items-center px-4 h-14 py-5">
        <div className="pl-10 logo font-bold text-white text-2xl">
          <span className="text-green-700">&lt;</span>
          Secure<span className="text-green-500">NEST/&gt;</span>
        </div>
        <ul>
          <li className="flex gap-4"></li>
        </ul>
        <div className="pr-10">
          <a href="https://github.com/adiifier/SecureNEST" target="_blank">
            <lord-icon
              src="https://cdn.lordicon.com/yedgackm.json"
              trigger="hover"
              colors="primary:#110a5c,secondary:#9cf4a7,tertiary:#3a3347"
            ></lord-icon>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
