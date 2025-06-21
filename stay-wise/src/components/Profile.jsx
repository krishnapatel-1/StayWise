import { useNavigate} from "react-router-dom";

function Profile(){
    const navigate=useNavigate();

    const home=()=>{
        navigate('/home');
    }

    const logout=()=>{
        navigate('/');
    }
    
    return(
        <div>
            <h1>Profile</h1>
            <button onClick={home}>Home</button>
            <button onClick={logout}>LogOut</button>
        </div>
    );
}

export default Profile;