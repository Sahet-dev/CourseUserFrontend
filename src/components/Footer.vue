<template>
    <footer class="custom-footer">
        <div class="container">
            <div class="grid-container">
                <!-- Footer Logo & About -->
                <div class="spacing-container">
                    <h2 class="logo-text">
                        {{ $t('footer.logo') }}
                    </h2>
                    <p class="description">
                        {{ $t('footer.description') }}
                    </p>
                </div>

                <!-- Footer Navigation Links -->
                <div class="spacing-container">
                    <h3 class="section-heading">{{ $t('footer.links.quickLinks') }}</h3>
                    <ul class="nav-list">
                        <li>
                            <router-link to="/" class="nav-link">
                                {{ $t('footer.links.home') }}
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/courses/catalog" class="nav-link">
                                {{ $t('footer.links.coursesCatalog') }}
                            </router-link>
                        </li>
                        <li>
                            <a href="https://sahet-dev.com/" class="nav-link">
                                {{ $t('footer.links.aboutAndContact') }}
                            </a>
                        </li>
                        <li>
                            <a href="" @click="goToFeedback" class="nav-link">
                                {{ $t('footer.links.feedback') }}
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Footer Contact Information -->
                <div class="spacing-container">
                    <h3 class="section-heading">{{ $t('footer.contact.title') }}</h3>
                    <div class="contact-list">
                        <div class="contact-item">
                            <span class="contact-icon">📍</span>
                            <span class="contact-text">{{ $t('footer.contact.address') }}</span>
                        </div>
                        <div class="contact-item">
                            <span class="contact-icon">📞</span>
                            <span class="contact-text">{{ $t('footer.contact.phone') }}</span>
                        </div>
                        <div class="contact-item">
                            <span class="contact-icon">✉️</span>
                            <span class="contact-text">support@courseapp.com</span>
                        </div>
                    </div>
                </div>

                <!-- Footer Social Media Links -->
                <div class="spacing-container">
                    <h3 class="section-heading">{{ $t('footer.social.followMe') }}</h3>
                    <div class="social-links">
                        <a href="https://www.instagram.com/sahetkakajanov" class="social-link">
                            <Instagram class="social-icon" />
                            <span class="social-text">Sahet Kakajanov</span>
                        </a>
                        <a href="https://www.youtube.com/@itcoachtm1209" class="social-link">
                            <YouTubeIcon class="social-icon" />
                            <span class="social-text">IT CoachTM</span>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Footer Bottom -->
            <div class="footer-bottom">
                <div class="copyright">
                    <span>{{ $t('footer.copyright') }}</span>
                    <span class="divider">|</span>
                    <span>{{ $t('footer.copyright2') }}</span>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Instagram from "./socialmed/Instagram.vue";
import YouTubeIcon from "./socialmed/Youtube.vue";

const router = useRouter();

function goToFeedback() {
    router.push({ name: 'Feedback' });
}
</script>

<style scoped>
.custom-footer {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    color: #e2e8f0;
    position: relative;
    overflow: hidden;
}

.custom-footer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.2), transparent);
}

.container {
    max-width: 80rem;
    margin: 0 auto;
    padding: 5rem 2rem;
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 4rem;
}

.spacing-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.logo-text {
    font-size: 1.75rem;
    font-weight: 700;
    background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    letter-spacing: -0.025em;
}

.description {
    font-size: 0.9375rem;
    line-height: 1.75;
    color: #94a3b8;
    max-width: 24rem;
    transition: color 0.3s ease;
}

.section-heading {
    font-size: 1.25rem;
    font-weight: 600;
    color: #f8fafc;
    position: relative;
    padding-bottom: 0.75rem;
}

.section-heading::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 2rem;
    height: 2px;
    background: linear-gradient(90deg, #60a5fa, transparent);
}

.nav-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.nav-link {
    color: #94a3b8;
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-block;
    position: relative;
    padding-left: 0;
}

.nav-link::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 0;
    height: 1px;
    background: #60a5fa;
    transition: width 0.3s ease;
}

.nav-link:hover {
    color: #f8fafc;
    padding-left: 0.5rem;
}

.nav-link:hover::before {
    width: 100%;
}

.contact-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: transform 0.3s ease;
}

.contact-item:hover {
    transform: translateX(0.5rem);
}

.contact-icon {
    font-size: 1.25rem;
    color: #60a5fa;
}

.contact-text {
    color: #94a3b8;
    font-size: 0.9375rem;
    transition: color 0.3s ease;
}

.contact-item:hover .contact-text {
    color: #f8fafc;
}

.social-links {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.social-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: #94a3b8;
    text-decoration: none;
    transition: all 0.3s ease;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background: rgba(255, 255, 255, 0.03);
}

.social-link:hover {
    color: #f8fafc;
    background: rgba(255, 255, 255, 0.05);
    transform: translateX(0.5rem);
}

.social-icon {
    width: 1.5rem;
    height: 1.5rem;
    color: #d81b60;
    transition: color 0.3s ease;
}

.social-link:hover .social-icon {
    color: #f50057;
}

.social-text {
    font-size: 0.9375rem;
}

.footer-bottom {
    margin-top: 5rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.copyright {
    text-align: center;
    color: #64748b;
    font-size: 0.9375rem;
}

.divider {
    margin: 0 0.75rem;
    color: #475569;
}

@media (max-width: 768px) {
    .container {
        padding: 3rem 1.5rem;
    }

    .grid-container {
        gap: 3rem;
    }

    .footer-bottom {
        margin-top: 3rem;
    }
}
</style>
