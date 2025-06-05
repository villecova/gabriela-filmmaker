<script>
  export let translate;
  import { onMount } from 'svelte';

  let showIntro = true;
  let animate = false;

  const hideIntro = () => {
    animate = true;
    setTimeout(() => {
      showIntro = false;
    }, 1000);
  };

  onMount(() => {
    const trigger = () => hideIntro();
    document.addEventListener('click', trigger, { once: true });
    document.addEventListener('scroll', trigger, { once: true });
  });
</script>

{#if showIntro}
  <div class="intro">
    <img class="image" class:hide-text={animate} src="/assets/images/wedding.png" alt="Wedding rings">
    <div class="text" class:hide-text={animate}>{translate.intro}</div>
    <div class="columns" class:animate={animate}>
      <div class="col up"></div>
      <div class="col down"></div>
      <div class="col up"></div>
      <div class="col down"></div>
    </div>
  </div>
{/if}

<style>
  .intro {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 30px;
    flex-direction: column;
  }

  .image {
    z-index: 10;
    width: 60px;
    padding-bottom: 1rem;
  }

  .text {
    color: black;
    font-size: 2.5rem;
    text-align: center;
    z-index: 2;
    transition: opacity 0.5s ease;
    font-family: 'Italiana', 'sans-serif';
    line-height: 1.5;
  }

  .hide-text {
    opacity: 0;
  }

  .columns {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
    z-index: 1;
    border: solid #FAF1E8;
    gap: 0;
  }

  .col {
    flex: 1;
    background: #FAF1E8;
    transform: translateY(0);
    transition: transform 1s ease;
  }

  .animate .col.up {
    transform: translateY(-100%);
  }

  .animate .col.down {
    transform: translateY(100%);
  }
</style>
