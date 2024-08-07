//Se le da funcionalidad al menu hamburguesa

const iconoAbrir = document.getElementById("abrir");
const iconoCerrar = document.getElementById("cerrar");
const navItems = document.getElementById("nav-items");

const ocultarOperaciones = document.getElementById("ocultarOperaciones");
const nuevaOperacion = document.getElementById("nueva_operacion");
const sectionBalance = document.getElementById("section-balance");
const seccionCategorias = document.getElementById("categoria");
const edicionCateg = document.getElementById("editar-categorias");
const seccionReportes = document.getElementById("reportes");

const btnNuevaOperacion = document.getElementById("nueva_operacion");

const ventanaNuevaOperacion = document.getElementById("ventanaNuevaOperacion");
const mainOperaciones = document.getElementById("main_operaciones");

const operaciones = document.getElementById("operaciones");

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
  ventanaNuevaOperacion.style.transform = "translateY(120px)";
});

iconoCerrar.addEventListener("click", () => {
  iconoAbrir.style.display = "block";
  navItems.style.display = "none";
  iconoCerrar.style.display = "none";
  sectionBalance.style.transform = "translateY(0px)";
  seccionCategorias.style.transform = "translateY(0px)";
  seccionReportes.style.transform = "translateY(0px)";
  edicionCateg.style.transform = "translateY(0px)";
});

// **funcionalidad de los item del navegador hacia sus respectivas secciones.
//item del menu hamburguesa
const verBalance = document.getElementById("ver-balance");
const verCategorias = document.getElementById("ver-categorias");
const verReportes = document.getElementById("ver-reportes");

//Aca inicializo todo OK
sectionBalance.style.display = "block";
seccionCategorias.style.display = "none";
seccionReportes.style.display = "none";

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
  const operacionesGuardadas =
    JSON.parse(localStorage.getItem("operaciones")) || [];
  calcularReportes(operacionesGuardadas);
});

// ***** Funcionalidad de la sección categorías

const catIngresadas = document.getElementById("cat-ingresadas");
const botonAgregarCategoria = document.getElementById(
  "boton-agregar-categoria"
);
const editarCategoriaInput = document.getElementById("editar-categoria-input");
const categoriaInput = document.getElementById("categoria-input");
const seccionEditarCateg = document.getElementById("editar-categorias");

const volverCateg = document.getElementById("volver-categ");
const listaCategorias = document.getElementById("listaCategorias");
const categoria_filtro = document.getElementById("categoria_filtro");

//*Limpia todos los datos almacenados en localStorage
//localStorage.clear();

const categoriasDefault = [
  "Comidas",
  "Servicios",
  "Salidas",
  "Educacion",
  "Transporte",
  "Trabajo",
];
let categorias = [];

// Función para cargar las categorías desde el localStorage

function cargarCategorias(categorias) {
  const categoria_filtro = document.getElementById("categoria_filtro");
  const nuevaOperacion_categoria = document.getElementById(
    "nuevaOperacion-categoria"
  );

  // Vaciar antes
  categoria_filtro.innerHTML = '<option value="todas">Todas</option>';
  nuevaOperacion_categoria.innerHTML = "";
  categorias.forEach((categoria) => {
    let nuevaCategoriaFiltro = document.createElement("option");
    nuevaCategoriaFiltro.value = categoria;
    nuevaCategoriaFiltro.textContent = categoria;
    categoria_filtro.appendChild(nuevaCategoriaFiltro);

    let nuevaCategoriaOperacion = document.createElement("option");
    nuevaCategoriaOperacion.value = categoria;
    nuevaCategoriaOperacion.textContent = categoria;
    nuevaOperacion_categoria.appendChild(nuevaCategoriaOperacion);
  });
}

function cargarStorage() {
  const categoriasGuardadas = localStorage.getItem("categorias");
  const operaciones = localStorage.getItem("operaciones");
  if (!categoriasGuardadas) {
    localStorage.setItem("categorias", JSON.stringify(categoriasDefault));
    categorias = categoriasDefault;
  } else {
    const categoriasArray = JSON.parse(categoriasGuardadas);
    categorias = [...new Set([...categoriasDefault, ...categoriasArray])];
  }
  mostrarCategorias();
  cargarCategorias(categorias);
}

