var audio = new Audio();

fetch('https://rubai.onrender.com/api/random')
    .then(response => response.json())
    .then(id => {
        savedID = id;
        fetch(`https://rubai.onrender.com/api/poem/${id}`)
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
                audio.src = `https://rubai.onrender.com/api/audio/${id}`;
                audio.play();
            }
        });
}); 
