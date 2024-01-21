import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";


function AuthLayout(): JSX.Element {
    const [isAuth, setIsAuth] = useState<boolean>(false);

    useEffect(() => {
        const refresh = localStorage.getItem('refresh') ? true : false;
        setIsAuth(refresh);
    }, [])

    return (
        <>
            {isAuth ? <Outlet /> : (
                <>
                    <h1>Unauthorized</h1>
                    <a href={'/login'}>Login</a>
                </>
                
            )}
        </>    
  );
}

export default AuthLayout;