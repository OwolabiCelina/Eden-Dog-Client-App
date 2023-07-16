<template>
    <div class="home">
      <h1>Dogs</h1>
      <DogCard />
    </div>
  </template>
  
  <script>
  import DogCard from '@/components/DogCard.vue';
  
  export default {
    name: 'HomeView',
    components: {
      DogCard
    }
  }
  </script>
  