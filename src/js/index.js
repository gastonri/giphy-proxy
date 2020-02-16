const API_KEY = 'api_key=QuYi0qDFEcf3j0Dzr2HvdncBvJgU46HR';
const endpointRandom =
    'http://api.giphy.com/v1/gifs/random?' + 'api_key=' + API_KEY;

const cargarContenido = () => {
    buscarSugerencias();
    cargarEventos();
}

const buscarSugerencias = () => {
    let url = `https://api.giphy.com/v1/gifs/trending?${API_KEY}`;

    fetchContent(url, null)
        .then(mostrarSugerencias)
        .catch((error) => {
            console.error('Error', error);
        });
};

const cargarEventos = () => {
    const botonCrearGuifos = document.getElementById('boton-crear-gif');

    botonCrearGuifos.addEventListener('click', () => {
        window.location.href = "/crear-gif.html"
    });
}

const fetchContent = async (url, headers) => {
    let respuesta = await fetch(url, headers);
    let datos = await respuesta.json();

    return datos;
};

const mostrarSugerencias = (sugerencias) => {
    console.log(sugerencias);
    let wrapper = document.getElementById('sugerencias-card-wrapper');
    wrapper.innerHTML = '';

    // for (let i = 0; i < 3; i++) {
    //     let gifContainer = document.createElement('div');
    //     gifContainer.classList.add('sugerencias-card-wrapper--img-container');

    //     let gif = document.createElement('img')
    //     gif.src = sugerencias.data[i].images.original.url
    //     gif.classList.add('sugerencias-card-wrapper--img-container--note');

    //     gifContainer.appendChild(gif);
    //     wrapper.appendChild(gifContainer);
    // }

    sugerencias.data.forEach((sugerencia) => {
        let gifContainer = document.createElement('div');
        gifContainer.classList.add('sugerencias-card-wrapper--img-container');

        let gif = document.createElement('img');
        gif.src = sugerencia.images.original.url;
        gif.classList.add('sugerencias-card-wrapper--img-container--note');

        gifContainer.appendChild(gif);
        wrapper.appendChild(gifContainer);
    });
};
