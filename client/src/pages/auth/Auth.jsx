import { useState } from "react";
import Image from "../../components/image/Image";
import "./Auth.css";
import apiRequest from "../../utils/apiRequest";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../utils/authStore";

const Auth = () => {
  const { setCurrentUser } = useAuthStore();
  const navigate = useNavigate();
  const [isRegister, setIsregister] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log("Form Data ", data);
    try {
      const res = await apiRequest.post(
        `/users/auth/${isRegister ? "register" : "login"}`,
        data
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setCurrentUser(res.data);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }

      console.log("Response ", res);
    } catch (error) {
      setError(error.message);
      console.log("Error submiting register form ", error);
    }
  };

  return (
    <div className="authPage">
      <div className="authContainer">
        <Image path="/general/logo.png" w={36} h={36} alt={""} className={""} />
        <h1 className="">
          {isRegister ? "Create an account" : "Login to your account"}
        </h1>
        {isRegister ? (
          <form key={"register"} className="" onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="username" className="">
                Username
              </label>
              <input
                type=" text"
                className=""
                placeholder="Enter your username"
                required
                name="username"
                id="username"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="displayName" className="">
                Name
              </label>
              <input
                type=" text"
                className=""
                placeholder="Enter your name"
                required
                name="displayName"
                id="displayName"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="email" className="">
                Email
              </label>
              <input
                type=" email"
                className=""
                placeholder="Enter your email"
                required
                name="email"
                id="email"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="password" className="">
                Password
              </label>
              <input
                type=" password"
                className=""
                placeholder="Enter your password"
                required
                name="password"
                id="password"
              />
            </div>
            <button type="submit">Register</button>
            <p onClick={() => setIsregister((prev) => !prev)} className="">
              Do you have account? <b className="">Login</b>
            </p>
            {error && <p className="error">{error}</p>}
          </form>
        ) : (
          <form key={"login"} className="" onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="email" className="">
                Email
              </label>
              <input
                type=" email"
                className=""
                placeholder="Enter your email"
                required
                name="email"
                id="email"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="password" className="">
                Password
              </label>
              <input
                type=" password"
                className=""
                placeholder="Enter your password"
                required
                name="password"
                id="password"
              />
            </div>
            <button type="submit">Login</button>
            <p onClick={() => setIsregister(true)} className="">
              Don&apos;t have an account? <b className="">Register</b>
            </p>
            {error && <p className="error">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
