<template>
  <div class="currency-converter">
    <h1>Currency Converter</h1>

    <form @submit.prevent="convertCurrency">
      <div>
        <label for="from">From Currency:</label>
        <input type="text" v-model="fromCurrency" required />
      </div>

      <div>
        <label for="to">To Currency:</label>
        <input type="text" v-model="toCurrency" required />
      </div>

      <div>
        <label for="amount">Amount:</label>
        <input type="number" v-model="amount" required />
      </div>

      <button type="submit">Convert</button>
    </form>

    <div v-if="convertedAmount">
      <h3>Conversion Result:</h3>
      <p>{{ amount }} {{ fromCurrency }} = {{ convertedAmount }}</p>
    </div>

    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "CurrencyConverter",
  data() {
    return {
      fromCurrency: "",
      toCurrency: "",
      amount: 0,
      convertedAmount: null as number | null,
      error: "",
    };
  },
  methods: {
    async convertCurrency() {
      try {
        const response = await axios.get("http://localhost:8000/convert", {
          params: {
            from: this.fromCurrency,
            to: this.toCurrency,
            amount: this.amount,
          },
        });

        this.convertedAmount = response.data.convertedValue;
        this.error = "";
      } catch (err: any) {
        this.error = err.response?.data?.error || "An error occurred.";
      }
    },
  },
});
</script>

<style scoped>
.currency-converter {
  max-width: 500px;
  margin: 0 auto;
}

.error {
  color: red;
}
</style>
