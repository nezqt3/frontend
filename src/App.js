import { useCallback, useState, useEffect } from "react";
import Form from "./components/Form";
import MainPage from "./components/MainPage";
import ReferalLink from "./components/ReferalLink";
import "./styles/index.css";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import Account from "./components/Account";

function App() {
  const [user, setUser] = useState(0);
  const [loading, setLoading] = useState(true); // состояние лоадера

  const fetchData = useCallback(() => {
    const user = window.Telegram.WebApp.initDataUnsafe.user;
    setUser({
      id: user.id,
      first_name: user.first_name,
      username: user.username,
      photo_url: user.photo_url,
    });
  }, [setUser]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage fetchData={fetchData} />} />
        <Route path="/order" element={<Form />} />
        <Route path="/referal" element={<ReferalLink user={user} />} />
        <Route path="/account" element={<Account user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
