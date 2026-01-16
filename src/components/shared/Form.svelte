<script>
  import en from '../../i18n/messages/en.json';
  import es from '../../i18n/messages/es.json';

  const lang = window.location.pathname.includes('/es') ? 'es' : 'en';
  const t = lang === 'es' ? es : en;

  let formData = {
    name: '',
    email: '',
    phone: '',
    date: '',
    location: '',
    guests: '',
    style: '',
    budget: '',
    message: '',
    services: []
  };

  let errors = {};
  let showGeneralError = false;

  const validate = () => {
    errors = {};
    const requiredMsg = t.contact.errors.required;

    if (!formData.name) errors.name = requiredMsg;
    if (!formData.email) errors.email = requiredMsg;
    if (!formData.phone) errors.phone = requiredMsg;
    if (!formData.date) errors.date = requiredMsg;
    if (!formData.location) errors.location = requiredMsg;

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    if (!validate()) {
      e.preventDefault();
      showGeneralError = true;
    } else {
      showGeneralError = false;
    }
  };
</script>

<section class="bg-ivory pt-32 pb-24" id="contact">
  <div class="max-w-screen-xl mx-auto px-6 md:px-12">
    <div class="text-center mb-16 md:mb-20">
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-main mb-3 text-taupe tracking-tight">{t.contact.title}</h1>
      <div class="flex items-center justify-center gap-4 text-dusty text-xl mb-6">
        <span>•</span><span>•</span><span>•</span>
      </div>
      <p class="text-lg md:text-xl text-taupe/60 font-light max-w-2xl mx-auto">{t.contact.subtitle}</p>
    </div>

    <form
      name="wedding-quote"
      method="POST"
      action={lang === 'es' ? '/es/contact/thanks' : '/contact/thanks'}
      netlify
      netlify-honeypot="bot-field"
      on:submit={handleSubmit}
      class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
    >
      <input type="hidden" name="form-name" value="wedding-quote" />
      <p class="hidden">
        <label>{t.contact.botField} <input name="bot-field" /></label>
      </p>

      <div>
        <input type="text" name="name" bind:value={formData.name} placeholder="{t.contact.name} *" class="w-full px-0 py-4 bg-transparent border-0 border-b border-taupe/20 focus:border-dusty focus:ring-0 text-taupe placeholder:text-taupe/40 transition-colors" />
        {#if errors.name}<p class="text-red-500 text-sm pt-2">{errors.name}</p>{/if}
      </div>

      <div>
        <input type="email" name="email" bind:value={formData.email} placeholder="{t.contact.email} *" class="w-full px-0 py-4 bg-transparent border-0 border-b border-taupe/20 focus:border-dusty focus:ring-0 text-taupe placeholder:text-taupe/40 transition-colors" />
        {#if errors.email}<p class="text-red-500 text-sm pt-2">{errors.email}</p>{/if}
      </div>

      <div>
        <input type="tel" name="phone" bind:value={formData.phone} placeholder="{t.contact.phone} *" class="w-full px-0 py-4 bg-transparent border-0 border-b border-taupe/20 focus:border-dusty focus:ring-0 text-taupe placeholder:text-taupe/40 transition-colors" />
        {#if errors.phone}<p class="text-red-500 text-sm pt-2">{errors.phone}</p>{/if}
      </div>

      <div class="relative">
        {#if !formData.date}
          <span class="absolute left-0 top-4 text-taupe/40 pointer-events-none text-base">{t.contact.date} *</span>
        {/if}
        <input type="date" name="date" bind:value={formData.date} class="w-full px-0 py-4 bg-transparent border-0 border-b border-taupe/20 focus:border-dusty focus:ring-0 text-taupe transition-colors date-input" class:has-value={formData.date} />
        {#if errors.date}<p class="text-red-500 text-sm pt-2">{errors.date}</p>{/if}
      </div>

      <div class="md:col-span-2">
        <input type="text" name="location" bind:value={formData.location} placeholder="{t.contact.location} *" class="w-full px-0 py-4 bg-transparent border-0 border-b border-taupe/20 focus:border-dusty focus:ring-0 text-taupe placeholder:text-taupe/40 transition-colors" />
        {#if errors.location}<p class="text-red-500 text-sm pt-2">{errors.location}</p>{/if}
      </div>

      <input type="number" name="guests" bind:value={formData.guests} placeholder={t.contact.guests} class="w-full px-0 py-4 bg-transparent border-0 border-b border-taupe/20 focus:border-dusty focus:ring-0 text-taupe placeholder:text-taupe/40 transition-colors" />

      <fieldset class="md:col-span-2 pt-4">
        <legend class="text-sm text-taupe/70 mb-4">{t.contact.services}</legend>
        <div class="grid md:grid-cols-2 gap-3">
          <label class="flex items-center gap-3 text-sm text-taupe/80 cursor-pointer hover:text-taupe transition-colors">
            <input type="checkbox" name="services" value="Full Video" bind:group={formData.services} class="w-4 h-4 rounded border-taupe/30 text-dusty focus:ring-dusty/30" /> {t.contact.fullVideo}
          </label>
          <label class="flex items-center gap-3 text-sm text-taupe/80 cursor-pointer hover:text-taupe transition-colors">
            <input type="checkbox" name="services" value="Teaser" bind:group={formData.services} class="w-4 h-4 rounded border-taupe/30 text-dusty focus:ring-dusty/30" /> {t.contact.teaser}
          </label>
          <label class="flex items-center gap-3 text-sm text-taupe/80 cursor-pointer hover:text-taupe transition-colors">
            <input type="checkbox" name="services" value="Save the Date" bind:group={formData.services} class="w-4 h-4 rounded border-taupe/30 text-dusty focus:ring-dusty/30" /> {t.contact.saveDate}
          </label>
          <label class="flex items-center gap-3 text-sm text-taupe/80 cursor-pointer hover:text-taupe transition-colors">
            <input type="checkbox" name="services" value="Drone" bind:group={formData.services} class="w-4 h-4 rounded border-taupe/30 text-dusty focus:ring-dusty/30" /> {t.contact.drone}
          </label>
          <label class="flex items-center gap-3 text-sm text-taupe/80 cursor-pointer hover:text-taupe transition-colors">
            <input type="checkbox" name="services" value="Guest Messages" bind:group={formData.services} class="w-4 h-4 rounded border-taupe/30 text-dusty focus:ring-dusty/30" /> {t.contact.guestsMessages}
          </label>
        </div>
      </fieldset>

      <input type="text" name="style" bind:value={formData.style} placeholder={t.contact.style} class="md:col-span-2 w-full px-0 py-4 bg-transparent border-0 border-b border-taupe/20 focus:border-dusty focus:ring-0 text-taupe placeholder:text-taupe/40 transition-colors" />
      <input type="text" name="budget" bind:value={formData.budget} placeholder={t.contact.budget} class="md:col-span-2 w-full px-0 py-4 bg-transparent border-0 border-b border-taupe/20 focus:border-dusty focus:ring-0 text-taupe placeholder:text-taupe/40 transition-colors" />

      <textarea name="message" rows="4" bind:value={formData.message} placeholder={t.contact.message} class="md:col-span-2 w-full px-0 py-4 bg-transparent border-0 border-b border-taupe/20 focus:border-dusty focus:ring-0 text-taupe placeholder:text-taupe/40 transition-colors resize-none"></textarea>

      <div class="md:col-span-2 text-center pt-8">
        <p class="text-sm text-taupe/50 mb-6">
          {lang === 'es' ? '* Campos requeridos' : '* Required fields'}
        </p>
        <button type="submit" class="inline-flex items-center gap-2 bg-blush-bg hover:bg-dusty text-taupe hover:text-white px-8 py-4 text-sm uppercase tracking-widest font-medium transition-all duration-300">
          {t.contact.send}
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
        {#if showGeneralError}
          <p class="text-red-500 text-sm mt-4">
            {lang === 'es' ? 'Por favor completa todos los campos requeridos.' : 'Please fill in all required fields.'}
          </p>
        {/if}
      </div>
    </form>
  </div>
</section>

<style>
  .date-input:not(.has-value)::-webkit-datetime-edit {
    color: transparent;
  }
  .date-input:not(.has-value)::-webkit-datetime-edit-fields-wrapper {
    color: transparent;
  }
  .date-input.has-value::-webkit-datetime-edit {
    color: inherit;
  }
</style>
