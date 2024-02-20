import './Login.css';
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

const Register = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

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

    const Submit = async (event) => {
        event.preventDefault();
        if (!passwordMatch) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch('http://localhost:7002/v1/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    username: username,
                }),
            });

            if (response.status === 201) {
                navigate("/");
            } else {
                alert("An error occurred" + response.statusText);
            }
        } catch (error) {
            alert("Network error: " + error.message);
        }
    }

    return (
        <div className={"login"}>
            <div className="login-container">
                <h1>Create your garden</h1>
                <div className="form-container">
                    <form onSubmit={Submit} className={"inputs-container"}>
                        <input type="text" id="username" name="username" placeholder="Enter your username"
                               onChange={handleUsernameChange} required/>
                        <input type="email" id="email" name="email" placeholder="Enter your email"
                               onChange={handleEmailChange} required/>
                        <input type="password" id="password" name="password" placeholder="Enter your password"
                               onChange={handlePasswordChange} required/>
                        <input type="password" id="confirm" name="confirmPassword" placeholder="Confirm your password"
                               onChange={handleConfirmPasswordChange}
                               style={{borderColor: passwordMatch ? "#386641" : "#bc4749"}} required/>
                        <button type="submit" disabled={!passwordMatch}>Register</button>
                    </form>
                </div>
                <h5>Already have an account? <Link to={"/"}>Login here</Link></h5>
            </div>
        </div>
    );
}
export default Register;