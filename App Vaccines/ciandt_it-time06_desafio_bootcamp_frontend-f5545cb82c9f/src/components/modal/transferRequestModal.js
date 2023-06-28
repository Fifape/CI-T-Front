import React, {useState} from "react";
import axios from "axios";
import Popup from "../../blocks/popup/popup";


const CreateTransferRequestModal = ({isOpen, setIsOpen, id, setSuccess}) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [receiverUsername, setReceiverUsername] = useState("");
    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        if (event.target.name === "receiverUsername") {
            setReceiverUsername(inputValue);
        }
    };

    const submit = (e) => {
        e.preventDefault();

        if (!id || !receiverUsername) {
            setErrorMessage("Por favor, preencha todos os campos");
            return;
        }

        axios
            .post(`http://localhost:8080/transfer/create?doseRequestId=${id}&receiverUsername=${receiverUsername}`)
            .then((response) => {
                setIsOpen(false);
                setSuccess("vaccine_sent");

                setTimeout(() => {
                    setSuccess("");
                    window.location.reload();
                }, 3000);
            })
            .catch((error) => {
                setErrorMessage(error.response.data.message);
            });
    };

    return (
        <Popup trigger={isOpen} setTrigger={setIsOpen}>
            <div className="popup-title">
                <h2>Enviar Vacina</h2>
            </div>
            <fieldset className={errorMessage ? "error-fieldset" : ""}>
                <legend>Login do paciente</legend>
                <span>@</span>
                <input name="receiverUsername" onChange={handleInputChange} placeholder="Login do paciente"/>
            </fieldset>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="line"></div>
            <div className="btns">
                <button className="cancel-btn" onClick={() => setIsOpen(false)}>
                    Cancelar
                </button>
                <button className="accept-btn" onClick={submit}>
                    Salvar
                </button>
            </div>
        </Popup>
    );
};

export default CreateTransferRequestModal;
