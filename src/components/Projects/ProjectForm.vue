<template>
  <div class="mb-4">
    <input v-model="title" placeholder="Title" class="border p-2 w-full mb-2" />
    <textarea v-model="description" placeholder="Description" class="border p-2 w-full mb-2"></textarea>
    <button @click="addProject" class="bg-black text-white px-4 py-2">Add Project</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../../composables/supabase'
import { v4 as uuidv4 } from 'uuid'

const title = ref('')
const description = ref('')

const emit = defineEmits(['project-added'])

const addProject = async () => {
  if (title.value && description.value) {
    await supabase.from('projects').insert({
      id: uuidv4(),
      title: title.value,
      description: description.value
    })
    title.value = ''
    description.value = ''
    emit('project-added')
  }
}
</script>