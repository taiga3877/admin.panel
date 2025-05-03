import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginin, setLoginin] = useState('');
  const [passwordin, setPasswordin] = useState('');
  const navigate = useNavigate();

  const loginSubmit = (event) => {
    event.preventDefault();

    fetch("https://back.ifly.com.uz/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: loginin,
        password: passwordin,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (item?.success) {
          toast.success(item?.data?.message);
          // Сохранение токенов
          localStorage.setItem("token", item?.data?.access_token);
          localStorage.setItem("refresh_token", item?.data?.refresh_token);
          navigate("/homepage");
        } else {
          toast.error(item?.message?.message);
        }
      })
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen m-0 font-sans leading-relaxed bg-gray-100">
      <div className="w-[500px] p-5 bg-white rounded-[15px] shadow-lg transition-transform text-center">
        <h1 className="text-3xl font-bold text-green-500 mb-2">GeeksforGeeks</h1>
        <h3 className="text-lg text-gray-700 mb-6">Enter your login credentials</h3>

        <form className="w-full" onSubmit={loginSubmit}>
          <label htmlFor="first" className="block w-full text-left text-gray-700 font-bold mt-2 mb-1">
            Username:
          </label>
          <input
            minLength={3}
            onChange={(e) => setLoginin(e.target.value)}
            type="text"
            id="first"
            name="first"
            placeholder="Enter your Username"
            required
            className="block w-full mb-4 p-2.5 border border-gray-300 rounded-md box-border"
          />

          <label htmlFor="password" className="block w-full text-left text-gray-700 font-bold mt-2 mb-1">
            Password:
          </label>
          <input
            minLength={3}
            onChange={(e) => setPasswordin(e.target.value)}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your Password"
            required
            className="block w-full mb-4 p-2.5 border border-gray-300 rounded-md box-border"
          />

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="w-full p-4 mt-4 mb-4 text-white bg-green-500 rounded-lg text-lg hover:bg-green-600 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
