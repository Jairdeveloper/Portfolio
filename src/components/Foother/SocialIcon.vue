<template>
    <a :href = "url" target="_blank" :aria-label="label">
      <img :src="icon" :alt="label" class="w-6 h-6" /> 
    </a>
</template>

<script>
export default {
  name: 'SocialIcon',
  props: {
    icon: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  }
}
</script>