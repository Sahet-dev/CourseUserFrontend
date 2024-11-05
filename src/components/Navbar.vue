<template>
    <nav class="custom-nav">
        <!-- Primary Navigation Menu -->
        <div class="pc-container">
            <div class="main-flex">
                <div class="flex">
                    <!-- Logo -->
                    <div class="custom-logo">
                        <router-link to="/" class="flex items-center">
                            <span class="logo-text">Tm_C</span>
                            <span class="pc-logo-text">TmCourses</span>
                        </router-link>
                    </div>

                    <!-- Search Input -->
                    <div class="search-bar-container">
                        <input
                            v-model="searchQuery"
                            type="text"
                            :placeholder="$t('searchCoursesPlaceholder')"
                            class="search-bar-input"
                        />
                        <button
                            @click="searchCourses"
                            :disabled="!searchQuery.trim()"
                            class="search-bar-button"
                        >
                            {{ $t('searchButton') }}
                        </button>
                    </div>
                </div>

                <div class="links-container">

                    <button v-if="currentLocale !== 'EN'" @click="changeLocale('EN')" class="language-button">
                        <Eng width="40px" height="30px" />
                    </button>

                    <!-- Turkmen Button -->
                    <button v-if="currentLocale !== 'TM'" @click="changeLocale('TM')" class="language-button">
                        <Tm width="40px" height="30px" />
                    </button>

                    <!-- Prices Button -->
                    <div :key="i18n.global.locale" class="pricing-button-container">
                        <button
                            @click="openPrices"
                            class="button-pricing-rew"
                        >
                            {{ $t('pricesButton') }}
                        </button>
                    </div>
                    <div class="pricing-button-container">
                        <button
                            @click="goToReviews"
                            class="button-pricing-rew"
                        >
                            {{ $t('reviewsButton') }}
                        </button>
                    </div>

                    <!-- Authentication Links -->
                    <template v-if="!user">
                        <router-link to="/login" class="uth-pc-login">
                            {{ $t('loginButton') }}
                        </router-link>
                        <router-link to="/register" class="auth-pc-register">
                            {{ $t('registerButton') }}
                        </router-link>
                    </template>
                    <template v-else>
                        <div class=" ">
                            <UserMenu />
                        </div>
                    </template>
                </div>

                <!-- Hamburger Menu -->
                <div class="  hamburger-container">
                    <button
                        @click="showingNavigationDropdown = !showingNavigationDropdown"
                        class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                    >
                        <svg class="h-6 w-6 transition-all" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path
                                :class="{ hidden: showingNavigationDropdown, 'inline-flex': !showingNavigationDropdown }"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                            <path
                                :class="{ hidden: !showingNavigationDropdown, 'inline-flex': showingNavigationDropdown }"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Dropdown Menu -->
        <div
            :class="{ 'dropdown-menu open': showingNavigationDropdown, 'dropdown-menu': !showingNavigationDropdown }"
            class="sm:hidden"
        >
            <div class="pt-2 pb-3 space-y-1" v-if="!user">
                <!-- Authentication Links -->
                <router-link to="/login" class="block px-4 py-2 text-sm">{{ $t('loginButton') }}</router-link>
                <router-link to="/register" class="block px-4 py-2 text-sm">{{ $t('registerButton') }}</router-link>
                <router-link to="/prices" class="block px-4 py-2 text-sm">{{ $t('pricesButton') }}</router-link>
                <router-link to="/courses/catalog" class="block px-4 py-2 text-sm">{{ $t('coursesCatalogButton') }}</router-link>
            </div>

            <div class="pt-2 pb-3 space-y-1" v-else>
                <!-- Authentication Links -->
                <router-link to="/feedback" class="block px-4 py-2 text-sm">{{ $t('feedbackButton') }}</router-link>
                <router-link to="/prices" class="block px-4 py-2 text-sm">{{ $t('pricesButton') }}</router-link>
                <router-link to="/courses/catalog" class="block px-4 py-2 text-sm">{{ $t('coursesCatalogButton') }}</router-link>
                <router-link to="/profile/:id" class="block px-4 py-2 text-sm">{{ $t('profileButton') }}</router-link>
                <button @click="handleLogout" class="block px-4 py-2 text-sm">{{ $t('logoutButton') }}</button>
            </div>
        </div>
    </nav>
</template>
<script setup>
import {onMounted, ref, watch, watchEffect} from 'vue';
import { useRouter } from 'vue-router';
import apiClient from "../axios/index.js";
import { UserCircleIcon as UserIconSolid } from "@heroicons/vue/24/solid";
import { ArrowLeftStartOnRectangleIcon, Bars3Icon } from "@heroicons/vue/24/outline";
// import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import  i18n from '../i18n.js';
import Cookies from 'js-cookie';
import { useI18n } from 'vue-i18n';
import Eng from "./flag/Eng.vue";
import Tm from "./flag/Tm.vue";
import UserMenu from "./navbar/UserMenu.vue";

