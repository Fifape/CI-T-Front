import React, {useState} from 'react';
import "./login.css"
import {useContext} from "../../providers/userContext";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

function Login() {
    const {login, error} = useContext();
    const navigate = useNavigate();
    const [thiserror, setThisError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const handleInputChange = (event) => {
        // Clear the error message when either the username or password field changes
        setThisError(null);
        const inputValue = event.target.value;
        const sqlRegex = /([';"?!><£%$#+,(])/g;
        if (sqlRegex.test(inputValue)) {
            setThisError("Caracteres inválidos encontrados.");
        }

    }
    const toRegister = () => {

        navigate("/register");
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const username = formData.get('username');
        const password = formData.get('password');
        if (!username || !password) {

            setThisError("Por favor preencha os campos.");
            return;
        }

        login(username, password);
    }
    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };
    return (

        <div className="hole">
            <div className='logo'>
                <svg width="55" height="32" viewBox="0 0 55 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M27.2124 4.71026L11.0931 20.8316C9.76307 22.0534 8.2729 22.6923 6.62208 22.7461C4.76109 22.6923 3.19322 22.0279 1.91731 20.7499C1.62829 20.4613 1.37434 20.1594 1.15046 19.8472C2.24781 20.6377 3.52154 21.0587 4.9769 21.1007C6.62746 21.0472 8.11763 20.4082 9.44819 19.1862L25.4593 3.17234C22.7043 1.06073 19.5389 0.00216641 15.9608 0.00216641C11.5452 0.00216641 7.79392 1.54482 4.70989 4.63154C1.62394 7.71647 0.05376 11.3875 0 15.6448V16.4416C0.05376 20.644 1.59706 24.2612 4.62925 27.2948C7.7673 30.433 11.5452 31.9757 15.9608 31.9231C20.3227 31.9231 24.0733 30.3539 27.2124 27.2148L43.3318 11.0936C44.6621 9.87148 46.1519 9.23225 47.8025 9.179C49.6637 9.23225 51.2317 9.89708 52.5075 11.1748C52.7969 11.4632 53.0505 11.7646 53.2745 12.0773C52.1774 11.2868 50.9033 10.8655 49.4479 10.8241C47.7974 10.8777 46.3071 11.5163 44.9766 12.7384L28.9655 28.7521C31.7206 30.8636 34.8859 31.9226 38.464 31.9226C42.8797 31.9226 46.6313 30.3796 49.7151 27.2936C52.8009 24.2084 54.3708 20.5371 54.4252 16.2801V15.4827C54.3708 11.2811 52.8278 7.66361 49.7957 4.62962C46.6573 1.4917 42.8797 -0.0506976 38.464 0.00127041C34.1021 0.00127041 30.3516 1.57081 27.2124 4.71026Z"
                        fill="white"/>
                </svg>
            </div>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form onSubmit={handleSubmit}>

                <h3>Login</h3>

                <label htmlFor="username">Nome de Usuário</label>
                <input className={error ? "input-error" : ""} type="text" placeholder="Nome de Usuário" name="username"
                       id="username" onChange={handleInputChange}/>


                <label htmlFor="password">Password</label>
                <div className="password-wrapper">
                    <input className={error ? "input-error" : ""} type={showPassword ? "text" : "password"} placeholder="Password" name="password" id="password" onChange={handleInputChange} />
                    <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="password-toggle"
                        onClick={togglePasswordVisibility}
                    />
                </div>

                {error && <p className="error-message">{error}</p>}
                <p className="error-message"> {thiserror}</p>

                <button type="submit">Iniciar Sessão</button>
                <p className="create" onClick={toRegister} > Não tem conta? Criar conta </p>

            </form>
        </div>
    )
}

export default Login;
