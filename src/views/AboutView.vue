<template>
  <div class="dog-details">
      <div class="dog-image">
        <img :src="dog.id"/>
      </div>
  <div class="dog-description">
    <h2>{{ dog.name }}</h2>
    <p>{{ dog.description }}</p>
  </div>
  <div class="transformation-filters">
      <button @click="applyCartoonifyFilter">Cartoonify</button>
      <button @click="applyGrayscaleFilter">Grayscale</button>
      <button @click="applySepiaFilter">Sepia</button>
  </div>
</div>
</template>
<script>
import axios from 'axios'
import { Cloudinary } from '@cloudinary/url-gen'
import { sepia } from "@cloudinary/url-gen/actions/effect";
import { cartoonify } from "@cloudinary/url-gen/actions/effect"
import { grayscale } from "@cloudinary/url-gen/actions/effect"

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: 'drddoxnsi',
  },
});

export default {
name: 'DogDetails',
data() {
  return {
    dog: {},
    myImg: ""
  };
},
created() {
  const dogId = this.$route.params.id;
  this.getDogDetails(dogId);
},
methods: {
  async getDogDetails(id) {
    this.dog = {
      id: id,
      name: '{ NO NAME }',
      description: 'Lorem Ipsum!'
    };
  },
  async applyTransformationFilter(effect) {
    const cloudName = "drddoxnsi"
    const uploadPreset = "upload-dogs"
    const headers = {
      'Content-Type': 'application/json',
    };

    const uploadResponse = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      file: this.dog.id,
      upload_preset: uploadPreset,
      folder: 'Dogs',
    }, { headers });

    const dogImg = cloudinary.image(uploadResponse.data.public_id);
    if (effect === "sepia") dogImg.effect(sepia()); 
    if (effect === "grayscale") dogImg.effect(grayscale()); 
    if (effect === "cartoonify") dogImg.effect(cartoonify()); 

    this.dog.id = dogImg.toURL()
    return dogImg
    },

    applySepiaFilter() {
      this.applyTransformationFilter("sepia");
    },
    applyGrayscaleFilter() {
      this.applyTransformationFilter("grayscale");
    },
    applyCartoonifyFilter() {
      this.applyTransformationFilter("cartoonify");
    },
}
};
</script>
<style scoped>
.dog-details {
margin-top: 12vh;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
}

.dog-image img {
max-width: 300px;
max-height: 300px;
}

.dog-description {
margin-top: 20px;
text-align: center;
}
.transformation-filters {
  margin-top: 20px;
}

.transformation-filters button {
  margin-right: 10px;
}
</style>