function guardarStorage() {
  const categoriasPersonalizadas = categorias.filter(
    (categoria) => !categoriasDefault.includes(categoria)
  );
  localStorage.setItem("categorias", JSON.stringify(categoriasPersonalizadas));
}

function agregarCategoria() {
  const nuevaCategoria = categoriaInput.value.trim();
  if (
    nuevaCategoria &&
    !categorias
      .map((cat) => cat.toLowerCase())
      .includes(nuevaCategoria.toLowerCase())
  ) {
    categorias.push(nuevaCategoria);
    guardarStorage();
    mostrarCategorias();
    cargarCategorias(categorias);
  } else {
    alert("La categoría ya existe o está vacía.");
  }
  categoriaInput.value = "";
}

function mostrarCategorias() {
  listaCategorias.innerHTML = "";
  categorias.forEach((categoria, indice) => {
    const li = document.createElement("li");
    li.className = "flex w-full mb-3";

    const divOuter = document.createElement("div");
    divOuter.className = "flex items-center p-3 w-full";

    const divCategory = document.createElement("div");
    divCategory.className = "flex-1";

    const pCategory = document.createElement("p");
    pCategory.className = "w-full text-blue-800 px-3 py-1 rounded";
    pCategory.textContent = categoria;

    const divButtons = document.createElement("div");
    divButtons.className = "flex space-x-2";

    const btnEditar = document.createElement("button");
    btnEditar.className = "text-gray-600 hover:text-blue-600 text-xs";
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", () => prepararEdicionCategoria(indice));

    const btnEliminar = document.createElement("button");
    btnEliminar.className = "text-gray-600 hover:text-red-600 text-xs";
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => eliminarCategoria(indice));

    divCategory.appendChild(pCategory);
    divButtons.appendChild(btnEditar);
    divButtons.appendChild(btnEliminar);
    divOuter.appendChild(divCategory);
    divOuter.appendChild(divButtons);
    li.appendChild(divOuter);
    listaCategorias.appendChild(li);
  });
}

function prepararEdicionCategoria(indice) {
  seccionCategorias.style.display = "none";
  seccionEditarCateg.style.display = "block";
  editarCategoriaInput.value = categorias[indice];
  const editarBtn = document.getElementById("editar-categ");

  // Eliminar cualquier event listener previo para evitar múltiples añadidos
  editarBtn.replaceWith(editarBtn.cloneNode(true));
  document
    .getElementById("editar-categ")
    .addEventListener("click", () => editarCategoria(indice));
}

function editarCategoria(indice) {
  const nuevaCategoria = editarCategoriaInput.value.trim();
  if (!nuevaCategoria) {
    alert("El nombre de la categoría no puede estar vacío.");
    return;
  }
  if (
    categorias
      .map((cat) => cat.toLowerCase())
      .includes(nuevaCategoria.toLowerCase()) &&
    categorias[indice].toLowerCase() !== nuevaCategoria.toLowerCase()
  ) {
    alert("El nombre de la categoría ya existe.");
    return;
  }
  categorias[indice] = nuevaCategoria;
  guardarStorage();
  mostrarCategorias();
  cargarCategorias(categorias);
  seccionEditarCateg.style.display = "none";
  seccionCategorias.style.display = "block";
}

function eliminarCategoria(indice) {
  categorias.splice(indice, 1);
  guardarStorage();
  mostrarCategorias();
  cargarCategorias(categorias);
}

botonAgregarCategoria.addEventListener("click", () => agregarCategoria);
volverCateg.addEventListener("click", () => {
  seccionEditarCateg.style.display = "none";
  seccionCategorias.style.display = "block";
});

// capturo los elementos del form
const nuevaOperacion_descripcion = document.getElementById(
  "nuevaOperacion-descripcion"
);
const nuevaOperacion_monto = document.getElementById("nuevaOperacion-monto");
const nuevaOperacion_tipo = document.getElementById("nuevaOperacion-tipo");
const nuevaOperacion_categoria = document.getElementById(
  "nuevaOperacion-categoria"
);
const nuevaOperacion_fecha = document.getElementById("nuevaOperacion-fecha");
const botonAgregarOperacion = document.getElementById("botonAgregarOperacion");
const botonCancelarOperacion = document.getElementById(
  "botonCancelarOperacion"
);
const formNuevaOperacion = document.getElementById("formNuevaOperacion");
const noResultados = document.getElementById("noResultados");
const operaciones_body = document.getElementById("operaciones-body");
const ventanaEditarOperacion = document.getElementById(
  "ventanaEditarOperacion"
);

