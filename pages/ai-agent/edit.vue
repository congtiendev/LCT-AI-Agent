<template>
    <div class="min-h-screen bg-gray-50 p-4">
        <div class="w-full max-w-7xl mx-auto">
            <!-- Header với step counter -->
            <div class="flex justify-between items-center mb-8">
                <h1 class="text-2xl font-semibold text-gray-900">
                    Advanced Setup Progress
                </h1>
                <span class="text-sm text-gray-500">
                    Step {{ currentStep }} of {{ totalSteps }}
                </span>
            </div>

            <!-- Progress container -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <!-- Progress Steps -->
                <div class="relative">
                    <!-- Background Line -->
                    <div class="progress-line rounded-full mb-8">
                        <div class="progress-fill rounded-full" :style="{ width: progressPercentage + '%' }"></div>
                    </div>

                    <!-- 12 steps grid -->
                    <div class="grid grid-cols-4 gap-2 mb-4">
                        <div v-for="(step, index) in stepLabels" :key="index + 1"
                            class="flex flex-col items-center cursor-pointer" @click="setStep(index + 1)">
                            <div :class="getStepClass(index + 1)"
                                class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 hover:scale-105 mb-2">
                                <span>{{ index + 1 }}</span>
                            </div>
                            <div class="text-center">
                                <p class="text-xs text-gray-600 leading-tight">
                                    {{ step }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// Reactive state
const currentStep = ref(1)
const totalSteps = 4

// Step labels
const stepLabels = [
    'Basic Info',
    'Personality',
    'Goals & Tone',
    'Business Topics',
]

// Computed properties
const progressPercentage = computed(() => {
    return ((currentStep.value - 1) / (totalSteps - 1)) * 100
})

// Methods
const setStep = (step: number) => {
    if (step < 1 || step > totalSteps) return
    currentStep.value = step
}

const getStepClass = (step: number) => {
    if (step < currentStep.value) {
        return 'step-completed'
    } else if (step === currentStep.value) {
        return 'step-active'
    } else {
        return 'step-pending'
    }
}

// Meta tags cho Nuxt 3
useHead({
    title: 'Advanced Setup Progress',
    meta: [
        {
            name: 'description',
            content: 'Advanced setup progress tracker with 12 steps'
        }
    ]
})
</script>

<style scoped>
.gradient-bg {
    background: linear-gradient(135deg,
            #4a90e2 0%,
            #6b73d9 20%,
            #8b5fbf 40%,
            #a8508a 60%,
            #c54756 80%,
            #e53e3e 100%);
}

/* Step active state với gradient background */
.step-active {
    background: linear-gradient(135deg,
            #4a90e2 0%,
            #6b73d9 20%,
            #8b5fbf 40%,
            #a8508a 60%,
            #c54756 80%,
            #e53e3e 100%);
    color: white;
}

/* Step completed state với gradient background */
.step-completed {
    background: linear-gradient(135deg,
            #4a90e2 0%,
            #6b73d9 20%,
            #8b5fbf 40%,
            #a8508a 60%,
            #c54756 80%,
            #e53e3e 100%);
    color: white;
}

.step-pending {
    background: #e5e7eb;
    color: #6b7280;
    border: 2px solid #d1d5db;
}

.progress-line {
    height: 4px;
    background: #e5e7eb;
    position: relative;
    overflow: hidden;
}

/* Progress fill với gradient background */
.progress-fill {
    height: 100%;
    background: linear-gradient(135deg,
            #4a90e2 0%,
            #6b73d9 20%,
            #8b5fbf 40%,
            #a8508a 60%,
            #c54756 80%,
            #e53e3e 100%);
    transition: width 0.5s ease-in-out;
}
</style>