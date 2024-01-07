/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState, useEffect } from 'react'

//import { useDispatch } from 'react-redux';
//import { setCredentials } from './authSlice';
import { useLoginMutation, useUsersQuery } from '../auth/authApiSlice'

function Login() {
    const userRef = useRef<HTMLInputElement>();
    // const errRef = useRef();
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [, setErrMsg] = useState('');

    const [login, { isLoading }] = useLoginMutation();
    const { data: usersData, refetch: fetchUsers } = useUsersQuery({});
    // const dispatch = useDispatch();

    const handleGetUsersClick = async () => {
        try {
            const usersData = await fetchUsers(); // Trigger refetch to get users
            console.log(usersData);
        } catch (err) {
            console.log(err);
        }
    };
    console.log(usersData)
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