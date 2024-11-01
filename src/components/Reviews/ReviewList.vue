<template>
    <div>
        <div v-if="loading" class="min-h-screen flex justify-center pt-4">
            <Loader />
        </div>

        <ul v-else-if="reviews.length" class="space-y-4">
            <li
                v-for="review in reviews"
                :key="review.id"
                class="border rounded-lg p-4 bg-gray-50 shadow-sm transition-shadow hover:shadow-md"
            >
                <div class="flex justify-between items-start mb-2">
                    <strong class="text-lg font-medium">{{ review.user.name }}</strong>
                    <StarRating
                        :value="review.rating"
                        readonly
                    />
                </div>
                <p class="text-gray-800 mt-2">{{ review.comment }}</p>
            </li>
        </ul>

        <div
            v-else
            class="text-gray-500 text-center min-h-screen flex items-center justify-center"
        >
            No reviews yet.
        </div>
    </div>
</template>

<script setup>
import StarRating from './StartRating.vue'
import Loader from "../CourseDetail/Loader.vue";

defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    reviews: {
        type: Array,
        default: () => []
    }
})
</script>
