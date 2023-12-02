let clima = {

    apiKey: "1f16105ad8dcdf0ca47e858bc28c15bd",

    obtenerClima: function(ciudad) {
        fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" +
                ciudad +
                "&units=metric&lang=es&appid=" +
                this.apiKey
            )
            .then((respuesta) => {
                if (!respuesta.ok) {
                    alert("No se encontró información del clima.");
                    throw new Error("No se encontró información del clima.");
                }
                return respuesta.json();
            })
            .then((datos) => this.mostrarClima(datos));
    },

    obtenerPronostico: function(ciudad) {
        fetch(
                "https://api.openweathermap.org/data/2.5/forecast?q=" +
                ciudad +
                "&units=metric&lang=es&cnt=4&appid=" +
                this.apiKey
            )
            .then((respuesta) => {
                if (!respuesta.ok) {
                    alert("No se encontró información del pronóstico.");
                    throw new Error("No se encontró información del pronóstico.");
                }
                return respuesta.json();
            })
            .then((datos) => this.mostrarPronostico(datos));
    },

    mostrarClima: function(datos) {
        const {
            name
        } = datos;
        const {
            icon,
            description
        } = datos.weather[0];
        const {
            temp,
            humidity
        } = datos.main;
        const {
            speed
        } = datos.wind;
        document.querySelector(".ciudad").innerText = "Clima actual en " + name;
        document.querySelector(".icono").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".descripcion").innerText = description;
        document.querySelector(".temperatura").innerText = temp + "°C";
        document.querySelector(".humedad").innerText =
            "Humedad: " + humidity + "%";
        document.querySelector(".viento").innerText =
            "Velocidad del viento: " + speed + " km/h";
        document.querySelector(".clima").classList.remove("cargando");

        this.obtenerPronostico(name);
    },

    mostrarPronostico: function(datos) {
        const datosPronostico = datos.list.slice(1, 4); // Cambiado de (1, 3) a (1, 4)

        const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

        const contenedorPronostico = document.querySelector(".pronostico");
        contenedorPronostico.innerHTML = "";

        datosPronostico.forEach((item, index) => {
            const fecha = new Date(item.dt * 1000);
            const nombreDia = dias[(fecha.getDay() + index) % 7];
            const tempMin = item.main.temp_min;
            const tempMax = item.main.temp_max;
            const icono = item.weather[0].icon;
            const descripcion = item.weather[0].description;

            const elementoPronostico = document.createElement("div");
            elementoPronostico.classList.add("item-pronostico");
            elementoPronostico.innerHTML = `
                <div class="dia">${nombreDia}</div>
                <img src="https://openweathermap.org/img/wn/${icono}.png" alt="Icono del clima" class="icono-pronostico">
                <div class="temperatura">Mínima: ${tempMin}°C Máxima: ${tempMax}°C</div>
                <div class="descripcion">${descripcion}</div>`;
            contenedorPronostico.appendChild(elementoPronostico);
        });
    },

    buscar: function() {
        const ciudad = document.querySelector(".barra-busqueda").value;
        this.obtenerClima(ciudad);
    },
};

document.querySelector(".busqueda button").addEventListener("click", function() {
    clima.buscar();
});

document.querySelector(".barra-busqueda").addEventListener("keyup", function(evento) {
    if (evento.key === "Enter") {
        clima.buscar();
    }
});

clima.obtenerClima("Encarnacion");