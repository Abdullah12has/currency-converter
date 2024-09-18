<template>
  <v-container class="fill-height" dark>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card dark>
          <v-card-title class="headline">Currency Converter</v-card-title>
          <v-card-text>
            <v-form v-model="valid">
              <v-text-field
                v-model="amount"
                :rules="[(v: string) => !!v || 'Amount is required']"
                label="Amount"
                required
                dark
              ></v-text-field>
              <v-autocomplete
                v-model="fromCurrency"
                :items="currencies"
                :rules="[(v: string) => !!v || 'Source currency is required']"
                label="From Currency"
                required
                dark
              ></v-autocomplete>
              <v-autocomplete
                v-model="toCurrency"
                :items="currencies"
                :rules="[(v: string) => !!v || 'Target currency is required']"
                label="To Currency"
                required
                dark
              ></v-autocomplete>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              :disabled="!valid"
              @click="convertCurrency"
              dark
            >
              Convert
            </v-btn>
          </v-card-actions>
          <v-card-text v-if="convertedValue">
            <h3>Converted Value: {{ convertedValue }}</h3>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import axios from "axios";

@Options({})
export default class CurrencyConverter extends Vue {
  amount = "";
  fromCurrency = "";
  toCurrency = "";
  convertedValue = "";
  valid = false;

  currencies = [
    "AED",
    "AFN",
    "ALL",
    "AMD",
    "ANG",
    "AOA",
    "ARS",
    "AUD",
    "AWG",
    "AZN",
    "BAM",
    "BBD",
    "BDT",
    "BGN",
    "BHD",
    "BIF",
    "BMD",
    "BND",
    "BOB",
    "BRL",
    "BSD",
    "BTN",
    "BWP",
    "BYN",
    "BZD",
    "CAD",
    "CDF",
    "CHF",
    "CLP",
    "CNY",
    "COP",
    "CRC",
    "CUP",
    "CVE",
    "CZK",
    "DJF",
    "DKK",
    "DOP",
    "DZD",
    "EGP",
    "ERN",
    "ETB",
    "EUR",
    "FJD",
    "FKP",
    "FOK",
    "GBP",
    "GEL",
    "GGP",
    "GHS",
    "GIP",
    "GMD",
    "GNF",
    "GTQ",
    "GYD",
    "HKD",
    "HNL",
    "HRK",
    "HTG",
    "HUF",
    "IDR",
    "ILS",
    "IMP",
    "INR",
    "IQD",
    "IRR",
    "ISK",
    "JEP",
    "JMD",
    "JOD",
    "JPY",
    "KES",
    "KGS",
    "KHR",
    "KID",
    "KMF",
    "KRW",
    "KWD",
    "KYD",
    "KZT",
    "LAK",
    "LBP",
    "LKR",
    "LRD",
    "LSL",
    "LYD",
    "MAD",
    "MDL",
    "MGA",
    "MKD",
    "MMK",
    "MNT",
    "MOP",
    "MRU",
    "MUR",
    "MVR",
    "MWK",
    "MXN",
    "MYR",
    "MZN",
    "NAD",
    "NGN",
    "NIO",
    "NOK",
    "NPR",
    "NZD",
    "OMR",
    "PAB",
    "PEN",
    "PGK",
    "PHP",
    "PKR",
    "PLN",
    "PYG",
    "QAR",
    "RON",
    "RSD",
    "RUB",
    "RWF",
    "SAR",
    "SBD",
    "SCR",
    "SDG",
    "SEK",
    "SGD",
    "SHP",
    "SLL",
    "SOS",
    "SRD",
    "SSP",
    "STN",
    "SYP",
    "SZL",
    "THB",
    "TJS",
    "TMT",
    "TND",
    "TOP",
    "TRY",
    "TTD",
    "TVD",
    "TWD",
    "TZS",
    "UAH",
    "UGX",
    "USD",
    "UYU",
    "UZS",
    "VES",
    "VND",
    "VUV",
    "WST",
    "XAF",
    "XCD",
    "XDR",
    "XOF",
    "XPF",
    "YER",
    "ZAR",
    "ZMW",
    "ZWL",
  ];

  async convertCurrency() {
    try {
      const backendUrl = process.env.VUE_APP_BACKEND_URL;
      const response = await axios.get(`${backendUrl}/convert`, {
        params: {
          from: this.fromCurrency,
          to: this.toCurrency,
          amount: this.amount,
        },
      });
      console.log(process?.env?.BACKEND_URL);
      this.convertedValue = response.data.convertedValue;
    } catch (error) {
      console.error("Error converting currency:", error);
    }
  }
}
</script>

<style scoped>
.fill-height {
  height: 100%;
}
</style>
