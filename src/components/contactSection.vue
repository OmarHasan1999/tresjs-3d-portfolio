<template>
  <div class="contactSection" id="contact">
    
    <div class="contactCards">
      <div 
        class="card" 
        v-for="(contact, i) in contactData" 
        :key="i" 
      >
        <a :href="contact.url" target="_blank" rel="noopener noreferrer" class="urlLink">
          <div class="iconWrapper">
            <i :class="contact.icon" class="contactIcon"></i>
          </div>
          <strong>{{ contact.name }}</strong>
          <p>{{ contact.linkName }}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const contactData = ref([
  {
    icon: "mdi mdi-email-outline",
    name: "Email",
    linkName: "omar.f.hasan.1999@gmail.com",
    url: "mailto:omar.f.hasan.1999@gmail.com"
  },
  {
    icon: "mdi mdi-github",
    name: "GitHub",
    linkName: "github.com/OmarHasan1999",
    url: "https://github.com/OmarHasan1999"
  },
  {
    icon: "mdi mdi-linkedin",
    name: "LinkedIn",
    linkName: "linkedin.com/in/omar-hasan",
    url: "https://www.linkedin.com/in/omar-hasan-a633aa252/"
  }
])
</script>

<style scoped>
.contactSection {
  display: flex;
  align-items: center;
  flex-direction: column;
  user-select: none;
  font-family: 'Poppins', sans-serif;
  padding: 20px 0;
}

.contactCards {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 700px;
}

.card .urlLink {
  width: 200px;
  height: 110px;
  padding: 10px;
  border-radius: 18px;
  background: #ece7d2;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.card .urlLink:hover {
  transform: translateY(-4px) scale(1.02);
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.18);
}

/* Icon Container & Style */
.iconWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.contactIcon {
  font-size: 26px;
  color: #111827;
  transition: transform 0.3s ease, color 0.3s ease;
}

.card .urlLink:hover .contactIcon {
  transform: scale(1.15) rotate(-4deg);
  color: #2563eb; /* Subtle primary blue accent on hover */
}

/* Typography */
.card strong {
  font-size: 13px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 2px;
}

.card p {
  font-size: 11px;
  color: #4b5563;
  margin: 0;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
}


</style>