// Inicializar visualización de operaciones
document.addEventListener("DOMContentLoaded", () => {
  cargarStorage();
  mostrarOperaciones();
  calcularBalance();
});

const gananciasBalance = document.getElementById("ganancias");

function calcularBalance() {
  const operacionesGuardadas =
    JSON.parse(localStorage.getItem("operaciones")) || [];
  let totalGanancias = 0;
  let totalGastos = 0;
  operacionesGuardadas.forEach((operacion) => {
    if (operacion.tipo === "ganancia") {
      totalGanancias += +operacion.monto;
    } else if (operacion.tipo === "gasto") {
      totalGastos += +operacion.monto;
    }
  });

  document.getElementById(
    "ganancias"
  ).textContent = `+$${totalGanancias.toFixed(2)}`;

  document.getElementById("gastos").textContent = `-$${totalGastos.toFixed(2)}`;
  document.getElementById("total").textContent = `$${(
    totalGanancias - totalGastos
  ).toFixed(2)}`;
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
  const operacionesGuardadas =
    JSON.parse(localStorage.getItem("operaciones")) || [];

  const filtroCategoria = categoria_filtro.value;
  const filtroTipo = tipo_filtro.value;
  const filtroFecha = fecha_filtro.value;
  const filtroOrden = orden_filtro.value;

  let operacionesFiltradas = operacionesGuardadas.filter((operacion) => {
    return (
      (filtroCategoria === "todas" ||
        operacion.categoria.toLowerCase() === filtroCategoria.toLowerCase()) &&
      (filtroTipo === "todos" ||
        operacion.tipo.toLowerCase() === filtroTipo.toLowerCase()) &&
      (!filtroFecha || operacion.fecha >= filtroFecha)
    );
  });

  if (filtroOrden) {
    switch (filtroOrden) {
      case "mas_recientes":
        operacionesFiltradas.sort(
          (a, b) => new Date(b.fecha) - new Date(a.fecha)
        );
        break;
      case "mayor_monto":
        operacionesFiltradas.sort((a, b) => b.monto - a.monto);
        break;
      case "menor_monto":
        operacionesFiltradas.sort((a, b) => a.monto - b.monto);
        break;
      case "a/z":
        operacionesFiltradas.sort((a, b) =>
          a.descripcion.localeCompare(b.descripcion)
        );
        break;
      case "z/a":
        operacionesFiltradas.sort((a, b) =>
          b.descripcion.localeCompare(a.descripcion)
        );
        break;
    }
  }
  operaciones.innerHTML = "";
  operacionesGuardadas.forEach((operacion, index) => {
    const tr = document.createElement("tr");
    tr.className = "bg-white";

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
    ocultarOperaciones.classList.remove("hidden");
    noResultados.style.display = "none";
  } else {
    ocultarOperaciones.classList.add("hidden");
    noResultados.style.display = "block";
  }

  calcularBalance();
}

// Añadir operación (restablecer el comportamiento del botón de agregar)
function agregarOperacion(event) {
  event.preventDefault();
  const descripcion = document.getElementById(
    "nuevaOperacion-descripcion"
  ).value;
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
      fecha,
    };

    let operacionesGuardadas =
      JSON.parse(localStorage.getItem("operaciones")) || [];
    operacionesGuardadas.push(nuevaOperacion);
    localStorage.setItem("operaciones", JSON.stringify(operacionesGuardadas));

    mostrarOperaciones();
    ventanaNuevaOperacion.style.display = "none";
    sectionBalance.style.display = "block";
  }
}

// Mostrar el formulario de nueva operación
btnNuevaOperacion.addEventListener("click", () => {
  sectionBalance.style.display = "none";
  ventanaNuevaOperacion.style.display = "block";
});

// Capturar los datos del formulario y añadir operación
formNuevaOperacion.addEventListener("submit", (event) => {
  event.preventDefault();

  const descripcion = document.getElementById(
    "nuevaOperacion-descripcion"
  ).value;
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
      fecha,
    };

    let operacionesGuardadas =
      JSON.parse(localStorage.getItem("operaciones")) || [];
    operacionesGuardadas.push(nuevaOperacion);
    localStorage.setItem("operaciones", JSON.stringify(operacionesGuardadas));

    mostrarOperaciones();
    ventanaNuevaOperacion.style.display = "none";
    sectionBalance.style.display = "block";
  }
});

