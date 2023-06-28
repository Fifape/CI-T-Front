const formatDate = (date) => {

        const dateObj = new Date(date);
        const day = dateObj.getDate();
        const mouth = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();
        return `${day.toString().padStart(2, '0')}/${mouth.toString().padStart(2, '0')}/${year}`;
      
}

export default formatDate