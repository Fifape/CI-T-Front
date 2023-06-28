import './popup.css'
import React from "react";

function Popup(props) {

    return (props.trigger) ? (
        <div className="popup" onClick={() => props.setTrigger(false)}>
            <div className="popup-inner" onClick={(e) => e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    ) : null;
}

export default Popup;