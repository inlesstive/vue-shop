import axios from "axios";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [],
    product: null,
  }),
  getters: {},
  actions: {
    async getProducts() {
      try {
        const respone = await axios.get(
          "https://dummyjson.com/products?&limit=100"
        );
        this.products = respone.data;
      } catch (err) {
        console.log(err);
      }
    },
    async getProduct(id: any) {
      try {
        const respone = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        this.product = respone.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
