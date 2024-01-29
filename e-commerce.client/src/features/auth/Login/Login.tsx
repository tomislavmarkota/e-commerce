import { useRef, useState, useEffect } from 'react'
import { useLoginMutation, useLazyUsersQuery } from '../authApiSlice'
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, setCredentials } from '../authSlice';
import { useNavigate } from 'react-router-dom';
import LoginStyles from './Login.module.scss';
import Input from '../../../components/input/Input';

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

    if (isLoading) return <div>Loading...</div>

    const emailInputProps = { type: 'text', placeholder: 'Email', name: 'email', onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e) }

    const pwInputProps = { type: 'text', placeholder: 'Password', name: 'password', onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e) }

    const submitInputProps = { type: 'submit', value: "Sign In", className: LoginStyles.SubmitBtn }

    return (
        <div className={LoginStyles.LoginWrapper}>
            <div>login</div>
            <form className={LoginStyles.LoginForm} onSubmit={(e) => void handleSubmit(e)}>
                <Input props={emailInputProps} />
                <Input props={pwInputProps} />
                <Input props={submitInputProps} />
            </form>
        </div>
       
    )
}

export default Login