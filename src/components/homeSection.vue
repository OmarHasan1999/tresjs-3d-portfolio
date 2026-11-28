<template>
  <div class="homeSection" id="home">
    <div class="homeContent">
      <div class="img">
        <img src="/profile-image.webp" alt="Omar Hasan profile photo" fetchpriority="high">
      </div>

      <div class="homeDescription">
        <h1>Omar Hasan</h1>
        <h2>Web Developer</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.homeSection {
  display: flex;
  justify-content: center;
  align-items: center;
  animation: animationHome 1.3s ease forwards;
  user-select: none;
}

@keyframes animationHome {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}

.homeContent {
  display: flex;
  flex-direction: column; 
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 320px;
  padding: 24px;
}

.homeContent .img {
  width: 130px;
  height: 130px;
  flex-shrink: 0;
}

.homeContent .img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  border: 3px solid #ffffff;
}

.homeContent .homeDescription {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  font-family: 'Poppins', sans-serif;
}

.homeDescription h1 {
  font-size: 16px;
  font-weight: 600;
  color: #bdc6d9;
  margin: 0;
}

.homeDescription h2 {
  font-size: 14px;
  font-weight: 700;
  color: #b2bccb;
}

.location {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
}

.location a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 18px;
  color: #ffffff;
  background-color: #111827;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.3s ease;
  text-decoration: none;
  letter-spacing: 0.3px;
}

.location a:hover {
  background-color: #374151;
  transform: translateY(-2px);
}

.location .available {
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #dcfce7;
  padding: 6px 14px;
  border-radius: 20px;
}

.location .available span {
  font-size: 13px;
  font-weight: 600;
  color: #166534;
}

.location .available strong {
  color: #166534;
  font-size: 18px;
  line-height: 1;
}

.homeLinks {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
}

.homeLinks a {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.3s ease;
}

.homeLinks a:hover {
  background: rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

@media (max-width: 600px) {
  .homeContent .img {
  width: 125px;
  height: 125px;
  flex-shrink: 0;
}
}
</style>