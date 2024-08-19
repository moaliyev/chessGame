import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data }: { data: string } = await axios.post(
        "https://chess-game-five-eta.vercel.app/api/room",
        {},
        { withCredentials: true }
      );
      navigate(`/${data}`);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!userContext.user) return navigate("/signup");
  }, [userContext]);

  return (
    <div className="heroContainer">
      <h3 className="title">Welcome, {userContext?.user?.userName}!</h3>
      <form onSubmit={handleSubmit}>
        <button className="createRoom" type="submit" disabled={isLoading}>
          Create A Room
        </button>
      </form>
    </div>
  );
};

export default Home;
