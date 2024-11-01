<template>
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <!-- Footer Logo & About -->
                <div class="footer-section about">
                    <h2 class="logo">{{ $t('footer.logo') }}</h2>
                    <p>{{ $t('footer.description') }}</p>
                </div>

                <!-- Footer Navigation Links -->
                <div class="footer-section links">
                    <h3>{{ $t('footer.links.quickLinks') }}</h3>
                    <ul>
                        <li>
                            <router-link to="/">{{ $t('footer.links.home') }}</router-link>
                        </li>
                        <li>
                            <router-link to="/courses/catalog">{{ $t('footer.links.coursesCatalog') }}</router-link>
                        </li>
                        <li><a href="#">{{ $t('footer.links.aboutAndContact') }}</a></li>
                        <li><button @click="goToFeedback">{{ $t('footer.links.feedback') }}</button></li>
                    </ul>
                </div>

                <!-- Footer Contact Information -->
                <div class="footer-section contact">
                    <h3>{{ $t('footer.contact.title') }}</h3>
                    <p><i class="fas fa-map-marker-alt"></i> {{ $t('footer.contact.address') }}</p>
                    <p><i class="fas fa-phone"></i> {{ $t('footer.contact.phone') }}</p>
                    <p><i class="fas fa-envelope"></i> support@courseapp.com</p>
                </div>

                <!-- Footer Social Media Links -->
                <div class="footer-section social">
                    <h3>{{ $t('footer.social.followMe') }}</h3>
                    <div class="social-icons">
                        <ul>
                            <li>
                                <a href="#">
                                    <Instagram width="30px" height="30px" />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="bg-white">
                                        <YouTubeIcon width="30px" height="30px" />
                                    </span>

                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer Bottom -->
        <div class="footer-bottom">
            {{ $t('footer.copyright') }} |
            {{ $t('footer.copyright2') }}
        </div>
    </footer>
</template>
<script setup>
import { useRouter } from 'vue-router';
import TiktokIcon from "./socialmed/Tiktok.vue";
import Instagram from "./socialmed/Instagram.vue";
import YouTubeIcon from "./socialmed/Youtube.vue";
const router = useRouter();
function goToFeedback(){
    router.push({ name: 'Feedback'});
}
</script>
<style scoped>
.footer {
    background-color: #2d3748;
    color: white;
    padding: 40px 0;
    font-size: 0.875rem;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
}

.footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    text-align: left;
}

.footer-section {
    flex: 1 1 200px;
    margin: 16px;
}

.footer-section h3 {
    font-size: 1.25rem;
    margin-bottom: 16px;
}

.footer-section p, .footer-section ul, .footer-section a {
    color: #e2e8f0; /* Light gray text */
    margin-bottom: 8px;
    text-decoration: none;
}

.footer-section ul {
    list-style: none;
    padding: 0;
}

.footer-section ul li {
    margin-bottom: 8px;
}

.footer-section ul li a:hover {
    color: #ecc94b; /* Yellow text on hover */
}

/* Social Media Links */
.social-icons a {
    display: inline-block;
    margin-right: 16px;
    color: #e2e8f0; /* Light gray */
    font-size: 1.25rem;
}

.social-icons a:hover {
    color: #ecc94b; /* Yellow on hover */
}

/* Footer Bottom */
.footer-bottom {
    background-color: #1a202c; /* Darker gray */
    text-align: center;
    padding: 16px 0;
    font-size: 0.75rem;
    margin-top: 40px;
    color: #a0aec0; /* Light gray text */
}

/* Responsive Design */
@media (max-width: 768px) {
    .footer-content {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .footer-section {
        margin-bottom: 24px;
    }
}
</style>
