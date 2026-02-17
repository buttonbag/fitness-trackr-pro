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
      <h3>Sets:</h3>
      {currentRoutineSets.map((set)=>{
        return (
          <>
            <p>{set.name} x {set.count}</p>
            <p>{set.description}</p>
            <button>delete set</button>
          </>
          )
      })}
    </>
  )
}
