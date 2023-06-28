import "./PopupInfo.css"
import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck, faXmark} from "@fortawesome/free-solid-svg-icons";



function PopupInfo(props) {

    return (props.trigger) ? (
        <div className="pacient-inner">
            <div className="pacient-container">
                <FontAwesomeIcon icon={faCircleCheck} className="icon-circle-check"/>
            <div className="pacient-text">

                <h4>
                    {props.title}
                </h4>
                <p>
                    {props.message}
                </p>
            </div>
                <FontAwesomeIcon icon={faXmark} className="icon-xmark" onClick={() => props.setTrigger("")}/>
            </div>
        </div>
    ) : null;
}

export default PopupInfo;
