(() => 
{
    const key = 'bd276e2c3c04cf592fda6a20a26c30c2';
    const searchButton = document.querySelector('.search-bar button')
    const cloud = document.querySelector('.cloud');
    const temparature = document.querySelector('.temperature');
    
    document.addEventListener('keypress', (e) => e.key === "Enter" && weather(url())) ;
    searchButton.addEventListener('click', () => weather(url()));
    
    const url = () => `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${document.querySelector('.search-bar input').value}&appid=${key}`;
    
    async function weather(url) 
    {
        cloud.textContent = "Ładowanie...";
        temparature.textContent = "";
    
        const response = await fetch(url);
        if (response.status == 404) 
            cloud.textContent = "Błędna miejscowość";
        else if(response.status == 400)
            cloud.textContent = "Wpisz miejscowość aby wyświetlić pogodę";
        else 
        {
            const data = await response.json();
            const img = document.createElement('img');
            img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            cloud.textContent = "";
            cloud.appendChild(img);
            temparature.textContent = data.name;
            temparature.innerHTML += ` ${Math.round(data.main.temp)}&#x2103;`;
        }
    }
})();


