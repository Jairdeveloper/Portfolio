<template>
    <section class="py-12 bg-gray-100">
        <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-8 text-center">Blog</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
            v-for="post in posts"
            :key="post.id"
            class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
            >
            <h3 class="text-xl font-semibold mb-2">{{ post.title }}</h3>
            <p class="text-gray-700 mb-4">{{ post.excerpt }}</p>
            <a
                :href="post.url"
                target="_blank"
                class="text-blue-600 hover:underline"
            >Leer más</a>
            </div>
        </div>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                posts: [
                    {
                        id: 1,
                        title: 'Mi primer post en el blog',
                        excerpt: 'Este es un resumen de mi primer post en el blog. Aquí hablo sobre mis experiencias como desarrollador frontend.',
                        url: '#'
                    },
                    {
                        id: 2,
                        title: 'Aprendiendo Vue.js',
                        excerpt: 'En este post comparto mis aprendizajes y recursos sobre Vue.js, un framework progresivo para construir interfaces de usuario.',
                        url: '#'
                    },
                    {
                        id: 3,
                        title: 'Consejos para mejorar tu portafolio',
                        excerpt: 'Aquí te doy algunos consejos prácticos para mejorar tu portafolio y atraer más clientes o empleadores.',
                        url: '#'
                    }
                ]
            };
        }
    };        
</script>