<script>
  import en from '../../i18n/messages/en.json';
  import es from '../../i18n/messages/es.json';

  const lang = window.location.pathname.includes('/es') ? 'es' : 'en';
  const t = lang === 'es' ? es : en;

  let formData = {
    name: '',
    email: '',
    phoneCode: '+52', // Código de área por defecto (México)
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
  let touched = {
    name: false,
    email: false,
    phone: false,
    date: false,
    location: false,
    message: false
  };

  // Obtener la fecha mínima (hoy)
  const today = new Date().toISOString().split('T')[0];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    // Remover espacios, guiones y paréntesis
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    // Verificar que tenga al menos 10 dígitos
    return cleanPhone.length >= 10;
  };

  const validateEmailField = () => {
    touched.email = true;
    const emailTrimmed = formData.email ? formData.email.trim() : '';
    if (!emailTrimmed) {
      errors.email = t.contact.errors.required;
    } else if (!validateEmail(emailTrimmed)) {
      errors.email = t.contact.errors.invalidEmail;
    } else {
      delete errors.email;
    }
  };

  const validatePhoneField = () => {
    touched.phone = true;
    const phoneTrimmed = formData.phone ? formData.phone.trim() : '';
    if (!phoneTrimmed) {
      errors.phone = t.contact.errors.required;
    } else if (!validatePhone(phoneTrimmed)) {
      errors.phone = t.contact.errors.invalidPhone;
    } else {
      delete errors.phone;
    }
  };

  const validateNameField = () => {
    touched.name = true;
    const nameTrimmed = formData.name ? formData.name.trim() : '';
    if (!nameTrimmed) {
      errors.name = t.contact.errors.required;
    } else {
      delete errors.name;
    }
  };

  const validateLocationField = () => {
    touched.location = true;
    const locationTrimmed = formData.location ? formData.location.trim() : '';
    if (!locationTrimmed) {
      errors.location = t.contact.errors.required;
    } else {
      delete errors.location;
    }
  };

  const validateDateField = () => {
    touched.date = true;
    if (!formData.date) {
      errors.date = t.contact.errors.required;
    } else {
      const selectedDate = new Date(formData.date);
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      if (selectedDate < todayDate) {
        errors.date = lang === 'es' ? 'No se pueden seleccionar fechas pasadas' : 'Cannot select past dates';
      } else {
        delete errors.date;
      }
    }
  };

  const validateMessageField = () => {
    touched.message = true;
    const messageTrimmed = formData.message ? formData.message.trim() : '';
    if (!messageTrimmed) {
      errors.message = t.contact.errors.required;
    } else {
      delete errors.message;
    }
  };

  const validate = () => {
    errors = {};
    const requiredMsg = t.contact.errors.required;

    // Validar nombre
    const nameTrimmed = formData.name ? formData.name.trim() : '';
    if (!nameTrimmed) {
      errors.name = requiredMsg;
    }

    // Validar email
    const emailTrimmed = formData.email ? formData.email.trim() : '';
    if (!emailTrimmed) {
      errors.email = requiredMsg;
    } else if (!validateEmail(emailTrimmed)) {
      errors.email = t.contact.errors.invalidEmail;
    }
    
    // Validar teléfono
    const phoneTrimmed = formData.phone ? formData.phone.trim() : '';
    if (!phoneTrimmed) {
      errors.phone = requiredMsg;
    } else if (!validatePhone(phoneTrimmed)) {
      errors.phone = t.contact.errors.invalidPhone;
    }
    
    // Validar fecha
    if (!formData.date) {
      errors.date = requiredMsg;
    } else {
      const selectedDate = new Date(formData.date);
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      if (selectedDate < todayDate) {
        errors.date = lang === 'es' ? 'No se pueden seleccionar fechas pasadas' : 'Cannot select past dates';
      }
    }
    
    // Validar ubicación
    const locationTrimmed = formData.location ? formData.location.trim() : '';
    if (!locationTrimmed) {
      errors.location = requiredMsg;
    }
    
    // Validar mensaje
    const messageTrimmed = formData.message ? formData.message.trim() : '';
    if (!messageTrimmed) {
      errors.message = requiredMsg;
    }

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Marcar todos los campos como tocados al intentar enviar
    touched.name = true;
    touched.email = true;
    touched.phone = true;
    touched.date = true;
    touched.location = true;
    touched.message = true;
    
    // Validar todos los campos
    validateNameField();
    validateEmailField();
    validatePhoneField();
    validateDateField();
    validateLocationField();
    validateMessageField();
    
    if (!validate()) {
      showGeneralError = true;
      return;
    }
    
    showGeneralError = false;
    
    // Preparar los datos del formulario
    const form = e.target;
    const formDataObj = new FormData(form);
    
    // Combinar código de área y teléfono en un solo campo para Netlify
    const fullPhone = `${formData.phoneCode} ${formData.phone}`;
    formDataObj.set('phone', fullPhone);
    
    // Campo principal para Netlify (solo nombre)
    const summaryField = formData.name?.trim() || 'Nueva cotización';
    formDataObj.set('summary', summaryField);
    
    // Crear asunto del email para las notificaciones
    const name = formData.name?.trim() || 'un nuevo contacto';
    const emailSubject = `Nueva cotización PolkaDots de ${name}`;
    formDataObj.set('subject', emailSubject);
    
    try {
      // Enviar el formulario a Netlify
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formDataObj).toString()
      });
      
      // Redirigir a la página de agradecimiento personalizada
      const thanksUrl = lang === 'es' ? '/es/contact/thanks/' : '/contact/thanks/';
      window.location.href = thanksUrl;
    } catch (error) {
      console.error('Error submitting form:', error);
      showGeneralError = true;
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
      data-netlify="true"
      netlify-honeypot="bot-field"
      on:submit={handleSubmit}
      class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
    >
      <input type="hidden" name="form-name" value="wedding-quote" />
      <input type="hidden" name="summary" data-netlify-field="true" value="" />
      <input type="hidden" name="subject" value="" />
      <p class="hidden">
        <label>{t.contact.botField} <input name="bot-field" /></label>
      </p>

      <div>
        <input 
          type="text" 
          name="name" 
          bind:value={formData.name} 
          on:blur={validateNameField}
          placeholder="{t.contact.name} *" 
          class="w-full px-0 py-4 bg-transparent border-0 border-b border-taupe/20 focus:border-dusty focus:ring-0 text-taupe placeholder:text-taupe/40 transition-colors" 
        />
        {#if errors.name && touched.name}<p class="text-red-500 text-sm pt-2">{errors.name}</p>{/if}
      </div>

      <div>
        <input 
          type="email" 
          name="email" 
          bind:value={formData.email} 
          on:blur={validateEmailField}
          placeholder="{t.contact.email} *" 
          class="w-full px-0 py-4 bg-transparent border-0 border-b border-taupe/20 focus:border-dusty focus:ring-0 text-taupe placeholder:text-taupe/40 transition-colors" 
        />
        {#if errors.email && (touched.email || errors.email !== t.contact.errors.required)}<p class="text-red-500 text-sm pt-2">{errors.email}</p>{/if}
      </div>

      <div>
        <div class="flex gap-2">
          <select bind:value={formData.phoneCode} name="phoneCode" class="px-2 py-4 bg-transparent border-0 border-b border-taupe/20 focus:border-dusty focus:ring-0 text-taupe transition-colors cursor-pointer">
            <option value="+52">+52 (MX)</option>
            <option value="+1">+1 (US/CA)</option>
            <option value="+34">+34 (ES)</option>
            <option value="+39">+39 (IT)</option>
            <option value="+33">+33 (FR)</option>
            <option value="+44">+44 (UK)</option>
            <option value="+49">+49 (DE)</option>
            <option value="+54">+54 (AR)</option>
            <option value="+55">+55 (BR)</option>
            <option value="+56">+56 (CL)</option>
            <option value="+57">+57 (CO)</option>
            <option value="+51">+51 (PE)</option>
            <option value="+593">+593 (EC)</option>
            <option value="+598">+598 (UY)</option>
            <option value="+595">+595 (PY)</option>
            <option value="+591">+591 (BO)</option>
            <option value="+58">+58 (VE)</option>
            <option value="+507">+507 (PA)</option>
            <option value="+506">+506 (CR)</option>
            <option value="+505">+505 (NI)</option>
            <option value="+504">+504 (HN)</option>
            <option value="+503">+503 (SV)</option>
            <option value="+502">+502 (GT)</option>
            <option value="+501">+501 (BZ)</option>
          </select>
          <input 
            type="tel" 
            name="phone" 
            bind:value={formData.phone} 
            on:blur={validatePhoneField}
            placeholder="{t.contact.phone} *" 
            class="flex-1 px-0 py-4 bg-transparent border-0 border-b border-taupe/20 focus:border-dusty focus:ring-0 text-taupe placeholder:text-taupe/40 transition-colors" 
          />
        </div>
        {#if errors.phone && (touched.phone || errors.phone !== t.contact.errors.required)}<p class="text-red-500 text-sm pt-2">{errors.phone}</p>{/if}
      </div>

      <div class="relative">
        {#if !formData.date}
          <span class="absolute left-0 top-4 text-taupe/40 pointer-events-none text-base">{t.contact.date} *</span>
        {/if}
        <input 
          type="date" 
          name="date" 
          bind:value={formData.date} 
          on:blur={validateDateField}
          min={today} 
          class="w-full px-0 py-4 bg-transparent border-0 border-b border-taupe/20 focus:border-dusty focus:ring-0 text-taupe transition-colors date-input" 
          class:has-value={formData.date} 
        />
        {#if errors.date && (touched.date || errors.date !== t.contact.errors.required)}<p class="text-red-500 text-sm pt-2">{errors.date}</p>{/if}
      </div>

      <div class="md:col-span-2">
        <input 
          type="text" 
          name="location" 
          bind:value={formData.location} 
          on:blur={validateLocationField}
          placeholder="{t.contact.location} *" 
          class="w-full px-0 py-4 bg-transparent border-0 border-b border-taupe/20 focus:border-dusty focus:ring-0 text-taupe placeholder:text-taupe/40 transition-colors" 
        />
        {#if errors.location && touched.location}<p class="text-red-500 text-sm pt-2">{errors.location}</p>{/if}
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

      <div class="md:col-span-2">
        <textarea 
          name="message" 
          rows="4" 
          bind:value={formData.message} 
          on:blur={validateMessageField}
          placeholder="{t.contact.message} *" 
          class="w-full px-0 py-4 bg-transparent border-0 border-b border-taupe/20 focus:border-dusty focus:ring-0 text-taupe placeholder:text-taupe/40 transition-colors resize-none"
        ></textarea>
        {#if errors.message && touched.message}<p class="text-red-500 text-sm pt-2">{errors.message}</p>{/if}
      </div>

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
