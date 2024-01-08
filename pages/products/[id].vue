<script lang="ts" setup>
import Swiper from "swiper";
// import Swiper styles
import "swiper/css";
import { useProductsStore } from "@/store/products";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const store = useProductsStore();

const items = computed(() => {
  return store.product ? store.product : [];
});

onMounted(() => {
  store.getProduct(route.params.id);

  const swiper = new Swiper(".swiper", {
    direction: "horizontal",
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true, // Make pagination clickable
      enabled: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    scrollbar: {
      el: ".swiper-scrollbar",
    },
  });
});
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <div class="swiper">
          <!-- Additional required wrapper -->
          <div class="swiper-wrapper">
            <!-- Slides -->
            <div
              class="swiper-slide"
              v-for="(item, index) in items.images"
              :key="index"
            >
              <img class="img" :src="item" alt="" />
            </div>
          </div>
          <!-- If we need pagination -->
          <div class="swiper-pagination"></div>

          <!-- If we need navigation buttons -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>

          <!-- If we need scrollbar -->
        </div>
      </div>
      <div class="col-md-8">
        <h3 class="h3">
          {{ items.title }}
        </h3>
        <h5 class="h5">
          {{ items.brand }}
        </h5>
        <p class="text">
          {{ items.description }}
        </p>
        <div class="row ">
          <div class="card-text">
            {{ 'Stock: ' + items.stock }}
          </div>
          <div class="card-text">
            {{ 'Rating: ' + items.rating }}
          </div>
          <div class="pt-2 d-flex flex-column">
            <div class="col">
              <p>{{ ' ' + (items.price - (items.price * items.discountPercentage) / 100).toFixed(2) + ' $' }}</p>
            </div>
            <div class="col">
              <del>{{ items.price }}$ </del>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.swiper-wrapper {
  align-items: center;
}
.swiper {
  width: 100%;
  max-height: 500px;
}
.img {
  width: clamp(200px, 100%, 500px);
  height: clamp(200px, 100%, 500px);
}
</style>
