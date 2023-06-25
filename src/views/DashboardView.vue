<template>
        <v-container v-on:vue:mounted="getCriptoData" class="px-2 py-2">
        <v-row justify="space-around">
          <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="elevation-12">          
         <ToolBar :title="Criptomonedas"/>
        <v-card-text>

          <v-timeline density="compact" align="start">
            <v-timeline-item width="100%"
              v-for="message in messages"
              :key="message.id"
              :dot-color="message.color"
              size="x-small"
            >
              <cripto-card :name="message.name" :symbol="message.symbol" :price="formatPrice(message.quote.USD.price)" :change="formatChange(message.quote.USD.percent_change_1h)"/>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-col>
    </v-row>
  </v-container>
    </template>
    
    <script>
    import axios from 'axios';
    import { mapMutations } from "vuex";
    import customStore from '@/store/store.js';
    import ToolBar from '@/components/ToolBar.vue';
    import CriptoCard from '@/components/CriptoCard.vue';

      export default {
        components: { CriptoCard, ToolBar },
        data () {
          return {           
            config: {
              headers: {
                Authorization: `Bearer ${customStore.state.token}`
              }},
            messages: null,
            user: null,         
          }
        },
        methods: {
          ...mapMutations(["setToken"]),          
          async getCriptoData() {
            try {
              const response = await axios.get('http://localhost:5000/cripto', this.config);
              this.messages = response.data[1];       
            } catch (error) {
              console.log(error.message)
              alert(error.message)
            } 
          },
          formatPrice(price) {
            return price.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
          },
          formatChange(change) {
            return change.toFixed(2)
          },
        }
      }
    </script>