<template>
    <svg
        :width="width"
        :height="height"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        class="iconify iconify--twemoji"
        preserveAspectRatio="xMidYMid meet"
        v-bind="$attrs"
    >
        <path fill="#29AE66" d="M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v18z"></path>

        <path fill="#CA3745" d="M4 5h7v26H4z"></path>
        <path fill="#FAAE29" d="M4 8.312l.805.805l-.219.219l.32.32l.211-.211l.664.664l-.656.657l-.273-.274l-.29.289l.243.242l-.805.711v-.375l.441-.418l-.238-.191l.608-.607l.351.304l.328-.328l-.351-.351l-.246.246l-.641-.641l.24-.24L4 8.688z"></path>
    </svg>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    width: {
        type: String,
        default: '800px'
    },
    height: {
        type: String,
        default: '800px'
    }
})
</script>

<style scoped>
</style>
