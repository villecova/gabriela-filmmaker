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
    }
  };
</script>

<section class="bg-[#f6f2ed] pt-32 pb-16 px-4" id="contact">
  <div class="max-w-screen-lg mx-auto md:px-4">
    <div class="text-center mb-10">
      <h2 class="text-4xl md:text-5xl font-main mb-2 text-black">{t.contact.title}</h2>
      <p class="text-sm text-accent">{t.contact.subtitle}</p>
    </div>

    <form
      name="wedding-quote"
      method="POST"
      netlify
      netlify-honeypot="bot-field"
      on:submit={handleSubmit}
      class="grid grid-cols-1 md:grid-cols-2 gap-4 mad:gap-6 max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-md"
    >
      <input type="hidden" name="form-name" value="wedding-quote" />
      <p class="hidden">
        <label>{t.contact.botField} <input name="bot-field" /></label>
      </p>

      <div>
        <input type="text" name="name" bind:value={formData.name} placeholder={t.contact.name} class="p-3 border border-gray-300 rounded-md w-full" />
        {#if errors.name}<p class="text-red-500 text-sm pt-2">{errors.name}</p>{/if}
      </div>

      <div>
        <input type="email" name="email" bind:value={formData.email} placeholder={t.contact.email} class="p-3 border border-gray-300 rounded-md w-full" />
        {#if errors.email}<p class="text-red-500 text-sm pt-2">{errors.email}</p>{/if}
      </div>

      <div>
        <input type="tel" name="phone" bind:value={formData.phone} placeholder={t.contact.phone} class="p-3 border border-gray-300 rounded-md w-full" />
        {#if errors.phone}<p class="text-red-500 text-sm pt-2">{errors.phone}</p>{/if}
      </div>

      <div>
        <input type="date" name="date" bind:value={formData.date} class="p-3 border border-gray-300 rounded-md w-full" />
        {#if errors.date}<p class="text-red-500 text-sm pt-2">{errors.date}</p>{/if}
      </div>

      <div class="md:col-span-2">
        <input type="text" name="location" bind:value={formData.location} placeholder={t.contact.location} class="p-3 border border-gray-300 rounded-md w-full" />
        {#if errors.location}<p class="text-red-500 text-sm pt-2">{errors.location}</p>{/if}
      </div>

      <input type="number" name="guests" bind:value={formData.guests} placeholder={t.contact.guests} class="p-3 border border-gray-300 rounded-md" />

      <fieldset class="md:col-span-2">
        <legend class="text-sm font-medium mb-2">{t.contact.services}</legend>
        <div class="grid md:grid-cols-2 gap-2">
          <label><input type="checkbox" value="Full Video" bind:group={formData.services} /> {t.contact.fullVideo}</label>
          <label><input type="checkbox" value="Teaser" bind:group={formData.services} /> {t.contact.teaser}</label>
          <label><input type="checkbox" value="Save the Date" bind:group={formData.services} /> {t.contact.saveDate}</label>
          <label><input type="checkbox" value="Drone" bind:group={formData.services} /> {t.contact.drone}</label>
          <label><input type="checkbox" value="Guest Messages" bind:group={formData.services} /> {t.contact.guestsMessages}</label>
        </div>
      </fieldset>

      <input type="text" name="style" bind:value={formData.style} placeholder={t.contact.style} class="md:col-span-2 p-3 border border-gray-300 rounded-md" />
      <input type="text" name="budget" bind:value={formData.budget} placeholder={t.contact.budget} class="md:col-span-2 p-3 border border-gray-300 rounded-md" />

      <textarea name="message" rows="4" bind:value={formData.message} placeholder={t.contact.message} class="md:col-span-2 p-3 border border-gray-300 rounded-md"></textarea>

      <div class="md:col-span-2 text-center">
        <button type="submit" class="bg-accent hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-full transition">
          {t.contact.send}
        </button>
      </div>
    </form>
  </div>
</section>
