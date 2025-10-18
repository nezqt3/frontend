import { useCallback, useState, useEffect } from "react";
import Form from "./components/Form";
import MainPage from "./components/MainPage";
import ReferalLink from "./components/ReferalLink";
import "./styles/index.css";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import Account from "./components/Account";

function App() {
  const [user, setUser] = useState(null);
  const [referralLink, setReferralLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [referrals, setRefferals] = useState([]);
  const [sumPoints, setSumPoints] = useState(0);

  const fetchOrders = useCallback(async (userId) => {
    if (!userId) return;

    const url = `https://rupl.pythonanywhere.com/get_purchases?id=${userId}`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Ошибка HTTP ${response.status}`);
      }

      const json = await response.json();
      const parsed = Array.isArray(json) ? json : Object.values(json);

      setOrders(parsed);
    } catch (err) {
      console.log("Ошибка при загрузке заказов:", err);
    }
  }, []);

  const fetchReferrals = useCallback(async (userId) => {
    if (!userId) return;

    const url = `https://rupl.pythonanywhere.com/points/history?id=${userId}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Ошибка HTTP ${response.status}`);

      const json = await response.json();
      setRefferals(Array.isArray(json) ? json : json.data || []);
      console.log(json);
    } catch (err) {
      console.log("Ошибка при загрузке заказов:", err);
    }
  }, []);

  const getUserInfo = useCallback(async (userId, userPhotoUrl) => {
    if (!userId) return;

    const url = `https://rupl.pythonanywhere.com/get_user?id=${userId}`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Ошибка HTTP ${response.status}`);
      }

      const json = await response.json();
      const parsed = Array.isArray(json) ? json : Object.values(json);
      let ref = parsed[0].referal_link;
      setReferralLink(ref);
    } catch (err) {
      console.log("Ошибка при загрузке заказов:", err);
    }
  }, []);

  const fetchSumReferrals = useCallback(async (userId) => {
    if (!userId) return;

    const url = `https://rupl.pythonanywhere.com/points/sum?id=${userId}`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Ошибка HTTP ${response.status}`);
      }

      const json = await response.json();

      setSumPoints(json.sum_points);
    } catch (err) {
      console.log("Ошибка при загрузке заказов:", err);
    }
  }, []);

  const fetchData = useCallback(async () => {
    const userData = window.Telegram.WebApp.initDataUnsafe.user;

    setUser(userData);
    await fetchOrders(userData.id);
    await getUserInfo(userData.id, userData.photo_url);
    await fetchSumReferrals(userData.id);
    await fetchReferrals(userData.id);
    return userData;
  }, [fetchOrders, getUserInfo, fetchSumReferrals, fetchReferrals]);

  useEffect(() => {
    const init = async () => {
      await fetchData();
      setTimeout(() => setLoading(false), 1500);
    };

    init();
  }, [fetchData]);

  if (loading) return <Loader />;

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              fetchData={fetchData}
              sumPoints={sumPoints}
              referrals={referrals}
            />
          }
        />
        <Route
          path="/order"
          element={<Form sumPoints={sumPoints} user={user} />}
        />
        <Route
          path="/referal"
          element={
            <ReferalLink
              user={user}
              sumPoints={sumPoints}
              ref={referralLink}
              referrals={referrals}
              setReferrals={setRefferals}
            />
          }
        />
        <Route
          path="/account"
          element={<Account user={user} orders={orders} />}
        />
      </Routes>
    </div>
  );
}

export default App;
