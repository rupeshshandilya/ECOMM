import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";

const Signup = () => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);

  
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const config = {headers: {"Content-Type": "multipart/form-data"}}

    const newForm = new FormData()
    newForm.append("file", avatar)
    newForm.append("name",name)
    newForm.append("email",email)
    newForm.append("password",password)

    axios.post(`${server}/user/create-user`, newForm,config).then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    })
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="bg-white p-10 rounded-lg shadow-md">
          <img
            src="https://demos.themeselection.com/sneat-mui-react-nextjs-admin-template/demo-1/images/pages/boy-with-rocket-light.png"
            alt="Boy with rocket"
            className="w-48 mx-auto"
          />
          <h2 className="text-2xl font-bold text-center mt-4 mb-2">
            Welcome to E-SHOP!
          </h2>
          <p className="text-sm text-center mb-8">
            Register your account to discover exclusive deals.
          </p>

          <form onSubmit={handleSubmit}>
            {/* ============================== Name ============================= */}
            <div className="mb-4">
              <label htmlFor="email" className="sr-only">
                Full Name
              </label>
              <input
                type="text"
                name="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Full Name"
              />
            </div>

            {/* ============================== Email ============================= */}
            <div className="mb-4">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Email"
              />
            </div>

            {/* ============================== Password ============================= */}
            <div className="relative mb-4">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type={visible ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                id="password"
                placeholder="Password"
              />
              {/* ============================== Password Visibility ============================= */}
              {visible ? (
                <AiOutlineEye
                  className="absolute inset-y-2 right-2"
                  size={25}
                  onClick={() => setVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute inset-y-2 right-2"
                  size={25}
                  onClick={() => setVisible(true)}
                />
              )}
            </div>

            {/* ============================== UPLOAD IMAGE ============================= */}
            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <div className="mt-2 flex items-center">
                <span className=" inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                    <span>Upload File</span>
                    <input type="file" name="avatar" id="file-input" accept=".jpeg,.jpg,.png" onChange={handleFileInputChange} className="sr-only"/>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            >
              Signup
            </button>
            {/* ============================== Create Account ============================= */}
            <p className="mt-4 text-sm text-center">
              Already have an account?
              <Link to="/login" className="text-blue-600 pl-1">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
