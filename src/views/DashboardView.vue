<template>
    <v-app>
          <v-navigation-drawer permanent>
            <v-list>
              <v-list-item class="px-2">
                <v-list-item-avatar>
                  <v-img src="https://randomuser.me/api/portraits/women/85.jpg" v-on:vue:mounted="getUSerData"></v-img>
                </v-list-item-avatar>
              </v-list-item>
    
              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title class="text-h6">
                    {{ user? user.name : 'Name'}}
                  </v-list-item-title>
                  <v-list-item-subtitle v-on:click="logout">log out</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
    
          <v-divider></v-divider>
    
          <v-list
            dense
            nav
          >
            <v-list-item
              v-for="item in items"
              :key="item.title"
              link
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
    
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-container v-on:vue:mounted="getCriptoData">
    <v-row justify="space-around">
      <v-card width="400">
        <v-img
          height="100"
          src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
          cover
          class="text-white"
        >
          <v-toolbar
            color="rgba(0, 0, 0, 0)"
            theme="dark"
          >
            <template v-slot:prepend>
              <v-btn icon="$menu"></v-btn>
            </template>

            <v-toolbar-title class="text-h6">
              Messages
            </v-toolbar-title>

            <template v-slot:append>
              <v-btn icon="mdi-dots-vertical"></v-btn>
            </template>
          </v-toolbar>
        </v-img>

        <v-card-text>

          <v-timeline density="compact" align="start">
            <v-timeline-item
              v-for="message in messages"
              :key="message.time"
              :dot-color="message.color"
              size="x-small"
            >
              <cripto-card :name="message.name" :symbol="message.symbol" :price="formatPrice(message.quote.USD.price)" :change="formatChange(message.quote.USD.percent_change_1h)"/>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
    </v-app>
    </template>
    
    <script>
    import axios from 'axios';
    import { mapMutations } from "vuex";
    import customStore from '@/store/store.js';
    import CriptoCard from '@/components/CriptoCard.vue';

      export default {
  components: { CriptoCard },
        data () {
          return {
            items: [
              { title: 'Dashboard', icon: 'mdi-view-dashboard' },
              { title: 'Photos', icon: 'mdi-image' },
              { title: 'About', icon: 'mdi-help-box' },
            ],
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
          async getUSerData() {
            try {
              const response = await axios.get('http://localhost:5000/user', this.config);
              this.user = response.data
            } catch (error) {
              console.log(error.message)
              alert(error.message)
            } 
          },
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
          logout() {
            customStore.commit('setToken', '');
            this.$router.replace({name:'login'})
          }
        }
      }
    </script>