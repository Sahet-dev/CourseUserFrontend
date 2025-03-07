<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
            <h1 class="text-2xl font-semibold text-center text-gray-800 mb-4">Send Password Reset Link</h1>

            <form @submit.prevent="sendPasswordResetLink" class="space-y-4">
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
                    <input
                        type="email"
                        id="email"
                        v-model="email"
                        required
                        placeholder="Enter your email"
                        class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    :disabled="loading"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {{ loading ? 'Sending...' : 'Send Reset Link' }}
                </button>
            </form>

            <!-- Success/Error Messages -->
            <p v-if="message" :class="messageClass" class="mt-4 p-3 text-center text-sm font-semibold rounded-lg">
                {{ message }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const email = ref('');
const message = ref('');
const messageClass = ref('');
const loading = ref(false);

const sendPasswordResetLink = async () => {
    loading.value = true; // Start loading

    try {
        const response = await axios.post('http://127.0.0.1:8000/api/send-password-reset-link', {
            email: email.value,
        });

        message.value = response.data.message;
        messageClass.value = 'text-green-600 bg-green-100 border border-green-500'; // Success styling
    } catch (error) {
        message.value = error.response?.data?.message || 'An error occurred. Please try again.';
        messageClass.value = 'text-red-600 bg-red-100 border border-red-500'; // Error styling
    } finally {
        loading.value = false; // Stop loading
    }
};
</script>
