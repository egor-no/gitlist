import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const CreateAccountPage = () => {
    const [email, setEmail] = useState(''); 
    const [pass, setPass] = useState(''); 
    const [error, setError] = useState(''); 
    const [confirmPass, setConfirmPass] = useState (''); 

    const navigate = useNavigate(); 

    const createAccount = async() => {
        try {
            if (pass !== confirmPass ) {
                setError('Password and confirm password do not match!');
                return;
            }

            await createUserWithEmailAndPassword(getAuth(), email, pass);
            navigate('/repos'); 
        } catch (e) {
            setError(e.message); 
        }
    }

    return (
        <>
        <h1>Create Account</h1>
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
        <input 
            type="password" 
            placeholder="Re-enter your password"
            value={confirmPass} 
            onChange={e => setConfirmPass(e.target.value)} />
        <button onClick={createAccount}>Create Account</button>
        <Link to="/login">Already have an account? Log In here. </Link>
        </>
    );
}

export default CreateAccountPage;