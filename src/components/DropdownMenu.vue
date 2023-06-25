<template>
  <div class="text-center">
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="getRoute(item.title)"
          component="router-link"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: 'Criptomonedas', route: 'dashboard' },
      { title: 'Mi perfil', route: 'perfil' },
    ],
  }),
  methods: {
    getRoute(title) {
      // Map each title to its corresponding route
      const routeMapping = {
        'Criptomonedas': 'dashboard',
        'Mi perfil': 'perfil',
      };

      // Return the route based on the title
      return routeMapping[title];
    },
  },
};
</script>