// Eliminar operación
function eliminarOperacion(index) {
  let operacionesGuardadas =
    JSON.parse(localStorage.getItem("operaciones")) || [];
  operacionesGuardadas.splice(index, 1);
  localStorage.setItem("operaciones", JSON.stringify(operacionesGuardadas));
  mostrarOperaciones();
}

// Al hacer click en Cancelar formulario
botonCancelarOperacion.addEventListener("click", (event) => {
  event.preventDefault();
  ventanaNuevaOperacion.style.display = "none";
  sectionBalance.style.display = "block";
});

// Al hacer click en el boton editar
function editarOperacion(index) {
  const operacionesGuardadas =
    JSON.parse(localStorage.getItem("operaciones")) || [];
  const operacion = operacionesGuardadas[index];

  // Llenar el formulario con los datos de la operación
  document.getElementById("nuevaOperacion-descripcion").value =
    operacion.descripcion;
  document.getElementById("nuevaOperacion-monto").value = operacion.monto;
  document.getElementById("nuevaOperacion-tipo").value = operacion.tipo;
  document.getElementById("nuevaOperacion-categoria").value =
    operacion.categoria;
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
  const operacionesGuardadas =
    JSON.parse(localStorage.getItem("operaciones")) || [];

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

//REPORTES -RESUMEN

function ocultarElementos() {
  const operaciones = localStorage.getItem("operaciones");

  document.getElementById("ocultar-img-texto").classList.add("hidden");
}

const reportes = calcularReportes(localStorage.getItem("operaciones"));
// Mostrar la sección de resumen

verReportes.addEventListener("click", () => {
  seccionReportes.style.display = "block";
  sectionBalance.style.display = "none";
  seccionCategorias.style.display = "none";
});

// Actualizar tabla de resumen
const resumenDatos = calcularReportes(localStorage.getItem("operaciones"));
const tablaResumen = document.getElementById("tabla-resumen");
tablaResumen.innerHTML = "";
/*const resumenDatos = [
    { descripcion: 'Categoría con mayor ganancia', nombre: reportes.categoriaMayorGanancia.nombre, valor: `+$${reportes.categoriaMayorGanancia.monto.toFixed(2)}` },
    { descripcion: 'Categoría con mayor gasto', nombre: reportes.categoriaMayorGasto.nombre, valor: `-$${reportes.categoriaMayorGasto.monto.toFixed(2)}` },
    { descripcion: 'Categoría con mayor balance', nombre: reportes.categoriaMayorBalance.nombre, valor: `+$${reportes.categoriaMayorBalance.monto.toFixed(2)}` },
    { descripcion: 'Mes con mayor ganancia', nombre: reportes.mesMayorGanancia.nombre, valor: `+$${reportes.mesMayorGanancia.monto.toFixed(2)}` },
    { descripcion: 'Mes con mayor gasto', nombre: reportes.mesMayorGasto.nombre, valor: `-$${reportes.mesMayorGasto.monto.toFixed(2)}` },
];*/
resumenDatos.forEach((item) => {
  let fila = document.createElement("tr");
  fila.innerHTML = `
        <td class="border px-4 py-2 border-none">${item.descripcion}</td>
        <td class="border px-4 py-2 border-none">${item.nombre}</td>
        <td class="border px-4 py-2 border-none">${item.valor}</td>
    `;
  tablaResumen.appendChild(fila);
});
// Mostrar las secciones de totales
totalesCategoria.classList.remove("hidden");
totalesMes.classList.remove("hidden");

//actualizar tabla de categorías
const tablaCategorias = document.getElementById("tabla-categorias");
tablaCategorias.innerHTML = "";
for (let [categoria, { ganancia, gasto }] of Object.entries(
  reportes.categorias
)) {
  let balance = ganancia - gasto;
  let fila = document.createElement("tr");
  fila.innerHTML = `
        <td class="border px-4 py-2 border-none text-center">${categoria}</td>
        <td class="border px-4 py-2 border-none text-center">+$${ganancia.toFixed(
          2
        )}</td>
        <td class="border px-4 py-2 border-none text-center">-$${gasto.toFixed(
          2
        )}</td>
        <td class="border px-4 py-2 border-none text-center">${
          balance >= 0 ? "+" : ""
        }$${balance.toFixed(2)}</td>
    `;
  tablaCategorias.appendChild(fila);
}
// Actualizar tabla de meses
const tablaMeses = document.getElementById("tabla-meses");
tablaMeses.innerHTML = "";
for (let [mes, { ganancia, gasto }] of Object.entries(reportes.meses)) {
  let balance = ganancia - gasto;
  let fila = document.createElement("tr");
  fila.innerHTML = `
        <td class="border px-4 py-2 border-none text-center">${mes}</td>
        <td class="border px-4 py-2 border-none text-center">+$${ganancia.toFixed(
          2
        )}</td>
        <td class="border px-4 py-2 border-none text-center">-$${gasto.toFixed(
          2
        )}</td>
        <td class="border px-4 py-2 border-none text-center">${
          balance >= 0 ? "+" : ""
        }$${balance.toFixed(2)}</td>
    `;
  tablaMeses.appendChild(fila);
}
javascript(auto);

function calcularReportes(operaciones) {
  let categorias = {};
  let meses = {};
  let totalesPorCategoria = {};
  let totalesPorMes = {};
  console.log(operaciones);
  if (operaciones.length > 0) {
    operaciones.forEach((op) => {
      let { categoria, monto, tipo, fecha } = op;
      monto = parseFloat(monto);
      let mes = fecha.slice(0, 7); // Obtener año y mes en formato YYYY-MM

      if (!categorias[categoria]) {
        categorias[categoria] = { ganancia: 0, gasto: 0 };
      }
      if (!meses[mes]) {
        meses[mes] = { ganancia: 0, gasto: 0 };
      }
      if (!totalesPorCategoria[categoria]) {
        totalesPorCategoria[categoria] = { ganancia: 0, gasto: 0 };
      }
      if (!totalesPorMes[mes]) {
        totalesPorMes[mes] = { ganancia: 0, gasto: 0 };
      }

      if (tipo === "ganancia") {
        categorias[categoria].ganancia += monto;
        meses[mes].ganancia += monto;
        totalesPorCategoria[categoria].ganancia += monto;
        totalesPorMes[mes].ganancia += monto;
      } else if (tipo === "gasto") {
        categorias[categoria].gasto += monto;
        meses[mes].gasto += monto;
        totalesPorCategoria[categoria].gasto += monto;
        totalesPorMes[mes].gasto += monto;
      }
    });
  }

  let categoriaMayorGanancia = { nombre: "", monto: 0 };
  let categoriaMayorGasto = { nombre: "", monto: 0 };
  let categoriaMayorBalance = { nombre: "", monto: 0 };
  let mesMayorGanancia = { nombre: "", monto: 0 };
  let mesMayorGasto = { nombre: "", monto: 0 };

  for (let [nombre, { ganancia, gasto }] of Object.entries(categorias)) {
    let balance = ganancia - gasto;
    if (ganancia > categoriaMayorGanancia.monto) {
      categoriaMayorGanancia = { nombre, monto: ganancia };
    }
    if (gasto > categoriaMayorGasto.monto) {
      categoriaMayorGasto = { nombre, monto: gasto };
    }
    if (Object.keys(categorias).length === 1) {
      categoriaMayorBalance = { nombre, monto: balance };
      /* REFORMAR ACA */
    } else if (balance > categoriaMayorBalance.monto) {
      categoriaMayorBalance = { nombre, monto: balance };
    }
  }

  for (let [nombre, { ganancia, gasto }] of Object.entries(meses)) {
    if (ganancia > mesMayorGanancia.monto) {
      mesMayorGanancia = { nombre, monto: ganancia };
    }
    if (gasto > mesMayorGasto.monto) {
      mesMayorGasto = { nombre, monto: gasto };
    }
  }

  if (operaciones.length > 1) {
    let operacionesDiv = document.getElementById("sin-reportes");
    operacionesDiv.replaceChildren();

    let sectionResumen = document.createElement("section");
    let resumenHeading = document.createElement("h2");
    resumenHeading.innerHTML = "Resumen";
    sectionResumen.appendChild(resumenHeading);

    let categoriaConMayorGanancia = document.createElement("p");
    categoriaConMayorGanancia.textContent = `Categoria con Mayor Ganancia: ${categoriaMayorGanancia.nombre} Monto: ${categoriaMayorGanancia.monto}`;
    sectionResumen.appendChild(categoriaConMayorGanancia);

    let categoriaConMayorGasto = document.createElement("p");
    categoriaConMayorGasto.textContent = `Categoria con Mayor Gasto: ${categoriaMayorGasto.nombre} Monto: ${categoriaMayorGasto.monto}`;
    sectionResumen.appendChild(categoriaConMayorGasto);

    let categoriaConMayorBalance = document.createElement("p");
    categoriaConMayorBalance.textContent = `Categoria con Mayor Balance: ${categoriaMayorBalance.nombre} Monto: ${categoriaMayorBalance.monto}`;
    sectionResumen.appendChild(categoriaConMayorBalance);

    let mesConMayorGanancia = document.createElement("p");
    mesConMayorGanancia.textContent = `Mes con Mayor Ganancia: ${mesMayorGanancia.nombre} Monto: ${mesMayorGanancia.monto}`;
    sectionResumen.appendChild(mesConMayorGanancia);

    let mesConMayorGasto = document.createElement("p");
    mesConMayorGasto.textContent = `Mes con Mayor Gasto: ${mesMayorGasto.nombre} Monto: ${mesMayorGasto.monto}`;
    sectionResumen.appendChild(mesConMayorGasto);

    let totalesPorCategoriaSection = document.createElement("section");
    totalesPorCategoriaSection.innerHTML = "<h2>Totales por Categoría</h2>";
    for (let [nombre, { ganancia, gasto }] of Object.entries(
      totalesPorCategoria
    )) {
      let p = document.createElement("p");
      p.textContent = `${nombre}: Ganancia: ${ganancia}, Gasto: ${gasto}`;
      totalesPorCategoriaSection.appendChild(p);
    }
    sectionResumen.appendChild(totalesPorCategoriaSection);

    let totalesPorMesSection = document.createElement("section");
    totalesPorMesSection.innerHTML = "<h2>Totales por Mes</h2>";
    for (let [nombre, { ganancia, gasto }] of Object.entries(totalesPorMes)) {
      let p = document.createElement("p");
      p.textContent = `${nombre}: Ganancia: ${ganancia}, Gasto: ${gasto}`;
      totalesPorMesSection.appendChild(p);
    }
    sectionResumen.appendChild(totalesPorMesSection);

    operacionesDiv.appendChild(sectionResumen);
  } else {
    let operacionesDiv = document.getElementById("sin-reportes");
    operacionesDiv.replaceChildren();
    operacionesDiv.innerHTML = `<div class="cont-fig-texto pb-12 pt-10 mt-9 mb-12">
                  <figure class="imagen-reporte max-w-xs m-0 m-auto p-0 block relative">
                    <img src="./img/reporteIMG.png" class="img-rep block h-auto max-w-full" alt="imagen">
                  </figure>
                  <h4 class="titulo-h4-reporte font-semibold text-center text-2xl mt-12 mb-3.5">
                    Operaciones insuficientes
                  </h4>
                  <p class="texto-reporte text-center">
                    Prueba agregando más operaciones
                  </p>
                </div>`;
  }

  return {
    categorias,
    meses,
    totalesPorCategoria,
    totalesPorMes,
    categoriaMayorGanancia,
    categoriaMayorGasto,
    categoriaMayorBalance,
    mesMayorGanancia,
    mesMayorGasto,
  };
}
// Obtener las operaciones del localStorage y mostrar los reportes
function cargarOperacionesYMostrarReportes() {
  if (!localStorage.getItem("operaciones")) {
    const reportsSection = document.getElementById("reports-section");
    reportsSection.style.display = "none";
  } //oculta la sección de informes si no hay operaciones almacenadas en el localStorage.

  const operaciones_json = localStorage.getItem("operaciones");
  const operaciones_array = JSON.parse(operaciones_json) || [];
  if (operaciones_array.length > 0) {
    ocultarImgYTexto();
    mostrarReportes(operaciones_array);
  } else {
    reportesSection.classList.add("hidden");
    totalesCategoria.classList.add("hidden");
    totalesMes.classList.add("hidden");
  }
}
document.addEventListener("DOMContentLoaded", myFunction);
