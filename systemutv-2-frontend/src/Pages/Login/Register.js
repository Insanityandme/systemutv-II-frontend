import './Login.css';
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

const Register = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        checkPasswordMatch(password, e.target.value);
    };

    const checkPasswordMatch = (password, confirmPassword) => {
        if (password === confirmPassword) {
            setPasswordMatch(true);
        } else {
            setPasswordMatch(false);
        }
    };

    const Submit = () => {
       navigate("/dashboard");
    }

    return (
        <div className={"login"}>
            <div className="login-container">
                <h1>Create your garden</h1>
                <div className="form-container">
                    <form action="#" method="post" className={"inputs-container"}>
                        <input type="email" id="email" name="email" placeholder="Enter your email" required/>
                        <input type="password" id="password" name="password" placeholder="Enter your password" onChange={handlePasswordChange} required/>
                        <input type="password" id="confirm" name="password" placeholder="Confirm your password" onChange={handleConfirmPasswordChange} style={{ borderColor: passwordMatch ? "#386641" : "#bc4749" }} required/>
                        <button onClick={Submit} disabled={!passwordMatch}>Register</button>
                    </form>
                </div>
                <h5>Already have an account? <Link to={"/"}>Login here</Link> </h5>
            </div>
        </div>
    );
}
export default Register;