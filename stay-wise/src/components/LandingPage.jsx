import {Link} from 'react-router-dom'
import {Signup} from './SignUp'
import {Login} from './LogIn'

function LandingPage(){
    return(
        <div>
            <h1>StayWise</h1>
            <nav>
                <Link to='/signup'>SignUp</Link> |
                <Link to="login">LogIn</Link>
            </nav>
        </div>
    );
}

export default LandingPage;