import { useState } from "react";
import AuthForm from "./AuthForm";

const AuthModal = ({ isOpen, onClose, modalName, setModalName }) => {
  const isLogin = modalName === "login";

  if (!isOpen) return null;

  return (
    <div
      data-testid="authModal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/50"
    >
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-xl">
        <div className="flex justify-between items-baseline mb-4">
          <div>
            <p className="text-3xl font-thin font-serif text-black">
              {isLogin ? "Login" : "Sign up"}
            </p>
            <p className="text-sm font-serif text-black">
              or{" "}
              <span
                className="text-red-600 cursor-pointer hover:underline"
                onClick={() => setModalName(isLogin ? "signup" : "login")}
              >
                {isLogin ? "create an account" : "login to your account"}
              </span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 text-2xl pt-0 hover:text-red-600 cursor-pointer"
          >
            &times;
          </button>
        </div>
        <AuthForm modalName={modalName} onClose={onClose} />
      </div>
    </div>
  );
};

export default AuthModal;
