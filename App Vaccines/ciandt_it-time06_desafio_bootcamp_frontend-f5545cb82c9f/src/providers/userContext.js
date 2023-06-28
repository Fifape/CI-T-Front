import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const UserContext = React.createContext();

function ProviderUser(props) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const login = async (username, password) => {
        try {
            const response = await axios.post(`http://localhost:8080/auth?username=${username}&password=${password}`);
            const token = response.data.token;
            localStorage.setItem("authToken", token);
            setUser(response.data)
            setError(null);
            console.log(response)
            navigate("/campaigns");
            window.location.reload();
        } catch (error) {
            console.log("err", error.response);
            setError(error.response.data);
        }
    };
    const regist = async (name, username, email, password, baseId) => {
        try {
            const response = await axios.post(`http://localhost:8080/user/register?name=${name}&username=${username}&email=${email}&password=${password}&baseId=${baseId}`);
            setUser(response.data);
            setError(null);
            navigate("/");
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Ocorreu um erro durante o registro.");
            }
        }
    };


    const logout = () => {
        localStorage.removeItem("authToken");
        setUser(null);
        navigate("/");
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/auth/user`)
            .then(response => {
                setUser(response.data);
            })

        const authToken = localStorage.getItem("authToken");
        if (authToken) {
            axios.defaults.headers.common["Authorization"] = `Basic ${authToken}`;
        }
    }, []);

    return (
        <UserContext.Provider value={{user, setUser, login, regist, logout, error}}>
            {props.children}
        </UserContext.Provider>
    );
}

function useContext() {
    return React.useContext(UserContext);
}

export {ProviderUser, useContext};
