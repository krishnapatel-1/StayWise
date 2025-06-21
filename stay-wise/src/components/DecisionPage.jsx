import { useNavigate } from "react-router-dom";

function Decision(){
    const navigate=useNavigate();

    const owner=()=>{
        navigate('/owner');
    }

    const tenant=()=>{
        navigate('/home')
    }

    return(
        <div>
            <h1>Who are You?</h1>
            <button onClick={owner}>Owner</button>
            <button onClick={tenant}>Tenant</button>
        </div>

    );
}

export default Decision;