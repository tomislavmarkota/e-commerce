import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Roles, selectCurrentUser } from '../features/auth/authSlice';
import { useEffect } from 'react';

type AuthorizeProps = {
    acceptedRoles: Roles[];
}


function Authorize({ acceptedRoles }: AuthorizeProps): JSX.Element {
    const location = useLocation();
    const user = useSelector(selectCurrentUser);
    const { roles } = user;
    console.log("roles from authorize", roles);

    useEffect(() => {
        console.log("from authorize",user)
    }, [roles])

    return (
        roles.some(role => acceptedRoles.includes(role)) ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default Authorize;