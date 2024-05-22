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

function mostrarCategorias() {
  const listaCategorias = document.getElementById('listaCategorias');
  listaCategorias.innerHTML = '';
  categorias.forEach((categoria, indice) => {
    const li = document.createElement('li');
    li.className = "w-full mb-3";

    const divOuter = document.createElement('div');
    divOuter.className = "flex items-center";

    const divCategory = document.createElement('div');
    divCategory.className = "flex-1";

    const pCategory = document.createElement('p');
    pCategory.className = "bg-blue-200 text-blue-800 px-3 py-1 rounded";
    pCategory.textContent = categoria;

    const divButtons = document.createElement('div');
    divButtons.className = "flex space-x-2";

    const btnEditar = document.createElement('button');
    btnEditar.className = "text-gray-600 hover:text-blue-600 text-xs";
    btnEditar.textContent = 'Editar';
    btnEditar.id = `editar${indice}`;

    const btnEliminar = document.createElement('button');
    btnEliminar.className = "text-gray-600 hover:text-red-600 text-xs";
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.id = `eliminar${indice}`;

    divCategory.appendChild(pCategory);
    /*divButtons.appendChild(btnEditar);
    divButtons.appendChild(btnEliminar);*/
    divOuter.appendChild(divCategory);
    divOuter.appendChild(divButtons);
    li.appendChild(divOuter);



    btnEditar.addEventListener("click", () => {
      seccionCategorias.style.display = "none"; // Ocultar la sección de categorías      
      seccionEditarCateg.style.display = 'block';
      editarCategoriaInput.value = categoria; //me muestra el input que deseo editar
      const categoriaIndex = categorias.findIndex(cat => cat.toLowerCase() === editarCategoriaInput.value.trim().toLowerCase()) //busca el índice de la categoría que se desea editar en el array categorias.
      //findIndex(metodo)busca el primer elemento que cumpla con la condición proporcionada por la función flecha.


      document.getElementById("editar-categ").addEventListener("click", function () {
        if (categoriaIndex !== -1) {
          const nuevaCategoria = editarCategoriaInput.value.trim().toLowerCase(); // Convertir nuevaCategoria a minúsculas para hacer las comparaciones(mayúsculas y minúsculas)

          if (!nuevaCategoria) {//verificar si el string está vacío
            alert("El nombre de la categoría no puede estar vacío.");
            return;
          }

          if (categorias.map(cat => cat.toLowerCase()).includes(nuevaCategoria)) { //map para convertir todas las categorías existentes a minúsculas,includes para ver si nuevaCategoria ya existe.
            alert("El nombre de la categoría ya existe.");
            return;
          }

          categorias[categoriaIndex] = editarCategoriaInput.value.trim();//reemplaza el valor de la categoría en el índice categoriaIndex con el nuevo valor que el usuario ha ingresado.
          mostrarCategorias();
          seccionEditarCateg.style.display = "none";
          seccionCategorias.style.display = "block"; //me devuelve a la pantalla anterior para mostrarme la lista editada
        }
      });

    });


    function eliminarCategoria(indice) {
      categorias.splice(indice, 1);
      mostrarCategorias();
    }

    btnEliminar.addEventListener('click', () => eliminarCategoria(indice));
    li.appendChild(btnEditar);  //agrega el botón btnEditar como un hijo del elemento li.
    li.appendChild(btnEliminar); ///agrega el botón btnEliminar como un hijo del elemento li.
    listaCategorias.appendChild(li); //agrega el elemento de lista li (que ahora contiene los botones de editar y eliminar) al contenedor de la lista de categorías.Esto hace que la categoría (junto con sus botones de acción) sea visible en la interfaz de usuario.
  });

}

//funcionalidad boton "volver" de editar categoria
const volverCateg = document.getElementById("volver-categ");
volverCateg.addEventListener("click", () => {
  seccionEditarCateg.style.display = "none";
  seccionCategorias.style.display = "block";
});

function prepararEdicionCategoria(nuevoValor) {
  editarCategoriaInput.value = nuevoValor;
  document.getElementById("editar-categ").addEventListener("click", () => {
    const nuevaCategoria = editarCategoriaInput.value.trim().toLowerCase(); // Convertir a minúsculas y eliminar espacios.

    // Verificar si la nueva categoría ya existe en el array 'categorias' y si no está vacía
    const categoriaExistente = categorias.findIndex((cat) => cat.toLowerCase() === nuevaCategoria);
    console.log(categoriaExistente)
    console.log(nuevaCategoria && !categoriaExistente)
  })
};










// revisar
nuevaOperacion.addEventListener("click", function () {
  let ocultarOperaciones = document.getElementById("ocultar_operaciones");
  ocultarOperaciones.classList.toggle("hidden");
});

nuevaOperacion.addEventListener('click', () => {
  nuevaOperacion.classList.add('rotating');
  setTimeout(() => {
    nuevaOperacion.classList.remove('rotating');
  }, 1000); // ajusta la duración de la animación aquí (en milisegundos)
});
