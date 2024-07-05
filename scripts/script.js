//variables
const btnEncriptar = document.getElementById("encriptar");
const btnDesencriptar = document.getElementById("desencriptar");
const btnCopiar = document.getElementById("copiarTexto");

const asideEncriptado = document.querySelector(".aside__encriptado");
const asideInfo = document.querySelector(".aside__info");

//controlador
const regex = /^[a-zA-Z\s]*$/;
const validarTexto = (texto) => regex.test(texto);

// logica de encriptacion
const claveEncriptacion = {
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat",
};

//controlador
document.addEventListener("DOMContentLoaded", function () {
    btnEncriptar.addEventListener("click", () => {
        let txtInput = obtenerTextoInput("inputTexto");

        if (!txtInput) {
            alert("Texto vacio");
            return;
        }
        let textoEncriptado = encriptarTexto(txtInput, claveEncriptacion);

        asideEncriptado.classList.remove("activo");
        asideInfo.classList.add("activo");

        mostrarTexto(textoEncriptado);
    });

    btnDesencriptar.addEventListener("click", () => {
        let txtInput = obtenerTextoInput("inputTexto");

        if (!txtInput) {
            alert("Texto vacio");
            return;
        }
        let textoDesencriptado = deseencriptarTexto(
            txtInput,
            claveEncriptacion
        );
        mostrarTexto(textoDesencriptado);
    });

    btnCopiar.addEventListener("click", () => {
        copiarAlPortapapeles(obtenerTextoInput("inputIncriptado"));
    });
});

//funciones
const obtenerTextoInput = (nombreinput) =>
    document.getElementById(nombreinput).value;

function mostrarTexto(texto) {
    document.getElementById("inputIncriptado").value = texto;
}

let encriptarTexto = (texto, codigos) => {
    if (!validarTexto(texto)) {
        alert("Texto incorrecto");
        return;
    }

    //logica para encriptar
    const arrayDeCaracteres = texto.split("");

    const resumido = arrayDeCaracteres.map((letra) => {
        return codigos[letra] ? codigos[letra] : letra;
    });

    return resumido.join("");
};

let deseencriptarTexto = (texto, codigos) => {
    if (!validarTexto(texto)) {
        alert("Texto incorrecto");
        return;
    }

    let textoDesencriptado = texto;

    for (const letra in codigos) {
        const codigo = codigos[letra];

        while (textoDesencriptado.includes(codigo)) {
            textoDesencriptado = textoDesencriptado.replace(codigo, letra);
        }
    }
    return textoDesencriptado;
};

function copiarAlPortapapeles(texto) {
    navigator.clipboard
        .writeText(texto)
        .then(function () {
            alert("Texto copiado al portapapeles");
        })
        .catch(function (error) {
            alert("Hubo un error al copiar el texto: ", error);
        });
}
