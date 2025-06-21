import { useNavigate } from "react-router-dom";

function Home(){
    const navigate=useNavigate();

    const gotoprof=()=>{
        navigate('/profile')
    }

    return(
        <div>
            <h1>Home here</h1>
            <button onClick={gotoprof}>Profile</button>
        </div>

    );
}

export default Home;