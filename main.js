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


const btnNuevaOperacion = document.getElementById("nueva_operacion")

const ventanaNuevaOperacion = document.getElementById("ventanaNuevaOperacion")
const mainOperaciones = document.getElementById("main_operaciones")


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


//***** Funcionalidad de la seccion categorias 

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
    li.className = "flex w-full mb-3";

    const divOuter = document.createElement('div');
    divOuter.className = "flex items-center p-3 w-full";

    const divCategory = document.createElement('div');
    divCategory.className = "flex-1";

    const pCategory = document.createElement('p');
    pCategory.className = "w-full text-blue-800 px-3 py-1 rounded";
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

//PARA CONSULTAR EN CLASE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! NO FUNCIONA
//relacionar la categoria ingresada al listado de categorias de los filtros 

/*function agregarCategoriaFiltro(categoria) {
  const nuevaCategoria = document.createElement('option');
  nuevaCategoria.value = categoria;
  nuevaCategoria.textContent = categoria;
  categoria_filtro.appendChild(nuevaCategoria);
}
/*
function actualizarCategoriaFiltro(categoriaVieja, categoriaNueva) {
  const opciones = categoria_filtro.options;
  for (let i = 0; i < opciones.length; i++) {
    if (opciones[i].value === categoriaVieja) {
      opciones[i].value = categoriaNueva;
      opciones[i].textContent = categoriaNueva;
      break;
    }
  }

function eliminarCategoriaFiltro(categoria) {
  const opciones = categoria_filtro.options;
  for (let i = 0; i < opciones.length; i++) {
    if (opciones[i].value === categoria) {
      categoria_filtro.removeChild(opciones[i]);
      break;
    }
  }
}

// COMO UTILIZO LOCALSTORAGE EN LA SECCION CATEGORIAS SIENDO QUE YA SE CREO UNO MELI. HAY QUE CREAR OTRO? COMO? cree uno pero no funciona por el existente de meli,es por tener el mismo nombre? como se hace siendo que el valor de nueva categoria se utiliza en tanto para la seccion categoria como para filtros de balance. 
envio a meli una copia del local storage que intente aplicar ,el mismo funciona pero sin tener el localstorage de meli en el mismo archivo.
//hasta aca para consultar en clase */





// capturo el id del select de categoria
const categoria_filtro = document.getElementById("categoria_filtro");

// creo una funcion para cargar las categorias
function cargarCategorias(categorias){
  categorias.forEach((categoria) => {
    let nuevaCategoria = document.createElement("option");
    nuevaCategoria.value = categoria;
    nuevaCategoria.textContent = categoria;
    categoria_filtro.appendChild(nuevaCategoria)

  })
};




// Meli
// creo una funcion para cargar el localstorage
function cargarStorage(){
  const categorias = localStorage.getItem("categorias");
  const operaciones = localStorage.getItem("operaciones");
  console.log(operaciones)

  if (!categorias){
    const categoriasDefault = ["Comidas", "Servicios", "Salidas", "Educacion", "Transporte", "Trabajo"]
    localStorage.setItem("categorias", categoriasDefault)
    cargarCategorias(categoriasDefault)
  }else{
    let nuevaCategoria = "";
    let nuevasCategoriasArray = [];
    for(let i=0 ; i < nuevasCategoriasArray.length; i++){
      if(categorias[i] !== ","){
        nuevaCategoria += categorias[i]
        if(i === nuevasCategoriasArray.length - 1){
          nuevasCategoriasArray.push(nuevaCategoria)
        }
      }else{
        nuevasCategoriasArray.push(nuevaCategoria)
        nuevaCategoria = ""
      }
    }
    cargarCategorias(nuevasCategoriasArray)
  }
};

cargarStorage();



// capturo los elementos del form
const nuevaOperacion_descripcion = document.getElementById("nuevaOperacion-descripcion");
const nuevaOperacion_monto = document.getElementById("nuevaOperacion-monto");
const nuevaOperacion_tipo = document.getElementById("nuevaOperacion-tipo");
const nuevaOperacion_categoria = document.getElementById("nuevaOperacion-categoria");
const nuevaOperacion_fecha = document.getElementById("nuevaOperacion-fecha");
const botonAgregarOperacion = document.getElementById("botonAgregarOperacion");
const botonCancelarOperacion = document.getElementById("botonCancelarOperacion");
const formNuevaOperacion = document.getElementById("formNuevaOperacion");
const operaciones = document.getElementById("operaciones");
const noResultados = document.getElementById("noResultados");
const ocultarOperaciones = document.getElementById("ocultarOperaciones");
const operaciones_body = document.getElementById("operaciones-body");
const ventanaEditarOperacion = document.getElementById("ventanaEditarOperacion");