const { locale } = useI18n();

const currentLocale = ref(locale.value);


function changeLocale(newLocale) {
    locale.value = newLocale;
    currentLocale.value = newLocale;
    Cookies.set('preferredLocale', newLocale, { expires: 365 });
}










const router = useRouter();
const showingNavigationDropdown = ref(false);
const searchQuery = ref('');
const user = ref(null);
const isOpen = ref(false);

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

const goToProfile = (userId) => {
    router.push({ name: 'UserProfile', params: { id: userId } });
};

const goToFeedback = () => {
    router.push({ name: 'Feedback' });
};

const goToReviews = () => {
    router.push({ name: 'Reviews' });
};

const openDropdown = () => {
    isOpen.value = true;
};

const closeDropdown = () => {
    isOpen.value = false;
};

const searchCourses = async () => {
    if (searchQuery.value.trim()) {
        await router.push({ name: 'CourseCatalog', query: { search: searchQuery.value } });
    }
};

const handleLogout = async () => {
    try {
        const response = await apiClient.post('/logout');
        console.log('Logout response:', response.data);
        localStorage.removeItem('token');
        window.location.reload();
    } catch (error) {
        console.error('Failed to logout:', error);
    }
};

const openPrices = () => {
    router.push({ name: 'Prices' });
};

onMounted(() => {
    const savedLocale = Cookies.get('preferredLocale');
    if (savedLocale) {
        locale.value = savedLocale;
        currentLocale.value = savedLocale;
    } else {
        locale.value = 'en';
        currentLocale.value = 'en';
    }

    fetchUser();

});
</script>
<style>
.custom-nav {
    background-color: white; /* Equivalent to bg-white */
    border-bottom: 1px solid #f3f4f6; /* Equivalent to border-gray-100 */
}
.pc-container {
    max-width: 80rem; /* Equivalent to max-w-7xl (rem value may vary based on your base font size) */
    margin-left: auto; /* Centering */
    margin-right: auto; /* Centering */
    padding-left: 1rem; /* Equivalent to px-4 */
    padding-right: 1rem; /* Equivalent to px-4 */
}
@media (min-width: 640px) { /* sm */
    .pc-container {
        padding-left: 1.5rem; /* Equivalent to sm:px-6 */
        padding-right: 1.5rem; /* Equivalent to sm:px-6 */
    }
}
@media (min-width: 1024px) { /* lg */
    .pc-container {
        padding-left: 2rem; /* Equivalent to lg:px-8 */
        padding-right: 2rem; /* Equivalent to lg:px-8 */
    }
}
.main-flex {
    display: flex; /* Equivalent to flex */
    justify-content: space-between; /* Equivalent to justify-between */
    height: 4rem; /* Equivalent to h-16 (assuming 1rem = 16px, hence 16 * 1rem = 64px) */
}
.flex {
    display: flex; /* Sets the display to flex */
}
.custom-logo {
    position: relative; /* Equivalent to relative */
    flex-shrink: 0; /* Equivalent to shrink-0, prevents the element from shrinking */
    display: flex; /* Equivalent to flex, makes the container a flex container */
    align-items: center; /* Equivalent to items-center, aligns items vertically in the center */
    margin-right: 0.5rem; /* Equivalent to mr-2 (assuming 1rem = 16px, hence 2 * 0.25rem = 0.5rem) */
}
.items-center {
    display: flex; /* Makes the container a flexbox */
    align-items: center; /* Vertically centers the items within the container */
}
.logo-text {
    font-size: 1.25rem; /* Equivalent to text-xl (20px) */
    font-weight: bold; /* Equivalent to font-bold */
}
@media (min-width: 768px) {
    .logo-text {
        font-size: 1.5rem; /* Equivalent to md:text-2xl (24px) */
    }
}
@media (min-width: 1024px) {
    .logo-text {
        display: none; /* Equivalent to lg:hidden */
    }
}

