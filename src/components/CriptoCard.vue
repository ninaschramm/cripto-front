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
            $ {{ price }}
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
            Text placeholder
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
            price: {
            type: String,
            default: "" // Default value if not provided
            },
            change: {
            type: String,
            default: "" // Default value if not provided
            },
         },
         computed: {
            cardStyle() {
            return {
                width: '100%',
            };
            },
        },
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