<template>
    <div class="page-container">
        <!-- Hero Section -->




        <section class="bg-gray-900 text-white p-10 bg-cover bg-center sm:bg-none"
                 :style="{ backgroundImage: isMobile ? `url(${bgImage})` : 'none' }">


            <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center text-center sm:text-left">
                <div class="flex-1 pr-4">
                    <div class="transition duration-500">
                        <h1 v-if="showTitle" class="text-4xl font-extrabold mb-4 sm:text-5xl">
                            {{ $t('hero.title') }}
                        </h1>
                    </div>

                    <div class="transition duration-500">
                        <p v-if="showSubtitle" class="text-lg font-light mb-4">
                            {{ $t('hero.subtitle') }}
                        </p>
                    </div>

                    <div class="transition duration-500">
                        <p v-if="showDescription" class="text-lg mb-4">
                            {{ $t('hero.description') }}
                        </p>
                    </div>

                    <div v-if="showButtons" class="flex flex-col sm:flex-row gap-3 mb-8">
                        <button class="px-5 py-2 font-semibold bg-yellow-400 hover:bg-yellow-600 text-black">
                            {{ $t('hero.startSubscription') }}
                        </button>
                        <button class="px-5 py-2 font-semibold bg-white text-gray-900 hover:bg-gray-200">
                            {{ $t('hero.browseCatalog') }}
                        </button>
                    </div>
                </div>
                <div class="flex-1 mt-6 sm:mt-0 hidden sm:block">
                    <img :src="image" alt="Learning Screenshot" class="max-w-full rounded-lg shadow-lg" />
                </div>
            </div>

            <div class="mt-10 transition duration-500">
                <div class="text-center text-2xl font-semibold mb-4">
                    {{ $t('search.title') }}
                </div>
                <div class="flex items-center justify-center">
                    <input
                        v-model="searchQuery"
                        type="text"
                        :placeholder="$t('search.placeholder')"
                        class="w-full max-w-lg px-4 py-2 text-gray-800 border rounded-lg"
                    />
                    <button
                        @click="searchCourses"
                        :disabled="!searchQuery.trim()"
                        class="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        {{ $t('search.button') }}
                    </button>
                </div>
            </div>
        </section>











        <!-- Popular Courses Section -->
        <section class="popular-courses-section animated-element">
            <div class="container">
                <h2 class="section-title">{{ $t('popularCourses.title') }}</h2>
                <div class="courses-grid">
                    <div v-for="course in popularCourses" :key="course.id" class="course-card">
                        <div @click="openCourse(course.id)">
                            <img :src="imageUrl(course.thumbnail)" :alt="course.title" class="course-image">
                            <h3 class="course-title">{{ course.title }}</h3>
                            <p class="course-description">{{ course.description }}</p>
                        </div>

                        <p class="course-price">{{ course.price }}</p>

                        <div class="flex items-center justify-between mb-2"></div>
                    </div>
                </div>
                <div class="see-all-courses">
                    <button class="see-all-button">{{ $t('popularCourses.seeAll') }}</button>
                </div>
            </div>
        </section>

        <!-- Why Us Section -->
        <Icons />

        <!-- Latest Courses Section -->
        <section class="section-1a2b3c animated-element">
            <div class="container-4d5e6f">
                <h2 class="title-7g8h9i text-center">{{ $t('latestCourses.title') }}</h2>
                <div class="grid-0a1b2c">
                    <div
                        v-for="lcourse in latestCourses" :key="lcourse.id" class="card-3d4e5f"
                        @click="openCourse(lcourse.id)"
                    >
                        <img :src="lcourse.thumbnail" :alt="lcourse.title" class="image-6f7g8h">
                        <h3 class="name-9i0j1k">{{ lcourse.title }}</h3>
                        <p class="description-2l3m4n">{{ lcourse.description }}</p>
                        <p class="price-5o6p7q">${{ lcourse.price }}</p>
                    </div>
                </div>
                <div class="button-container-8r9s0t">
                    <button class="button-1u2v3w">{{ $t('latestCourses.seeAll') }}</button>
                </div>
            </div>
        </section>

        <!-- Testimonials Section -->
        <section class="testimonials-section animated-element">
            <div class="container">
                <h2 class="section-title">{{ $t('testimonials.title') }}</h2>
                <div class="testimonials-grid">
                    <div v-for="comment in comments" :key="comment.id" class="testimonial-item">
                        <p class="testimonial-text">"{{ comment.text }}"</p>
                        <p class="testimonial-author">{{ comment.author }}</p>
                    </div>
                </div>
                <div class="more-testimonials">
                    <a href="#" class="more-link">{{ $t('testimonials.more') }}</a>
                </div>
            </div>
        </section>

        <!-- Call to Action Section -->
        <section class="cta-section animated-element">
            <div class="container">
                <div class="cta-content">
                    <h2 class="cta-title">{{ $t('cta.title') }}</h2>
                    <div class="cta-details">
                        <p class="cta-description">
                            {{ $t('cta.description') }}
                        </p>
                        <button class="cta-button" @click="openPrices">{{ $t('cta.startSubscription') }}</button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import '../Main/css/mainPage.css'
import {imageUrl} from '../../imageUtil.js';
import {onMounted, ref, watch, onBeforeUnmount} from 'vue';
import apiClient from "../../axios/index.js";
import Icons from "../Icons.vue";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import {useRouter} from "vue-router";
import CoursesList from "../CoursesList.vue";


