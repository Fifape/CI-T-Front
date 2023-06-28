import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTrash, faEnvelope} from "@fortawesome/free-solid-svg-icons";


const FormatStatusIcon = (status, handleEdit, handleSend, handleDelete) => {
    let icons = [];

    if (status === 2 || status === 3 || status === 4) icons.push(<FontAwesomeIcon icon={faPen} onClick={handleEdit}/>)
    if (status === 2) icons.push(<FontAwesomeIcon icon={faTrash} onClick={handleDelete} />)
    if (status === 3) icons.push(<FontAwesomeIcon icon={faEnvelope} onClick={handleSend}/>)

    return <div className="icons">
        {icons}
    </div>
}

export default FormatStatusIcon