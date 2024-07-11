//variables
const btnEncriptar = document.getElementById("encriptar");
const btnDesencriptar = document.getElementById("desencriptar");
const btnCopiar = document.getElementById("copiarTexto");

const asideEncriptado = document.querySelector(".aside__encriptado");
const asideInfo = document.querySelector(".aside__info");

//controlador
const regex = /^[a-zA-ZñÑ\s]*$/;
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
        let txtInput = validarYObtenerTexto("inputTexto");

        if (txtInput === null) return;

        let textoEncriptado = encriptarTexto(txtInput, claveEncriptacion);

        asideEncriptado.classList.remove("activo");
        asideInfo.classList.add("activo");
        sweetMensaje('info', 'Texto Encriptado', 'Se encriptó el texto correctamente');
        mostrarTexto(textoEncriptado);
    });

    btnDesencriptar.addEventListener("click", () => {
        let txtInput = validarYObtenerTexto("inputTexto");

        if (txtInput === null) return;

        let textoDesencriptado = deseencriptarTexto(
            txtInput,
            claveEncriptacion
        );
        sweetMensaje('info', 'Texto Desencriptado', 'Se desencriptó el texto correctamente');

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
    //logica para encriptar
    const arrayDeCaracteres = texto.split("");

    const resumido = arrayDeCaracteres.map((letra) => {
        return codigos[letra] ? codigos[letra] : letra;
    });

    return resumido.join("");
};

let deseencriptarTexto = (texto, codigos) => {
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
            sweetMensaje("success", "Éxito", "Texto copiado al portapapeles");
        })
        .catch(function (error) {
            sweetMensaje("error", "Error", "Hubo un error al copiar el texto");
        });
}

function validarYObtenerTexto(idInput) {
    let txtInput = obtenerTextoInput(idInput);

    if (!txtInput) {
        sweetMensaje("error", "Error", "El campo no puede estar vacío");
        return null;
    }

    if (!validarTexto(txtInput)) {
        sweetMensaje(
            "error",
            "Error de validación",
            "Solo se permiten letras minúsculas y sin acentos"
        );
        return null;
    }

    return txtInput;
}

function sweetMensaje(icon, titulo, mensaje) {
    Swal.fire({
        icon: icon,
        title: titulo,
        text: mensaje,
        confirmButtonText: "Aceptar",
        customClass: {
            confirmButton: "alert_button",
        },
    });
}
