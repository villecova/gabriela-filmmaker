<script>
  export let size = '';         // Ej: "w-12 h-12"
  export let color = 'white';   // Ej: "text-white" o "text-accent"
  export let className = '';    // Clases adicionales
  export let d = 'M8 18V6l8 6-8 6Z'; // Path del SVG
</script>

<svg
  class={`${size} ${color} ${className}`}
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  aria-hidden="true"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d={d}
  />
</svg>
