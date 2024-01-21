import { useEffect, useRef, useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useRefreshMutation } from "../features/auth/authApiSlice";
import { User, selectCurrentUser, setCredentials } from "../features/auth/authSlice";
import { useDispatch, useSelector } from 'react-redux';
type Data = {
    user: User;
}
function PersistLogin(): JSX.Element {
    const [loading, setLoading] = useState(true);
    const [persistLogin, setPersistLogin] = useState<boolean>(false);
    const [refresh] = useRefreshMutation();
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const effectRan = useRef(false);

    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode
            const verifyRefresh = async () => {
                try {
                    const refreshToken = localStorage.getItem('refresh');
                    if (refreshToken) {
                        const refreshRes = await refresh(refreshToken);


                        if ('error' in refreshRes) {
                            // Check if it's a FetchBaseQueryError
                            if ('status' in refreshRes.error && refreshRes.error.status) {
                                setPersistLogin(false);
                            } else {
                                // Handle other cases where 'error' is present but 'status' is not
                                setPersistLogin(false);
                            }
                        } else {
                            // Handle the case where 'error' is not present
                            console.log("refreshRes", refreshRes)
                            console.log("refreshRes.data", refreshRes.data)
                            const data = refreshRes.data as Data;

                            dispatch(setCredentials({ user: data.user }));
                            console.log("Updated user state:selectCurrentUser:", user);
                            setPersistLogin(true);
                        }
                    } else {
                        setPersistLogin(false);
                    }
                } catch (err) {
                    console.log(err);
                    setPersistLogin(false);
                } finally {
                    setLoading(false);
                }
            };

            void verifyRefresh();

        }

        return () => {effectRan.current = true };
      
    }, [refresh]);

    if (loading) {
        return <h1>loading</h1>;
    }

    return (
        <>
            {persistLogin ? <Outlet /> : <div>unathorized
                <Link to={'/auh'}>GO BACK TO AUTH</Link>
            </div>}
        </>
    );
}

export default PersistLogin;
