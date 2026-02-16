import { useEffect, useState } from "react";
import { getRoutineItem } from "../api/routines";
import { useParams } from "react-router";

export default function RoutineSets({routineSets}) {
    const {routineId} = useParams();

  const [currentRoutineSets, setCurrentRoutineSets] = useState([]);
  

  useEffect(()=>{
    const syncItem = async () => {
      const data = await getRoutineItem(routineId);
      setCurrentRoutineSets(data.sets);
    }
    syncItem();
  }, [routineId]);
  
  return (
    <>
      {currentRoutineSets.map((set)=>{
        return (
          <>
            <p>Name: {set.name}</p>
            <p>Description: {set.description}</p>
            <p>Reps: {set.count}</p>
          </>
          )
      })}
    </>
  )
}
