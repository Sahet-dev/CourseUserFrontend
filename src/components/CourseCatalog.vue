<template>
    <div class="bg-gradient-to-r from-gray-100 via-pink-50 to-blue-50">
        <Navbar />
        <div class="container mx-auto p-4">
            <h1 class="text-2xl font-bold mb-6">{{ $t('courseSearchCatalog.title') }}</h1>
            <h5 class="text-2xl mb-6 p-2">{{ $t('searchResults.resultsFound', { count: totalOccurrences }) }}</h5>
            <h5 class="text-2xl mb-6 p-2">{{ $t('searchResults.forSearchTerm', { term: search }) }}</h5>

            <div v-if="loading" class="mx-auto min-h-screen items-center pt-4">
                <Loader />
            </div>

            <div v-else-if="!loading && courses.courses && courses.courses.length">
                <div v-for="course in courses.courses" :key="course.id" class="bg-white rounded shadow p-6 mb-6">
                    <div @click="openCourse(course.id)">
                        <img
                            :src="imageUrl(course.thumbnail)"
                            :alt="course.title"
                            class="w-full h-48 object-cover rounded mb-4"
                        />
                        <h2 class="text-xl font-semibold mb-2">
                            <span v-for="(part, index) in splitText(course.title)" :key="index">
                                <span v-if="part.isHighlighted" class="highlight">{{ part.text }}</span>
                                <span v-else>{{ part.text }}</span>
                            </span>
                        </h2>
                        <p class="text-gray-700 mb-2">
                            <span v-for="(part, index) in splitText(course.description)" :key="index">
                                <span v-if="part.isHighlighted" class="highlight">{{ part.text }}</span>
                                <span v-else>{{ part.text }}</span>
                            </span>
                        </p>
                        <p class="text-sm text-gray-500">{{ $t('searchResults.occurrencesCount', { term: search, count: searchCounts[course.id] }) }}</p>
                    </div>

                    <div></div>
                    <div class="flex items-center justify-between mb-2">
                        <div class="text-gray-700 font-bold">
                        </div>

                        <button
                            @click="toggleBookmark(course)"
                            class="ml-2 text-sky-800 bg-transparent hover:bg-gray-200 rounded-full p-2"
                        >
                            <BookmarkIcon v-if="!isBookmarked(course)" class="w-5 h-5" />
                            <BookmarkIconSolid v-else class="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <div v-else class="text-gray-500 min-h-screen">{{ $t('searchResults.noResults') }}</div>
        </div>

        <Footer />
    </div>
</template>


<script setup>
import { computed, onMounted, ref, watch } from 'vue';

import apiClient from "../axios/index.js";
import Navbar from "./Navbar.vue";
import {useRoute, useRouter} from 'vue-router';
import Footer from "./Footer.vue";
import {BookmarkIcon} from "@heroicons/vue/24/outline";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/vue/24/solid";
import Loader from "./CourseDetail/Loader.vue";
import { imageUrl } from '../imageUtil.js';

const route = useRoute();
const search = ref(route.query.search || '');
const courses = ref([]);
const searchCounts = ref({});
const router = useRouter();
const bookmarks = ref([]);
const loading = ref(true);



const splitText = (text) => {
    if (!search.value) return [{ text, isHighlighted: false }];

    const regex = new RegExp(`(${search.value})`, 'gi');
    const parts = text.split(regex);

    return parts.map(part => ({
        text: part,
        isHighlighted: part.toLowerCase() === search.value.toLowerCase(),
    }));
};

const totalOccurrences = computed(() => {
    return Object.values(searchCounts.value).reduce((acc, count) => acc + count, 0);
});

const fetchCourses = async () => {
    try {
        const response = await apiClient.get('/course-catalog', { params: { search: search.value } });
        console.log('API Response:', response.data); // Log the full response

        courses.value = response.data; // The entire response object, which includes 'courses' and 'filters'
        console.log('courses:', courses.value); // Log the assigned data

        searchCounts.value = {};
        courses.value.courses.forEach(course => {
            const titleOccurrences = (course.title.match(new RegExp(search.value, 'gi')) || []).length;
            const descriptionOccurrences = (course.description.match(new RegExp(search.value, 'gi')) || []).length;
            searchCounts.value[course.id] = titleOccurrences + descriptionOccurrences;
        });
    } catch (error) {
        console.error(error);
    }finally {
        loading.value = false;
    }
};




const fetchBookmarks = async () => {
    const { data } = await apiClient.get('/bookmarks');
    bookmarks.value = data;
};

const isBookmarked = (course) => {
    return bookmarks.value.some((bookmark) => bookmark.id === course.id);
};

const toggleBookmark = async (course) => {
    if (isBookmarked(course)) {
        await apiClient.delete(`/bookmarks/${course.id}`);
        bookmarks.value = bookmarks.value.filter((bookmark) => bookmark.id !== course.id);
    } else {
        await apiClient.post(`/bookmarks/${course.id}`);
        bookmarks.value.push(course);
    }
};

const removeBookmark = async (course) => {
    await apiClient.delete(`/bookmarks/${course.id}`);
    bookmarks.value = bookmarks.value.filter((bookmark) => bookmark.id !== course.id);
};


const openCourse = async (courseId) => {
    await router.push({name: 'CoursePage', params: {id: courseId}});
};

watch(() => route.query.search, (newSearchTerm) => {
    search.value = newSearchTerm;
    fetchCourses(); // Re-fetch courses when the search term changes
});

onMounted(fetchCourses);
</script>

<style scoped>
.highlight {
    background-color: #fef08a; /* Yellow background color */
    padding: 2px 4px; /* Optional padding */
    border-radius: 2px; /* Optional rounded corners */
}
</style>
