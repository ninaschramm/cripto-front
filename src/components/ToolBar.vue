<template>
    <v-toolbar
    dark color="primary"
    >
        <dropdown-menu-vue />
        <v-toolbar-title class="text-h6">
              {{ title }}
        </v-toolbar-title>

        <template v-slot:append>
            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
        </template>
    </v-toolbar>  
</template>

<script>
    import DropdownMenuVue from './DropdownMenu.vue';
    export default {
        components: { DropdownMenuVue },
        props: {
                title: {
                type: String,
                default: "Criptomonedas" // Default value if not provided
                },
            }
    }
</script>

<style>

</style>