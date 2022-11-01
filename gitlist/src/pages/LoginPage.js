import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const LoginPage = () => {
    const [email, setEmail] = useState(''); 
    const [pass, setPass] = useState(''); 
    const [error, setError] = useState(''); 

    const navigate = useNavigate();

    const logIn = async () => {
        try {
            await signInWithEmailAndPassword(getAuth(), email, pass); 
            navigate('/repos')
        } catch (e) {
            setError(e.message); 
        }
    }

    return (
        <>
        <h1>Log In</h1>
        {error && <p className="error">{error}</p>}
        <input 
            placeholder="Your email address" 
            value={email}
            onChange={e => setEmail(e.target.value)} />
        <input 
            type="password" 
            placeholder="Your password"
            value={pass} 
            onChange={e => setPass(e.target.value)} />
        <button onClick={logIn}>Log In</button>
        <Link to="/sign-up">Don't have an account? Create one here! </Link>
        </>
    );
}

export default LoginPage