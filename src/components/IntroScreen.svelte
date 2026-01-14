<script>
  import { onMount } from 'svelte';

  let showIntro = true;
  let animate = false;
  let visible = false;

  const selectLanguage = (lang) => {
    // Guardar preferencia
    localStorage.setItem('preferred-lang', lang);
    
    // Animar salida
    animate = true;
    
    // Verificar si necesita redirigir
    const currentPath = window.location.pathname;
    const isSpanish = currentPath.startsWith('/es');
    const needsRedirect = (lang === 'es' && !isSpanish) || (lang === 'en' && isSpanish);
    
    setTimeout(() => {
      showIntro = false;
      
      // Solo redirigir si es necesario
      if (needsRedirect) {
        if (lang === 'es') {
          window.location.href = '/es';
        } else {
          window.location.href = '/';
        }
      }
    }, 1000);
  };

  onMount(() => {
    // Verificar si ya tiene preferencia guardada
    const savedLang = localStorage.getItem('preferred-lang');
    if (savedLang) {
      showIntro = false;
      return;
    }
    
    // Mostrar con delay para la animación de entrada
    setTimeout(() => {
      visible = true;
    }, 100);
  });
</script>

{#if showIntro}
  <div class="intro">
    <div class="content" class:visible={visible} class:hide={animate}>
      <!-- Logo -->
      <div class="logo">
        <span class="logo-main">PolkaDots</span>
        <span class="logo-sub">Cinema</span>
      </div>
      
      <!-- Tagline -->
      <p class="tagline">Timeless wedding films</p>

        <!-- Subtexto -->
        <p class="subtext">Begin your story</p>
      
      
      <!-- Separador -->
      <div class="dots">
        <span>•</span><span>•</span><span>•</span>
      </div>
      
      <!-- Pregunta -->
      <p class="question">Choose your language</p>
      
      <!-- Botones de idioma -->
      <div class="lang-buttons">
        <button class="lang-btn" on:click={() => selectLanguage('en')}>
          English
        </button>
        <button class="lang-btn" on:click={() => selectLanguage('es')}>
          Español
        </button>
      </div>
    </div>
    
    <!-- Background columns para animación de salida -->
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
    background: #FAF8F5;
  }

  .content {
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s ease-out;
  }

  .content.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .content.hide {
    opacity: 0;
    transform: translateY(-20px);
  }

  .logo {
    display: flex;
    flex-direction: column;
    font-family: 'Prata', serif;
    color: #4A4843;
    margin-bottom: 1rem;
  }

  .logo-main {
    font-size: 3rem;
    line-height: 1.1;
  }

  .logo-sub {
    font-size: 1.5rem;
  }

  .tagline {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.875rem;
    font-weight: 300;
    color: #4A4843;
    opacity: 0.7;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }

  .subtext {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.625rem;
    font-weight: 300;
    font-style: italic;
    color: #4A4843;
    opacity: 0.5;
    letter-spacing: 0.05em;
    margin-bottom: 2rem;
  }

  .dots {
    display: flex;
    gap: 1rem;
    color: #D9B89A;
    font-size: 1.25rem;
    margin-bottom: 2rem;
  }

  .question {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.75rem;
    font-weight: 400;
    color: #4A4843;
    opacity: 0.6;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
  }

  .lang-buttons {
    display: flex;
    gap: 1rem;
  }

  .lang-btn {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.875rem 2rem;
    border: 1px solid #4A4843;
    background: transparent;
    color: #4A4843;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .lang-btn:hover {
    background: #4A4843;
    color: #FAF8F5;
  }

  .columns {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
    z-index: 1;
    gap: 0;
  }

  .col {
    flex: 1;
    background: #FAF8F5;
    transform: translateY(0);
    transition: transform 1s ease;
  }

  .animate .col.up {
    transform: translateY(-100%);
  }

  .animate .col.down {
    transform: translateY(100%);
  }

  @media (max-width: 640px) {
    .logo-main {
      font-size: 2.5rem;
    }
    
    .logo-sub {
      font-size: 1.25rem;
    }
    
    .lang-buttons {
      flex-direction: column;
      width: 100%;
      max-width: 200px;
    }
    
    .lang-btn {
      width: 100%;
    }
  }
</style>
