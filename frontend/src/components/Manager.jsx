import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  useEffect(() => {
    let passwords = localStorage.getItem("password");

    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savePass = () => {
    if (!form.site || !form.username || !form.password) {
      toast.error("All fields are required!", { theme: "dark" });
      return;
    }

    setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    localStorage.setItem(
      "password",
      JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
    );
    toast.success("Password Saved", { theme: "dark" });

    setForm({ site: "", username: "", password: "" });
  };

  const deletePass = (id) => {
    let c = confirm("Do you really want to delete this password ?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "password",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
      toast.success("Password Deleted", { theme: "dark" });
    }
  };

  const editPass = (id) => {
    setForm(passwordArray.filter((i) => i.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
      </div>
      <div className="px-2 md:px-0    mycontainer max-w-4xl   ">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-700">&lt;</span>
          Secure<span className="text-green-500">NEST/&gt;</span>
        </h1>
        <p className="text-green-700 text-lg text-center">
          Your Own password Manager
        </p>
        <div className="text-slate-700 flex flex-col items-center p-4  gap-8">
          <input
            onChange={handleChange}
            value={form.site}
            placeholder="Enter URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text "
            name="site"
            id=""
          ></input>
          <div className="flex flex-col md:flex-row items-center  w-full gap-8 justify-between">
            <input
              onChange={handleChange}
              value={form.username}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              name="username"
              type="text"
            ></input>
            <div className="relative w-full">
              <input
                type={show ? "text" : "password"}
                onChange={handleChange}
                value={form.password}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                name="password"
              ></input>
              <span
                className="absolute right-[3px] top-[3px] "
                onClick={() => {
                  if (show === false) {
                    setShow(true);
                  } else {
                    setShow(false);
                  }
                }}
              >
                {show ? (
                  <lord-icon
                    src="https://cdn.lordicon.com/fmjvulyw.json"
                    trigger="hover"
                    state="hover-cross"
                    colors="primary:#110a5c,secondary:#ebe6ef,tertiary:#3a3347,quaternary:#9cf4a7,quinary:#f9c9c0,senary:#f24c00"
                  ></lord-icon>
                ) : (
                  <lord-icon
                    className="p-1 m-1"
                    src="https://cdn.lordicon.com/fmjvulyw.json"
                    trigger="hover"
                    colors="primary:#110a5c,secondary:#ebe6ef,tertiary:#3a3347,quaternary:#9cf4a7,quinary:#f9c9c0,senary:#f24c00"
                  ></lord-icon>
                )}
              </span>
            </div>
          </div>
          <button
            className="gap-2 flex justify-center items-center bg-white rounded-full px-8 py-2 w-fit hover:bg-slate-300 border  border-green-800"
            onClick={savePass}
          >
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-3xl  py-4"> Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to show </div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full overflow-hidden rounded-md min-w-8xl">
              <thead className=" bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Passwords</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center w-32 py-2 border border-white max-w-xs truncate  ">
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>
                        <lord-icon
                          onClick={() => {
                            copyText(item.site);
                          }}
                          className={"cursor-pointer "}
                          src="https://cdn.lordicon.com/fjvfsqea.json"
                          trigger="hover"
                          stroke="bold"
                          style={{
                            width: "20px",
                            height: "16px",
                            cursor: "pointer",
                            paddingTop: "3px",
                            paddingLeft: "3px",
                          }}
                        ></lord-icon>
                      </td>
                      <td className="text-center w-32 py-2 border border-white  max-w-xs truncate">
                        {item.username}
                        <lord-icon
                          onClick={() => {
                            copyText(item.username);
                          }}
                          className={"cursor-pointer "}
                          src="https://cdn.lordicon.com/fjvfsqea.json"
                          trigger="hover"
                          stroke="bold"
                          style={{
                            width: "20px",
                            height: "16px",
                            cursor: "pointer",
                            paddingTop: "3px",
                            paddingLeft: "3px",
                          }}
                        ></lord-icon>
                      </td>
                      <td className="text-center w-32 py-2 border border-white  max-w-xs truncate ">
                        {item.password}

                        <lord-icon
                          onClick={() => {
                            copyText(item.password);
                          }}
                          className={"cursor-pointer "}
                          src="https://cdn.lordicon.com/fjvfsqea.json"
                          trigger="hover"
                          stroke="bold"
                          style={{
                            width: "20px",
                            height: "16px",
                            cursor: "pointer",
                            paddingTop: "3px",
                            paddingLeft: "3px",
                          }}
                        ></lord-icon>
                      </td>
                      <td className="text-center w-32 py-2 border border-white  max-w-xs truncate ">
                        <span
                          className="mx-1"
                          onClick={() => {
                            editPass(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/exymduqj.json"
                            trigger="hover"
                            stroke="bold"
                            state="hover-line"
                            style={{
                              width: "25px",
                              height: "25px",
                              cursor: "pointer",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                          ></lord-icon>
                        </span>
                        <span
                          className="mx-1"
                          onClick={() => {
                            deletePass(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/hwjcdycb.json"
                            trigger="morph"
                            stroke="bold"
                            state="morph-trash-in"
                            style={{
                              width: "25px",
                              height: "25px",
                              cursor: "pointer",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
