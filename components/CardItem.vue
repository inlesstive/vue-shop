<script lang="ts" setup>
defineProps({
  product: Object,
});
</script>

<template>
  <div class="card col" style="width: 18rem">
    <img
      :src="product.thumbnail"
      class="card-img-top img-card-cardd img-fluid"
      alt="..."
    />
    <div class="card-body">
      <NuxtLink :to="`/products/${product.id}`" >
        <h5 class="card-title">{{ product.title }}</h5>
      </NuxtLink>
      <p class="card-text">Stock in {{ product.stock }}</p>
      <p class="card-text">
        {{ product.description }}
      </p>
      <p class="card-text">
        Discount:
        {{ product.discountPercentage }} %
      </p>
      <span class="d-flex flex-column">
        <p class="card-text mb-0">
          <del>{{ product.price }}$ </del>
        </p>
        <p class="h6">
          {{ ' ' + (product.price - (product.price * product.discountPercentage) / 100).toFixed(2) + ' $' }}
        </p>
      </span>
    </div>
  </div>
</template>

<style scoped>
.img-card-cardd {
  height: 100%;
  max-height: 200px;
}
</style>
