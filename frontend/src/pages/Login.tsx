import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

interface ISignUpInput extends HTMLInputElement {
  name: "userName" | "password";
}

const Login = () => {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://chess-game-five-eta.vercel.app/api/auth/login",
        userData,
        { withCredentials: true }
      );
      localStorage.setItem("user", JSON.stringify(data));
      userContext.setUser(data);
      navigate("/");
    } catch (err: any) {
      if (err.response.data.error) toast.error(err.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
  });

  useEffect(() => {
    if (userContext.user) return navigate("/");
  }, [userContext]);

  const handleChange = (e: React.ChangeEvent<ISignUpInput>) => {
    const newUserData = { ...userData };
    newUserData[e.target.name] = e.target.value;
    setUserData(newUserData);
  };

  return (
    <div className="loginContainer">
      <h3 className="title">Enter your username and a password</h3>
      <form onSubmit={handleSubmit}>
        <div className="inputController">
          <input
            onChange={handleChange}
            type="text"
            placeholder="Username"
            id="userName"
            name="userName"
          />
        </div>
        <div className="inputController">
          <input
            onChange={handleChange}
            type="password"
            placeholder="Password"
            id="password"
            name="password"
          />
        </div>
        <button type="submit" disabled={isLoading}>
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
