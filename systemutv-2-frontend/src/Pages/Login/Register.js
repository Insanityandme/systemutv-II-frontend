import './Login.css';
import {useNavigate} from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    return (
        <>
            <h1>Register page</h1>
            <button onClick={()=>navigate('/login')} >I have an account</button>
            <button onClick={() => navigate('/')} >Register</button>
        </>
    );
}
export default Register;