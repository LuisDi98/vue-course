# Este comando te guiará para crear un nuevo proyecto de Vue.
### Puedes nombrar tu proyecto './' para que permanezca en esta carpeta, o bien el nombre + cd a ese directorio de bash
### Selecciona "Vue" y luego "JavaScript" (o TypeScript si lo prefieres).
```bash
npm create vue@latest
```

## 1. Instala las dependencias necesarias
```bash
npm install
```

## 2. Inicia el servidor de desarrollo
```bash
npm run dev
```

# Puntos Clave:

* reactive: Envuelve nuestro objeto de estado. Es fácil de mutar (estado.filtro = '...).

* computed: articulosFiltrados y totalPendientes se recalculan solo cuando sus dependencias (estado.filtro o estado.articulos) cambian.

* watch: Se dispara específicamente cuando totalPendientes cambia, permitiéndonos mostrar una alerta.

# Documentación Oficial de Respaldo
* Fundamentos de Reactividad: https://es.vuejs.org/guide/essentials/reactivity-fundamentals.html

* Propiedades Computadas: https://es.vuejs.org/guide/essentials/computed.html

* Observadores (Watchers): https://es.vuejs.org/guide/essentials/watchers.html

* Componentes (Props, Eventos, Slots): https://es.vuejs.org/guide/essentials/component-basics.html

* Paso de Props: https://es.vuejs.org/guide/components/props.html

* Manejo de Eventos: https://es.vuejs.org/guide/components/events.html

* Slots: https://es.vuejs.org/guide/components/slots.html