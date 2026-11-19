<template>
  <div :class="['aboutCard', { 'is-visible': aboutActive }]" id="about">
    <div class="cardContent">
      <div class="aboutCol">
        <p class="summary">
          Frontend developer graduated from Gaziantep University with a degree in Programming. 
          I build clean, high-performance web experiences using Vue.js and modern JS tools.
        </p>
      </div>

      <div class="languages">
        <h1>Technologies & Tools</h1>
        <span>Developing with modern web tools and using current technologies</span>

        <div class="icons-viewport" aria-hidden="false">
          <div class="icons-track">
            <!-- First set of icons -->
            <i 
              v-for="(icon, i) in icons" 
              :key="i" 
              class="icon" 
              :class="icon.class" 
              :style="{ color: icon.color }"
              :title="icon.name"
            ></i>
            <!-- Duplicate set for continuous infinite marquee -->
            <i 
              v-for="(icon, i) in icons" 
              :key="'dup-' + i" 
              class="icon" 
              :class="icon.class" 
              :style="{ color: icon.color }"
              :title="icon.name"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const icons = [
  { name: 'HTML5', class: 'mdi mdi-language-html5', color: '#E34F26' },
  { name: 'CSS3', class: 'mdi mdi-language-css3', color: '#1572B6' },
  { name: 'JavaScript', class: 'mdi mdi-language-javascript', color: '#F7DF1E' },
  { name: 'Vue.js', class: 'mdi mdi-vuejs', color: '#42B883' },
  { name: 'Tailwind/CSS', class: 'mdi mdi-tailwind', color: '#06B6D4' },
  { name: 'Node.js', class: 'mdi mdi-nodejs', color: '#339933' }
]

defineProps({
  aboutActive: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.aboutCard {
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  font-family: 'Poppins', sans-serif;
}

.cardContent {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: 620px;
  padding: 28px 32px;
}

.aboutCol {
  flex: 1;
}

.aboutCol .summary {
  font-size: 13px;
  text-align: center;
  color: #f8f8f8;
  line-height: 1.8;
  margin: 0;
  letter-spacing: 0.5px;
}

.languages {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translateX(230px);
}

.languages h1 {
  color: white;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.languages span {
  color: #e8e9ec;
  font-size: 12px;
  text-align: center;
  margin-top: 4px;
  letter-spacing: 0.8px;
}

/* --- ANIMATION STYLES --- */

.icons-viewport {
  overflow: hidden;
  width: 260px; /* Adjust container width as needed */
  margin-top: 20px;
  mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
}

.icons-track {
  display: flex;
  align-items: center;
  width: max-content;
  animation: marquee 12s linear infinite;
}

/* Pause animation on hover */
.icons-track:hover {
  animation-play-state: paused;
}

.icon {
  font-size: 38px;
  margin-right: 20px;
  display: inline-block;
  line-height: 1;
  backface-visibility: hidden;
  will-change: transform;
  transition: transform 0.2s ease;
}

.icon:hover {
  transform: scale(1.2);
}

/* Smooth continuous marquee keyframe */
@keyframes marquee {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
}

</style>