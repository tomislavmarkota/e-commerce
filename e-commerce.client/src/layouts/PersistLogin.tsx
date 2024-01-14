import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRefreshMutation } from "../features/auth/authApiSlice";

function PersistLogin(): JSX.Element {
    const [loading, setLoading] = useState(true);
    const [persistLogin, setPersistLogin] = useState<boolean>(false);

    const [refresh] = useRefreshMutation();

    useEffect(() => {
        const verifyRefresh = async () => {
            try {
                const refreshToken = localStorage.getItem('refresh');
                if (refreshToken) {
                    const refreshRes = await refresh(refreshToken);

                    console.log(refreshRes);

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

        verifyRefresh();
    }, [refresh]);

    if (loading) {
        return <h1>loading</h1>;
    }

    return (
        <>
            {persistLogin ? <Outlet /> : <Navigate to="/login" />}
        </>
    );
}

export default PersistLogin;
