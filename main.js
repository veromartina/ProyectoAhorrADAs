//Se le da funcionalidad al menu hamburguesa

const iconoAbrir = document.getElementById("abrir");
const iconoCerrar = document.getElementById
  ("cerrar");
const navItems = document.getElementById
  ("nav-items");

// const ocultarOperaciones = document.getElementById("ocultar_operaciones")
const nuevaOperacion = document.getElementById("nueva_operacion");
const sectionBalance = document.getElementById("section-balance");
const seccionCategorias = document.getElementById("categoria");
const edicionCateg = document.getElementById("editar-categorias");
const seccionReportes = document.getElementById("reportes");

iconoAbrir.addEventListener("click", () => {
  iconoCerrar.style.display = "block";
  navItems.style.display = "block";
  navItems.style.backgroundColor = "#fff";
  navItems.style.color = "#4a4a4a";
  navItems.style.width = "100%";
  navItems.style.position = "absolute";
  navItems.style.top = "52px";
  navItems.style.height = "130px";
  iconoAbrir.style.display = "none";
  sectionBalance.style.transform = "translateY(100px)";
  seccionCategorias.style.transform = "translateY(120px)";
  seccionReportes.style.transform = "translateY(120px)";
  edicionCateg.style.transform = "translateY(120px)";
})

iconoCerrar.addEventListener("click", () => {
  iconoAbrir.style.display = "block";
  navItems.style.display = "none";
  iconoCerrar.style.display = "none";
  sectionBalance.style.transform = "translateY(0px)"
  seccionCategorias.style.transform = "translateY(0px)"
  seccionReportes.style.transform = "translateY(0px)"
  edicionCateg.style.transform = "translateY(0px)";

})

// **funcionalidad de los item del navegador hacia sus respectivas secciones.
//item del menu hamburguesa
const verBalance = document.getElementById("ver-balance");
const verCategorias = document.getElementById("ver-categorias");
const verReportes = document.getElementById("ver-reportes");

//abrir y cerrar secciones 
verBalance.addEventListener("click", () => {
  sectionBalance.style.display = "block";
  seccionCategorias.style.display = "none";
  seccionReportes.style.display = "none";
});

verCategorias.addEventListener("click", () => {
  seccionCategorias.style.display = "block";
  sectionBalance.style.display = "none";
  seccionReportes.style.display = "none";
});

verReportes.addEventListener("click", () => {
  seccionReportes.style.display = "block";
  sectionBalance.style.display = "none";
  seccionCategorias.style.display = "none";
});


//***** Funcionalidad de la seccion categorias  FALTA TERMINAR estilos!!!!!!

const catIngresadas = document.getElementById("cat-ingresadas");
const botonAgregarCategoria = document.getElementById("boton-agregar-categoria");
const editarCategoriaInput = document.getElementById("editar-categoria-input");
const categoriaInput = document.getElementById('categoria-input');
const seccionEditarCateg = document.getElementById('editar-categorias');

let categorias = [];

function agregarCategoria() {
  const nuevaCategoria = categoriaInput.value.trim().toLowerCase(); // Convertir a minúsculas y eliminar espacios

  // Verificar si la nueva categoría ya existe en el array 'categorias' y si no está vacía
  const categoriaExistente = categorias.find(cat => cat.toLowerCase() === nuevaCategoria);

  if (nuevaCategoria && !categoriaExistente) {
    categorias.push(categoriaInput.value.trim()); // Agregar la categoría original (sin convertir a minúsculas)
    mostrarCategorias();
  } else {
    alert('La categoría ya existe o está vacía.');
  }

  categoriaInput.value = '';  // Limpiar el campo
}


function eliminarCategoria(indice) {
  categorias.splice(indice, 1);
  mostrarCategorias();
}

function mostrarCategorias() {
  const listaCategorias = document.getElementById('listaCategorias');
  listaCategorias.innerHTML = '';

  categorias.forEach((categoria, indice) => {
    const li = document.createElement('li');
    li.textContent = categoria;
    /*li.style.backgroundColor ="red";*/
    li.style.Width = "100%";
    li.style.display = "flex";
    li.style.justifyContent = "space-around";

    const btnEditar = document.createElement('a');
    btnEditar.textContent = 'Editar';
    /*btnEditar.style.Width="40%";*/
    btnEditar.style.paddingLeft = "25px";
    btnEditar.style.paddingRight = "25px";
    btnEditar.style.cursor = "pointer";


    const btnEliminar = document.createElement('a');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.style.Width = "40%";
    btnEliminar.style.cursor = "pointer";
    /*btnEliminar.style.paddingRight= "10px";*/

    btnEditar.addEventListener("click", () => {
      seccionCategorias.style.display = "none"; // Ocultar la sección de categorías      
      seccionEditarCateg.style.display = 'block';
      editarCategoriaInput.value = categoria; //me muestra el input que deseo editar
      const categoriaIndex = categorias.findIndex(cat => cat.toLowerCase() === editarCategoriaInput.value.trim().toLowerCase())
      document.getElementById("editar-categ").addEventListener("click", function () {

        if (categoriaIndex !== -1) {
          console.log("MILANESA")
          categorias[categoriaIndex] = editarCategoriaInput.value
          mostrarCategorias()
          seccionEditarCateg.style.display = "none";
          seccionCategorias.style.display = "block";
        }
      })
    });

    btnEliminar.addEventListener('click', () => eliminarCategoria(indice));
    li.appendChild(btnEditar);
    li.appendChild(btnEliminar);
    listaCategorias.appendChild(li);
  });
}

//funcionalidad boton "volver" de editar categoria
const volverCateg = document.getElementById("volver-categ");
volverCateg.addEventListener("click", () => {
  seccionEditarCateg.style.display = "none";
  seccionCategorias.style.display = "block";
});


/*NO FUNCIONA VER!!!!*/



function prepararEdicionCategoria(nuevoValor) {
  editarCategoriaInput.value = nuevoValor;

  document.getElementById("editar-categ").addEventListener("click", () => {
    const nuevaCategoria = editarCategoriaInput.value.trim().toLowerCase(); // Convertir a minúsculas y eliminar espacios

    // Verificar si la nueva categoría ya existe en el array 'categorias' y si no está vacía
    const categoriaExistente = categorias.findIndex((cat) => cat.toLowerCase() === nuevaCategoria);
    console.log(categoriaExistente)
    console.log(nuevaCategoria && !categoriaExistente)


  })
};



  
 





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
