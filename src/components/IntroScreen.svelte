<script>
    import { fade, scale } from 'svelte/transition';
    import { onMount } from 'svelte';
  
    let visible = true;
  
    const hideIntro = () => {
      visible = false;
      document.removeEventListener('click', hideIntro);
      document.removeEventListener('scroll', hideIntro);
    };
  
    onMount(() => {
      document.addEventListener('click', hideIntro, { once: true });
      document.addEventListener('scroll', hideIntro, { once: true });
    });
  </script>
  
  {#if visible}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black text-white text-3xl font-bold"
    transition:scale={{ duration: 800 }}
    >
    Welcome to the experience
    </div>
  {/if}
  