.search-bar-container {
    display: flex; /* Equivalent to flex */
    align-items: center; /* Equivalent to items-center */
    justify-content: center; /* Equivalent to justify-center */
    flex-grow: 1; /* Equivalent to flex-1 */
}
@media (min-width: 640px) {
    .search-bar-container {
        margin-left: 1.5rem; /* Equivalent to sm:ml-6 (24px) */
    }
}
.search-bar-input  {
    padding: 0.5rem; /* Equivalent to p-2 (8px) */
    border: 1px solid #d1d5db; /* Equivalent to Tailwind's default border color (gray-300) */
    border-radius: 0.375rem; /* Equivalent to rounded (6px) */
    width: 100%; /* Equivalent to w-full */
    box-sizing: border-box; /* Ensures padding and border are included in total width */

    /* Add a transition for smoother focus effects (optional) */
    transition: border-color 0.2s;
}
@media (min-width: 640px) {
    .search-bar-input {
        width: 50%; /* Equivalent to sm:w-1/2 */
    }
}
.search-bar-input:focus {
    outline: none; /* Remove default outline */
    border-color: #3b82f6; /* Change border color on focus (blue-500) */
}
.search-bar-button {
    margin-left: 0.5rem; /* Equivalent to ml-2 (8px) */
    padding: 0.5rem; /* Equivalent to p-2 (8px) */
    border: 1px solid transparent; /* Default border */
    border-radius: 0.375rem; /* Equivalent to rounded (6px) */
    background-color: #3b82f6; /* Equivalent to bg-blue-500 */
    color: white; /* Equivalent to text-white */
    cursor: pointer; /* Show pointer cursor on hover */
    transition: background-color 0.2s; /* Smooth transition for hover effect */

    /* Disable styles */
    opacity: 1; /* Fully opaque */
    pointer-events: auto; /* Allow interaction */
}
.search-bar-button:hover {
    background-color: #2563eb; /* Equivalent to hover:bg-blue-600 */
}
.search-bar-button:disabled {
    background-color: #cbd5e1; /* Equivalent to gray-300 for disabled state */
    color: #6b7280; /* Equivalent to gray-500 for disabled text */
    cursor: not-allowed; /* Change cursor to not-allowed */
    opacity: 0.6; /* Make it semi-transparent */
    pointer-events: none; /* Prevent interaction */
}
.links-container {
    display: none; /* Equivalent to hidden */
}
@media (min-width: 640px) { /* 640px is the breakpoint for sm in Tailwind */
    .links-container {
        display: flex; /* Equivalent to sm:flex */
        align-items: center; /* Equivalent to sm:items-center */
        margin-left: 1.5rem; /* Equivalent to sm:ml-6 (24px) */
    }
}
.language-button {
    padding: 0.5rem; /* Equivalent to p-2 (8px) */
    border-radius: 0.375rem; /* Equivalent to rounded (6px) */
    background-color: transparent; /* Default background */
    color: black; /* Default text color (you can change this to match your theme) */
    border: none; /* Remove default border */
    cursor: pointer; /* Pointer cursor on hover */
    outline: none; /* Remove outline on focus */
    transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out; /* Transition for background color and text color */
}
.language-button :hover {
    color: #f3f4f6; /* Equivalent to hover:text-gray-100 */
    background-color: #e5e7eb; /* Equivalent to hover:bg-gray-200 */
}
.language-button :focus {
    outline: none; /* Remove default outline */
}
.pricing-button-container  {
    position: relative; /* Equivalent to relative */
    display: none; /* Initially hidden, equivalent to hidden */
    margin-right: 0.5rem; /* Equivalent to mr-2 (8px) */
}
@media (min-width: 640px) { /* 640px is the breakpoint for sm in Tailwind */
    .pricing-button-container {
        display: flex; /* Equivalent to sm:flex */
        align-items: center; /* Equivalent to sm:items-center */
        margin-left: 1.5rem; /* Equivalent to sm:ml-6 (24px) */
    }
}
.button-pricing-rew {
    position: relative; /* Equivalent to relative */
    display: inline-flex; /* Equivalent to inline-flex */
    align-items: center; /* Equivalent to items-center */
    padding: 0.5rem 1rem; /* Equivalent to text-sm padding */
    border: 1px solid transparent; /* Equivalent to border border-transparent */
    font-size: 0.875rem; /* Equivalent to text-sm (14px) */
    line-height: 1.25rem; /* Equivalent to leading-4 */
    font-weight: 500; /* Equivalent to font-medium */
    border-radius: 0.375rem; /* Equivalent to rounded-md (6px) */
    color: #6b7280; /* Equivalent to text-gray-500 (#6b7280) */
    background-color: #ffffff; /* Equivalent to bg-white */
    cursor: pointer; /* Pointer cursor on hover */
    outline: none; /* Remove default outline on focus */
    transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out; /* Transition for background and text color */
}

.button-pricing-rew:hover {
    color: #374151; /* Equivalent to hover:text-gray-700 (#374151) */
}

