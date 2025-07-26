import { useState } from "react";
import { useAuth } from "./context/authContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const FormData = new URLSearchParams();

    FormData.append("username", email);
    FormData.append("password", password);

    let data;
    try {
      const response = await fetch(`${baseUrl}token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: FormData,
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Incorect email or password");
        }
        throw new Error(`Login failed with status: ${response.status}`);
      }

      data = await response.json();
    } catch (error) {
      console.error("Login API call failed: ", error);
      throw error;
    }

    setToken(data.access_token);
    navigate("/");
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <label>
        Email
        <br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button>login</button>
    </form>
  );
}

export default LoginPage;
