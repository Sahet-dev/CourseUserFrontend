<template>
    <div>
        <Navbar />
        <main class="max-w-3xl mx-auto space-y-4 p-6">
            <!-- Review Form Section -->
            <section class="bg-gray-50 shadow-md rounded-lg p-6">
                <h2 class="text-2xl font-semibold mb-4">Submit a Review</h2>
                <ReviewForm
                    :is-submitting="isSubmitting"
                    :rating="rating"
                    :comment="comment"
                    @update:rating="setRating"
                    @update:comment="comment = $event"
                    @submit="submitReview"
                />
            </section>

            <!-- Reviews List Section -->
            <section class="bg-white shadow-md rounded-lg p-6">
                <h3 class="text-xl font-semibold mb-8 text-center">Site Reviews</h3>

                <ReviewsList
                    :loading="loading"
                    :reviews="reviews"
                />
            </section>
        </main>
        <Footer />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import ReviewForm from './components/ReviewForm.vue'
import ReviewsList from './components/ReviewsList.vue'
import StarRating from './components/StarRating.vue'

const rating = ref(0)
const comment = ref('')
const isSubmitting = ref(false)
const loading = ref(false)
const reviews = ref([])

const setRating = (value) => {
    rating.value = value
}

const submitReview = async () => {
    // Implementation remains the same
}
</script>

<!-- ReviewForm.vue -->
<template>
    <form @submit.prevent="$emit('submit')" class="space-y-4">
        <div>
            <label class="block text-gray-700 font-medium mb-2">Rating:</label>
            <StarRating
                :value="rating"
                @update:value="$emit('update:rating', $event)"
            />
        </div>

        <div>
            <label
                for="comment"
                class="block text-gray-700 font-medium mb-2"
            >
                Comment:
            </label>
            <textarea
                id="comment"
                v-model="comment"
                rows="4"
                required
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                @input="$emit('update:comment', $event.target.value)"
            />
        </div>

        <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm
             hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500
             disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {{ isSubmitting ? 'Submitting...' : 'Submit Review' }}
        </button>
    </form>
</template>

<script setup>
defineProps({
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    isSubmitting: {
        type: Boolean,
        default: false
    }
})

defineEmits(['update:rating', 'update:comment', 'submit'])
</script>

<!-- StarRating.vue -->
<template>
    <div class="flex space-x-1">
        <button
            v-for="star in 5"
            :key="star"
            type="button"
            @click="$emit('update:value', star)"
            class="focus:outline-none"
        >
            <svg
                :class="{'text-yellow-500': star <= value, 'text-gray-300': star > value}"
                class="w-6 h-6 transition-colors duration-150"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path d="M12 17.27L18.18 21l-1.45-6.3L22 9.24l-6.36-.54L12 2 8.36 8.7 2 9.24l5.27 5.46L5.82 21z" />
            </svg>
        </button>
    </div>
</template>





<script setup>
defineProps({
    value: {
        type: Number,
        required: true
    }
})

defineEmits(['update:value'])
</script>

<!-- ReviewsList.vue -->
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
