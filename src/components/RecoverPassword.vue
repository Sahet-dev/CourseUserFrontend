<template>
    <div>
        <h1>Send Password Reset Link</h1>
        <form @submit.prevent="sendPasswordResetLink">
            <div>
                <label for="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    v-model="email"
                    required
                    placeholder="Enter your email"
                />
            </div>
            <button type="submit">Send Reset Link</button>
        </form>

        <!-- Success/Error Messages -->
        <p v-if="message" :class="messageClass">{{ message }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const email = ref('');
const message = ref('');
const messageClass = ref('');

const sendPasswordResetLink = async () => {
    try {
        // Send POST request to the backend
        const response = await axios.post('http://127.0.0.1:8000/api/send-password-reset-link', {
            email: email.value,
        });

        // Show success message
        message.value = response.data.message;
        messageClass.value = 'success';
    } catch (error) {
        // Handle error
        if (error.response && error.response.data) {
            message.value = error.response.data.message;
        } else {
            message.value = 'An error occurred. Please try again.';
        }
        messageClass.value = 'error';
    }
};
</script>

<style scoped>
/* Styling for the form */
form {
    max-width: 400px;
    margin: 0 auto;
}

input[type="email"] {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #ccc;
}

button {
    padding: 10px 15px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}

/* Success/Error message styles */
.success {
    color: green;
    font-weight: bold;
}

.error {
    color: red;
    font-weight: bold;
}
</style>
