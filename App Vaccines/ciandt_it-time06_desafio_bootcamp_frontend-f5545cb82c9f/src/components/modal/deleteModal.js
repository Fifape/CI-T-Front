import React, {useState} from "react";
import axios from "axios";
import Popup from "../../blocks/popup/popup";

const DeleteModal = ({open, setOpen, id, setSuccess}) => {
    const [, setErrorMessage] = useState("");


    const submit = (e) => {
        e.preventDefault();
        axios
            .delete(`http://localhost:8080/request/${id}/delete`)
            .then((response) => {
                setOpen(false);
                setSuccess("vaccine_delete");

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
        <Popup trigger={open} setTrigger={setOpen}>
            <div className="popup-contain">
                <div className="popup-title">
                    <h2>Excluir vacina</h2>
                </div>
                <p>Tem certeza que deseja excluir esta vacina? </p>
            </div>
            <div className="line"></div>
            <div className="btns">
                <button className="cancel-btn" onClick={() => setOpen("")}>
                    Cancelar
                </button>
                <button className="accept-btn" onClick={submit}>
                    Excluir
                </button>
            </div>
        </Popup>
    );
};

export default DeleteModal;
