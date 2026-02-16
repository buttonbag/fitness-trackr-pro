import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { deleteRoutine, getRoutineItem } from "../api/routines";
import RoutineSets from "./RoutineSets";

export default function RoutineItem() {
  const {routineId} = useParams();
  const [currentRoutine, setCurrentRoutine] = useState({});
  const { token } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate("/");

  const tryDelete = async () => {
    setError(null);

    try {
      await deleteRoutine(token, routineId);
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };


  useEffect(()=>{

    // const getItem = async () => {
      //   const response = await fetch("https://fitnesstrac-kr.herokuapp.com/api/routines/" + routineId);
      //   const result = await response.json();
      //   console.log(result);
      //   setCurrentRoutine(result);
      // }
    const syncItem = async () => {
      const data = await getRoutineItem(routineId);
      setCurrentRoutine(data);
    }
    syncItem();
  }, [routineId]);

  return (
    <>
      <h1>Routine {currentRoutine.name}</h1>
      <p>{currentRoutine.goal}</p>
      <p>{currentRoutine.creatorName}</p>
      <RoutineSets routineSets={currentRoutine} />
      {token && <button onClick={tryDelete}>Delete</button>}
      {error && <p role="alert">{error}</p>}
    </>

  )
}