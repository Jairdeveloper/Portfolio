<template>
  <Header />
  <Hero id="portfolio"/>
  <about id="about"/>
  <Blog />
  <Projects id="project"/> 
  <Contacto id="contact"/>
  <Foother  />
</template>

<script setup>
import Header from '../components/Header/Header.vue'
import Hero from '../components/Hero/Hero.vue'
import About from  '../components/About/About.vue'
import Blog from '../components/blog/blog.vue'
import Projects from '../components/Projects/Projects.vue'
import Foother from '../components/Foother/Foother.vue'
import Contacto from '../components/Contacto/Contacto.vue'

export default{
  components:{
    Blog
  }
};
</script>