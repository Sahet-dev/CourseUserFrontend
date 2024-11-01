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
