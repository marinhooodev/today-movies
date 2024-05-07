<template>
  <header
    class="bg-[#0c0c0c] w-full p-5 shadow-lg fixed z-10 border-b border-black"
  >
    <div class="w-full flex justify-between items-center">
      <div
        class="flex items-center text-3xl font-semibold cursor-pointer"
        @click="$router.push('/')"
      >
        <i class="fa fa-video text-3xl pr-2"></i>
        <span>Today</span>
        <span class="pl-2">Mo</span>
        <img :src="Logo" alt="" class="max-w-[30px]" />
        <span>ies</span>
      </div>

      <SearchBar v-if="!searchNotAllowedIn.includes($route.path)" />

      <div class="flex gap-2">
        <router-link to="/login">
          <Button
            outlined
            icon="fa fa-arrow-right-to-bracket"
            label="Login"
            class="rounded"
          >
          </Button>
        </router-link>
       <router-link to="/sign-up"> 
          <Button
            label="Cadastrar"
            icon="fa fa-user-plus"
            class="rounded"
          ></Button>
       </router-link>
      </div>
    </div>




  </header>

</template>

<script setup lang="ts">
import Logo from "@/assets/vue.svg"
import axios from "axios";
import AutoComplete from "primevue/autocomplete";
import Button from "primevue/button";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputText from "primevue/inputtext";
import { ref, type Ref } from "vue";
import SearchBar from "./SearchBar.vue";


const searchNotAllowedIn = [
  "/login",
  "/sign-up"
]
</script>

<style scoped></style>
