var audio = new Audio();

const dayCount = Math.floor(Date.now()/86400000);
const dailyIndex = dayCount%450+1;

fetch(`data/${dailyIndex}.json`)
    .then(response => response.json())
    .then(data => {
        data[0].poem.map((content,index) => {
            const poemLineElement = document.getElementById(`line-${index+1}`);
            poemLineElement.innerHTML = content;
        });
    });

const containerElement = document.getElementById('box');
    containerElement.addEventListener('click', () => {
        if (audio.paused) {
            fetch(`data/${randomNumber}.json`)
                .then(response => response.json())
                .then(data => {
                    audio.src = `data:audio/mpeg;base64,${data[0].audio}`;
                    audio.play();
                    audio.onended = () => {
                        audio.currentTime = 0;
                        audio.pause();
                    };
                });
        }
    });