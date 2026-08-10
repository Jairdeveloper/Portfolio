<template>
  <a
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="label"
    class="inline-block w-9 h-9 rounded-lg bg-darkcard border border-darkborder flex items-center justify-center hover:border-accent/60 hover:-translate-y-0.5 transition focus:outline-none focus:ring-2 focus:ring-accent"
  >
    <img :src="icon" :alt="label" class="w-5 h-5 brightness-0 invert opacity-80" />
  </a>
</template>

<script>
export default {
  name: 'SocialIcon',
  props: {
    icon: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
}
</script>
