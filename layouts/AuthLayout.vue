<template>
  <div class="cyber-klever-container">
    <!-- Cyberpunk Grid với màu KLEVERBOT -->
    <div class="klever-cyber-grid">
      <div class="cyber-lines"></div>
      <div class="neon-highlights">
        <div class="highlight highlight-1"></div>
        <div class="highlight highlight-2"></div>
        <div class="highlight highlight-3"></div>
      </div>
    </div>

    <div class="cyber-main">
      <!-- Futuristic Glassmorphism -->
      <div class="cyber-glass-panel">
        <div class="panel-border"></div>
        <div class="panel-content">
          <slot></slot>
        </div>
      </div>

      <!-- Cyber Toggle -->
      <div class="cyber-control">
        <button class="cyber-toggle" @click="darkMode = !darkMode">
          <div class="toggle-circuit"></div>
          <span class="toggle-label">{{ darkMode ? 'LIGHT' : 'DARK' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      darkMode: false
    }
  }
}
</script>

<style scoped>
.cyber-klever-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: radial-gradient(ellipse at center, #0a0a1a 0%, #1a1a2e 100%);
  overflow: hidden;
  /* font-family: 'Courier New', monospace; */
}

.klever-cyber-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.cyber-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(rgba(74, 144, 226, 0.2) 1px, transparent 1px),
    linear-gradient(90deg, rgba(74, 144, 226, 0.2) 1px, transparent 1px),
    linear-gradient(rgba(231, 76, 60, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(231, 76, 60, 0.1) 1px, transparent 1px);
  background-size: 80px 80px, 80px 80px, 20px 20px, 20px 20px;
  animation: cyber-pulse 6s ease-in-out infinite alternate;
}

@keyframes cyber-pulse {
  0% {
    opacity: 0.4;
    transform: scale(1);
  }

  100% {
    opacity: 0.8;
    transform: scale(1.02);
  }
}

.neon-highlights {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.highlight {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
}

.highlight-1 {
  top: 15%;
  left: 10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(74, 144, 226, 0.4) 0%, transparent 70%);
  animation: neon-drift 12s ease-in-out infinite;
}

.highlight-2 {
  top: 50%;
  right: 10%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(153, 102, 204, 0.4) 0%, transparent 70%);
  animation: neon-drift 10s ease-in-out infinite reverse;
}

.highlight-3 {
  bottom: 15%;
  left: 40%;
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(231, 76, 60, 0.4) 0%, transparent 70%);
  animation: neon-drift 14s ease-in-out infinite;
}

@keyframes neon-drift {

  0%,
  100% {
    transform: translate(0px, 0px) scale(1);
  }

  33% {
    transform: translate(30px, -40px) scale(1.1);
  }

  66% {
    transform: translate(-20px, 30px) scale(0.9);
  }
}

.cyber-main {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  z-index: 10;
}

.cyber-glass-panel {
  position: relative;
  width: 100%;
  max-width: 500px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border: 1px solid rgba(74, 144, 226, 0.3);
  border-radius: 0;
  clip-path: polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px));
  box-shadow:
    0 25px 50px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(74, 144, 226, 0.2),
    0 0 30px rgba(74, 144, 226, 0.1);
  overflow: hidden;
  transition: all 0.4s ease;
}

.cyber-glass-panel:hover {
  transform: translateY(-5px);
  border-color: rgba(231, 76, 60, 0.5);
  box-shadow:
    0 35px 70px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(231, 76, 60, 0.3),
    0 0 50px rgba(231, 76, 60, 0.2);
}

.panel-border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg,
      rgba(74, 144, 226, 0.1) 0%,
      rgba(153, 102, 204, 0.1) 50%,
      rgba(231, 76, 60, 0.1) 100%);
  background-size: 200% 200%;
  animation: border-flow 4s ease-in-out infinite;
  clip-path: polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px));
}

@keyframes border-flow {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

.panel-content {
  position: relative;
  padding: 3rem;
  z-index: 2;
}

.cyber-control {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 50;
}

.cyber-toggle {
  position: relative;
  padding: 1rem 2rem;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(15px);
  border: 2px solid #4A90E2;
  color: #4A90E2;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  font-size: 0.75rem;
  letter-spacing: 3px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 100%, 15px 100%);
}

.cyber-toggle:hover {
  color: #0a0a1a;
  background: rgba(74, 144, 226, 0.1);
  border-color: #E74C3C;
  text-shadow: 0 0 10px #4A90E2;
  box-shadow:
    0 0 30px rgba(74, 144, 226, 0.5),
    inset 0 0 20px rgba(74, 144, 226, 0.1);
}

.toggle-circuit {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
      transparent 0%,
      rgba(74, 144, 226, 0.8) 50%,
      transparent 100%);
  transition: all 0.3s ease;
}

.cyber-toggle:hover .toggle-circuit {
  left: 100%;
  background: linear-gradient(90deg,
      transparent 0%,
      rgba(231, 76, 60, 0.8) 50%,
      transparent 100%);
}

.toggle-label {
  position: relative;
  z-index: 2;
}

.dark .cyber-toggle {
  border-color: #E74C3C;
  color: #E74C3C;
}

.dark .cyber-toggle:hover {
  text-shadow: 0 0 10px #E74C3C;
  box-shadow:
    0 0 30px rgba(231, 76, 60, 0.5),
    inset 0 0 20px rgba(231, 76, 60, 0.1);
}

/* Responsive */
@media (max-width: 768px) {
  .cyber-main {
    padding: 1rem;
  }

  .panel-content {
    padding: 2rem;
  }

  .cyber-control {
    bottom: 1.5rem;
    right: 1.5rem;
  }

  .cyber-toggle {
    padding: 0.75rem 1.5rem;
    font-size: 0.7rem;
  }
}
</style>
