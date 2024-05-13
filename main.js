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
  seccionCategorias.style.transform = "translateY(120px)"
})

iconoCerrar.addEventListener("click", () => {
  iconoAbrir.style.display = "block";
  navItems.style.display ="none";
  iconoCerrar.style.display = "none";
  sectionBalance.style.transform = "translateY(0px)"
  seccionCategorias.style.transform = "translateY(0px)"

})


// **funcionalidad de los item del navegador hacia sus respectivas secciones.
let verBalance = document.getElementById("ver-balance");
let verCategorias = document.getElementById("ver-categorias");
//let verReportes = document.getElementById("ver-reportes");

let seccionCategorias = document.getElementById("categoria");
// falta la seccion reporte.

verCategorias.addEventListener("click", () => {
  seccionCategorias.style.display = "block";
  sectionBalance.style.display = "none";
})

verBalance.addEventListener("click", () => { 
  sectionBalance.style.display = "block";
  seccionCategorias.style.display = "none";
//falta seccion reporte  
});


 
//***** Funcionalidad de la seccion categorias  FALTA TERMINAR*********
const catIngresadas = document.getElementById("cat-ingresadas");
const botonAgregarCategoria = document.getElementById("boton-agregar-categoria");

// Array para almacenar las categorías
let categorias = [];

function agregarCategoria() {
  const categoriaInput = document.getElementById('categoria-input');
  const nuevaCategoria = categoriaInput.value.trim();

  if (nuevaCategoria !== '') {
    categorias.push(nuevaCategoria);
    categoriaInput.value = ''; // Limpiar el campo de entrada
    mostrarCategorias();
  }
}

function eliminarCategoria(index) {
  categorias.splice(index, 1);
  mostrarCategorias();
}


function mostrarCategorias() {
  const listaCategorias = document.getElementById('listaCategorias');
  listaCategorias.innerHTML = '';

  categorias.forEach((categoria, index) => {
    const li = document.createElement('li');
    li.textContent = categoria;
    li.style.backgroundColor ="red";
    li.style.Width="30%";

    const ContenedorBotones = document.createElement('div');
    ContenedorBotones.classList.add('contenedor_botones');
    ContenedorBotones.style.backgroundColor ="blue";

    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.style.Width="40%";
    btnEditar.style.paddingLeft= "15px";

    btnEditar.addEventListener("click", () => {
      seccionCategorias.style.display = "none"; // Ocultar la sección de categorías
      const seccionEditarCateg = document.getElementById('editar-categ');
      seccionEditarCateg.style.display = 'block'; //no FUNCIONA VERRR
    });

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.style.Width="40%";
    btnEliminar.style.paddingRight= "10px";

    btnEliminar.addEventListener('click', () => eliminarCategoria(index));

    li.appendChild(btnEditar);
    li.appendChild(btnEliminar);
   

    listaCategorias.appendChild(li);
  });



  function mostrarSeccionEditarCategoria() {
    const seccionEditarCateg = document.getElementById('editar-categ');
    seccionEditarCateg.style.display = 'block';
  }
}








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
})
