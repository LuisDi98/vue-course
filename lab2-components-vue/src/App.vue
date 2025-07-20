<script setup>
import { ref, reactive, computed, watch } from 'vue';
// ¡Importamos nuestro nuevo componente!
import ArticuloItem from './components/ArticuloItem.vue';

const titulo = ref('Mi Lista de Compras 🛒');
const nuevoArticulo = ref('');

const estado = reactive({
  articulos: [
    { id: 1, nombre: 'Manzanas', cantidad: 5, comprado: false },
    { id: 2, nombre: 'Leche', cantidad: 1, comprado: true },
    { id: 3, nombre: 'Pan', cantidad: 2, comprado: false },
  ],
  filtro: 'todos', // 'todos', 'comprados', 'pendientes'
});

// --- LÓGICA COMPLETADA ---
const articulosFiltrados = computed(() => {
  if (estado.filtro === 'comprados') {
    return estado.articulos.filter(item => item.comprado);
  }
  if (estado.filtro === 'pendientes') {
    return estado.articulos.filter(item => !item.comprado);
  }
  return estado.articulos;
});

const totalPendientes = computed(() => {
  return estado.articulos.filter(item => !item.comprado).length;
});

function agregarArticulo() {
  if (nuevoArticulo.value.trim() === '') return;
  estado.articulos.push({
    id: Date.now(),
    nombre: nuevoArticulo.value,
    cantidad: 1,
    comprado: false,
  });
  nuevoArticulo.value = '';
}

// --- Nuevas funciones para manejar los eventos del hijo ---
function manejarActualizacion(articulo, nuevoEstado) {
  articulo.comprado = nuevoEstado;
}

function manejarEliminacion(articuloId) {
  estado.articulos = estado.articulos.filter(item => item.id !== articuloId);
}

watch(totalPendientes, (nuevoValor) => {
  if (nuevoValor === 0 && estado.articulos.length > 0) {
    alert('¡Felicidades! Has completado todas tus compras.');
  }
});
</script>

<template>
  <div class="app-container">
    <h1>{{ titulo }}</h1>
    
    <!-- CONTENIDO DEL TEMPLATE COMPLETADO -->
    <form @submit.prevent="agregarArticulo" class="input-form">
      <input type="text" v-model="nuevoArticulo" placeholder="Añadir artículo...">
      <button type="submit">Agregar</button>
    </form>

    <div class="filters">
      <span>Filtros:</span>
      <button @click="estado.filtro = 'todos'" :class="{active: estado.filtro === 'todos'}">Todos</button>
      <button @click="estado.filtro = 'pendientes'" :class="{active: estado.filtro === 'pendientes'}">Pendientes</button>
      <button @click="estado.filtro = 'comprados'" :class="{active: estado.filtro === 'comprados'}">Comprados</button>
    </div>

    <ul class="item-list">
      <ArticuloItem
        v-for="articulo in articulosFiltrados"
        :key="articulo.id"
        :articulo="articulo" 
        @actualizar-comprado="manejarActualizacion(articulo, $event)"
        @eliminar-articulo="manejarEliminacion(articulo.id)"
      >
        <template #icono>
          <span v-if="articulo.comprado">✅</span>
          <span v-else>⏳</span>
        </template>
      </ArticuloItem>
    </ul>

    <footer>
      <p><strong>Total de artículos pendientes: {{ totalPendientes }}</strong></p>
    </footer>
  </div>
</template>

<style>
  /* ESTILOS AÑADIDOS */
  .app-container { 
    max-width: 500px; 
    margin: 2rem auto; 
    padding: 1.5rem; 
    background-color: #f4f4f9; 
    border-radius: 8px; 
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    font-family: sans-serif;
  }
  h1 { 
    color: #2c3e50; 
    text-align: center;
  }
  .input-form { 
    display: flex; 
    margin-bottom: 1rem; 
  }
  input[type="text"] { 
    flex-grow: 1; 
    padding: 10px; 
    border: 1px solid #ccc; 
    border-radius: 4px 0 0 4px;
  }
  .input-form button { 
    padding: 10px 15px; 
    background: #42b883; 
    color: white; 
    border: none; 
    cursor: pointer; 
    border-radius: 0 4px 4px 0;
    transition: background-color 0.2s;
  }
  .input-form button:hover {
    background-color: #35a06e;
  }
  .filters { 
    margin-bottom: 1rem; 
    text-align: center;
  }
  .filters button { 
    margin: 0 5px; 
    padding: 5px 10px;
    border: 1px solid #42b883;
    background-color: transparent;
    color: #42b883;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .filters button.active, .filters button:hover {
    background-color: #42b883;
    color: white;
  }
  .item-list { 
    list-style: none; 
    color: #000;
    padding: 0; 
  }
  footer { 
    margin-top: 1.5rem; 
    text-align: center; 
    color: #777; 
    font-size: 0.9em;
  }
</style>
