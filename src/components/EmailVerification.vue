<script setup>
import {ref, onMounted} from 'vue';
import apiClient from "../axios/index.js";

const email = ref('');
const code = ref('');
const step = ref(1); //
const message = ref('');
const loading = ref(false);
const isAuthenticated = ref(false);

const fetchUser = async () => {
    try {
        const response = await apiClient.get('/user');
        if (response.data.data?.email) {
            email.value = response.data.data.email;
            isAuthenticated.value = true;
        }
    } catch (error) {
        console.error("Failed to fetch user:", error);
    }
};

onMounted(fetchUser);

const sendVerificationCode = async () => {
    loading.value = true;
    message.value = '';

    try {
        const response = await apiClient.post('/send-verification-code', {
            email: email.value,
        });
        message.value = response.data.message;
        step.value = 2;
    } catch (error) {
        message.value = error.response?.data?.message || 'Error sending code';
    } finally {
        loading.value = false;
    }
};


const verifyCode = async () => {
    loading.value = true;
    message.value = '';

    try {
        const response = await apiClient.post('/verify-code', {
            code: code.value,
        });
        message.value = response.data.message;
        step.value = 3; // Mark as verified
    } catch (error) {
        message.value = error.response?.data?.message || 'Error verifying code';
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="container">
        <h2>Email Verification</h2>

        <div v-if="step === 1">
            <p v-if="isAuthenticated">
                Verification will be sent to: <strong>{{ email }}</strong>
            </p>
            <button :disabled="loading" @click="sendVerificationCode">
                {{ loading ? 'Sending...' : 'Send Code' }}
            </button>
        </div>

        <div v-else-if="step === 2">
            <p>Enter the 3-digit code sent to your email.</p>
            <input v-model="code" type="text" placeholder="Enter code" maxlength="3"/>
            <button :disabled="loading" @click="verifyCode">
                {{ loading ? 'Verifying...' : 'Verify Code' }}
            </button>
        </div>

        <div v-else-if="step === 3">
            <p class="success">Your email has been verified successfully!</p>
        </div>

<!--        <p v-if="message" class="message">{{ message }}</p>-->
    </div>
</template>

<style scoped>
.container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    text-align: center;
}

input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:disabled {
    background-color: #ccc;
}

.message {
    color: blue;
    margin-top: 10px;
}

.success {
    color: green;
}
</style>
