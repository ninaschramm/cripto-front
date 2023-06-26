<template>
    <v-dialog v-model="dialog" max-width="300px" @hide="closeModal">
      <v-card>
        <v-card-title>
            Editar perfil
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field v-model="name" label="Name" required></v-text-field>
            <v-text-field v-model="email" label="Email" required></v-text-field>
            <v-textarea v-model="description" label="Description" required></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="saveUser">Save</v-btn>
          <v-btn @click="closeModal">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dialog: false,
        name: this.user.name,
        email: this.user.email,
        description: this.user.description,
      };
    },
    props: {
        user: {
            type: Object,
        }
    },
    methods: {
        saveUser() {
            // Save the form data to the updatedUser variable
            const updatedUser = {
                name: this.name,
                email: this.email,
                description: this.description,
            };
            // Emit the event to notify the parent component
            this.$emit("user-updated", updatedUser);
        },
        closeModal() {            
            // Clear the form fields
            this.$emit("not-updated");
        },
    },
  };
  </script>
  