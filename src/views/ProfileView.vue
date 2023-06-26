<template>
 <v-container v-on:vue:mounted="getUserData" class="px-2 py-2">
        <v-row justify="space-around">
          <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="elevation-12">          
         <ToolBar :title="title"/>    

                <v-card-item>
                    <v-card-title>
                      Hola, {{ user ? user.name : "" }}!
                    <v-tooltip text="Editar perfil">
                      <template v-slot:activator="{ props }">                        
                        <v-btn icon="mdi-account-edit" v-bind="props" class="elevation-0" @click="openModal"></v-btn> 
                        <update-user-modal-vue v-if="showModal" v-model="showModal" @user-updated="handleUserUpdate" @not-updated="closeModal" :user="user"></update-user-modal-vue>                  
                      </template>
                    </v-tooltip>          
                    </v-card-title>    
                </v-card-item>

                <div class="profile-image my-1 mx-auto" 
                :style="{ backgroundImage: `url(${user ? user.image : 'https://cdn.vuetifyjs.com/images/cards/cooking.png'})` }">
                <v-tooltip text="Subir imagem">
                      <template v-slot:activator="{ props }">                        
                        <v-btn icon="mdi-image-edit" v-bind="props"></v-btn>                   
                      </template>
                    </v-tooltip>          
                </div>           

                <v-card-text>

                <div class="text-subtitle-1 my-2">                   
                    {{ user ? user.email : "" }} 
                </div>

                <v-divider :thickness="2" class="border-opacity-25 my-3 mx-1"></v-divider>

                <div class="text-subtitle-1">
                    Descripción:
                </div>

                <div class="my-0 text-subtitle-3">
                   {{ user ? user.description : "" }}
                </div>

                </v-card-text>


                <v-card-actions class="custom-actions">                 
                <v-btn
                    color="primary"
                    variant="tonal"
                    @click="logout"
                    block
                    class="elevation-4 my-1 mx-auto"
                >
                    Logout
                </v-btn>
                </v-card-actions>
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
import UpdateUserModalVue from '@/components/UpdateUserModal.vue';

export default {
  components: { ToolBar, UpdateUserModalVue },
  data () {
    return {
      config: {
        headers: {
          Authorization: `Bearer ${customStore.state.token}`
        }},
      user: null,  
      title: "Mi Perfil",
      showModal: false,
      updatedUser: null,      
    }
  },
  methods: {
    ...mapMutations(["setToken"]),
    async getUserData() {
      try {
        const response = await axios.get('http://localhost:5000/user', this.config);
        this.user = response.data
      } catch (error) {
        console.log(error.message)
        alert(error.message)
      } 
    },   
    logout() {
      customStore.commit('setToken', '');
      this.$router.replace({name:'login'})
    },
    openModal() {
      this.showModal = true;
    },
    async handleUserUpdate(updatedUser) {
      // Handle the updated user data here
      this.updatedUser = updatedUser;
      await this.updateUser();
      // Close the modal if needed
      this.showModal = false;
    },
    closeModal() {
      this.showModal = false;
    },
    async updateUser() {
      try {
        const response = await axios.put('http://localhost:5000/user', this.updatedUser, this.config);
        // Handle the response as needed
        console.log(response.data);
        this.getUserData();
      } catch (error) {
        console.log(error.message);
        // Handle the error
      }
    },
  }
}
</script>

<style>
.profile-image {
  object-fit: cover;
  border-radius: 75px;
  height: 150px;
  width: 150px;
}

.custom-actions {
  width: 100%;
}

</style>