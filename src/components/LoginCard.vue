<template>
    <v-app dark>
      <v-main>
        <v-container>
          <v-row justify="center">
            <v-col cols="12" sm="8" md="6" lg="4">
              <v-card class="elevation-12" dark>
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Login form</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <form ref="form" @submit.prevent="login()">
                    <v-text-field
                      v-model="email"
                      name="email"
                      label="Email"
                      type="text"
                      placeholder="email"
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
                    <v-btn type="submit" class="mt-4" color="primary" value="log in">Login</v-btn>
                    <div class="grey--text mt-4" v-on:click=register>
                        ¿No tienes una cuenta? Regístrate aquí
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
import { mapMutations } from "vuex";
import customStore from '@/store/store.js';

 export default {
   name: "LoginCard",
   data() {
     return {
       email: "",
       password: "",
     };
   },
   methods: {
    ...mapMutations(["setToken"]),
    async login() {
        try {
            const response = await axios.post('http://localhost:5000/sign-in', {
            email: this.email,
            password: this.password,            
          });
          // Use the Vuex store instance to access the setToken mutation
        customStore.commit('setToken', response.data);
        console.log(customStore.state.token); // Access the token from the store's state
        this.$router.push({ name: "dashboard" });
        } catch (error) {
          console.log(error.message)
          alert(error.message)
        }
    },
     register() {
        this.$router.replace({name: "register"})
     }
   },
 };
 </script>