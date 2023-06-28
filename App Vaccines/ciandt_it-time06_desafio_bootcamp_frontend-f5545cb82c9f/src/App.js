import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import axios from "axios";
import { ProviderUser } from './providers/userContext';

//Pages
import Campaigns from './components/campaigns/campaigns';
import Vaccines from './components/vaccines/vaccines';
import Login from "./components/login/login";
import Register from "./components/register/register";
import EditUser from "./components/editUser/editUser";

axios.defaults.withCredentials = true;

function App() {
    return (

        <BrowserRouter>
            <ProviderUser>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Register/>} />
                        <Route  path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/campaigns" element={<Campaigns/>}/>
                        <Route path="/:campaignId" element={<Vaccines/>}/>
                        <Route path="/edit" element={<EditUser/>}/>
                    </Routes>
                </div>
            </ProviderUser>
        </BrowserRouter>
    );
}

export default App;

