import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    // formData içindeki verileri kullanarak backend'e POST isteği gönderin.
    try {
      const response = await fetch(
        "http://localhost:3000/backend-register-endpoint",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        navigate("/properties");
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error("Kayıt sırasında bir hata oluştu:", error);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // formData içindeki verileri kullanarak backend'e POST isteği gönderin
      const response = await fetch("http://localhost:3000/backend-login-endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Başarılı giriş durumunda başka bir sayfaya yönlendirin veya başka bir işlem yapın
        navigate("/properties");
      } else {
        // Başarısız giriş durumunda hata mesajını gösterin
        const data = await response.json();
        alert(data.message); // veya başka bir uygun şekilde gösterme yöntemi kullanın
      }
    } catch (error) {
      // Hata durumları için uygun işlemleri yapın
      console.error("Giriş sırasında bir hata oluştu:", error);
    }
  };

  return (
    <div
      style={{
        margin: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",

        background: "linear-gradient(to bottom, #102770, #302b63, #24243e)",
      }}
      className="login-container"
    >
      {" "}
      <div className="main">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{
              borderRadius: "8px",
              marginTop: "16px",
            }}
            src="logo.jpg"
          ></img>
        </div>

        <input type="checkbox" id="chk" aria-hidden="true" />

        <div className="signup">
          <form onSubmit={handleRegistration}>
            <label
              style={{
                color: "#fff",
                fontSize: "32px",
                justifyContent: "center",
                display: "flex",
                fontWeight: "bold",
                cursor: "pointer",
                transition: ".5s ease-in-out",
              }}
              htmlFor="chk"
              aria-hidden="true"
            >
              Sign up
            </label>
            <input
              onChange={handleInputChange}
              type="text"
              name="username"
              placeholder="User name"
              required=""
            />
            <input
              onChange={handleInputChange}
              type="email"
              name="email"
              placeholder="Email"
              required=""
            />
            <input
              onChange={handleInputChange}
              type="password"
              name="password"
              placeholder="Password"
              required=""
            />
            <button>Sign up</button>
          </form>
        </div>

        <div  className="login">
          <form style={{
          marginTop:'40px'
        }} onSubmit={handleLogin}>
            <label
              style={{
                color: "#573b8a",
                fontSize: "2.3em",
                justifyContent: "center",
                display: "flex",
                fontWeight: "bold",
                cursor: "pointer",
                transition: ".5s ease-in-out",
              }}
              htmlFor="chk"
              aria-hidden="true"
            >
              Login
            </label>
            <input
              onChange={handleInputChange}
              type="email"
              name="email"
              placeholder="Email"
              required=""
            />
            <input
              onChange={handleInputChange}
              type="password"
              name="password"
              placeholder="Password"
              required=""
            />
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
