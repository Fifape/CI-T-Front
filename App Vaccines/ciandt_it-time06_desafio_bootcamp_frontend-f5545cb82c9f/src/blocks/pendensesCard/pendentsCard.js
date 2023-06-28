import "./pendentsCard.css"
import FormatPendentIcon from "../../providers/formatPendentIcon";
import formatPendentStatus from "../../providers/formatPendentStatus";
import Popup from "../popup/popup";
import React, {useState} from "react";
import axios from "axios";
import PopupInfo from "../pacientEdited/PopupInfo";


const ResponseToRequest = ({id, open, setOpen, setSuccess, response_type}) => {
    const [ setErrorMessage] = useState("");

    const submit = (e) => {
        e.preventDefault();
        axios
            .post(`http://localhost:8080/transfer/${id}/${response_type}`)
            .then((response) => {
                setOpen(false);
                if (response_type === "accept") {
                    setSuccess("vaccine_accepted")
                } else if (response_type === "cancel") {
                    setSuccess("vaccine_canceled")
                } else  {
                    setSuccess("vaccine_refused")
                }
                console.log(setSuccess)
                setTimeout(() => {
                    setSuccess("");
                    window.location.reload();
                }, 4000);
            })
            .catch((error) => {
                setErrorMessage(error.response.data.message);
            });
    };
    let title, message, buttonText;
    if (response_type === "accept") {
        title = "Aceitar Vacina";
        message = "Tem certeza que gostaria de aceitar a vacina enviada para você?";
        buttonText  = "Salvar";
    } else if (response_type === "reject") {
        title = "Recusar Vacina";
        message = "Tem certeza que gostaria de recusar a vacina enviada para você?";
        buttonText  = "Salvar";
    } else if (response_type === "cancel") {
        title = "Excluir envio";
        message = "Tem certeza que gostaria de excluir o envio da vacina?";
        buttonText  = "Excluir";
    }

    return (
        <Popup trigger={open} setTrigger={setOpen}>
            <div className="popup-title">
                <h2>{title}</h2>
            </div>
            <p>{message} </p>
            <div className="line"></div>
            <div className="btns">
                <button className="cancel-btn" onClick={() => setOpen("")}>
                    Cancelar
                </button>
                <button className="accept-btn" onClick={submit}>
                    {buttonText}
                </button>
            </div>
        </Popup>
    );
};


function PendentsCard(props) {
    const [isButtonPopup, setIsButtonPopup] = useState("");
    const [showSuccess, setShowSuccess] = useState("")


    const handleAccept = () => {
        setIsButtonPopup("accept")
    };
    const handleRefuse = () => {
        setIsButtonPopup("reject");
    };

    const handleCancel = () => {
        setIsButtonPopup("cancel");
    };


    return <div className={'pendents-card'}>

        <div className="container">
            <div className="card-left">

                <div className="name card-info">
                    <p>{props.doseRequest.campaign.name}</p>
                </div>

                <div className="requester card-info">
                    <p>@{props.doseRequest.requester.username}</p>
                </div>
            </div>

            <div className="card-middle">
                <div className="receiver card-info">
                    <p>@{props.receiver.username}</p>
                </div>
            </div>

            <div className={'transfer-status'}>
                <p>{formatPendentStatus(props.status)}</p>
            </div>

            <div className="card-rigth">
                <div className="icon">
                    {FormatPendentIcon(props.status, props.doseRequest.requester.username, handleAccept, handleRefuse, handleCancel)}
                </div>
            </div>
        </div>
        {isButtonPopup && <ResponseToRequest open={isButtonPopup} setOpen={setIsButtonPopup} id={props.id}
                                             setSuccess={setShowSuccess} response_type={isButtonPopup}/>}
        {showSuccess === "vaccine_canceled" &&
            <PopupInfo trigger={showSuccess} setTrigger={setShowSuccess} title="Envio cancelado"
                       message="Cancelado envio de vacina com sucesso"/>}
        {showSuccess === "vaccine_accepted" &&
            <PopupInfo trigger={showSuccess} setTrigger={setShowSuccess} title="Vacina aceite"
                       message="Vacina aceite com sucesso"/>}

        {showSuccess === "vaccine_refused" &&
            <PopupInfo trigger={showSuccess} setTrigger={setShowSuccess} title="Vacina rejeitada"
                       message="Vacina rejeitada com sucesso"/>}
    </div>
}

export default PendentsCard;
