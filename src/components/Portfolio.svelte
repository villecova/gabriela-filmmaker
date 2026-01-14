<script>
  import { onMount } from 'svelte';
  import Icon from './shared/Icon.svelte';
  import en from '../i18n/messages/en.json';
  import es from '../i18n/messages/es.json';

  const lang = window.location.pathname.includes('/es') ? 'es' : 'en';
  const t = lang === 'es' ? es : en;

  let items = t.gallery.items;

  let selectedVideo = '';
  let modalOpen = false;
  let modalVideoRef;

  const openModal = (video) => {
    selectedVideo = video;
    modalOpen = true;
  };

  const closeModal = () => {
    modalOpen = false;
    if (modalVideoRef) modalVideoRef.pause();
  };

  onMount(() => {
    const handler = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });
</script>

<section class="bg-blush-bg pt-32 pb-16">
  <div class="max-w-screen-xl mx-auto px-6 md:px-12">
    <h2 class="text-4xl md:text-5xl font-main mb-10 text-taupe text-center">
      {t.gallery.title}
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {#each items as item, i}
        <div
          class="bg-white overflow-hidden rounded shadow-sm cursor-pointer"
          role="button"
          tabindex="0"
          on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && openModal('/assets/videos/hero.mp4')}
          on:click={() => openModal('/assets/videos/hero.mp4')}
        >
          <div class="overflow-hidden relative">
            <div class="absolute inset-0 bg-dark bg-opacity-30 z-2"></div>
            <div class="absolute inset-0 z-3 flex items-center justify-center">
              <Icon size="w-24 h-24" color="text-white" d="M8 18V6l8 6-8 6Z" className="bg-white rounded-full bg-opacity-20 py-2 pl-2"/>
            </div>
            <video muted playsinline class="w-full h-auto object-cover">
              <source src="/assets/videos/hero.mp4" type="video/mp4" />
            </video>
          </div>
          <div class="p-4">
            <p class="text-xs pb-2">{item.date}</p>
            <p class="text-xs text-gray-500 uppercase text-dusty">{item.category}</p>
            <h3 class="text-lg font-medium text-gray-800 mt-1">{item.title}</h3>
          </div>
        </div>
      {/each}
    </div>
  </div>

  {#if modalOpen}
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-dark bg-opacity-90"
      role="button"
      tabindex="0"
      on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && closeModal}
      on:click={closeModal}
    >
      <div
        class="relative w-full max-w-3xl mx-auto bg-dark md:rounded-lg overflow-hidden"        role="button"
        tabindex="0"
        on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && stopPropagation}
        on:click|stopPropagation
      >
        <button
          type="button"
          class="absolute top-4 right-4 text-white hover:text-gray-300 text-3xl z-20"
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
          class="w-full h-full object-cover"
        >
          <track kind="captions" src="" srclang="en" label="Captions" />
        </video>
      </div>
    </div>
  {/if}
</section>
