import { useState } from "react";
import { LOGIN_IMG_URL, SIGNUP_IMG_URL } from "../utils/constant";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { setUser } from "../services/reducers/userSlice";

const AuthForm = ({ modalName, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      let newValue = value;

      if (name === "username" || name === "firstname" || name === "lastname") {
        newValue = value
          .split("")
          .map((letter, index) => (index === 0 ? letter.toUpperCase() : letter))
          .join("");
      }

      const updated = {
        ...prev,
        [name]: newValue,
      };

      if (name === "firstname" && modalName === "signup") {
        updated.username = updated.firstname;
      }

      return updated;
    });
  };

  const handleSubmit = () => {
    dispatch(setUser(formData));
    onClose();
  };

  return (
    <div className="grid grid-cols-4 gap-2">
      <div className="col-span-2 space-y-4 py-2">
        {modalName === "signup" && (
          <div className="space-y-4">
            <input
              name="firstname"
              className="w-full text-sm text-gray-600 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
              placeholder="First Name"
              value={formData.firstname}
              onChange={handleChange}
            />
            <input
              name="lastname"
              className="w-full text-sm text-gray-600 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
        )}

        {modalName === "login" && (
          <input
            name="username"
            className="w-full text-sm text-gray-600 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
            type="text"
            placeholder="Username"
            onChange={handleChange}
            value={formData.username}
          />
        )}

        <input
          name="email"
          className="w-full text-sm text-gray-600 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
        />

        <div className="relative">
          <input
            name="password"
            className="w-full text-sm text-gray-600 p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
          />
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <PiEyeBold data-testid="pwdOpen" />
            ) : (
              <PiEyeClosedBold data-testid="pwdClose" />
            )}
          </div>
        </div>

        <button
          className="w-full bg-red-600 text-center text-white py-2 rounded-md hover:bg-red-700 transition cursor-pointer"
          onClick={handleSubmit}
        >
          {modalName === "login" ? "Login" : "Sign up"}
        </button>
      </div>

      <div className="col-span-2">
        <img
          src={modalName === "login" ? LOGIN_IMG_URL : SIGNUP_IMG_URL}
          alt={modalName === "login" ? "Login" : "Signup"}
        />
      </div>
    </div>
  );
};

export default AuthForm;