.button-pricing-rew:focus {
    outline: none; /* Remove default outline */
}
.uth-pc-login {
    color: #e5e7eb; /* Equivalent to text-gray-200 */
    border-bottom: 1px solid #e5e7eb; /* Equivalent to border-b border-gray-200 */
    background-color: #3b82f6; /* Equivalent to bg-blue-500 */
    padding: 0.5rem; /* Equivalent to p-2 (8px) */
    border-radius: 0.375rem; /* Equivalent to rounded (6px) */
    text-decoration: none; /* Remove underline */
    display: inline-block; /* Make the link behave like a block element for padding */
    transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out; /* Transition for background and text color */
}
.uth-pc-login:hover {
    color: #f3f4f6; /* Equivalent to hover:text-gray-100 */
    background-color: #1d4ed8; /* Equivalent to hover:bg-blue-800 */
}
.uth-pc-login:focus {
    outline: none; /* Remove default outline */
}
.auth-pc-register {
    margin-left: 1rem; /* Equivalent to ml-4 (16px) */
    color: #6b7280; /* Equivalent to text-gray-500 */
    text-decoration: none; /* Remove underline from link */
    transition: color 0.15s ease-in-out; /* Transition for color */
}

.auth-pc-register:hover {
    color: #374151; /* Equivalent to hover:text-gray-700 */
}

.auth-pc-register:focus {
    outline: none; /* Remove default outline */
}
.menu-container {
    position: relative; /* Equivalent to relative */
    display: inline-block; /* Equivalent to inline-block */
    text-align: left; /* Equivalent to text-left */
}
.menu-button {
    display: inline-flex; /* Equivalent to inline-flex */
    width: 100%; /* Equivalent to w-full */
    justify-content: center; /* Equivalent to justify-center */
    border-radius: 0.375rem; /* Equivalent to rounded-md (6px) */
    padding: 0.5rem 1rem; /* Equivalent to px-4 (16px) and py-2 (8px) */
    font-size: 0.875rem; /* Equivalent to text-sm */
    font-weight: 500; /* Equivalent to font-medium */
    background-color: transparent; /* Default background color */
    color: inherit; /* Inherit text color */
    border: none; /* Remove default border */
    cursor: pointer; /* Change cursor to pointer */
    transition: background-color 0.15s ease-in-out; /* Transition for hover effect */
}

.menu-button:hover {
    background-color: rgba(0, 0, 0, 0.1); /* Equivalent to hover:bg-black/10 */
}

.menu-button:focus {
    outline: none; /* Remove default outline */
}
.user-icon {
    width: 1.25rem; /* Equivalent to w-5 (20px) */
    height: 1.25rem; /* Equivalent to h-5 (20px) */
    margin-right: 0.5rem; /* Equivalent to mr-2 (8px) */
    /* Additional styles can be added as needed */
}
.chevron-down-icon {
    margin-right: -0.25rem; /* Equivalent to -mr-1 (-4px) */
    margin-left: 0.5rem; /* Equivalent to ml-2 (8px) */
    height: 1.25rem; /* Equivalent to h-5 (20px) */
    width: 1.25rem; /* Equivalent to w-5 (20px) */
    color: #A78BFA; /* Equivalent to text-violet-200 */
    transition: color 0.15s ease-in-out; /* Transition for hover effect */
}

/* Hover effect */
.chevron-down-icon:hover {
    color: #D8B4FE; /* Equivalent to hover:text-violet-100 */
}
.menu-items {
    position: absolute; /* Equivalent to absolute */
    right: 0; /* Aligns to the right */
    margin-top: 0.5rem; /* Equivalent to mt-2 (8px) */
    width: 14rem; /* Equivalent to w-56 (224px) */
    transform-origin: top right; /* Equivalent to origin-top-right */
    background-color: white; /* Equivalent to bg-white */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Equivalent to shadow-lg */
    border-radius: 0.375rem; /* Equivalent to rounded-md */
    z-index: 10; /* Ensures it's above other elements */
    ring: 1px solid rgba(0, 0, 0, 0.05); /* Equivalent to ring-1 ring-black/5 */
}

/* Divider styles for divide-y */
.menu-items > * {
    border-top: 1px solid rgba(156, 163, 175, 1); /* Equivalent to divide-gray-100 */
}

.menu-items > :first-child {
    border-top: none; /* Remove border from the first child */
}

.menu-items:focus {
    outline: none; /* Equivalent to focus:outline-none */
}
/* Define the keyframes for entering */
@keyframes enter {
    from {
        transform: scale(0.95); /* Start slightly smaller */
        opacity: 0;              /* Fully transparent */
    }
    to {
        transform: scale(1);     /* End at full size */
        opacity: 1;              /* Fully opaque */
    }
}

/* Class for entering active state */
.enter-active {
    animation: enter 0.1s ease-out forwards; /* Apply the animation */
}

/* Flex and alignment */
.hamburger-container {
    display: flex;
    align-items: center;
}

/* Responsive hide on small screens */
@media (min-width: 640px) {
    .hamburger-container {
        display: none;
    }
}




</style>
