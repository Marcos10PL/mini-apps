(() => 
{
    const time = document.querySelector(".time");
    const date = document.querySelector(".date");
    const APIurl = "http://worldtimeapi.org/api/ip";
    
    const getCurrentTimeAndDate = APIurl => 
    {
        
        setInterval(() => 
        {
            fetch(APIurl)
            .then(response => response.json())
            .then(data => 
            {
                const currentTimeAndDate = new Date(data.utc_datetime);
                const hours = currentTimeAndDate.getHours();
                const minutes = currentTimeAndDate.getMinutes();
                const day = currentTimeAndDate.getDate();
                const month = currentTimeAndDate.getMonth() + 1;
                const year = currentTimeAndDate.getFullYear();
                
                time.textContent = `${hours < 10 ? '0'+hours : hours}:${minutes < 10 ? '0'+minutes : minutes}`;
                date.textContent = `${day < 10 ? '0'+day : day}.${month < 10 ? '0'+month : month}.${year}`;
                
                isNaN(hours || minutes || day || month || year) ? time.parentElement.textContent = "Błąd po stronie serwera" : '';
            })
            .catch(error => console.error('Błąd', error));
        }, 1000);
    }
    
    document.addEventListener('DOMContentLoaded', () => getCurrentTimeAndDate(APIurl));
})();



