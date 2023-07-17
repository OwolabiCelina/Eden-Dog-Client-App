<template>
    <div class="home">
      <h1>EdenSpa</h1>
      <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="Find breed..." />
        <button @click="search">Search</button>
        <p v-if="NotFound" class="error-404">No Breed Found</p>
      </div>
      <div class="card-row">
        <DogCard v-for="dog of dogs" :key="dog" :image-url="dog" @click="getMoreInformation(dog.id)" :breed="dog.split('/')[4]">
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
        searchQuery: "",
        NotFound: false,
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
      },
  
      async search() {
        await axios.get(`https://dog.ceo/api/breed/${this.searchQuery}/images/random/40`)
            .then((response) => {
              this.NotFound = false
              this.dogs = response.data.message
            })
            .catch((error) => {
              if(error.response.status === 404){
                this.NotFound = true
              }
            })
      },
  
      getMoreInformation(id){
        this.$router.push(`/dog/${id}`)
      }
  
    },
    computed: {
      getDogsByBreed(){
        return this.dogs.filter((dog) => {
          dog.toLowerCase().includes(this.searchQuery.toLowerCase())
        })
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
  .search-bar {
    margin-bottom: 10px;
  }
  
  .search-bar input {
    padding: 8px;
    width: 300px;
  }
  .search-bar button {
    padding: 8px 16px;
  }
  </style>