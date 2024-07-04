//variables
const btnEncriptar = document.getElementById("encriptar");
const btnDesencriptar = document.getElementById("deseencriptar");

//controlador
const regex = /^[a-zA-Z\s]*$/;

//funcionamiento

document.addEventListener("DOMContentLoaded", function () {
    btnEncriptar.addEventListener("click", EncriptarTexto);
});

//funciones
let obtenerTextoArea = () => {
    return document.getElementById("inputTexto").value;
};

function EncriptarTexto() {
    const texto = obtenerTextoArea();

    //validacion de datos
    const textoValidado = regex.test(texto);

    if (!textoValidado) {
        alert("texto incorrecto");
        return;
    }

    //encriptar texto
    const arrayDeCaracteres = texto.split("");

    //cambios
    const codigos = {
        a: "ai",
        e: "enter",
        i: "imes",
        o: "ober",
        u: "ufat",
    };


    const resumido = arrayDeCaracteres.map((letra) => {
        return codigos[letra] ? codigos[letra] : letra;
    });
    alert(resumido.join(""))
    mostrarTexto(resumido.join(""));
}

function mostrarTexto(texto){
    document.getElementById('inputIncriptado').value = texto;
}