// Inicializar visualización de operaciones
document.addEventListener('DOMContentLoaded', () => {
  cargarStorage();
  mostrarOperaciones();
  calcularBalance();
});

function calcularBalance() {
  const operacionesGuardadas = JSON.parse(localStorage.getItem("operaciones")) || [];
  let totalGanancias = 0;
  let totalGastos = 0;

  operacionesGuardadas.forEach(operacion => {
    if (operacion.tipo === 'Ganancia') {
      totalGanancias += parseFloat(operacion.monto);
    } else if (operacion.tipo === 'Gasto') {
      totalGastos += parseFloat(operacion.monto);
    }
  });

  document.getElementById("ganancias").textContent = `+$${totalGanancias.toFixed(2)}`;
  document.getElementById("gastos").textContent = `-$${totalGastos.toFixed(2)}`;
  document.getElementById("total").textContent = `$${(totalGanancias - totalGastos).toFixed(2)}`;
  
}



// Filtros
const tipo_filtro = document.getElementById("tipo_filtro");

const fecha_filtro = document.getElementById("tipo_fecha");
const orden_filtro = document.getElementById("orden_filtro");

tipo_filtro.addEventListener("change", mostrarOperaciones);
categoria_filtro.addEventListener("change", mostrarOperaciones);
fecha_filtro.addEventListener("change", mostrarOperaciones);
orden_filtro.addEventListener("change", mostrarOperaciones);

// Mostrar operaciones guardadas
function mostrarOperaciones() { 
  const operacionesGuardadas = JSON.parse(localStorage.getItem("operaciones")) || [];
  
  const filtroCategoria = categoria_filtro.value;
  const filtroTipo = tipo_filtro.value;
  const filtroFecha = fecha_filtro.value;
  const filtroOrden = orden_filtro.value;

  let operacionesFiltradas = operacionesGuardadas.filter(operacion => {
    return (filtroCategoria === "todas" || operacion.categoria.toLowerCase() === filtroCategoria.toLowerCase()) &&
           (filtroTipo === "todos" || operacion.tipo.toLowerCase() === filtroTipo.toLowerCase()) &&
           (!filtroFecha || operacion.fecha >= filtroFecha);
  });

  if (filtroOrden) {
    switch (filtroOrden) {
      case "mas_recientes":
        operacionesFiltradas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        break;
      case "mayor_monto":
        operacionesFiltradas.sort((a, b) => b.monto - a.monto);
        break;
      case "menor_monto":
        operacionesFiltradas.sort((a, b) => a.monto - b.monto);
        break;
      case "a/z":
        operacionesFiltradas.sort((a, b) => a.descripcion.localeCompare(b.descripcion));
        break;
      case "z/a":
        operacionesFiltradas.sort((a, b) => b.descripcion.localeCompare(a.descripcion));
        break;
    }
  }
  operaciones.innerHTML = '';
  operacionesGuardadas.forEach((operacion, index) => {
    const tr = document.createElement('tr');
     tr.className =  'bg-white';


     tr.innerHTML = `
     <td class="px-3 py-3 whitespace-nowrap">${operacion.descripcion}</td>
     <td class="px-3 py-3 whitespace-nowrap">${operacion.tipo}</td>
     <td class="px-3 py-3 whitespace-nowrap">${operacion.categoria}</td>
     <td class="px-3 py-3 whitespace-nowrap">${operacion.fecha}</td>
     <td class="px-3 py-3 whitespace-nowrap">${operacion.monto}</td>
     <td class="px-3 py-3 whitespace-nowrap">
       <div class="flex justify-end gap-2">
         <button class="bg-blue-500 text-white p-1 rounded" onclick="editarOperacion(${index})">Editar</button>
         <button class="bg-red-500 text-white p-1 rounded" onclick="eliminarOperacion(${index})">Eliminar</button>
       </div>
     </td>
   `;
      operaciones.appendChild(tr);
  });


  if (operacionesGuardadas.length > 0) {
      ocultarOperaciones.classList.remove('hidden');
      noResultados.style.display = "none";
  } else {
      ocultarOperaciones.classList.add('hidden');
      noResultados.style.display = "block";
  }

  calcularBalance();
}

