import './Login.css';
import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:7002/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: email, password: password}),
            });
            if (response.ok) {
                const data = await response.json();
                sessionStorage.setItem('userId', data.id);
                sessionStorage.setItem('notifications', data.isNotificationsActivated);
                sessionStorage.setItem('funFacts', data.funFactsActivated);
                navigate("/dashboard");
            } else {
                const errorText = await response.text();
                alert('Login failed:  Invalid email or password.' + errorText);
            }
        } catch (error) {
            alert('Network error: ' + error.message);
        }
    };


    return (
        <div className="login">
            <div className="login-container">
                <h1>Welcome to your garden</h1>
                <div className="form-container">
                    <form onSubmit={login} className="inputs-container">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Log in</button>
                    </form>
                </div>
                <h5>Don't have an account? <Link to="/register">Create account</Link></h5>
            </div>
        </div>
    );
};
export default Login;