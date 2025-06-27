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
        <div class="decision-box">
            <h1 class="content">Who are You?</h1>
            <div class="button-group">
                <button class="button1" onClick={owner}>Owner</button>
                <button class="button1" onClick={tenant}>Tenant</button>
            </div>
        </div>

    );
}

export default Decision;