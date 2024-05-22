//Se le da funcionalidad al menu hamburguesa

let iconoAbrir = document.getElementById("abrir");

let iconoCerrar = document.getElementById
("cerrar");

let navItems = document.getElementById
("nav-items");

// const ocultarOperaciones = document.getElementById("ocultar_operaciones")
const btnNuevaOperacion = document.getElementById("nueva_operacion")
const sectionBalance = document.getElementById("section-balance")
const ventanaNuevaOperacion = document.getElementById("ventanaNuevaOperacion")
const mainOperaciones = document.getElementById("main_operaciones")

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
  seccionCategorias.style.display = "flex";
  sectionBalance.style.display = "none";
})

verBalance.addEventListener("click", () => { 
  sectionBalance.style.display = "flex";
  seccionCategorias.style.display = "none";
//falta seccion reporte  
});


 
//***** Funcionalidad de la seccion categorias  FALTA TERMINAR*********
const catIngresadas = document.getElementById("cat-ingresadas");
const botonAgregarCategoria = document.getElementById("boton-agregar-categoria");
/* 
let contador = 1;
botonAgregarCategoria.addEventListener("click",()=>{
    let nuevaCat = document.createElement("li");
    nuevaCat.textContent = "Categoria ${contador}";
    contador ++
    catIngresadas.appendChild(nuevaCat);
})   */

// Array para almacenar las categorías
let categorias = [];

function agregarCategoria() {
  const categoriaInput = document.getElementById('categoria-input');
  const nuevaCategoria = categoriaInput.value.trim();

  if (nuevaCategoria !== '') {
    categorias.push(nuevaCategoria);

    // Limpiar el campo de entrada
    categoriaInput.value = '';

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

    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';


    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';

    btnEliminar.addEventListener('click', () => eliminarCategoria(index));

    li.appendChild(btnEditar);
    li.appendChild(btnEliminar);
   


    listaCategorias.appendChild(li);
  });

  function mostrarSeccionEditarCategoria() {
    const seccionEditarCategoria = document.getElementById('editar-categoria');
    seccionEditarCategoria.style.display = 'block';
  }
}

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
        if(i === categorias.length - 1){
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
const categoria_filtro_elemento = document.getElementById("categoria_filtro");
const fecha_filtro = document.getElementById("tipo_fecha");
const orden_filtro = document.getElementById("orden_filtro");

tipo_filtro.addEventListener("change", mostrarOperaciones);
categoria_filtro_elemento.addEventListener("change", mostrarOperaciones);
fecha_filtro.addEventListener("change", mostrarOperaciones);
orden_filtro.addEventListener("change", mostrarOperaciones);

// Mostrar operaciones guardadas
function mostrarOperaciones() { 
  const operacionesGuardadas = JSON.parse(localStorage.getItem("operaciones")) || [];
  
  const filtroCategoria = categoria_filtro_elemento.value;
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
     <td class="px-6 py-4 whitespace-nowrap">${operacion.descripcion}</td>
     <td class="px-6 py-4 whitespace-nowrap">${operacion.tipo}</td>
     <td class="px-6 py-4 whitespace-nowrap">${operacion.categoria}</td>
     <td class="px-6 py-4 whitespace-nowrap">${operacion.fecha}</td>
     <td class="px-6 py-4 whitespace-nowrap">${operacion.monto}</td>
     <td class="px-6 py-4 whitespace-nowrap">
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

