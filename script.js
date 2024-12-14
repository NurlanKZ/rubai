const audio = new Audio();

const dayCount = Math.floor(Date.now()/86400000);
let dailyIndex = dayCount%450+1;
initPage();  

function initPage() {
    fetch(`data/${dailyIndex}.json`)
        .then(response => response.json())
        .then(data => {
            data[0].poem.map((content,index) => {
                const poemLineElement = document.getElementById(`line-${index+1}`);
                poemLineElement.innerHTML = content;
            });
            audio.src = `data:audio/mpeg;base64,${data[0].audio}`;
        });

    const containerElement = document.getElementById('box');
    containerElement.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            audio.onended = () => {
                audio.currentTime = 0;
                audio.pause();
            };
        }
    });
}

const arrowElements = document.querySelectorAll('.arrow');
arrowElements.forEach(element => {
    element.addEventListener('click', (event) => {
        dailyIndex = (dailyIndex+parseInt(event.target.dataset.delta)+449)%450+1;
        initPage();
    });
});
