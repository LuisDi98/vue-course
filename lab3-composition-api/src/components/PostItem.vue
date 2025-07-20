<script setup>
// Se importa 'ref' para poder usarlo en el valor por defecto de inject
import { inject, ref } from 'vue';

// El componente recibe el 'post' a través de props.
defineProps({
  post: {
    type: Object,
    required: true,
  }
});

// INJECT CORREGIDO:
// Consumimos los datos provistos por un ancestro.
// Se añade un valor por defecto completo y seguro. Si el 'provide' falla,
// 'toggleTheme' será una función vacía en lugar de 'undefined', evitando errores.
const { theme, toggleTheme } = inject('theme', {
  theme: ref('light'),
  toggleTheme: () => {}
});
</script>

<template>
  <!-- La clase de este componente reacciona al tema inyectado.
       Vue desenvuelve automáticamente el ref 'theme' en la plantilla. -->
  <div class="post-item" :class="theme">
    <h3>{{ post.title }}</h3>
    <p>{{ post.body }}</p>
    <button @click="toggleTheme">Toggle desde PostItem</button>
  </div>
</template>

<style scoped>
.post-item {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  transition: background-color 0.3s, border-color 0.3s;
}

.post-item.light {
  background-color: #fff;
  border-color: #ddd;
}

.post-item.dark {
  background-color: #3a5169;
  border-color: #5a7189;
}

.post-item h3 {
  margin-top: 0;
  text-transform: capitalize;
}
</style>
