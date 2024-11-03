<template>
    <footer class="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">
        <div class="max-w-7xl mx-auto px-4 py-16">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                <!-- Footer Logo & About -->
                <div class="space-y-4">
                    <h2 class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        {{ $t('footer.logo') }}
                    </h2>
                    <p class="text-sm leading-relaxed text-gray-400 max-w-sm">
                        {{ $t('footer.description') }}
                    </p>
                </div>

                <!-- Footer Navigation Links -->
                <div class="space-y-4">
                    <h3 class="text-lg font-semibold text-white">{{ $t('footer.links.quickLinks') }}</h3>
                    <ul class="space-y-2">
                        <li>
                            <router-link
                                to="/"
                                class="text-gray-400 hover:text-white transition-colors duration-300 text-sm block transform hover:translate-x-1"
                            >
                                {{ $t('footer.links.home') }}
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                to="/courses/catalog"
                                class="text-gray-400 hover:text-white transition-colors duration-300 text-sm block transform hover:translate-x-1"
                            >
                                {{ $t('footer.links.coursesCatalog') }}
                            </router-link>
                        </li>
                        <li>
                            <a
                                href="#"
                                class="text-gray-400 hover:text-white transition-colors duration-300 text-sm block transform hover:translate-x-1"
                            >
                                {{ $t('footer.links.aboutAndContact') }}
                            </a>
                        </li>
                        <li>
                            <button
                                @click="goToFeedback"
                                class="text-gray-400 hover:text-white transition-colors duration-300 text-sm block transform hover:translate-x-1"
                            >
                                {{ $t('footer.links.feedback') }}
                            </button>
                        </li>
                    </ul>
                </div>

                <!-- Footer Contact Information -->
                <div class="space-y-4">
                    <h3 class="text-lg font-semibold text-white">{{ $t('footer.contact.title') }}</h3>
                    <div class="space-y-2">
                        <p class="flex items-center text-sm text-gray-400 group">
                            <span class="w-5 h-5 mr-2 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">📍</span>
                            {{ $t('footer.contact.address') }}
                        </p>
                        <p class="flex items-center text-sm text-gray-400 group">
                            <span class="w-5 h-5 mr-2 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">📞</span>
                            {{ $t('footer.contact.phone') }}
                        </p>
                        <p class="flex items-center text-sm text-gray-400 group">
                            <span class="w-5 h-5 mr-2 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">✉️</span>
                            support@courseapp.com
                        </p>
                    </div>
                </div>

                <!-- Footer Social Media Links -->
                <div class="space-y-4">
                    <h3 class="text-lg font-semibold text-white">{{ $t('footer.social.followMe') }}</h3>
                    <div class="space-y-3">
                        <a
                            href="https://www.instagram.com/sahetkakajanov"
                            class="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 group"
                        >
                            <Instagram class="w-5 h-5 text-pink-500 group-hover:text-pink-400" />
                            <span class="text-sm">Sahet Kakajanov</span>
                        </a>
                        <a
                            href="https://www.youtube.com/@itcoachtm1209"
                            class="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 group"
                        >
                            <YouTubeIcon class="w-5 h-5 text-red-500 group-hover:text-red-400" />
                            <span class="text-sm">IT CoachTM</span>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Footer Bottom -->
            <div class="mt-16 pt-8 border-t border-gray-800">
                <div class="text-center text-sm text-gray-500">
                    <span>{{ $t('footer.copyright') }}</span>
                    <span class="mx-2">|</span>
                    <span>{{ $t('footer.copyright2') }}</span>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Instagram from "./socialmed/Instagram.vue";
import YouTubeIcon from "./socialmed/Youtube.vue";

const router = useRouter();

function goToFeedback() {
    router.push({ name: 'Feedback' });
}
</script>

