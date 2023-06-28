const formatStatus = (status) => {
 
    if(status === 1){
        return 'Cancelada';
    } else if(status === 2){
        return 'Adesão';
    } else if(status === 3){
        return 'Troca de Titulidade';
    } else if(status === 4){
        return 'Edição de Paciente';
    } else{
        return 'Finalizada';
    }
}

export default formatStatus