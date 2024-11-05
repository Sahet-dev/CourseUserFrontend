<template>
    <nav class=" ">
        <div class="dropdown">
            <button class="dropdown-trigger" @click="toggleDropdown">
                <img src=" " alt="User avatar" class="avatar" />
                <span class="pricing-button-container">
                    John Doe
                    <span class=" icon">
                        <svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M14 20l10 10 10-10z"/><path d="M0 0h48v48h-48z" fill="none"/></svg>
                    </span>
                </span>
            </button>

            <div class="dropdown-menu" v-show="isOpen" @click="closeDropdown">
                <div class="dropdown-content">
                    <a href="#" class="dropdown-item" @click="navigateToProfile">
                        <span class="icon">👤</span>
                        Profile
                    </a>
                    <a href="#" class="dropdown-item" @click="handleLogout">
                        <span class="icon">🚪</span>
                        Logout
                    </a>
                </div>
            </div>
        </div>
    </nav>
</template>


<style>
.navbar {
    padding: 1rem;
    background: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-trigger {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    background: transparent;
    cursor: pointer;
}

.avatar {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    object-fit: cover;
}

.username {
    font-size: 0.875rem;
    color: #333;
}
.pricing-button-container  {
    position: relative; /* Equivalent to relative */
    display: none; /* Initially hidden, equivalent to hidden */
    margin-right: 0.5rem; /* Equivalent to mr-2 (8px) */
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    min-width: 200px;
    margin-top: 0.5rem;
    background: white;
    border-radius: 0.375rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 10;
}

.dropdown-content {
    padding: 0.5rem 0;
}

.dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    color: #333;
    text-decoration: none;
    transition: background-color 0.2s;
}

.dropdown-item:hover {
    background-color: #f5f5f5;
}

.icon {
    font-size: 1.25rem;
}

.dropdown-trigger:hover {
    background-color: #eaeef8; /* Equivalent to hover:bg-blue-600 */
}

.chevron {
    //margin-left: 0.5rem; /* ml-2 */
    height: .25rem; /* h-5 */
    width: .25rem; /* w-5 */
    color: #c4b5fd; /* text-violet-200 */
    transition: color 0.3s ease;
}
.chevron:hover {
    color: #ddd6fe; /* hover:text-violet-100 */
}
/* Rotate the chevron on button hover, optional */
.dropdown-trigger:hover .chevron {
    transform: rotate(180deg);
}
</style>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {useRouter} from "vue-router";
import apiClient from "../../axios/index.js";

const isOpen = ref(false)
const router = useRouter();

const toggleDropdown = () => {
    isOpen.value = !isOpen.value
}

const closeDropdown = () => {
    isOpen.value = false
}

const navigateToProfile = (userId) => {
    router.push({ name: 'Profile', params: { id: userId } });
    console.log('Navigating to profile')
}

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

const handleClickOutside = (event) => {
    const dropdown = document.querySelector('.dropdown')
    if (dropdown && !dropdown.contains(event.target)) {
        closeDropdown()
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>
