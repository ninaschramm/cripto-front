<template>
    <v-card :style="cardStyle">
      <div class="card-header">
        <div class="title">
          <v-card-title class="pb-0">
            {{ name }}
          </v-card-title>
          <v-card-subtitle class="my-0">
            {{ symbol }}
          </v-card-subtitle>
        </div>
        <div class="price-change-container">
          <v-card-text class="pb-1" color="orange-lighten-2" variant="text">
            $ {{ formatPrice(info.price) }}
          </v-card-text>
          <v-card-text class="change-text py-0" :class="{'change-text': true, 'positive': change && !change.startsWith('-'), 'negative': change && change.startsWith('-')}" variant="text">
            {{ change+"%" }}
          </v-card-text>
        </div>
      </div>
  
      <v-card-actions class="custom-card-actions">
        <v-btn
          :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="show = !show"
        ></v-btn>
      </v-card-actions>
  
      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
  
          <v-card-text>
            Última actualización: {{ formatDate(info.last_updated) }} <br>
            Variación en 24h: {{ info.percent_change_24h.toFixed(2) }}% <br>
            Variación en 30 días: {{ info.percent_change_30d.toFixed(2) }}%
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </template>
  
  <script>
    export default {
        data: () => ({
            show: false,
        }),   
        props: {
            name: {
            type: String,
            default: "" // Default value if not provided
            },
            symbol: {
            type: String,
            default: "" // Default value if not provided
            },
            change: {
            type: String,
            default: "" // Default value if not provided
            },
            info: {
            type: Object,
            }
         },
         computed: {
            cardStyle() {
            return {
                width: '100%',
            };
            },
        },
        methods: {
          formatDate(dateString) {
            const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
            const date = new Date(dateString);
            const formattedDate = date.toLocaleDateString(undefined, options);
            const [month, day, year] = formattedDate.split('/');
            return `${day}-${month}-${year}`;
          },
          formatPrice(price) {
            return price.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
          },
        }
    }
  </script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.title {
  flex: 1;
}

.price-change-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.change-text {
  font-size: smaller;
}

.positive {
  color: green;
}

.negative {
  color: red;
}
.custom-card-actions {
  height: 48px;
}
</style>