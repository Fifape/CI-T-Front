import './campaigns.css'

import axios from "axios";
import {useEffect , useState} from "react";
import Navigation from '../navigation/navigation';
import CampaignCard from '../../blocks/campaignCard/campaign-card';

function Campaigns() {
    const [listActiveCampaigns, setListActiveCampaigns] = useState([]);
    const [listInactiveCampaigns, setListInactiveCampaigns] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/campaign/active')
            .then(response => {
                setListActiveCampaigns(response?.data);
            }).catch(error => {
            console.log(error);
        });

        axios.get('http://localhost:8080/campaign/inactive')
            .then(response => {
                setListInactiveCampaigns(response?.data);
            }).catch(e => console.log(e));
    }, []);

    return <main className="campaigns">
        <Navigation/>

        <div className='container'>
            <header className='header'>
                <h1>Campanhas</h1>
            </header>

            <section className='active-campaigns'>
                <div className='sub-title'>
                    <h2>Ativas</h2>
                </div>

                <div className='campaigns-info-bar'>
                    <div className='information-type-campaign'>
                        <p>Nome da campanha</p>
                    </div>

                    <div className='information-type-status'>
                        <p>Status</p>
                    </div>

                    <div className='information-type-start-date'>
                        <p>Data Início</p>
                    </div>

                    <div className='information-type-end-date'>
                        <p>Data Fim</p>
                    </div>

                </div>

                {listActiveCampaigns ? <div className='active-campaigns-container'>
                    {listActiveCampaigns.length === 0 && <div className={'empty-warning'}>
                        <p>Nenhum registo encontrado</p>
                    </div>}
                {listActiveCampaigns?.map((c,idx) => <CampaignCard key={idx} {...c}/>)}
                </div> : <p>A carregar...</p>}
            </section>

            <section className='inactive-campaigns'>
                <div className='sub-title'>
                    <h2>Inativas</h2>
                </div>

                {listInactiveCampaigns && <div className='campaigns-info-bar'>
                    <div className='information-type-campaign'>
                        <p>Nome da campanha</p>
                    </div>

                    <div className='information-type-status'>
                        <p>Status</p>
                    </div>

                    <div className='information-type-start-date'>
                        <p>Data Início</p>
                    </div>

                    <div className='information-type-end-date'>
                        <p>Data Fim</p>
                    </div>

                </div>}

                {listInactiveCampaigns ? <div className='inactive-campaigns-container'>
                    {listInactiveCampaigns.length === 0 && <div className={'empty-warning'}>
                        <p>Nenhum registo encontrado</p>
                    </div>}
                {listInactiveCampaigns?.map((c,idx) => <CampaignCard key={idx} {...c}/>)}
                </div> : <p>A carregar...</p>}
            </section>
        </div>
    </main>
}

export default Campaigns;
