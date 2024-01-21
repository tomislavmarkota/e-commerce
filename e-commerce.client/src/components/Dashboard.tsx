import { Link } from "react-router-dom";
import { selectCurrentUser } from "../features/auth/authSlice";
import { useSelector } from "react-redux";

function Dashboard() {
    const user = useSelector(selectCurrentUser);
    console.log("user from dashboard", user)
    return (
        <div>
            <p>Hello world!</p>
            <Link to="/login">To login</Link>
      </div>
 
  );
}

export default Dashboard;