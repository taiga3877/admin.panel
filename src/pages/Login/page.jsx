import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch("https://back.ifly.com.uz/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const item = await res.json();
      if (item?.success) {
        toast.success(item?.data?.message);
        localStorage.setItem("token", item?.data?.access_token);
        localStorage.setItem("refresh_token", item?.data?.refresh_token);
        navigate("/homepage");
      } else {
        toast.error(item?.message?.message || "Login failed");
      }
    } catch {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  // Функция для создания и обновления частиц
  useEffect(() => {
    const canvas = document.getElementById('particlesCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    function createParticle(e) {
      const xPos = e.x;
      const yPos = e.y;

      for (let i = 0; i < 10; i++) {
        particles.push(new Particle(xPos, yPos));
      }
    }

    function Particle(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 5 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
      this.color = "rgba(255, 255, 255, 0.7)";
    }

    Particle.prototype.update = function () {
      this.x += this.speedX;
      this.y += this.speedY;
      this.size *= 0.96;
    };

    Particle.prototype.draw = function () {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    };

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].size <= 0.3) {
          particles.splice(i, 1);
          i--;
        }
      }

      requestAnimationFrame(animateParticles);
    }

    canvas.addEventListener('mousemove', createParticle);
    animateParticles();
  }, []);

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-black">
      {/* Анимированный фон с частицами */}
      <canvas id="particlesCanvas" className="absolute inset-0 z-0"></canvas>
      <motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="relative z-10 w-full max-w-md backdrop-blur-md bg-white/30 border border-white/50 shadow-lg rounded-2xl p-8 transform transition-all duration-500 hover:scale-105"
>
  <h1 className="text-5xl font-extrabold text-center text-gradient mb-4">IFLY Login</h1>
  <p className="text-center text-gray-300 mb-8 text-lg">Welcome back! Sign in to your account</p>

  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
    {/* Username Field */}
    <div className="relative">
      <input
        type="text"
        {...register("login", { required: "Username is required" })}
        className="peer w-full px-5 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-transparent focus:outline-none focus:ring-4 focus:ring-green-500 transition-all duration-300"
        placeholder="Username"
        aria-label="Username"
      />
     
      {errors.login && (
        <span className="text-red-500 text-sm mt-1">{errors.login.message}</span>
      )}
    </div>

    {/* Password Field */}
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        {...register("password", { required: "Password is required" })}
        className="peer w-full px-5 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-transparent focus:outline-none focus:ring-4 focus:ring-green-500 transition-all duration-300"
        placeholder="Password"
        aria-label="Password"
      />
     
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute top-4 right-5 text-gray-400"
        aria-label="Toggle password visibility"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
      {errors.password && (
        <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>
      )}
    </div>

    {/* Submit Button */}
    <motion.button
      type="submit"
      whileTap={{ scale: 0.95 }}
      disabled={loading}
      className="w-full py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:bg-gradient-to-l"
    >
      {loading ? "Signing in..." : "Sign In"}
    </motion.button>
  </form>
</motion.div>



    </div>
  );
};

export default Login;
