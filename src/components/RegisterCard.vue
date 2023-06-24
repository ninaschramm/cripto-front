<template>
    <v-app>
      <v-main>
        <v-container>
          <v-row justify="center">
            <v-col cols="12" sm="8" md="6" lg="4">
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Regístrate</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <form ref="form" @submit.prevent="register()">
                    <v-text-field
                      v-model="email"
                      name="email"
                      label="Email"
                      type="text"
                      placeholder="email"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="name"
                      name="name"
                      label="Name"
                      type="text"
                      placeholder="name"
                      required
                    ></v-text-field>
  
                    <v-text-field
                      v-model="password"
                      name="password"
                      label="Password"
                      type="password"
                      placeholder="password"
                      required
                    ></v-text-field>
  
                    <v-text-field
                      v-model="confirmPassword"
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      placeholder="confirm password"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="image"
                      name="image"
                      label="Link de tu foto"
                      type="text"
                      placeholder="image"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="description"
                      name="description"
                      label="Tu descripcion"
                      type="text"
                      placeholder="description"
                      required
                      class="custom-text-field"
                    ></v-text-field> 
                   
                    <v-btn type="submit" class="mt-4" color="primary" value="log in">
                      Registrar
                    </v-btn>
                    <div class="grey--text mt-4" v-on:click=login>
                        ¿Ya estás registrado? Inicia sesión aquí
                    </div>
                  </form>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
 
 <script>
 import axios from 'axios';

 export default {
   name: "App",
   data() {
     return {
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
        image: '',
        description: '',
       errorMessage: "",      
     };
   },
   methods: {
    async register() {
      if (this.password === this.confirmPassword) {
        this.errorMessage = "";
        try {
            const response = await axios.post('http://localhost:5000/sign-up', {
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword,
            name: this.name,
            image: this.image,
            description: this.description,
          });
          console.log(response.data)
          alert("Usuario registrado exitosamente");
          this.$router.replace({ name: "login", params: { email : this.email, password: this.password } });
        } catch (error) {
          console.log(error.message)
        }
      } else {
        this.errorMessage = "Passwords do not match";
      }
    },
    login() {
      this.$router.replace({ name: "login" });
    },
   },       
 };
 </script>

<style>
.custom-text-field {
  min-height: 150px; /* Adjust the height as needed */
}
</style>
