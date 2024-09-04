(() =>
{
    const startButton = document.querySelector('.start');
    const resetButton = document.querySelector('.reset');
    const stopwatch = document.querySelector('.stopwatch .time');
    const tbody = document.querySelector('.list table tbody');
    const table = document.querySelector('.list table');
    const volumeButton = document.querySelector('header i[class*="fa-volume"]');
    const bgButton = document.querySelector('header i[class*="fa-toggle"]');
    const list = document.querySelector('.list');

    let time = '';
    let miliseconds = 0;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    let nr = 0;
    let start = false; 
    let pixels = 10;

    let music = true;
    const clickA = new Audio('./sounds/click.wav');
    const wooshA = new Audio('./sounds/woosh.wav');
    const clockA = new Audio('./sounds/clock.wav');

    startButton.addEventListener('click', () => 
    {
        music && wooshA.play();

        if(!start)
        {
            startButton.style.borderColor = '#a72d2d';
            startButton.textContent = 'stop';
            resetButton.textContent = 'pomiar';
            resetButton.style.pointerEvents = 'auto';
        }
        else
        {
            startButton.style.borderColor = '#F08080';
            startButton.textContent = 'wznów';
            resetButton.textContent = 'resetuj';
        }

        start = !start;
        start && counter(miliseconds);
    });

    const counter = ms => 
    {
        if (start) 
        {
            ms++;

            music && clockA.play();

            if (ms === 99) 
            {
                seconds++;
                ms = 0;
            }

            if (seconds === 59) 
            {
                minutes++;
                seconds = 0;
            }

            if (minutes === 59) 
            {
                hours++;
                minutes = 0;
            }

            if (hours === 59) 
            {
                ms = 0;
                seconds = 0;
                minutes = 0;
                hours = 0;
            }

            time =
                `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}:${ms < 10 ? '0' + ms : ms}`;

            miliseconds = ms;
            stopwatch.textContent = time;

            setTimeout(() => counter(ms), 10);
        }
    };

    resetButton.addEventListener('click', () => 
    {
        music && clickA.play();

        if (start)
        {
            if(nr === 0) 
              tbody.innerHTML = "";

            if(nr > 2)
            {
                pixels += 31;
                table.style.marginTop = `${pixels}px`;
            }

            const el = 
                `<tr>
                    <td>${nr < 9 ? '0'+ ++nr : ++nr}</td>
                    <td>${stopwatch.innerHTML}</td>
                </tr>`;

            tbody.insertAdjacentHTML('beforeend', el);
            list.scrollTop = list.scrollHeight;
        }
        else 
        {
            miliseconds = 0;
            seconds = 0;
            minutes = 0;
            hours = 0;
            nr = 0;

            stopwatch.textContent = '00:00:00:00';
            startButton.textContent = 'start';
            startButton.style.borderColor = 'var(--secondary)';
            resetButton.textContent = 'pomiar';
            resetButton.style.pointerEvents = 'none';
            tbody.innerHTML = `<tr><td>01</td><td>-- -- -- --</td></tr>`;
            table.style.marginTop = '0px';
            pixels = 10;
            start = false;
        }
    });

    volumeButton.addEventListener('click', () => 
    {
        volumeButton.classList.toggle('fa-volume-xmark');
        volumeButton.classList.toggle('fa-volume-high');
        music = !music;
    });

    bgButton.addEventListener('click', () => 
    {
        bgButton.classList.toggle('fa-toggle-off');
        bgButton.classList.toggle('fa-toggle-on');
        document.body.classList.toggle('day');
    });

})();


