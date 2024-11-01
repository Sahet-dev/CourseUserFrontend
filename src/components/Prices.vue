<template>
    <Navbar />
    <div class="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
            <p v-if="!user" class="text-4xl text-center text-gray-900 mb-8">
                {{ $t('subscription.login.please') }}
                <router-link to="/login" class="text-blue-500 border-b rounded hover:text-gray-100 hover:bg-blue-800 focus:text-underline transition ease-in-out duration-150">
                    {{ $t('subscription.login.loginLink') }}
                </router-link>
                {{ $t('subscription.login.firstThen') }}
            </p>
            <h2 class="text-4xl font-extrabold text-center text-gray-900 mb-8">
                {{ $t('subscription.title.choose') }} <span class="text-indigo-600">{{ $t('subscription.title.plan') }}</span>
            </h2>

            <div class="mt-12 space-y-8 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:gap-8">
                <!-- Monthly Subscription Card -->
                <div
                    class="relative bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col overflow-hidden transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                    :class="{'ring-2 ring-indigo-600': selectedPlan === 'monthly'}"
                >
                    <div class="px-6 py-8 bg-white sm:p-10 sm:pb-6">
                        <h3 class="text-2xl font-semibold text-center text-gray-900">{{ $t('subscription.monthly.title') }}</h3>
                        <div class="mt-4 flex justify-center items-baseline text-6xl font-extrabold text-indigo-600">
                            $14.99
                            <span class="ml-1 text-2xl font-medium text-gray-500">{{ $t('subscription.monthly.period') }}</span>
                        </div>
                    </div>
                    <div class="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-gray-50 space-y-6 sm:p-10 sm:pt-6">
                        <ul class="space-y-4">
                            <li class="flex items-start">
                                <div class="flex-shrink-0">
                                    <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p class="ml-3 text-base text-gray-700">{{ $t('subscription.features.allCourses') }}</p>
                            </li>
                            <li class="flex items-start">
                                <div class="flex-shrink-0">
                                    <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p class="ml-3 text-base text-gray-700">{{ $t('subscription.features.cancel') }}</p>
                            </li>
                            <li class="flex items-start">
                                <div class="flex-shrink-0">
                                    <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p class="ml-3 text-base text-gray-700">{{ $t('subscription.features.support') }}</p>
                            </li>
                        </ul>

                        <button
                            @click="selectPlan('monthly')"
                            :disabled="!user"
                            :class="{
                                'bg-indigo-600 hover:bg-indigo-700 cursor-pointer': user,
                                'bg-gray-400 cursor-not-allowed': !user
                            }"
                            class="w-full text-white rounded-md px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-colors duration-200"
                        >
                            {{ $t('subscription.buttons.selectMonthly') }}
                        </button>




                    </div>
                </div>

                <!-- Yearly Subscription Card -->
                <div
                    class="relative bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col overflow-hidden transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                    :class="{'ring-2 ring-indigo-600': selectedPlan === 'yearly'}"
                >
                    <div class="px-6 py-8 bg-white sm:p-10 sm:pb-6">
                        <h3 class="text-2xl font-semibold text-center text-gray-900">{{ $t('subscription.yearly.title') }}</h3>

                        <!-- Display discounted price and original price with a line-through -->
                        <div class="mt-4 flex justify-center items-baseline text-6xl font-extrabold text-indigo-600">
                            $149.99
                            <span class="ml-1 text-2xl font-medium text-gray-500">{{ $t('subscription.yearly.period') }}</span>
                        </div>
                        <div class="mt-2 flex justify-center items-center text-xl">
                            <span class="text-gray-400 line-through">$180.00</span>
                            <span class="ml-2 text-green-600 font-semibold">{{ $t('subscription.yearly.savings') }}</span>
                        </div>
                    </div>
                    <div class="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-gray-50 space-y-6 sm:p-10 sm:pt-6">
                        <ul class="space-y-4">
                            <li class="flex items-start">
                                <div class="flex-shrink-0">
                                    <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p class="ml-3 text-base text-gray-700">{{ $t('subscription.features.allCourses') }}</p>
                            </li>
                            <li class="flex items-start">
                                <div class="flex-shrink-0">
                                    <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p class="ml-3 text-base text-gray-700">{{ $t('subscription.features.cancel') }}</p>
                            </li>
                            <li class="flex items-start">
                                <div class="flex-shrink-0">
                                    <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p class="ml-3 text-base text-gray-700">{{ $t('subscription.features.support') }}</p>
                            </li>
                            <li class="flex items-start">
                                <div class="flex-shrink-0">
                                    <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p class="ml-3 text-base text-gray-700">{{ $t('subscription.features.annualSavings') }}</p>
                            </li>
                        </ul>
                        <button
                            @click="selectPlan('yearly')"
                            :disabled="!user"
                            :class="{
                                'bg-indigo-600 hover:bg-indigo-700 cursor-pointer': user,
                                'bg-gray-400 cursor-not-allowed': !user
                            }"
                            class="w-full text-white rounded-md px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-colors duration-200"
                        >
                            {{ $t('subscription.buttons.selectYearly') }}
                        </button>

                    </div>
                </div>
            </div>

            <!-- Display Selected Plan -->
            <div class="mt-10 text-center">
                <p class="text-xl font-medium text-gray-700">
                    {{ $t('subscription.selected.prefix') }}
                    <span class="font-bold text-indigo-600">
                        {{ selectedPlan === 'monthly' ? $t('subscription.selected.monthly') : $t('subscription.selected.yearly') }}
                    </span>
                    {{ $t('subscription.selected.suffix') }}
                </p>
            </div>
        </div>
    </div>
    <Footer />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";
import apiClient from "../axios/index.js";
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Q2SHN2LpRd4wlvxgioe7rRuQ6scppAuXABzPTCycR53OnNkGXdqekinog4OsmDiNv2tfOz8PPPdkLoVhex0ZCEo00Z4o1Fr2W');
const user = ref(null);
const selectedPlan = ref('monthly');

const selectPlan = async (plan) => {
    selectedPlan.value = plan;

    try {
        const { data } = await apiClient.post('/create-checkout-session', { plan });
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
    }
};

const fetchUser = async () => {
    try {
        const response = await apiClient.get('/user');
        user.value = response.data ? response.data.data : null;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            user.value = null;
        } else {
            console.error('Error fetching user:', error);
        }
    }
};

onMounted(() => {
    fetchUser();
});
</script>

