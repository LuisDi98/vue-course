<script setup>
// Importamos 'readonly' para seguir buenas prácticas
import { ref, provide, onMounted, readonly } from 'vue';
import { useFetch } from './composables/useFetch.js';
import PostItem from './components/PostItem.vue';

// --- THEME MANAGEMENT (Provide / Inject) ---
const theme = ref('light');

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
}

// PROVIDE MEJORADO:
// Proveemos una versión 'readonly' del tema para prevenir que los hijos
// lo modifiquen directamente. Solo podrá ser cambiado por 'toggleTheme'.
provide('theme', {
  theme: readonly(theme),
  toggleTheme,
});

// --- DATA FETCHING (Composables) ---
const { data: posts, error, isLoading, fetchData } = useFetch('https://jsonplaceholder.typicode.com/posts?_limit=10');

// --- LIFECYCLE HOOK ---
onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="app-container" :class="theme">
    <header>
      <h1>Blog con Composition API</h1>
      <button @click="toggleTheme">
        Cambiar a tema {{ theme === 'light' ? 'oscuro' : 'claro' }}
      </button>
    </header>

    <main>
      <div v-if="isLoading">Cargando posts...</div>
      <div v-else-if="error" class="error">Error: {{ error.message }}</div>
      <div v-else-if="posts" class="posts-list">
        <PostItem v-for="post in posts" :key="post.id" :post="post" />
      </div>
    </main>
  </div>
</template>

<style>
/* Estilos globales y para los temas */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  transition: background-color 0.3s, color 0.3s;
}

.app-container {
  padding: 2rem;
  min-height: 100vh;
  box-sizing: border-box;
}

.app-container.light {
  background-color: #f4f4f9;
  color: #2c3e50;
}

.app-container.dark {
  background-color: #2c3e50;
  color: #f4f4f9;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid;
  padding-bottom: 1rem;
  border-color: rgba(128, 128, 128, 0.3);
}

.error {
  color: #e74c3c;
  font-weight: bold;
  text-align: center;
  margin-top: 2rem;
}

.posts-list {
  margin-top: 2rem;
  display: grid;
  gap: 1rem;
}
</style>
