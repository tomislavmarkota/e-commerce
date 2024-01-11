/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState, useEffect } from 'react'

//import { useDispatch } from 'react-redux';
//import { setCredentials } from './authSlice';
import { useLoginMutation, useLazyUsersQuery } from '../auth/authApiSlice'
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentToken, setCredentials } from './authSlice';

function Login() {
    const userRef = useRef<HTMLInputElement>();
    // const errRef = useRef();
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [, setErrMsg] = useState('');
    const [usersData, setUserData] = useState<any>();
    const [login, { isLoading }] = useLoginMutation();
    //const [users] = useLazyUsersQuery({});
    const [trigger, result] = useLazyUsersQuery();
    const refreshToken = useSelector(selectCurrentToken);
    console.log("refreshToken",refreshToken)
    useEffect(() => {
        if (result && result.data) {
            setUserData([result.data]);
        }
        console.log(result)
    }, [result])

    const dispatch = useDispatch();
    console.log("usersData", usersData)
    const handleGetUsersClick = async () => {
        try {
            await trigger(null, false); 
            console.log("result", result)
       
        } catch (err) {
            console.log(err);
        }
    };

   
  
  
    useEffect(() => {
        if (userRef && userRef.current) userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        try {
            const userData = await login({ email, password: pwd }).unwrap();
            console.log(userData);
            dispatch(setCredentials({token: userData.refresh }))
        } catch (err) {
            console.log(err)
        }
    }

    const handleInputChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        if (target.name === 'email') setEmail(target.value);
        if (target.name === 'password') setPwd(target.value)
    }
    console.log(email, pwd)
    if(isLoading) return <div>Loading...</div>

    return (
        <>
            <div>login</div>
            <form onSubmit={ handleSubmit }>
                <input type="text" name="email" onChange={ handleInputChange } />
                <input type="text" name="password" onChange={handleInputChange} />
                <input type="submit" value="Login" />
            </form>
            <button onClick={() => handleGetUsersClick() }></button>
        </>
       
    )
}

export default Login