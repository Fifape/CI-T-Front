import './navigation.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faPowerOff, faXmark, faPlus, faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import {useContext} from "../../providers/userContext";

function Navigation() {
    const navigate = useNavigate();
    const {logout, user} = useContext();

    const [showMenu, setShowMenu] = useState(false);

    return <nav className="navigation">
        <div className="navbar">
            {showMenu ? <FontAwesomeIcon className="faBars" icon={faXmark} onClick={() => setShowMenu(!showMenu)}/> : <FontAwesomeIcon className="faBars" icon={faBars} onClick={() => setShowMenu(!showMenu)}/>}

            <div className='top-navbar'>
                <div className='left-content'>
                 <div className='logo' onClick={() =>{
                     navigate("/campaigns");
                 }
                 }>
                      <svg width="55" height="32" viewBox="0 0 55 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                       d="M27.2124 4.71026L11.0931 20.8316C9.76307 22.0534 8.2729 22.6923 6.62208 22.7461C4.76109 22.6923 3.19322 22.0279 1.91731 20.7499C1.62829 20.4613 1.37434 20.1594 1.15046 19.8472C2.24781 20.6377 3.52154 21.0587 4.9769 21.1007C6.62746 21.0472 8.11763 20.4082 9.44819 19.1862L25.4593 3.17234C22.7043 1.06073 19.5389 0.00216641 15.9608 0.00216641C11.5452 0.00216641 7.79392 1.54482 4.70989 4.63154C1.62394 7.71647 0.05376 11.3875 0 15.6448V16.4416C0.05376 20.644 1.59706 24.2612 4.62925 27.2948C7.7673 30.433 11.5452 31.9757 15.9608 31.9231C20.3227 31.9231 24.0733 30.3539 27.2124 27.2148L43.3318 11.0936C44.6621 9.87148 46.1519 9.23225 47.8025 9.179C49.6637 9.23225 51.2317 9.89708 52.5075 11.1748C52.7969 11.4632 53.0505 11.7646 53.2745 12.0773C52.1774 11.2868 50.9033 10.8655 49.4479 10.8241C47.7974 10.8777 46.3071 11.5163 44.9766 12.7384L28.9655 28.7521C31.7206 30.8636 34.8859 31.9226 38.464 31.9226C42.8797 31.9226 46.6313 30.3796 49.7151 27.2936C52.8009 24.2084 54.3708 20.5371 54.4252 16.2801V15.4827C54.3708 11.2811 52.8278 7.66361 49.7957 4.62962C46.6573 1.4917 42.8797 -0.0506976 38.464 0.00127041C34.1021 0.00127041 30.3516 1.57081 27.2124 4.71026Z"
                       fill="white"/>
                  </svg>
                 </div>

                 <div className='menu-links'>
                    <NavLink to={'/campaigns'}>Atestados</NavLink>
                    <NavLink to={'/campaigns'}>Exame Periódico</NavLink>
                    <NavLink to={'/campaigns'}>Vacinação</NavLink>
                  </div>
                </div>

                <div className='rigth-content'>
                    <div className='menu-options'>
                        <button className='options-button'>
                            <FontAwesomeIcon icon={faPlus} className="plus-icon"/>
                            Enviar Atestado
                        </button>

                        <button className='options-button'>
                            Português PT-BR
                            <FontAwesomeIcon icon={faAngleDown}/>
                        </button>
                    </div>

                    <div className='user-info'>
                        <div className='user-details'>
                            <p>{user?.name}</p>
                            <p>{user?.email}</p>
                        </div>

                        <NavLink to={'/edit'}>
                            <div className='user-avatar' style={{backgroundImage:`url('/profilepic.jpg')`}}></div>
                        </NavLink>

                    </div>

                    <div className='icon' onClick={logout}>
                        <FontAwesomeIcon icon={faPowerOff}/>
                    </div>

                </div>
            </div>

            <div className='bottom-navbar'>
                <div className='left-content'>
                    <h2>Vacinação</h2>
                </div>

                <div className='square'></div>

                <div className='rigth-content'>
                    <div className='filter'>
                        <p>Mostrar:</p>
                    </div>
                   
                    <div className='filters'>
                        <p>Todos</p>
                    </div>
                </div>
            </div>
           
        </div>

       {showMenu && <div className='menu'>
            <div className='menu-links'>
                <NavLink to={'/campaigns'}>Atestados</NavLink>
                <NavLink to={'/campaigns'}>Exame Periódico</NavLink>
                <NavLink to={'/campaigns'}>Vacinação</NavLink>
            </div>
            
            <div className='menu-options'>
                <button className='options-button'>
                    <FontAwesomeIcon icon={faPlus} className="plus-icon"/>
                    Enviar Atestado
                </button>

                <button className='options-button'>
                     Português PT-BR
                    <FontAwesomeIcon icon={faAngleDown}/>
                </button>
            </div>
            
            <footer>
                <div className='icon' onClick={logout}>
                    <FontAwesomeIcon icon={faPowerOff}/>
                </div>

                <div className='user-info'>
                    <div className='user-details'>
                        <p>{user?.name}</p>
                        <p>{user?.email}</p>
                    </div>

                    <NavLink to={'/edit'}>
                        <div className='user-avatar' style={{backgroundImage:`url('/profilepic.jpg')`}}></div>
                    </NavLink>

                </div>
            </footer>
        </div>}

    </nav>
}

export default Navigation;