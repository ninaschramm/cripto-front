<template>
  <v-container v-on:vue:mounted="getCriptoData" class="px-2 py-2">
    <v-row justify="space-around">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12">          
          <ToolBar :title="'Criptomonedas'"/>          
            <v-card-text>
              <div class="input-holder" align="right">
                <div class="search-input elevation-4 py-1 px-4" >
                  <input type="text" v-model="search"
                  placeholder="Search"
                  color="primary"
                  >
                  <v-icon>mdi-magnify</v-icon>
                </div>                   
              </div>    
          
            <v-timeline density="compact" align="start">
              <v-timeline-item width="100%"
                v-for="cripto in filteredCripto"
                :key="cripto.id"
                :dot-color="'indigo-darken-2'"
                size="x-small"
              >
                <cripto-card :name="cripto.name" :symbol="cripto.symbol" :change="formatChange(cripto.quote.USD.percent_change_1h)" :info="cripto.quote.USD"/>
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
            criptos: null,
            search: '',      
          }
        },
        methods: {
          ...mapMutations(["setToken"]),          
          async getCriptoData() {
            try {
              const response = await axios.get('http://localhost:5000/cripto', this.config);
              this.criptos = response.data[1];       
            } catch (error) {
              console.log(error.message)
              alert(error.message)
            } 
          },
          formatChange(change) {
            return change.toFixed(2)
          },
        },
        computed: {
          filteredCripto() {
            if (this.criptos === null) {
              return [];
            }
            return this.criptos.filter(cripto => cripto.name.toLowerCase().includes(this.search.toLowerCase()))
          }
        }
      }
</script>

<style scoped>
  .input-holder {
    width: 100%;
  }
  .search-input {
    width: fit-content;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-radius: 10px;
  }
  
</style>