<template>
    <v-toolbar dark color="primary">
      <dropdown-menu-vue />
      <v-toolbar-title class="text-h6">
        {{ title }}
      </v-toolbar-title>      
    </v-toolbar>
  </template>
  
  <script>
  import DropdownMenuVue from './DropdownMenu.vue';
  
  export default {
    data() {
      return {}    
    },
    components: {
      DropdownMenuVue
    },
    props: {
      title: {
        type: String,
        default: 'Criptomonedas'
      },
    },    
};
  </script>
 