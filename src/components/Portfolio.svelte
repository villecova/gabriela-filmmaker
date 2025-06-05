<script>
  import { onMount } from 'svelte';
  import Icon from './shared/Icon.svelte';

  const items = [
    {
      video: '/assets/videos/hero.mp4',
      category: 'Wedding | Summer',
      title: 'Ena & Robert'
    },
    {
      video: '/assets/videos/hero.mp4',
      category: 'Wedding | Summer',
      title: 'Clara & Max'
    },
    {
      video: '/assets/videos/hero.mp4',
      category: 'Wedding | Summer',
      title: 'Anne & Sven'
    },
    {
      video: '/assets/videos/hero.mp4',
      category: 'Wedding | Summer',
      title: 'Hanna & Simon'
    }
  ];

  let selectedVideo = '';
  let modalOpen = false;
  let modalVideoRef;

  function openModal(video) {
    selectedVideo = video;
    modalOpen = true;
  }

  function closeModal() {
    modalOpen = false;
    if (modalVideoRef) {
      modalVideoRef.pause();
    }
  }

  // Cierra con Escape
  onMount(() => {
    const handler = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });
</script>

<section class="bg-[#f6f2ed] pt-32 pb-16 px-4">
  <div class="max-w-screen-lg mx-auto">
    <h2 class="text-4xl md:text-5xl font-main mb-6 text-black text-center">Gallery</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each items as item}
        <div
          class="bg-white overflow-hidden rounded shadow-sm cursor-pointer"
          role="button"
          tabindex="0"
          on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && openModal(item.video)}
          on:click={() => openModal(item.video)}
        >
          <div class="overflow-hidden relative">
            <div class="absolute inset-0 bg-black bg-opacity-30 z-2"></div>
            <div class="absolute inset-0 z-30 flex items-center justify-center">
              <Icon size="w-32 h-32" color="text-white" d="M8 18V6l8 6-8 6Z" />
            </div>
            <video muted playsinline class="w-full h-auto object-cover">
              <source src={item.video} type="video/mp4" />
            </video>
          </div>
          <div class="p-4">
            <p class="text-xs text-gray-500 uppercase">{item.category}</p>
            <h3 class="text-lg font-medium text-gray-800 mt-1">{item.title}</h3>
          </div>
        </div>
      {/each}
    </div>
  </div>

  {#if modalOpen}
  <!-- Fondo del modal: clic aquí cierra -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
    role="button"
    tabindex="0"
    on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && closeModal()}
    on:click={closeModal}
  >
    <!-- Contenido del modal: clic aquí NO cierra -->
    <div
      class="relative bg-white rounded-lg overflow-hidden shadow-lg max-w-3xl w-full"
      role="button"
      tabindex="0"
      on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && stopPropagation()}
      on:click|stopPropagation
    >
      <button
        type="button"
        class="absolute top-2 right-2 text-white hover:text-gray-900 text-xl z-20"
        aria-label="Cerrar video"
        on:click={closeModal}
      >
        ✕
      </button>

      <video
        bind:this={modalVideoRef}
        src={selectedVideo}
        autoplay
        controls
        class="w-full h-auto"
      >
        <track kind="captions" src="" srclang="en" label="Captions" />
      </video>
    </div>
  </div>
{/if}

</section>
