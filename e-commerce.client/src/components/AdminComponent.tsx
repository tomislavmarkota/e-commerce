import { Link } from 'react-router-dom';

function AdminComponent() {

  return (
      <div>admin
          <Link to={"/users"}>USERS</Link>
      </div>
  );
}

export default AdminComponent;