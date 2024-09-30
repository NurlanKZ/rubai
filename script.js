var audio = new Audio();

const randomNumber = Math.ceil(Math.random() * 450);

console.log(randomNumber);
fetch(`data/${randomNumber}.json`)
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
                    audio.onended = () => audio.pause();
                });
        }
    });