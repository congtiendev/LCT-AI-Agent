<template>
    <div v-if="isLoaded"
        class="fixed left-0 top-0 z-[999999] flex h-screen w-screen items-center justify-center transition-colors duration-200"
        :class="isDarkMode ? 'bg-gray-900' : 'bg-white'">
        <div class="loading-container">
            <div class="loading-text audiowide-font">
                <span class="audiowide-font letter-k">K</span>
                <span class="audiowide-font letter-l">L</span>
                <span class="audiowide-font letter-e1">E</span>
                <span class="audiowide-font letter-v">V</span>
                <span class="audiowide-font letter-e2">E</span>
                <span class="audiowide-font letter-r">R</span>
                <span class="audiowide-font letter-b">B</span>
                <span class="audiowide-font letter-o">O</span>
                <span class="audiowide-font letter-t">T</span>
            </div>

            <div class="loading-dots">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    isLoaded: {
        type: Boolean,
        default: false
    },
    isDarkMode: {
        type: Boolean,
        default: false
    }
});
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Audiowide&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');

.loading-container {
    text-align: center;
    padding: 2rem;
    transition: all 0.2s ease-in-out;
}

.loading-text {
    font-size: 4rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.1em;
    margin-bottom: 2rem;
    font-family: 'Audiowide', sans-serif !important;
}

.loading-text span {
    display: inline-block;
    transform-origin: center bottom;
}

/* Initial static colors matching the logo, then animate to gradient */
.letter-k {
    color: #4a90e2;
    animation: singleBounce 1.2s ease-in-out infinite;
    animation-delay: 0s;
}

.letter-l {
    color: #4a90e2;
    animation: singleBounce 1.2s ease-in-out infinite;
    animation-delay: 0.15s;
}

.letter-e1 {
    color: #5c7dd8;
    animation: singleBounce 1.2s ease-in-out infinite;
    animation-delay: 0.3s;
}

.letter-v {
    color: #6f6bce;
    animation: singleBounce 1.2s ease-in-out infinite;
    animation-delay: 0.45s;
}

.letter-e2 {
    color: #8159c4;
    animation: singleBounce 1.2s ease-in-out infinite;
    animation-delay: 0.6s;
}

.letter-r {
    color: #9347ba;
    animation: singleBounce 1.2s ease-in-out infinite;
    animation-delay: 0.75s;
}

.letter-b {
    color: #b233a3;
    animation: singleBounce 1.2s ease-in-out infinite;
    animation-delay: 0.9s;
}

.letter-o {
    color: #d42c7a;
    animation: singleBounce 1.2s ease-in-out infinite;
    animation-delay: 1.05s;
}

.letter-t {
    color: #e53e3e;
    animation: singleBounce 1.2s ease-in-out infinite;
    animation-delay: 1.2s;
}

@keyframes colorTransition {
    0% {
        background: none;
        -webkit-text-fill-color: initial;
    }

    10% {
        background: linear-gradient(90deg,
                #4a90e2 0%,
                #4a90e2 11%,
                #5c7dd8 22%,
                #6f6bce 33%,
                #8159c4 44%,
                #9347ba 55%,
                #b233a3 66%,
                #d42c7a 77%,
                #e53e3e 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-size: 200% 200%;
        background-position: 0% 50%;
    }

    50% {
        background: linear-gradient(90deg,
                #4a90e2 0%,
                #4a90e2 11%,
                #5c7dd8 22%,
                #6f6bce 33%,
                #8159c4 44%,
                #9347ba 55%,
                #b233a3 66%,
                #d42c7a 77%,
                #e53e3e 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-size: 200% 200%;
        background-position: 100% 50%;
    }

    100% {
        background: linear-gradient(90deg,
                #4a90e2 0%,
                #4a90e2 11%,
                #5c7dd8 22%,
                #6f6bce 33%,
                #8159c4 44%,
                #9347ba 55%,
                #b233a3 66%,
                #d42c7a 77%,
                #e53e3e 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-size: 200% 200%;
        background-position: 0% 50%;
    }
}

@keyframes singleBounce {

    0%,
    100% {
        transform: translateY(0) scale(1);
    }

    25% {
        transform: translateY(-8px) scale(1.02);
    }

    50% {
        transform: translateY(-12px) scale(1.03);
    }

    75% {
        transform: translateY(-8px) scale(1.02);
    }
}

.loading-dots {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
}

.dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: linear-gradient(90deg,
            #4a90e2 0%,
            #4a90e2 11%,
            #5c7dd8 22%,
            #6f6bce 33%,
            #8159c4 44%,
            #9347ba 55%,
            #b233a3 66%,
            #d42c7a 77%,
            #e53e3e 100%);
    animation: dotPulse 1.5s infinite ease-in-out;
}

.dot:nth-child(1) {
    animation-delay: 0s;
}

.dot:nth-child(2) {
    animation-delay: 0.2s;
}

.dot:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes dotPulse {

    0%,
    100% {
        transform: scale(0.8);
        opacity: 0.5;
    }

    50% {
        transform: scale(1.2);
        opacity: 1;
    }
}

.subtitle {
    font-size: 1.2rem;
    font-weight: 400;
    margin-top: 2rem;
    opacity: 0.8;
    animation: fadeInOut 2s infinite ease-in-out;
    font-family: 'Audiowide', sans-serif;
    transition: color 0.2s ease-in-out;
}

/* Dynamic color based on theme */
.dark .subtitle {
    color: #8892b0;
}

:not(.dark) .subtitle {
    color: #64748b;
}

@keyframes fadeInOut {

    0%,
    100% {
        opacity: 0.6;
    }

    50% {
        opacity: 1;
    }
}

/* Responsive design for loading */
@media (max-width: 768px) {
    .loading-text {
        font-size: 2.5rem;
    }

    .subtitle {
        font-size: 1rem;
    }
}

@media (max-width: 480px) {
    .loading-text {
        font-size: 2rem;
    }
}
</style>