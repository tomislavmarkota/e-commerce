import InputStyles from './Input.module.scss'

type InputProps = {
    props: React.InputHTMLAttributes<HTMLInputElement>;
    className?: string;
}

const Input = ({ props } : InputProps) => {

    return (
        <input {...props} className={`${InputStyles.Input} ${props.className}`} />
    )
}



export default Input;