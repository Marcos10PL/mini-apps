(() => 
{
    const time = document.querySelector(".time");
    const date = document.querySelector(".date");
    const APIurl = "https://worldtimeapi.org/api/ip";
    
    async function getCurrentTimeAndDate() 
    {
      try 
      {
          const response = await fetch(APIurl);
          const data = await response.json();

          const currentTimeAndDate = new Date(data.utc_datetime);
          const hours = currentTimeAndDate.getHours();
          const minutes = currentTimeAndDate.getMinutes();
          const day = currentTimeAndDate.getDate();
          const month = currentTimeAndDate.getMonth() + 1;
          const year = currentTimeAndDate.getFullYear();

          if (isNaN(hours) || isNaN(minutes) || isNaN(day) || isNaN(month) || isNaN(year)) 
              throw new Error('Błąd przy pobieraniu danych');

          time.textContent = `${hours < 10 ? '0'+hours : hours}:${minutes < 10 ? '0'+minutes : minutes}`;
          date.textContent = `${day < 10 ? '0'+day : day}.${month < 10 ? '0'+month : month}.${year}`;
      } 
      catch (error) 
      {
          // console.error('Błąd', error);
          time.parentElement.textContent = "Błąd po stronie serwera";
      }
    }
    
    document.addEventListener('DOMContentLoaded', () => getCurrentTimeAndDate(APIurl));
})();



