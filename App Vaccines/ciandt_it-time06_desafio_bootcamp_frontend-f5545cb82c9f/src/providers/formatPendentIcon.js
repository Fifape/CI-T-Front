import {useContext} from "./userContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTrash} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const FormatPendentIcon = (status, username,handleAccept,handleRefuse,handleCancel) => {
    const user = useContext();

    if (status === 1 && user?.user?.username === username) {
        return <FontAwesomeIcon icon={faTrash} onClick={handleCancel} /> //excluir endpoint
    } else {
        return <div className={'icons'}>
            <FontAwesomeIcon icon={faCheck} onClick={handleAccept}/> {/*aceitar endpoint*/}
            <FontAwesomeIcon icon={faTrash} onClick={handleRefuse}/> {/* recusar endpoint */}
        </div>
    }
}

export default FormatPendentIcon;