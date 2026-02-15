import { useState } from "react";
import { Link } from "react-router";

export default function RoutineList({ routines, syncRoutines }) {
  return (
    <ul>
      {routines.map((routine) => (
        <RoutineListItem
          key={routine.id}
          routine={routine}
          syncRoutines={syncRoutines}
        />
      ))}
    </ul>
  );
}

function RoutineListItem({ routine }) {


  return (
    <li>
      <Link to={"/routine/"+routine.id}>{routine.name}</Link>
    </li>
  );
}