import image from '../../assets/cat.png';
import bgImage from '../../assets/bgcat.png';
const transitionsCompleted = ref(0);
const totalTransitions = 4;
const searchQuery = ref('');
const showTitle = ref(false);
const showSubtitle = ref(false);
const showDescription = ref(false);
const showButtons = ref(false);
const user = ref({});
const popularCourses = ref([]);
const router = useRouter();
const latestCourses = ref([]);

const isMobile = ref(false);

const checkMobile = () => {
    isMobile.value = window.innerWidth < 640; // Adjust the pixel value as needed
};


const comments = ref([
    {id: 1, text: 'This platform has changed the way I learn. The tutorials are spot on.', author: 'Jane Doe'},
    {id: 2, text: 'Amazing content and great instructors!', author: 'John Smith'},
    {id: 3, text: 'Highly recommend for anyone looking to upskill.', author: 'Alice Johnson'}
]);
const loading = ref(true);

const fetchCourses = async () => {
    try {
        const response = await apiClient.get('/api-course');
        const data = response.data;
        popularCourses.value = data.popularCourses || [];
        latestCourses.value = data.latestCourses || [];
    } catch (error) {
        console.error('Failed to fetch courses:', error);
    }
};

const openPrices = () => {
    router.push({ name: 'Prices' });
};

const searchCourses = async () => {
    if (searchQuery.value.trim()) {
        await router.push({ name: 'CourseCatalog', query: { search: searchQuery.value } });
    }
};

const fetchUser = async () => {
    try {
        const response = await apiClient.get('/user');

        if (!response.data) {
            console.log('User is unauthenticated');
            user.value = null;
        } else {
            user.value = response.data;
        }

    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.log('User is unauthenticated', error);
        } else {
            console.error('Error fetching user:', error);
        }
    }finally {
        loading.value = false;
    }
};

const goToCatalog = () => {
    router.push({ name: 'CoursesList' });
};


gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis()

lenis.on('scroll', (e) => {
    // console.log(e)
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)












// Animation hooks for Title
const beforeEnterTitle = (el) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(-30px)";
};

const enterTitle = (el, done) => {
    gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: "power3.out",
        onComplete: done,
    });
};

// Animation hooks for Subtitle
const beforeEnterSubtitle = (el) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(-20px)";
};

const enterSubtitle = (el, done) => {
    gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1,
        ease: "power3.out",
        onComplete: done,
    });
};

// Animation hooks for Description
const beforeEnterDescription = (el) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(-50px)";
};

const enterDescription = (el, done) => {
    gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1,
        ease: "power3.out",
        onComplete: done,
    });
};

// Animation hooks for Buttons
const beforeEnterButtons = (el) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(0px)";
};

const enterButtons = (el, done) => {
    gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1.5,
        ease: "power3.out",
        onComplete: done,
    });
};

// When each transition completes
const onTransitionComplete = () => {
    transitionsCompleted.value += 1;
};

// Watch for completion of all transitions
watch(transitionsCompleted, (newVal) => {
    if (newVal === totalTransitions) {
        // Refresh ScrollTrigger after all transitions are done
        ScrollTrigger.refresh();
    }
});


const openCourse = async (courseId) => {
    router.push({ name: 'CoursePage', params: { id: courseId } });
};


onMounted(() => {
    fetchCourses();
    fetchUser();

    checkMobile();
    window.addEventListener('resize', checkMobile);


    showTitle.value = true;
    showSubtitle.value = true;
    showDescription.value = true;
    showButtons.value = true;

    gsap.utils.toArray('.animated-element').forEach((element) => {
        gsap.fromTo(
            element,
            {opacity: 0, y: 100},
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 95%',
                    end: 'bottom 70%',
                    scrub: true,
                    markers: false,
                },
            }
        );
    });
});





onBeforeUnmount(() => {
    window.removeEventListener('resize', checkMobile);
});


</script>

<style>

/* Hero Section */
.hero-section {



    background-color: #1a202c;
    /*color: white;*/
    /*padding: 40px 16px;*/
}

.hero-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

@media (min-width: 640px) {
    .hero-wrapper {
        flex-direction: row;
        text-align: left;
    }
}

.hero-content {
    flex: 1;
    padding-right: 15px;
}

.hero-title {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 16px;
}

@media (min-width: 640px) {
    .hero-title {
        font-size: 3rem;
    }
}

.hero-subtitle {
    font-size: 1rem;
    font-weight: 300;
    margin-bottom: 16px;
}

.hero-description {
    font-size: 1rem;
    margin-bottom: 16px;
}

.hero-buttons {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 32px;
}

@media (min-width: 640px) {
    .hero-buttons {
        flex-direction: row;
    }
}

.btn-primary, .btn-secondary {
    padding: 10px 20px;
    font-weight: 600;
    cursor: pointer;
}

.btn-primary {
    background-color: #ecc94b;
    color: black;
}

.btn-primary:hover {
    background-color: #d69e2e;
}

.btn-secondary {
    background-color: white;
    color: #1a202c;
}

.btn-secondary:hover {
    background-color: #edf2f7;
}

/* Hero Image */
.hero-image {
    flex: 1;
    margin-top: 24px;
    display: block; /* Ensure the image is visible by default */
}

@media (min-width: 640px) {
    .hero-image {
        margin-top: 0;
    }
}

@media (max-width: 639px) {
    .hero-image {
        display: none; /* Hide the image on small screens */
    }
}

.hero-image img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
}

</style>

