import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { deleteActivity, getItem } from "../api/activities";

export default function ActivityItem() {
  const {activityId} = useParams();
  const [currentActivity, setCurrentActivity] = useState({});
  const { token } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate("/");

  const tryDelete = async () => {
    setError(null);

    try {
      await deleteActivity(token, activityId);
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };


  useEffect(()=>{

    // const getItem = async () => {
      //   const response = await fetch("https://fitnesstrac-kr.herokuapp.com/api/activities/" + activityId);
      //   const result = await response.json();
      //   console.log(result);
      //   setCurrentActivity(result);
      // }
    const syncItem = async () => {
      const data = await getItem(activityId);
      setCurrentActivity(data);
    }
    syncItem();
  }, [activityId]);

  return (
    <>
      <h1>Activity {currentActivity.name}</h1>
      <p>{currentActivity.description}</p>
      <p>{currentActivity.creatorName}</p>
      {token && <button onClick={tryDelete}>Delete</button>}
      {error && <p role="alert">{error}</p>}
    </>

  )
}