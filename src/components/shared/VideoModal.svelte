<script>
    export let show = false;
    export let videoSrc = "";
    export let onClose = () => {};
  
    const handleClose = () => {
      onClose();
    };
  
    import { onMount } from 'svelte';
    onMount(() => {
      const keyHandler = (e) => {
        if (e.key === 'Escape') handleClose();
      };
      window.addEventListener('keydown', keyHandler);
      return () => window.removeEventListener('keydown', keyHandler);
    });
  </script>
  
  {#if show}
    <!-- Backdrop con botón invisible -->
    <button
      type="button"
      aria-label="Cerrar modal"
      class="fixed inset-0 z-40 bg-black bg-opacity-70 cursor-default"
      on:click={handleClose}
    >
    </button>
  
    <!-- Contenedor del video -->
    <div
      class="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
    >
      <div
        class="relative bg-white rounded-lg overflow-hidden shadow-lg max-w-3xl w-full pointer-events-auto"
      >
        <button
          type="button"
          class="absolute top-2 right-2 text-gray-400 hover:text-gray-900 text-2xl font-bold"
          aria-label="Cerrar video"
          on:click={handleClose}
        >
          ✕
        </button>
  
        <video
          src={videoSrc}
          autoplay
          controls
          class="w-full h-auto"
        >
          <track kind="captions" src="" srclang="en" label="Captions" />
        </video>
      </div>
    </div>
  {/if}
  