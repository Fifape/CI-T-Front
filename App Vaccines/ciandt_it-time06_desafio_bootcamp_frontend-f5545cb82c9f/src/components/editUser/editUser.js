import "./editUser.css"
import Navigation from "../navigation/navigation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faUpload, faX, faCheck, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useRef, useState} from "react";
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import * as FormData from 'form-data';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useContext} from "../../providers/userContext";
import Dropdown from "react-dropdown";

function EditUser() {

    const {logout, user} = useContext();
    const [validate , setValidate] = useState(false)
    const [errorMenssage , setErrorMenssage] = useState('')
    //PopUps Manipulation
    const [galeryPopUp, setGaleryPopUp] = useState(false);
    const [changePasswordPopUp, setChangePasswordPopUp] = useState(false);
    const [editProfile, setEditProfile] = useState(false);
    const [uploadPicturePopUp, setUploadPicturePopUp] = useState(false);

    //Upload Manipulation
    const [phase, setPhase] = useState(1);
    const [dragActive, setDragActive] = useState(false);
    const [load, setLoad] = useState(false);
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    //Edit Values
    const [usernameValue, setUserameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [baseValue, setBaseValue] = useState('');
    const [baseLocations , setBaseLocations] = useState([]);
    const [selectedBase, setSelectedBase] = useState(null);
    const [pictureIdValue, setPictureIdValue] = useState(null);
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');

    useEffect(() => {
        setUserameValue(user?.username)
        setEmailValue(user?.email)
        setBaseValue(user?.base)
        setPictureIdValue(1)
    }, [user?.base, user?.email, user?.username]);

    useEffect(() => {
        axios.get('http://localhost:8080/base/all')
            .then(response => {
                setBaseLocations(response.data)
            })
            .catch(error => {
                console.error('Error retrieving user base locations:', error);
            })
    },[]);

    const handleBaseSelection = (option) => {
        setSelectedBase(option);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") setDragActive(true)
        if (e.type === "dragleave") setDragActive(false);
    };

    const uploadFile = async (file) => {
        setPhase(2);
        try {
            const formData = new FormData();
            formData.append('file', file);
            await axios.post(`http://localhost:8080/pictures/upload?userId=${user?.id}`, formData, {
                headers: {'Content-Type': 'multipart/form-data'},
                onUploadProgress: progressEvent => {
                    const {loaded, total} = progressEvent;
                    const percentage = Math.floor((loaded * 100) / total);
                    setUploadPercentage(percentage);
                }
            }).then((res) => {
                console.log(res.statusText)
                console.log(res.data)
                setPhase(3)
            })
        } catch (error) {
            console.error(error);
        }
    }


    const handleDrop = async (e) => { // triggered by drop
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        // eslint-disable-next-line no-throw-literal
        if (e.dataTransfer.files[0] > 1) throw "please drag only one file at a time.";
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            await uploadFile(e.dataTransfer.files[0])
            setLoad(true);
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.target.files && e.target.files[0]) {
            await uploadFile(e.target.files[0]);
            setLoad(true);
        }
    };

    const onButtonClick = () => {
        inputRef.current.click();
    };


    const updateUser = () => {
        try {
            axios.put(`http://localhost:8080/user/edit/${user?.id}?username=${usernameValue}&email=${emailValue}&baseId=${selectedBase?.value}&pictureId=1`)
                .then(r => {
                    logout()
                    window.location.reload()
                setTimeout(() => {
                    navigate('/')
                }, 2000);
            });
        } catch (e) {
            console.log('err', e.response)
        }
    }

    const editPassword = () => {
            setValidate(true)
            if(passwordValue === confirmPasswordValue && passwordValue && confirmPasswordValue){
                axios.put(`http://localhost:8080/user/edit/password/${user?.id}?password=${passwordValue}`)
                    .then(r => {
                        logout()
                        window.location.reload()
                        setTimeout(() => {
                            navigate('/')
                        }, 2000);
                    })
                    .catch((e) => {
                    console.log('err', e.response)
                    setErrorMenssage(e?.response.data.message)
                })
            }
    }

    return <div className="edit_user">
        <Navigation/>

        <div className={'container'}>
            <div className={'header'}>
                <h1>Perfil</h1>
            </div>

            <section className={'picture-section'}>
                <div className={'profile-picture'} style={{backgroundImage: `url('/profilepic.jpg')`}}></div>

                <div className={'buttons'}>
                    <button onClick={() => setGaleryPopUp(true)}>Galeria</button>
                    <button onClick={() => setUploadPicturePopUp(true)}>Upload</button>
                </div>
            </section>

            <section className={'info-section'}>
                <div className={'name info'}>
                    <h4>Nome:</h4>
                    <p>{user?.name}</p>
                </div>

                <div className={'email info'}>
                    <h4>Email:</h4>
                    {!editProfile && <p>{emailValue}</p>}
                    {editProfile && <input type={'text'} value={emailValue} onChange={(e) => setEmailValue(e.target.value)}/>}
                </div>

                <div className={'username info'}>
                    <h4>Username:</h4>
                    {!editProfile && <p>{usernameValue}</p>}
                    {editProfile && <input type={'text'} value={usernameValue} onChange={(e) => setUserameValue(e.target.value)}/>}
                </div>

                <div className={'base info'}>
                    <h4>Base:</h4>
                    {!editProfile && <p>{baseValue}</p>}
                    {editProfile && <Dropdown
                        options={baseLocations.map(base => ({value: base.id, label: base.location}))}
                        placeholder={baseValue}
                        value={selectedBase}
                        onChange={handleBaseSelection}
                        controlRenderer={({ selectedItem }) => (
                            <div className="dropdown-header" onClick={() => setSelectedBase(selectedItem)}>
                                {selectedItem ? selectedItem.label : "Selecione sua base"}
                                <FontAwesomeIcon icon={faChevronRight} className={`iconArrow ${selectedItem && "iconArrowOpen"}`} />
                            </div>
                        )}
                        arrowClosed={<FontAwesomeIcon icon={faChevronRight} className="iconArrow"/>}
                        arrowOpen={<FontAwesomeIcon icon={faChevronRight} className="iconArrowOpen"/>}
                    />}
                </div>

                <div className={'password info'}>
                    <h4>Password:</h4>
                    <button onClick={() => setChangePasswordPopUp(true)}>Mudar Password <FontAwesomeIcon icon={faLock}/></button>
                </div>

                <div className={'buttons info'}>
                    {editProfile && <button onClick={() => setEditProfile(false)}>Cancelar</button>}
                    {!editProfile ? <button onClick={() =>{setEditProfile(true)}}>Editar Perfil</button> : <button onClick={updateUser}>Concluir</button>}
                </div>
            </section>

            {uploadPicturePopUp && <div className={'upload-picture-pop-up'}>
                <div className={"upload-container"}>
                    <div className={'picture-upload-title'}>
                        {phase !== 3 && <h4>Upload de uma nova foto</h4>}
                        {phase === 3 && <h4>Upload concluído</h4>}
                    </div>

                    <FontAwesomeIcon className={'icon'} icon={faX} onClick={() => setUploadPicturePopUp(false)}/>

                    {(phase !== 3 && phase !== 4) && <form className={"upload-drag-picture"} onDragEnter={handleDrag}
                                                           onSubmit={(e) => e.preventDefault()
                                                           }>
                        {!load && <input ref={inputRef} type={"file"} id={"input-picture-upload"} multiple={false}
                                         onChange={handleClick}/>}
                        <label id={"label-file-upload"} htmlFor={"input-file-upload"}
                               className={dragActive ? "active" : ""}>
                            <div className={"drag-container"}>
                                {phase === 1 &&
                                    <div className={"drag-container-info"}>
                                        <div className={'drag-container-info-icon'}>
                                            <FontAwesomeIcon icon={faUpload}/>
                                        </div>
                                        <button className={"drag-container-info-upload-button"}
                                                onClick={onButtonClick}></button>
                                    </div>
                                }
                                {phase === 2 && <div className="progress-container">
                                    <CircularProgressbar className={'progress-circular-bar'}
                                                         value={uploadPercentage}
                                                         styles={buildStyles({
                                                             rotation: 0.15,
                                                             strokeLinecap: 'round',
                                                             textSize: '12px',
                                                             trailColor: 'var(--circular-bar)',
                                                             backgroundColor: 'var(--circular-bar)',

                                                         })}
                                    />
                                    <div className={'progress-container-progress-bar'}>
                                        <div className={'progress-bar-text'}><p>{uploadPercentage}%</p></div>
                                        <div className="progress-container-bar">
                                            <span className="progress-bar-fill"
                                                  style={{width: uploadPercentage + "%"}}></span>
                                        </div>
                                    </div>

                                    <div className="loading-video-text">
                                        <p>A carregar o seu vídeo,</p>
                                        <p>por favor aguarde...</p>
                                    </div>
                                </div>}
                            </div>
                        </label>
                        {dragActive && !load && <div id="drag-area" onDragEnter={handleDrag} onDragLeave={handleDrag}
                                                     onDragOver={handleDrag} onDrop={handleDrop}></div>}
                    </form>}
                    {phase === 4 && <div className={'upload-video-end'}>
                        <div className={'upload-video-end-container'}>
                            <FontAwesomeIcon icon={faCheck}/>
                        </div>
                    </div>}
                </div>
            </div>}

            {changePasswordPopUp && <div className={'change-password-pop-up'}>
                <div className={'popup-container'}>
                    <div className={'popup-title'}>
                        <h4>Mudar a password</h4>
                    </div>

                    <FontAwesomeIcon className={'icon'} icon={faX} onClick={() => setChangePasswordPopUp(false)}/>

                    <div className={'inputs'}>
                        <div className={'new-password'}>
                            <p>Nova password:</p>
                            <input type={"password"} placeholder={'Nova password'} value={passwordValue}
                                   onChange={(e) =>{
                                       setPasswordValue(e.target.value)
                                       setErrorMenssage('')
                                   }}/>

                            {!passwordValue && validate &&
                                <div className={'edit-invalid-credencial'}><p>Password Inválida</p></div>}
                        </div>

                        <div className={'repeat-new-password'}>
                            <p>Confirma password:</p>
                            <input type={"password"} placeholder={'Confirma password'} value={confirmPasswordValue}
                                   onChange={(e) => {
                                       setConfirmPasswordValue(e.target.value)
                                       setErrorMenssage('')
                                   }}/>

                            {!confirmPasswordValue && validate &&
                                <div className={'edit-invalid-credencial'}><p>Password Inválida</p></div>}
                            {validate && passwordValue !== confirmPasswordValue &&
                                <div className={'edit-invalid-credencial'}><p>Passwords diferentes</p></div>}
                            {validate && <div className={'edit-invalid-credencial'}><p>{errorMenssage}</p></div>}
                        </div>
                    </div>

                    <div className={'buttons'}>
                        <button onClick={editPassword}>Salvar Password</button>
                    </div>

                </div>
            </div>}
        </div>
    </div>
}

export default EditUser;