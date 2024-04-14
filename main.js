//Se le da funcionalidad al menu hamburguesa

let iconoAbrir = document.getElementById("abrir");

let iconoCerrar = document.getElementById
("cerrar");

let navItems = document.getElementById
("nav-items");

const ocultarOperaciones = document.getElementById("ocultar_operaciones")
const nuevaOperacion = document.getElementById("nueva_operacion")
const sectionBalance = document.getElementById("section-balance")

iconoAbrir.addEventListener("click", () => { 
  iconoCerrar.style.display = "block";
  navItems.style.display ="block";
  iconoAbrir.style.display = "none";
  sectionBalance.style.transform = "translateY(100px)"


})

iconoCerrar.addEventListener("click", () => {
  iconoAbrir.style.display = "block";
  navItems.style.display ="none";
  iconoCerrar.style.display = "none";
  sectionBalance.style.transform = "translateY(0px)"
})

// revisar
ocultarOperaciones.addEventListener("click", () =>{
    nuevaOperacion.style.display = "block";
})