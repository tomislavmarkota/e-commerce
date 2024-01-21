import { Link } from 'react-router-dom';

function Users() {
    return (
        <>
            <p>Hello world from Users!    </p>
            <Link to="/admin">Navigate to admin</Link>
      </>

  );
}

export default Users;