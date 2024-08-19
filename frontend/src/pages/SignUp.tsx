import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

type UserData = {
  userName: string;
  password: string;
  confirmPassword: string;
};

interface ISignUpInput extends HTMLInputElement {
  name: "userName" | "password" | "confirmPassword";
}

const SignUp = () => {
  const navigate = useNavigate();
  const userContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/signup", userData);
      navigate("/signin");
    } catch (err: any) {
      if (err.response.data.error) toast.error(err.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };
  const [userData, setUserData] = useState<UserData>({
    userName: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (userContext.user) return navigate("/");
  }, [userContext]);

  const handleChange = (e: React.ChangeEvent<ISignUpInput>) => {
    const newUserData: UserData = { ...userData };
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
            placeholder="Password"
            type="password"
            id="password"
            name="password"
          />
        </div>
        <div className="inputController">
          <input
            onChange={handleChange}
            placeholder="Confirm Password"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
          />
        </div>
        <button type="submit" disabled={isLoading}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
