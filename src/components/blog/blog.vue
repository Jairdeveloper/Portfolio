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