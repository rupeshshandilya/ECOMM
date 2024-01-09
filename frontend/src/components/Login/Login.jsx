import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [visible, setVisible] = useState(false);

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
          Login your account to discover exclusive deals.
          </p>

          <form>
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
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  name="remember-me"
                  className="h-4 w-4 text-blue-600"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 text-sm text-gray-600"
                >
                  Remember Me
                </label>
              </div>

              {/* ============================== Forgot Password ============================= */}
              <a
                href=".forgot-password"
                className="text-sm text-blue-600 cursor-pointer underline-none"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            >
              Login
            </button>
            {/* ============================== Create Account ============================= */}
            <p className="mt-4 text-sm text-center">
              New on our platform?
              <Link to="/signup" className="text-blue-600 pl-1">
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
