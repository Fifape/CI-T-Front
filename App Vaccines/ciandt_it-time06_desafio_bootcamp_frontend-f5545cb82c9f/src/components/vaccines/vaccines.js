import './vaccines.css'
import axios from "axios";
import React, {useEffect, useState} from "react";
import Navigation from '../navigation/navigation';
import VaccinesCard from '../../blocks/vaccinesCard/vaccines-card';
import {useParams} from "react-router-dom";
import PendentsCard from "../../blocks/pendensesCard/pendentsCard";
import Popup from "../../blocks/popup/popup";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function RequestVaccinePopup({open, setOpen}) {
    const [errorMessage, setErrorMessage] = useState("");
    const [count, setCount] = useState(1);

    const incrementQty = () => {
        setCount((prevCount) => prevCount + 1);
    };

    const decrementQty = () => {
        if (count > 1) {
            setCount((prevCount) => prevCount - 1);
        }
    };

    return (
        <Popup trigger={open} setTrigger={setOpen}>
            <div className="popup-contain">
                <div className="popup-title">
                    <h2>Pedir dose vacina</h2>
                </div>
                <div className="qty-block">
                    <div className="qty">

                        <div className="qty_inc_dec">
                            <FontAwesomeIcon icon={faMinus} className="qty-icon" onClick={decrementQty}/>
                            <input type="text" name="qty" maxLength="12" value={count} readOnly/>
                            <FontAwesomeIcon icon={faPlus} className="qty-icon"  onClick={incrementQty}/>

                        </div>
                    </div>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className="line"></div>

                <div className="btns">
                    <button className="cancel-btn" onClick={() => setOpen(false)}>Cancelar</button>
                    <button className="accept-btn">Pedir</button>
                </div>
            </div>
        </Popup>
    );
}

function Vaccines(props) {
    const params = useParams();
    const [listVaccines, setListVaccines] = useState([]);
    const [listPendentVaccines, setListPendentVaccines] = useState([]);
    const campaignId = parseInt(params.campaignId);

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8080/campaign/${campaignId}/doseRequests`)
            .then(response => {
                setListVaccines(response?.data);
            }).catch(e => console.log(e));
    }, [campaignId]);

    useEffect(() => {
        axios.get(`http://localhost:8080/campaign/pendentDoseRequests?campaignId=${campaignId}`)
            .then(response => {
                setListPendentVaccines(response?.data);
            }).catch(e => console.log(e));
    }, [campaignId]);
    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };
    return <main className="vaccines">
        <Navigation/>
        <div className='container'>
            <header className='header'>
                <h1>Campanhas - {listVaccines[0]?.campaign?.name}</h1>
            </header>

            <section className='vaccines-list'>
                <div className='sub-title'>
                    <h2>Lista de Vacinas</h2>
                </div>
                <div className="box-request-vaccine">
                    <button className="request-vaccine" onClick={togglePopup}>Pedir Vacina</button>
                </div>
                <div className='vaccines-info-bar'>
                    <div className='information-type-campaign'>
                        <p>Vacina</p>
                    </div>

                    <div className='information-type-name'>
                        <p>Paciente</p>
                    </div>

                    <div className='information-type-actions'>
                        <p>Ações</p>
                    </div>

                </div>

                {listVaccines ? <div className='vaccines-container'>
                    {listVaccines.length === 0 ? <div className={'empty-warning'}>
                        <p>Nenhum registo encontrado</p>
                    </div> : listVaccines?.map((c, idx) =>
                        <VaccinesCard key={idx} {...c} />)}
                </div> : <p>A carregar...</p>}
            </section>

            {listPendentVaccines.length > 0 && <section className={'pendent-list'}>
                <div className='sub-title'>
                    <h2>Pendências</h2>
                </div>

                <div className='pendent-info-bar'>
                    <div className='information-type-campaign'>
                        <p>Vacina</p>
                    </div>

                    <div className='information-type-requester'>
                        <p>Remetente</p>
                    </div>

                    <div className='information-type-receiver'>
                        <p>Destinatário</p>
                    </div>

                    <div className='information-type-status'>
                        <p>Status</p>
                    </div>

                    <div className='information-type-actions'>
                        <p>Ações</p>
                    </div>


                </div>

                {listPendentVaccines ? <div className='pendent-container'>
                    {listPendentVaccines.length === 0 ? <div className={'empty-warning'}>
                        <p>Nenhum registo encontrado</p>
                    </div> : listPendentVaccines?.map((p, idx) =>
                        <PendentsCard key={idx} {...p} />)}
                </div> : <p>A carregar...</p>}
            </section>}


        </div>
        <RequestVaccinePopup open={isPopupOpen} setOpen={setIsPopupOpen}/>
    </main>
}

export default Vaccines;