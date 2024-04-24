//Se le da funcionalidad al menu hamburguesa

let iconoAbrir = document.getElementById("abrir");

let iconoCerrar = document.getElementById
("cerrar");

let navItems = document.getElementById
("nav-items");

// const ocultarOperaciones = document.getElementById("ocultar_operaciones")
let nuevaOperacion = document.getElementById("nueva_operacion")
const sectionBalance = document.getElementById("section-balance")

iconoAbrir.addEventListener("click", () => { 
  iconoCerrar.style.display = "block";
  navItems.style.display ="block";
  navItems.style.backgroundColor ="#fff";
  navItems.style.color ="#4a4a4a";
  navItems.style.width ="100%";
  navItems.style.position ="absolute";
  navItems.style.top ="52px";
  navItems.style.height ="130px";
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
nuevaOperacion.addEventListener("click", function() {
  let ocultarOperaciones = document.getElementById("ocultar_operaciones");
  ocultarOperaciones.classList.toggle("hidden");
});

nuevaOperacion.addEventListener('click', () => {
  nuevaOperacion.classList.add('rotating');
  setTimeout(() => {
    nuevaOperacion.classList.remove('rotating');
  }, 1000); // ajusta la duración de la animación aquí (en milisegundos)
});
