<template>
  <a
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="label"
    class="inline-block focus:outline-none focus:ring-2 focus:ring-dark rounded"
  >
    <img :src="icon" :alt="label" class="w-6 h-6" />
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
