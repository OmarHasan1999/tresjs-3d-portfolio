<template>
  <div class="servicesSection" id="services">
    <div class="services">
      <div class="servicesCards">
        <div 
          class="card" 
          v-for="(card, i) in cardData" 
          :key="i"
        >
          <!-- Circular White Badge for Icon -->
          <div class="iconCircle" :style="{ boxShadow: `0 8px 20px ${card.color}25` }">
            <i :class="card.icon" :style="{ color: card.color }"></i>
          </div>

          <h2>{{ card.name }}</h2>
          <p>{{ card.paragraph }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const cardData = ref([
  {
    icon: "mdi mdi-web",
    color: "#2563EB",
    name: "Web Applications",
    paragraph: "Building modern, fast, and scalable web applications focused on real-world user experiences"
  },
  {
    icon: "mdi mdi-responsive",
    color: "#16A34A",
    name: "Responsive Design",
    paragraph: "Designing responsive layouts that adapt smoothly across all devices and screen sizes"
  },
  {
    icon: "mdi mdi-api",
    color: "#7C3AED",
    name: "API Integration",
    paragraph: "Integrating REST APIs to connect frontend interfaces with reliable, dynamic backend services"
  }
]);


</script>

<style scoped>
.servicesSection {
  user-select: none;
  font-family: 'Poppins', sans-serif;
  padding: 20px 0;
}

.services {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.services h1 {
  font-size: 22px;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
  margin-bottom: 12px;
}

.servicesCards {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 980px;
  gap: 16px;
}

.servicesCards .card {
  width: 240px;
  height: 140px;
  border: 1.5px solid #b99cd3;
  border-radius: 24px;
  background: #e9e3e3;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 24px 20px;
  transition: all 0.3s ease;
}

/* White Circle Badge for Icon */


.iconCircle i {
  font-size: 32px;
  line-height: 1;
}

.servicesCards .card h2 {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 2px 0;
  transform: translateZ(15px);
}

.servicesCards .card p {
  color: #4b5563;
  text-align: center;
  width: 100%;
  font-weight: 400;
  font-size: 12.5px;
  line-height: 1.5;
  margin: 0;
}

</style>