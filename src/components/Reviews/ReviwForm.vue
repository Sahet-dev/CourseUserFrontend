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
                :value="comment"
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
import StarRating from './StartRating.vue'

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
