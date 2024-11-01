<template>
    <Navbar />
    <div class="max-w-2xl mx-auto p-8">
        <div class="bg-white/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100">
            <h1 class="text-3xl font-semibold text-gray-800 mb-6">
                {{ $t('feedback.title') }}
            </h1>

            <form @submit.prevent="submitFeedback" class="space-y-6">
                <div class="space-y-2">
                    <label
                        for="type"
                        class="block text-sm font-medium text-gray-700"
                    >
                        {{ $t('feedback.type.label') }}
                    </label>
                    <select
                        id="type"
                        v-model="type"
                        class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
                    >
                        <option value="support">{{ $t('feedback.type.options.support') }}</option>
                        <option value="feedback">{{ $t('feedback.type.options.feedback') }}</option>
                    </select>
                </div>

                <div class="space-y-2">
                    <label
                        for="message"
                        class="block text-sm font-medium text-gray-700"
                    >
                        {{ $t('feedback.message') }}
                    </label>
                    <textarea
                        id="message"
                        v-model="message"
                        rows="4"
                        class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 resize-none"
                        required
                    />
                </div>

                <button
                    type="submit"
                    class="group relative w-full bg-blue-500 text-white py-3 px-6 rounded-xl hover:bg-blue-600 active:bg-blue-700 transition-all duration-200 flex items-center justify-center"
                    :class="{ 'opacity-75 cursor-wait': isSubmitting }"
                    :disabled="isSubmitting"
                >
                    <span>{{ $t('feedback.submit') }}</span>
                    <svg
                        class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                    </svg>
                </button>

                <TransitionRoot
                    appear
                    show="successMessage"
                    as="template"
                >
                    <div
                        v-if="successMessage"
                        class="text-green-500 text-center py-2 px-4 rounded-lg bg-green-50"
                    >
                        {{ successMessage }}
                    </div>
                </TransitionRoot>
            </form>
        </div>
    </div>
</template>
<script setup>
import {ref} from 'vue';
import axios from 'axios';
import apiClient from "../axios/index.js";
import Navbar from "./Navbar.vue";

const type = ref('support');
const message = ref('');
const successMessage = ref('');

const submitFeedback = async () => {
    try {
        const response = await apiClient.post('/feedback', {type: type.value, message: message.value});
        successMessage.value = response.data.success;
        type.value = '';
        message.value = '';
    } catch (error) {
        console.error(error);
    }
};
</script>

<style scoped>
</style>
