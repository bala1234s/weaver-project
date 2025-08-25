import { useNavigate } from "react-router-dom";

function Logout() { 
    const navigate = useNavigate();


    const logOut = () => {
        localStorage.clear();
        navigate('/login');
    };
    return (
        <div><button onClick={logOut()}>Logout</button></div>
    );

}

export default Logout();