let recorder;

const cargarEventos = () => {
    const botonComenzar = document.getElementById('boton-comenzar');
    botonComenzar.addEventListener('click', mostrarPrecaptura);
};

const mostrarPrecaptura = () => {
    const videoTag = document.createElement('video');
    videoTag.classList.add('crear-guifos-section--content-video');
    videoTag.setAttribute('id', 'content-video');

    const barraInferior = document.createElement('div');
    barraInferior.classList.add('crear-guifos-section--content-barra-inferior');

    const timer = document.createElement('div');
    timer.innerHTML = '00:00:00';
    timer.classList.add('crear-guifos-section--content-barra-inferior-timer');
    timer.setAttribute('id', 'timer');

    const botonListo = document.createElement('button');
    botonListo.innerHTML = 'Listo';
    botonListo.classList.add(
        'crear-guifos-section--content-barra-inferior-boton-listo'
    );
    botonListo.setAttribute('id', 'boton-listo');
    botonListo.addEventListener('click', comenzarVideo);

    barraInferior.appendChild(timer);
    barraInferior.appendChild(botonListo);

    let crearSection = document.getElementById('crear-section');
    while (crearSection.firstChild) {
        crearSection.removeChild(crearSection.firstChild);
    }
    crearSection.appendChild(videoTag);
    crearSection.appendChild(barraInferior);

    solicitarPermisos();
};

const solicitarPermisos = () => {
    navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then(mostrarCamara)
        .catch((error) => {
            console.log('Error al mostrar video', error);
        });
};

const mostrarCamara = async (stream) => {
    const video = document.getElementById('content-video');
    video.srcObject = stream;
    video.play();
};

const comenzarVideo = () => {
    navigator.mediaDevices
        .getUserMedia({ audio: true, video: { height: { max: 480 } } })
        .then(grabarVideo)
        .catch((error) => {
            console.log('Error al grabar video', error);
        });
};

const grabarVideo = async (stream) => {
    recorder = RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240
    });
    recorder.startRecording();
    recorder.camera = stream;

    const sleep = (m) => new Promise((r) => setTimeout(r, m));
    await sleep(3000);

    recorder.stopRecording(function() {
        recorder.camera.stop();

        const video = document.getElementById('content-video');

        // let blob = recorder.getBlob();
        // objectURL = URL.createObjectURL(blob);
        // video.src = objectURL;

        let img = document.createElement('img');
        img.setAttribute('id', 'nuevo-gif');
        img.src = URL.createObjectURL(recorder.getBlob());
        video.replaceWith(img);
    });
};
