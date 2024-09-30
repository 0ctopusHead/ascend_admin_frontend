<script setup lang="ts">
import { isLoggedIn } from '@/stores/auteStore'  // Import the shared login state
</script>

<template>
  <body>
    <main>
      <div class="hero-section">
        <div class="hero-content">
          <h1 class="">Ascend<span class="highlight rounded-lg">EDU</span></h1>
          <p class="flex">
            Quickly upload the file or link with our simple drag-and-drop interface. Rest easy
            knowing your files are stored safely. We prioritize privacy and security.
          </p>
          <!-- Conditionally render the "LET'S START" button based on the login status -->
          <RouterLink v-if="isLoggedIn" :to="{ name: 'upload' }">
            <button>LET'S START</button>
          </RouterLink>
        </div>
        <div class="hero-image">
          <img src="../assets/home_pic.png" alt="Illustration" />
        </div>
      </div>
    </main>
  </body>
</template>


<style scoped>
/* Your existing CSS */
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #121212;
}

.hero-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #7b2ff7, #f107a3);
  color: white;
  height: 100vh;
}

.hero-content {
  padding-left: 10%;
  max-width: 550px;
  padding-bottom: 10%;
}

.hero-content h1 {
  font-size: 110px;
  margin: 0;
}

.hero-content .highlight {
  background: black;
  padding: 0 10px;
  color: #0ff1ff;
}

.hero-content p {
  font-size: 18px;
  margin: 20px 0;
}

.hero-content button {
  background-color: #ff4454;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.hero-content button:hover {
  background-color: #e43e4b;
}

.hero-image img {
  width: 100%;
  max-width: 800px;
  padding-right: 20%;
  padding-bottom: 10%;
}

@media (max-width: 768px) {
  .hero-section {
    flex-direction: column;
    text-align: center;
  }

  .hero-content {
    max-width: 100%;
  }

  .hero-image img {
    max-width: 100%;
  }
}
</style>
