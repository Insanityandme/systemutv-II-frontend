import './Login.css';
import {Link, useNavigate} from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    return (
        <div className={"login"}>
            <div className="login-container">
                <h1>Welcome to your garden</h1>
                <div className="form-container">
                    <form action="#" method="post" className={"inputs-container"}>
                        <input type="email" id="email" name="email" placeholder="Enter your email" required/>
                        <input type="password" id="password" name="password" placeholder="Enter your password" required/>
                        <button onClick={() => navigate('/')}>Log in</button>
                    </form>
                </div>
                <h5>Don't have an account? <Link to={"/register"}>Create account</Link> </h5>
            </div>
        </div>
    );
}
export default Login;