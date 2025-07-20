<script setup>
// --- 1. Props: Recibir datos del componente padre ---
// 'defineProps' es una macro de compilador, no necesita ser importada.
// Define la "API" de nuestro componente. Espera un prop llamado 'articulo'.
const props = defineProps({
  articulo: {
    type: Object, // Especificamos el tipo de dato esperado
    required: true, // Es obligatorio que el padre pase este prop
  }
});

// --- 2. Eventos ($emit): Enviar datos al componente padre ---
// 'defineEmits' también es una macro.
// Declaramos los eventos que este componente puede emitir.
const emit = defineEmits(['actualizarComprado', 'eliminarArticulo']);

// No necesitamos un 'ref' para 'comprado' aquí porque el prop es un objeto
// y Vue lo hace reactivo. Sin embargo, para modificarlo, emitimos un evento.
function onCheckboxChange(event) {
  // Emitimos un evento con el nuevo estado del checkbox.
  emit('actualizarComprado', event.target.checked);
}
</script>

<template>
  <li :class="{ comprado: articulo.comprado }">
    <slot name="icono">🛒</slot> <span>{{ articulo.nombre }} ({{ articulo.cantidad }})</span>
    
    <div>
      <input type="checkbox" :checked="articulo.comprado" @change="onCheckboxChange" />
      <button @click="emit('eliminarArticulo')">Eliminar</button>
    </div>
  </li>
</template>

<style scoped>
/* 'scoped' asegura que estos estilos SOLO se apliquen a este componente */
li { display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #fff; border-bottom: 1px solid #fff; color: #000; }
.comprado { background-color: #e9f5e9; }
.comprado span { text-decoration: line-through; color: #999; }
button { margin-left: 10px; background-color: #e74c3c; padding: 5px 8px; }
span { margin: 0 10px; }
</style>