import { useNavigate } from "react-router-dom";

export function Login(){
    const navigate=useNavigate();

    const goHome=()=>{
        navigate('/decision');
    }

    const goBack=()=>{
        navigate('/');
    }

    return(
        <div>
            <h1>LogIn Page</h1>
            <button onClick={goBack}>Cancel</button>
            <button onClick={goHome}>Submit</button>
        </div>
    );
}