<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { useProductsStore } from '@/store/products';

const store = useProductsStore();
const filterController = ref(null);
const itemsPerPage = 12;
const currentPage = ref(1);

const sortedProducts = ref([]);
const displayedProducts = ref([]);

const compareByPrice = (a, b) => a.price - b.price;
const compareByName = (a, b) => a.title.localeCompare(b.title);
const compareByStock = (a, b) => a.stock - b.stock;

onMounted(async () => {
  await store.getProducts();

  if (store.products.products && Array.isArray(store.products.products)) {
    sortedProducts.value = [...store.products.products];
    updateDisplayedProducts();

    watch(filterController, (newValue, oldValue) => {
      if (filterController.value == '1') {
        sortedProducts.value = [...store.products.products].sort(compareByPrice);
      } else if (filterController.value == '2') {
        sortedProducts.value = [...store.products.products].sort(compareByStock);
      } else if (filterController.value == '3') {
        sortedProducts.value = [...store.products.products].sort(compareByName);
      }

      updateDisplayedProducts();
    });
  } else {
    console.error('Invalid or missing product data');
  }
});

function updateDisplayedProducts() {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  displayedProducts.value = sortedProducts.value.slice(startIndex, endIndex);
}

function changePage(newPage) {
  currentPage.value = newPage;
  updateDisplayedProducts();
}
</script>


<template>
  <div class="wrapper">
    <div class="spinnnnner mt-5 justify-content-center w-100 h-100 d-flex">
      <div
        class="spinner-border"
        role="status"
        v-show="!store.products.products"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="" v-show="store.products.products">
      <select
        v-model="filterController"
        class="form-select w-25"
        aria-label="Default select example"
      >
        <option value="null" selected>Откройте филтер</option>
        <option value="1">По цене</option>
        <option value="2">По кол-во</option>
        <option value="3">По названию</option>
      </select>
      <div class="wrap row mt-1 row-cols-3 gap-3 justify-content-between pt-3">
        <CardItem v-for="(item, index) in displayedProducts" :product="item" :key="index" />
      </div>
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center pt-4 mx-auto">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" @click.prevent="changePage(currentPage - 1)" href="#">Previous</a>
          </li>
          <li class="page-item" v-for="page in Math.ceil(sortedProducts.length / itemsPerPage)" :key="page">
            <a class="page-link" @click.prevent="changePage(page)" href="#">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === Math.ceil(sortedProducts.length / itemsPerPage) }">
            <a class="page-link" @click.prevent="changePage(currentPage + 1)" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

