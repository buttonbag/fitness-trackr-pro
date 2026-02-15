import { useAuth } from "../auth/AuthContext";
import { NavLink } from "react-router";
// import { usePage } from "./PageContext";

/** Navbar with site navigation links */
export default function Navbar() {
  const { token, logout } = useAuth();
  // const { setPage } = usePage();

  return (
    <header>
      <p>Fitness Trackr</p>
      <nav>
        <NavLink to="/">Activities</NavLink>
        <NavLink to="/routines">Routines</NavLink>
        {token ? 
        <NavLink to="/logout">Logout</NavLink> :
        <>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
        </>
        }
      </nav>
    </header>
  );
}
