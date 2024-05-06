<template>
  <section class="flex justify-between items-center rounded-xl border border-slate-700 bg-gradient-to-r from-slate-800 to-slate-900 p-10 mx-3 my-10 shadow-2xl shadow-slate-800">
    <div class="flex flex-col justify-center items-start">
      <span class="text-3xl font-bold">Não encontrou o que procurava?</span>

      <p class="pt-4 text-2xl">Faça sua pesquisa pela categoria desejada!</p>
    </div>

    <div class="flex flex-col gap-5">
   
      <div class="flex gap-2 ">
          <Chip icon="fa fa-bomb" label="Ação"  />
          <Chip icon="fa fa-compass" label="Aventura" />
          <Chip icon="fa fa-ghost" label="Terror" />
      </div>

      <Button icon="pi pi-search" label="Procurar por categoria" outlined></Button>
      
    </div>
</section>
</template>

<script setup lang="ts">
import Chip from "primevue/chip";
import Button from "primevue/button";
</script>

<style scoped></style>
