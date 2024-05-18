var audio = new Audio();

fetch('http://10.154.0.2:8000/api/random')
    .then(response => response.json())
    .then(id => {
        savedID = id;
        fetch(`http://10.154.0.2:8000/api/poem/${id}`)
            .then(response => response.json())
            .then(data => {
                if (data.length==4) {
                    data.map(({content},index) => {
                        const poemLineElement = document.getElementById(`line-${index+1}`);
                        poemLineElement.innerHTML = content;
                    });
                }
        });
        
        const containerElement = document.getElementById('box');
        containerElement.addEventListener('click', () => {
            if (audio.paused) {
                audio.src = `http://10.154.0.2:8000/api/audio/${id}`;
                audio.play();
            }
        });
}); 