// Añadir operación (restablecer el comportamiento del botón de agregar)
function agregarOperacion(event) {
  event.preventDefault();

  const descripcion = document.getElementById("nuevaOperacion-descripcion").value;
  const monto = document.getElementById("nuevaOperacion-monto").value;
  const tipo = document.getElementById("nuevaOperacion-tipo").value;
  const categoria = document.getElementById("nuevaOperacion-categoria").value;
  const fecha = document.getElementById("nuevaOperacion-fecha").value;

  if (descripcion &&!isNaN(monto) && tipo && categoria && fecha) {
      let nuevaOperacion = {
          descripcion,
          monto,
          tipo,
          categoria,
          fecha
      };

      let operacionesGuardadas = JSON.parse(localStorage.getItem("operaciones")) || [];
      operacionesGuardadas.push(nuevaOperacion);
      localStorage.setItem("operaciones", JSON.stringify(operacionesGuardadas));

      mostrarOperaciones();
      ventanaNuevaOperacion.style.display = "none";
      sectionBalance.style.display = "block";
  }
}


// Mostrar el formulario de nueva operación
btnNuevaOperacion.addEventListener('click', () => {
    sectionBalance.style.display = "none";
    ventanaNuevaOperacion.style.display = "block";
});


// Capturar los datos del formulario y añadir operación
formNuevaOperacion.addEventListener('submit', (event) => {
    event.preventDefault();

    const descripcion = document.getElementById("nuevaOperacion-descripcion").value;
    const monto = document.getElementById("nuevaOperacion-monto").value;
    const tipo = document.getElementById("nuevaOperacion-tipo").value;
    const categoria = document.getElementById("nuevaOperacion-categoria").value;
    const fecha = document.getElementById("nuevaOperacion-fecha").value;

    if (descripcion && monto && tipo && categoria && fecha) {
        let nuevaOperacion = {
            descripcion,
            monto,
            tipo,
            categoria,
            fecha
        };

        let operacionesGuardadas = JSON.parse(localStorage.getItem("operaciones")) || [];
        operacionesGuardadas.push(nuevaOperacion);
        localStorage.setItem("operaciones", JSON.stringify(operacionesGuardadas));

        mostrarOperaciones();
        ventanaNuevaOperacion.style.display = "none";
        sectionBalance.style.display = "block";
    }
});


// Eliminar operación
function eliminarOperacion(index) {
    let operacionesGuardadas = JSON.parse(localStorage.getItem("operaciones")) || [];
    operacionesGuardadas.splice(index, 1);
    localStorage.setItem("operaciones", JSON.stringify(operacionesGuardadas));
    mostrarOperaciones();
}


// Al hacer click en Cancelar formulario
botonCancelarOperacion.addEventListener('click', (event) => {
  event.preventDefault();
  ventanaNuevaOperacion.style.display = 'none';
  sectionBalance.style.display = 'block' 
});

// Al hacer click en el boton editar
function editarOperacion(index) {
  const operacionesGuardadas = JSON.parse(localStorage.getItem("operaciones")) || [];
  const operacion = operacionesGuardadas[index];

  // Llenar el formulario con los datos de la operación
  document.getElementById("nuevaOperacion-descripcion").value = operacion.descripcion;
  document.getElementById("nuevaOperacion-monto").value = operacion.monto;
  document.getElementById("nuevaOperacion-tipo").value = operacion.tipo;
  document.getElementById("nuevaOperacion-categoria").value = operacion.categoria;
  document.getElementById("nuevaOperacion-fecha").value = operacion.fecha;

  // Mostrar el formulario de edición
  ventanaNuevaOperacion.style.display = "block";
  sectionBalance.style.display = "none";

  // Cambiar el comportamiento del botón de agregar para que actualice la operación
  botonAgregarOperacion.textContent = "Actualizar";
  botonAgregarOperacion.onclick = function (event) {
      event.preventDefault();
      actualizarOperacion(index);
  };
}

function actualizarOperacion(index) {
  const operacionesGuardadas = JSON.parse(localStorage.getItem("operaciones")) || [];

  // Actualizar la operación con los nuevos datos del formulario
  operacionesGuardadas[index] = {
      descripcion: document.getElementById("nuevaOperacion-descripcion").value,
      monto: document.getElementById("nuevaOperacion-monto").value,
      tipo: document.getElementById("nuevaOperacion-tipo").value,
      categoria: document.getElementById("nuevaOperacion-categoria").value,
      fecha: document.getElementById("nuevaOperacion-fecha").value,
  };

  // Guardar los cambios en localStorage
  localStorage.setItem("operaciones", JSON.stringify(operacionesGuardadas));

  // Restaurar el formulario y la interfaz
  botonAgregarOperacion.textContent = "Agregar";
  botonAgregarOperacion.onclick = agregarOperacion;
  
  

  ventanaNuevaOperacion.style.display = "none";
  sectionBalance.style.display = "block";

  // Mostrar las operaciones actualizadas
  mostrarOperaciones();
}
