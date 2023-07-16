<template>
    <div class="home">
      <h1>EdenSpa</h1>
      <div class="card-row">
        <DogCard v-for="dog of dogs" :key="dog" :image-url="dog">
          <!-- Content for the card -->
        </DogCard>
      </div>
    </div>
  </template>
  
  <script>
  import DogCard from '@/components/DogCard.vue';
  import axios from 'axios'
  
  export default {
    name: 'HomeView',
    components: {
      DogCard,
    },
    data(){
      return {
        dogs: [],
        folder: ""
      }
    },
    created() {
      this.loadImages()
    },
    methods: {
      async loadImages(){
        for(let i = 0; i < 150; i++){
          await axios.get("https://dog.ceo/api/breeds/image/random")
            .then((response) => {
              this.dogs.push(response.data.message)
            })
        }
      }
  
    }
  }
  </script>
  <style scoped>
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .card-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  </style>