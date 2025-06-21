import { useNavigate } from "react-router-dom";

export function Owner(){
    const navigate=useNavigate();

    const back = () =>{
        navigate('/');
    }

    const profile = () =>{
        navigate('/profile');
    }

    return(
        <div>
            <h1>Owner Journey Yet to be decided</h1>
            <button onClick={back}>Back</button>
            <button onClick={profile}>Profile</button>
        </div>
    );
}