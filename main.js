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
const noResultados = document.getElementById("no_resultados");
const ocultarOperaciones = document.getElementById("ocultar_operaciones");
const operaciones_body = document.getElementById("operaciones-body");


// btnNuevaOperacion.addEventListener('click', () => {
//   btnNuevaOperacion.classList.add('rotating');
//   setTimeout(() => {
//     btnNuevaOperacion.classList.remove('rotating');
//   }, 1000); // ajusta la duración de la animación aquí (en milisegundos)
// });

// // HAGO CLICK EN EL BTN NUEVA OPERACION
// btnNuevaOperacion.addEventListener('click', () => {
//   console.log("hiciste click en nueva operacion")
//   sectionBalance.style.display = "none";
//   ventanaNuevaOperacion.style.display = "block";
// });



// // CREO UNA FUNCION PARA CAPTURAR LOS DATOS DEL FORM
// function crearOperacion() {
//   let nuevaOpe = {
//     descripcion: nuevaOperacion_descripcion.value,
//     monto: nuevaOperacion_monto.value,
//     tipo: nuevaOperacion_tipo.value,
//     categoria: nuevaOperacion_categoria.value,
//     fecha: nuevaOperacion_fecha.value
//   }

//   // console.log(nuevaOpe) --->me muestra el objeto con los datos



//   // creo una variable para guardar los datos del local storage
//   const operaciones = localStorage.getItem("operaciones")
//   // console.log(operaciones) --> muestra null en la consola
//   if(operaciones === null){
//     console.log("operaciones es nulo")
//     let nuevoArray = [{nuevaOpe}]
//     localStorage.setItem("operaciones", JSON.stringify(nuevoArray))
//   }else{
//     console.log("operaciones tiene datos")
//     let parsedStorage = JSON.parse(localStorage.getItem("operaciones"))
//     parsedStorage.push(nuevaOpe)
//     localStorage.setItem("operaciones", JSON.stringify(parsedStorage))

//   }
//   console.log("operacion creada")
 
// }

// function mostrarOperaciones(){
//   const operaciones = localStorage.getItem("operaciones");
 
//   const operacionesParsed = JSON.parse(operaciones)
//   if(operacionesParsed.length >= 1 ){
//     const imagenBilletera = document.getElementById("figure_imagen")
//     imagenBilletera.style.display = "none"
    
//     const operacionesDiv = document.getElementById("operaciones")
//     operaciones.forEach((operacion, index)=>{
//       const nuevoElemento = document.createElement("li")
//       nuevoElemento.innerHTML =`
//       <div>${operacion.descripcion}</div>
//       <div>${operacion.categoria}</div>
//       <div class="text-right">${operacion.fecha}</div>
//       <div class="text-right">${operacion.monto}</div>
//       <div class="text-right">
//           <button onclick="eliminarOperacion(${index})">Eliminar</button>
//       </div>
//   `;
//       operacion.appendChild(nuevoElemento)

     
//     })
//   }
// }


// // al hacer click en agregar en el form llamo a la funcion crear operaciones
// botonAgregarOperacion.addEventListener("click", function (event) {
//   event.stopPropagation()
//   event.preventDefault()
//   event.stopImmediatePropagation()
//   crearOperacion()
  
  
// });

// formNuevaOperacion.addEventListener('submit', (e)=>{
//     console.log(e)
//     e.preventDefault()
//     e.stopImmediatePropagation()
//     e.stopPropagation()
// });

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

// Mostrar operaciones guardadas
function mostrarOperaciones() {
    const operacionesGuardadas = JSON.parse(localStorage.getItem("operaciones")) || [];

    operaciones.innerHTML = '';
    operacionesGuardadas.forEach((operacion, index) => {
        const tr = document.createElement('tr');
       tr.className =  'bg-white';


       tr.innerHTML = `
       <td class="px-6 py-4 whitespace-nowrap">${operacion.descripcion}</td>
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
}

// Eliminar operación
function eliminarOperacion(index) {
    let operacionesGuardadas = JSON.parse(localStorage.getItem("operaciones")) || [];
    operacionesGuardadas.splice(index, 1);
    localStorage.setItem("operaciones", JSON.stringify(operacionesGuardadas));
    mostrarOperaciones();
}

// Inicializar visualización de operaciones
document.addEventListener('DOMContentLoaded', () => {
    mostrarOperaciones();
});

