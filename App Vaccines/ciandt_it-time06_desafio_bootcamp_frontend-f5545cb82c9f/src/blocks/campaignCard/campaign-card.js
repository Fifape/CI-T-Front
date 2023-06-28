import "./campaign-card.css"
import formatStatus from "../../providers/formatStatus";
import formatDate from "../../providers/formatDate";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function CampaignCard(props) {

    return <div className={'campaign-card'}>

        <div className="container">
            <div className="card-left">

            <div className="name card-info">
                <p>{props.name}</p>
            </div>

            <div className="status card-info">
                <p>{formatStatus(props.campaign_status_id)}</p>
            </div>

            <div className="dates-mobile">
                
            <div className="start-date">
                <p>Início: {formatDate(props.start_date)}</p>
            </div>

            <div className="end-date">
                <p>Fim: {formatDate(props.end_date)}</p>
            </div>
            </div>

            <div className="start-date-desk card-info">
                <p>{formatDate(props.start_date)}</p>
            </div>

            <div className="end-date-desk">
                <p>{formatDate(props.end_date)}</p>
            </div>
                
            </div>

            <div className="card-rigth">
                <div className="icon">
                    <Link to={"/" + props.id}>
                        <FontAwesomeIcon icon={faAngleRight}/>
                    </Link>
                    
                </div>
            </div>
        </div>

        </div>
}

export default CampaignCard;