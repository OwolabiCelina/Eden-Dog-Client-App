<template>
    <div class="card-container">
        <div class="card-image" :style="`background-image: url(${imageUrl})`">
            <slot></slot>
        </div>
        <p>Save Icon</p>
    </div>
</template>

<script>
export default {
  props: {
    imageUrl: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.card-container {
  background-color: rgb(202, 201, 201);
  width: 300px;
  height: 450px;
  margin: 10px;
  display: flex;
  flex-direction: column;
}
.card-image {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  flex: 1;
}
p {
  margin: 10px;
}
</style>