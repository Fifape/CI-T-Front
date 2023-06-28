const formatPendentStatus = (status) => {

    if(status === 1){
        return 'Aguardando Destinatário';
    } else if(status === 2){
        return 'Tranferência Cancelada';
    } else if(status === 3){
        return 'Tranferência Recusada';
    } else if(status === 4){
        return 'Tranferência Aceite';
    } else{
        return 'Status não encontrado';
    }
}

export default formatPendentStatus;