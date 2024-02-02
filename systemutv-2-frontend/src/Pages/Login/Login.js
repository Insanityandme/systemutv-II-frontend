import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    return (
        <>
            <h1>Login page</h1>
            <button onClick={()=> navigate('/register')}>Create account</button>
            <button onClick={() => navigate('/')}>Log in</button>
        </>
    );
}
export default Login;