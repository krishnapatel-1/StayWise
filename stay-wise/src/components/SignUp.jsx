import { useNavigate } from "react-router-dom";

export function Signup(){
    const navigate=useNavigate();

    const goBack=()=>{
        navigate('/');
    }

    const goHome=()=>{
        navigate('/decision');
    }

    return(
        <div>
            <h1>SignUp Page</h1>
            <button onClick={goBack}>Cancel</button>
            <button onClick={goHome}>Register</button>
        </div>
    );
}