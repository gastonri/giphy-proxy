const API_KEY = 'api_key=QuYi0qDFEcf3j0Dzr2HvdncBvJgU46HR';
const endpointRandom = 'http://api.giphy.com/v1/gifs/random?' + 'api_key=' + API_KEY;

const cargarContenido = () => {
    cargarEventos();
    buscarSugerencias();
    buscarTendencias();
};

const cargarEventos = () => {
    const botonCrearGuifos = document.getElementById('boton-crear-gif');
    const inputBuscar = document.getElementById('input-buscar');

    botonCrearGuifos.addEventListener('click', () => {
        window.location.href = '/crear-gif.html';
    });
    inputBuscar.addEventListener('keypress', presionarEnterInput);
};

const presionarEnterInput = event => {
    if (event.keyCode === 13 && event.srcElement.value) {
        console.log('Hay valor');
    }
};

const buscarSugerencias = () => {
    const url = `https://api.giphy.com/v1/gifs/random?${API_KEY}`;
    let promesas = [];

    for (let index = 0; index <= 6; index++) {
        promesas.push(fetchContent(url));
    }

    Promise.all(promesas)
        .then(mostrarSugerencias)
        .catch(logError);
};

const mostrarSugerencias = sugerencias => {
    let wrapper = document.getElementById('sugerencias-card-wrapper');
    wrapper.innerHTML = '';

    sugerencias.forEach(sugerencia => {
        let gifContainer = document.createElement('div');
        gifContainer.classList.add('sugerencias-card-wrapper--img-container');

        let gif = document.createElement('img');
        gif.src = sugerencia.data.images.fixed_width_downsampled.url;
        gif.classList.add('sugerencias-card-wrapper--img-container--note');

        gifContainer.appendChild(gif);
        wrapper.appendChild(gifContainer);
    });
};

const buscarTendencias = () => {
    const url = `https://api.giphy.com/v1/gifs/trending?${API_KEY}&limit=6`;

    fetchContent(url, null)
        .then(mostrarTendencias)
        .catch(logError);
};

const fetchContent = async (url, headers) => {
    let respuesta = await fetch(url, headers);
    let datos = await respuesta.json();

    return datos;
};

const mostrarTendencias = tendencias => {
    let wrapper = document.getElementById('tendencias-card-wrapper');
    wrapper.innerHTML = '';

    tendencias.data.forEach(tendencia => {
        let gifContainer = document.createElement('div');
        gifContainer.classList.add('tendencias-card-wrapper--img-container');

        let gif = document.createElement('img');
        gif.src = tendencia.images.fixed_width_downsampled.url;
        gif.classList.add('tendencias-card-wrapper--img-container--note');

        gifContainer.appendChild(gif);
        wrapper.appendChild(gifContainer);
    });
};

const logError = (error, seccion) => {
    console.error(`Ocurrió un error al obtener la información: `, error);
};
