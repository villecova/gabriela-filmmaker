<script>
  import { onMount } from 'svelte';
  import Icon from './shared/Icon.svelte';

  const items = [
    {
      video: '/assets/videos/hero.mp4',
      category: 'Wedding | Summer',
      title: 'Ena & Robert',
      date: 'June 3rd, 2025'
    },
    {
      video: '/assets/videos/hero.mp4',
      category: 'Wedding | Summer',
      title: 'Clara & Max',
      date: 'June 3rd, 2025'
    },
    {
      video: '/assets/videos/hero.mp4',
      category: 'Wedding | Summer',
      title: 'Anne & Sven',
      date: 'June 3rd, 2025'
    },
    {
      video: '/assets/videos/hero.mp4',
      category: 'Wedding | Summer',
      title: 'Hanna & Simon',
      date: 'June 3rd, 2025'
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
    <h2 class="text-4xl md:text-5xl font-main mb-10 text-black text-center">Gallery</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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
            <div class="absolute inset-0 z-3 flex items-center justify-center">
              <Icon size="w-24 h-24" color="text-white" d="M8 18V6l8 6-8 6Z" className="bg-white rounded-full bg-opacity-20 py-2 pl-2"/>
            </div>
            <video muted playsinline class="w-full h-auto object-cover">
              <source src={item.video} type="video/mp4" />
            </video>
          </div>
          <div class="p-4">
            <p class="text-xs pb-2">{item.date}</p>
            <p class="text-xs text-gray-500 uppercase text-accent">{item.category}</p>
            <h3 class="text-lg font-medium text-gray-800 mt-1">{item.title}</h3>
          </div>
        </div>
      {/each}
    </div>
  </div>

  {#if modalOpen}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center md:bg-black bg-opacity-90"
    role="button"
    tabindex="0"
    on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && closeModal}
    on:click={closeModal}
  >
    <div
      class="relative w-screen h-screen md:max-w-3xl md:h-auto bg-black"
      role="button"
      tabindex="0"
      on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && stopPropagation}
      on:click|stopPropagation
    >
      <!-- Botón de cerrar -->
      <button
        type="button"
        class="absolute top-4 right-4 text-white hover:text-gray-300 text-3xl z-20"
        aria-label="Cerrar video"
        on:click={closeModal}
      >
        ✕
      </button>

      <!-- Video full screen -->
      <video
        bind:this={modalVideoRef}
        src={selectedVideo}
        autoplay
        controls
        class="w-full h-full object-cover"
      >
        <track kind="captions" src="" srclang="en" label="Captions" />
      </video>
    </div>
  </div>
{/if}



</section>
