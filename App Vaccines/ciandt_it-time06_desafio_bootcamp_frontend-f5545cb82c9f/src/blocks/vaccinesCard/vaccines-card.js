import "./vaccines-card.css"
import formatStatusIcon from "../../providers/formatStatusIcon"
import Popup from "../popup/popup";
import React, {useState} from "react";
import axios from "axios";
import PopupInfo from "../pacientEdited/PopupInfo";
import CreateTransferRequestModal from "../../components/modal/transferRequestModal";
import DeleteModal from "../../components/modal/deleteModal";

const EditPatientModal = ({open, setOpen, id, patientName, setShowSuccess}) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [name, setName] = useState(patientName)

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        const numberRegex = /\d+/;
        const symbolRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,<>/?]/;
        if (!inputValue) {
            setErrorMessage("Informar nome do paciente");
            setName("");
        } else if (numberRegex.test(inputValue)) {
            setErrorMessage("O nome do paciente não pode conter números");
        } else if (symbolRegex.test(inputValue)) {
            setErrorMessage("O nome do paciente não pode conter símbolos");
        } else {
            setErrorMessage("");

        }
        setName(inputValue);
    };
    const submit = (e) => {
        e.preventDefault();

        if (errorMessage || !name) {
            return;
        }

        axios.post(`http://localhost:8080/request/${id}/patient-name?patientName=${name}`
        ).then(response => {

            setOpen(false)
            setShowSuccess("pacient_updated")
            setTimeout(() => {
                setShowSuccess("")
                window.location.reload();
            }, 3000)
        }).catch(e => console.log("err", e));

    }

    return (
        <Popup trigger={open} setTrigger={setOpen}>
            <div className="popup-contain">
                <div className="popup-title">
                    <h2>Editar Paciente</h2>
                </div>
            </div>
            <fieldset className={errorMessage ? "error-fieldset" : ""}>

                <legend>Nome do Paciente</legend>

                <input name="patientName" value={name} onChange={handleInputChange}/>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </fieldset>
            <div className="line"></div>
            <div className="btns">
                <button className="cancel-btn" onClick={() => setOpen(false)}>Cancelar</button>

                <button className="accept-btn" onClick={submit}>Salvar</button>
            </div>

        </Popup>
    )
}


function VaccinesCard(props) {


    const [buttonPopup, setButtonPopup] = useState(false);
    const [isButtonPopup, setIsButtonPopup] = useState(false);
    const [thisButtonPopup, setThisButtonPopup] = useState(false);
    const [showSuccess, setShowSuccess] = useState("")


    const handleEdit = () => {
        setButtonPopup(true)
    };
    const handleSend = () => {
        setIsButtonPopup(true)
    };
    const handleDelete = () => {
        setThisButtonPopup(true)
    };


    return <div className={'vaccines-card'}>

        <div className="container">
            <div className="card-left">

                <div className="campaign">
                    <p>{props.vaccine.name}</p>
                </div>

                <div className="name">
                    <p>{props.patient_name}</p>
                </div>

            </div>

            <div className="card-rigth">
                <div className="icon">
                    {formatStatusIcon(props.campaign.campaign_status_id, handleEdit, handleSend, handleDelete)}
                </div>
            </div>
        </div>

        {buttonPopup && <EditPatientModal open={buttonPopup} setOpen={setButtonPopup} id={props.id}
                                          patientName={props.patient_name} setShowSuccess={setShowSuccess}/>}
        {showSuccess === "pacient_updated" &&
            <PopupInfo trigger={showSuccess} setTrigger={setShowSuccess} title="Paciente atualizado"
                       message="Paciente atualizado com sucesso"/>}

        {isButtonPopup && <CreateTransferRequestModal isOpen={isButtonPopup} setIsOpen={setIsButtonPopup} id={props.id}
                                                      setSuccess={setShowSuccess}/>}
        {showSuccess === "vaccine_sent" &&
            <PopupInfo trigger={showSuccess} setTrigger={setShowSuccess} title="Vacina enviada"
                       message="Vacina enviada com sucesso"/>}

        {thisButtonPopup && <DeleteModal open={thisButtonPopup} setOpen={setThisButtonPopup} id={props.id}
                                         setSuccess={setShowSuccess}/>}
        {showSuccess === "vaccine_delete" &&
            <PopupInfo trigger={showSuccess} setTrigger={setShowSuccess} title="Vacina excluída"
                       message="Vacina excluída com sucesso"/>}


    </div>


}

export default VaccinesCard;