<template>
  <div class="min-h-screen flex pt-20">
    <div
      class="w-full max-w-[60vw] flex flex-col justify-center items-center"
      id="pictureSide"
    >
      
    </div>
    <div
      class="p-10 w-full max-w-[40vw] flex flex-col justify-center items-center gap-10"
      id="loginSide"
    >
      <div class="blurEffect"></div>
      <div class="blurEffect reverse"></div>
      <h1 class="text-center pb-5 border-b border-white fadeFromInvisible opacity-0">
        Bem vindo de volta!
      </h1>

      <div class="flex flex-col justify-center items-stretch z-2">
        <div class="m-5 fadeUp">
          <label for="email" class="text-lg pb-3 block"> Email: </label>
          <InputGroup>
            <InputGroupAddon>
              <i class="text-white pi pi-user"></i>
            </InputGroupAddon>
            <InputText
              placeholder="seunome@outlook.com"
              v-model="user"
              id="email"
              variant="filled"
            />
          </InputGroup>
        </div>

        <div class="m-5 fadeUp">
          <label for="user" class="text-lg pb-3 block"> Senha: </label>
          <InputGroup>
            <InputGroupAddon>
              <i class="text-white pi pi-lock"></i>
            </InputGroupAddon>
            <Password
              placeholder="Senha"
              v-model="password"
              toggleMask
              :feedback="false"
              variant="filled"
            />
          </InputGroup>
        </div>

        <div class="m-5 fadeUp flex items-center justify-center">
          <Button label="Entrar" class="px-20"> </Button>
          <Button label="esqueceu a senha?" link> </Button>
        </div>

        <div class="m-5 fadeUp"></div>

        <div class="m-5 fadeUp">
          <Button type="button" class="w-full" severity="secondary">
            <GoogleIcon />
            <p class="px-3 w-full">Continuar com google</p>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import Password from "primevue/password";
import GoogleIcon from "./icons/GoogleIcon.vue";

const value1 = ref("");
const password = ref("");
const user = ref("");
</script>

<style scoped lang="scss">
#pictureSide {
  padding: 20px;
  background-image: linear-gradient(
      to bottom,
      rgba(black, 0.8),
      rgba(black, 0.4)
    ),
    url(@/assets/img/movie-theater.jpg);
  background-position: center;
}

#loginSide {
  position: relative;
  overflow: hidden;
  .blurEffect {
    position: absolute;
    top: -15%;
    left: -15%;
    display: block;
    width: 250px;
    height: 250px;
    filter: blur(100px);
    border-radius: 50%;
    background: linear-gradient(to left, #5f2aff, rgb(20, 1, 43));
    z-index: -1;
    animation: float 10s linear infinite;

    &.reverse {
      top: unset;
      left: unset;
      bottom: -15%;
      right: -15%;
    }
  }
}

.fadeUp {
  animation: 0.8s fadeUp ease;
}

.fadeFromInvisible {
  animation: fadeFromInvisible 0.8s ease forwards;
  animation-delay: 0.8s;
}
</style>
