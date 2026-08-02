<template>
  <section class="p-6 max-w-5xl mx-auto">
    <!-- Título -->
    <h2 class="text-3xl font-semibold mb-6 border-b pb-2">Contacto</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <!-- Imagen -->
      <!-- TODO (Fase 0 pendiente): imagen real. Ver docs/IMPLEMENTATION_PLAN.md 1.7 -->
      <div>
        <img src="" alt="Contacto" class="rounded shadow-lg" />
      </div>
      <!-- Formulario -->
      <div>
        <h3 class="text-2xl font-bold mb-4">Envíame un mensaje</h3>
        <form id="contact-form" @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Honeypot anti-spam: invisible para una persona real, pero los bots que
               rellenan formularios automáticamente sí lo completan. Oculto con CSS
               (no type="hidden", que los bots detectan fácil) y excluido de lectores de
               pantalla y del tab de teclado. -->
          <div class="hidden" aria-hidden="true">
            <label for="empresa">Empresa</label>
            <input
              type="text"
              id="empresa"
              name="empresa"
              v-model="form.empresa"
              tabindex="-1"
              autocomplete="off"
            />
          </div>
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              v-model="form.name"
              placeholder="Tu nombre"
              class="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              v-model="form.email"
              placeholder="Tu correo electrónico"
              class="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700">Mensaje</label>
            <textarea
              id="message"
              name="message"
              v-model="form.message"
              placeholder="Tu mensaje"
              class="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Enviar
          </button>
        </form>
        <p v-if="successMessage" class="text-green-600 mt-4">{{ successMessage }}</p>
        <p v-if="errorMessage" class="text-red-600 mt-4">{{ errorMessage }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import emailjs from 'emailjs-com'

export default {
  name: 'Contacto',
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: '',
        empresa: '' // honeypot: debe llegar siempre vacío en un envío real
      },
      successMessage: '',
      errorMessage: ''
    }
  },
  mounted() {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
  },
  methods: {
    async handleSubmit() {
      if (this.form.empresa) {
        // Un bot rellenó el campo honeypot: abortar en silencio, sin llamar a EmailJS.
        return
      }
      try {
        // Enviar el formulario usando EmailJS
        await emailjs.sendForm(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          document.getElementById('contact-form') // Referencia al formulario
        )
        // Mostrar mensaje de éxito
        this.successMessage = '¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.'
        this.errorMessage = ''
        this.form = { name: '', email: '', message: '', empresa: '' }
      } catch (error) {
        console.error('Error al enviar el mensaje:', error)
        this.successMessage = ''
        this.errorMessage = 'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.'
      }
    }
  }
}
</script>
