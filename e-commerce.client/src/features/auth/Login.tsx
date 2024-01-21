/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState, useEffect } from 'react'

//import { useDispatch } from 'react-redux';
//import { setCredentials } from './authSlice';
import { useLoginMutation, useLazyUsersQuery } from '../auth/authApiSlice'
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, setCredentials } from './authSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
    const userRef = useRef<HTMLInputElement>();
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [, setErrMsg] = useState('');
    const [login, { isLoading }] = useLoginMutation();
    const [trigger, result] = useLazyUsersQuery();
    const user = useSelector(selectCurrentUser);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    console.log("user", user)
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
            dispatch(setCredentials({ user: userData.user }));
            localStorage.setItem("refresh", userData.user.refreshToken);
            navigate('/auth')
        } catch (err) {
            console.log(err);
        }
    }

    const handleInputChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        if (target.name === 'email') setEmail(target.value);
        if (target.name === 'password') setPwd(target.value)
    }

    if(isLoading) return <div>Loading...</div>

    return (
        <>
            <div>login</div>
            <form onSubmit={ (e) => void handleSubmit(e) }>
                <input type="text" name="email" onChange={ handleInputChange } />
                <input type="text" name="password" onChange={handleInputChange} />
                <input type="submit" value="Login" />
            </form>
            <button onClick={() => void handleGetUsersClick() }></button>
        </>
       
    )
}

export default Login