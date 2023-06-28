import React, {useEffect, useState} from 'react';
import './register.css'
import medic from '../../medic1'
import {faChevronRight, faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {useContext} from "../../providers/userContext";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function Register() {
    const navigate = useNavigate();
    const [register, setRegister] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [thiserror, setThisError] = useState("");
    const {regist, error} = useContext();

    const [baseLocations, setBaseLocations] = useState([]);
    const [selectedBase, setSelectedBase] = useState(null);
    const handleBaseSelection = (option) => {
        setSelectedBase(option);
    };

    useEffect(() => {
        axios.get('http://localhost:8080/base/all')
            .then(response => {
                const baseLocations = response.data;
                setBaseLocations(baseLocations)

            })
            .catch(error => {
                console.error('Error retrieving user base locations:', error);

            })
    },[]);

    const toLogin = () => {
        navigate('/login');
    };
    const handleInputChange = (event) => {
        // Clear the error message when either the username or password field changes
        setThisError(null);
        const inputValue = event.target.value;
        const sqlRegex = /([';"?!><£%$#+,(])/g;
        if (sqlRegex.test(inputValue)) {
            setThisError("Caracteres inválidos encontrados.");
        }

    }
    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const name = formData.get('name');
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        const baseId = selectedBase?.value; // Get the value of the selected base


        if (!name || !username || !email || !password || !baseId) {
            setThisError("Por favor preencha todos os campos.");
            return;
        }


        regist(name, username, email, password, baseId);
    };
    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div className="box">
            {!register && (
                <div className="left-box">
                    <div className='logo'>
                        <svg width="55" height="32" viewBox="0 0 55 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M27.2124 4.71026L11.0931 20.8316C9.76307 22.0534 8.2729 22.6923 6.62208 22.7461C4.76109 22.6923 3.19322 22.0279 1.91731 20.7499C1.62829 20.4613 1.37434 20.1594 1.15046 19.8472C2.24781 20.6377 3.52154 21.0587 4.9769 21.1007C6.62746 21.0472 8.11763 20.4082 9.44819 19.1862L25.4593 3.17234C22.7043 1.06073 19.5389 0.00216641 15.9608 0.00216641C11.5452 0.00216641 7.79392 1.54482 4.70989 4.63154C1.62394 7.71647 0.05376 11.3875 0 15.6448V16.4416C0.05376 20.644 1.59706 24.2612 4.62925 27.2948C7.7673 30.433 11.5452 31.9757 15.9608 31.9231C20.3227 31.9231 24.0733 30.3539 27.2124 27.2148L43.3318 11.0936C44.6621 9.87148 46.1519 9.23225 47.8025 9.179C49.6637 9.23225 51.2317 9.89708 52.5075 11.1748C52.7969 11.4632 53.0505 11.7646 53.2745 12.0773C52.1774 11.2868 50.9033 10.8655 49.4479 10.8241C47.7974 10.8777 46.3071 11.5163 44.9766 12.7384L28.9655 28.7521C31.7206 30.8636 34.8859 31.9226 38.464 31.9226C42.8797 31.9226 46.6313 30.3796 49.7151 27.2936C52.8009 24.2084 54.3708 20.5371 54.4252 16.2801V15.4827C54.3708 11.2811 52.8278 7.66361 49.7957 4.62962C46.6573 1.4917 42.8797 -0.0506976 38.464 0.00127041C34.1021 0.00127041 30.3516 1.57081 27.2124 4.71026Z"
                                fill="white"/>
                        </svg>
                    </div>
                    <img src={medic} alt="Medic"/>
                    <h3 onClick={toLogin}>Já tem conta? Login</h3>
                    <h3 onClick={() => setRegister(true)}>Registo</h3>
                </div>
            )}
            {register && (
                <div className="right-box">
                    <div className="hole">
                        <div className="background">
                            <div className="shape"/>
                            <div className="shape"/>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <h4>Criar Conta</h4>
                            <label htmlFor="name">Nome</label>
                            <input type="text" placeholder="Nome" name="name" id="name"
                                   onChange={handleInputChange}/>

                            <label htmlFor="username">Nome de Usuário</label>
                            <input type="text" placeholder="Nome de Usuário" name="username" id="username"
                                   onChange={handleInputChange}/>

                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder="Email" name="email" id="email"
                                   onChange={handleInputChange}/>

                            <label htmlFor="password">Password</label>
                            <div className="password-wrapper">
                                <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" id="password" onChange={handleInputChange} />
                                <FontAwesomeIcon
                                    icon={showPassword ? faEyeSlash : faEye}
                                    className="password-toggle"
                                    onClick={togglePasswordVisibility}
                                />
                            </div>

                            <label htmlFor="baseId">Base</label>
                            <Dropdown
                                options={baseLocations.map(base => ({value: base.id, label: base.location}))}
                                placeholder="Selecione sua base"
                                value={selectedBase}
                                onChange={handleBaseSelection}
                                controlRenderer={({ selectedItem }) => (
                                    <div className="dropdown-header" onClick={() => setSelectedBase(selectedItem)}>
                                        {selectedItem ? selectedItem.label : "Selecione sua base"}
                                        <FontAwesomeIcon icon={faChevronRight} className={`iconArrow ${selectedItem && "iconArrowOpen"}`} />
                                    </div>
                                )}
                                arrowClosed={<FontAwesomeIcon icon={faChevronRight} className="iconArrow"/>}
                                arrowOpen={<FontAwesomeIcon icon={faChevronRight} className="iconArrowOpen"/>}
                            />
                            {thiserror && <p className="error-message">{thiserror}</p>}
                            {error && <p className="error-message">{error}</p>}
                            <button type="submit">Criar Conta</button>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );


}

export default Register;
