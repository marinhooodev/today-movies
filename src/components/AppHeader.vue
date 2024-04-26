<template>
  <header class="bg-[#222] shadow-2xl shadow-white w-full p-5">
    <div class="w-full flex justify-between items-center">

      <div class="flex items-center text-3xl font-bold">
        <i class="fa fa-video text-3xl pr-2"></i>
        <span>Today</span>
        <span class="pl-2">Mo</span>
        <img src="../assets/vue.svg" alt="" class="max-w-[30px]" />
        <span>ies</span>
      </div>

      <div class="flex gap-2">
        <Button label="Login" outlined></Button>
        <Button label="Cadastro"></Button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
</script>

<style scoped></style>
