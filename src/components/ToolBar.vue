<template>
    <v-toolbar
    dark color="primary"
    >
        <template v-slot:prepend>
            <v-btn icon="$menu"></v-btn>
        </template>

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
export default {
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