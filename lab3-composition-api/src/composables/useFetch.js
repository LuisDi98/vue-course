// Un composable es una función que aprovecha la Composition API de Vue
// para encapsular y reutilizar lógica con estado.

import { ref } from 'vue';

export function useFetch(url) {
  // Estado encapsulado dentro del composable
  const data = ref(null);
  const error = ref(null);
  const isLoading = ref(true);

  // La lógica para realizar la petición
  const fetchData = async () => {
    isLoading.value = true; // Inicia la carga
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error en la respuesta de la red');
      }
      data.value = await response.json();
    } catch (e) {
      error.value = e; // Captura cualquier error
    } finally {
      isLoading.value = false; // Finaliza la carga, tanto si tuvo éxito como si no
    }
  };

  // Devolvemos el estado y la función para que el componente que lo use
  // pueda controlarlos.
  return { data, error, isLoading, fetchData };
}