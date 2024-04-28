<template>
  <div class="min-h-screen flex">
    <div
      class="p-3 w-full max-w-[40vw] flex flex-col justify-center items-center gap-10"
      id="signUpSide"
    >
      <div class="blurEffect"></div>
      <div class="blurEffect reverse"></div>
      <h1
        class="text-center pb-5 border-b border-white fadeFromInvisible opacity-0"
      >
        É sua primeira vez aqui?
      </h1>
      <div
        class="flex flex-col justify-center items-center fadeFromInvisible opacity-0"
      >
        <small class="text-center"
          >Crie uma conta para aproveitar funcionalidades como:
        </small>
        <small class="text-center"
          >Lista de desejos, sugestões, suporte e muito mais.</small
        >
      </div>

      <div class="flex flex-col justify-center items-stretch z-2">
        <div class="m-3 fadeUp">
          <label for="email" class="text-md pb-3 block">
            Nome de usuário:
          </label>
          <InputGroup>
            <InputGroupAddon>
              <i class="text-white pi pi-user"></i>
            </InputGroupAddon>
            <InputText
              placeholder="Sem caracteres especiais"
              v-model="user"
              id="user"
              variant="filled"
            />
          </InputGroup>
        </div>

        <div class="m-3 fadeUp">
          <label for="email" class="text-md pb-3 block"> Email: </label>
          <InputGroup>
            <InputGroupAddon>
              <i class="text-white pi pi-envelope"></i>
            </InputGroupAddon>
            <InputText
              placeholder="seunome@outlook.com"
              v-model="email"
              id="email"
              variant="filled"
            />
          </InputGroup>
        </div>

        <div class="m-3 fadeUp">
          <label for="email" class="text-md pb-3 block">
            Telefone (Opcional):
          </label>
          <InputGroup>
            <InputGroupAddon>
              <i class="text-white pi pi-phone"></i>
            </InputGroupAddon>
            <InputMask
              v-model="phone"
              id="phone"
              mask="(99) 9 9999-9999"
              placeholder="(99) 9 9999-9999"
              variant="filled"
            />
          </InputGroup>
        </div>

        <div class="m-3 fadeUp">
          <label for="user" class="text-md pb-3 block"> Senha: </label>
          <InputGroup>
            <InputGroupAddon>
              <i class="text-white pi pi-lock"></i>
            </InputGroupAddon>
            <Password
              placeholder="Senha"
              v-model="password"
              toggleMask
              :feedback="true"
              promptLabel="Digite uma senha"
              weakLabel="Senha fraca"
              mediumLabel="Senha média"
              strongLabel="Senha forte"
              id="password"
              variant="filled"
            >
              <template #footer>
                <Divider />
                <p class="my-2 text-sm">Obrigatório</p>
                <ul class="pl-2 ml-2 mt-0 text-sm" style="line-height: 1.5; list-style-type: disc;">
                  <li>Mínimo de 8 caracteres</li>
                </ul>
                <Divider />
                <p class="my-2 text-sm">Sugestões de força (opcionais)</p>
                <ul class="pl-2 ml-2 mt-0 text-sm" style="line-height: 1.5; list-style-type: disc;">
                  <li>Um caractere minúsculo</li>
                  <li>Um caractere maiúsculo</li>
                  <li>Um caractere numérico</li>
                </ul>
              </template>
            </Password>
          </InputGroup>
        </div>
        <div class="m-3 fadeUp">
          <label for="user" class="text-md pb-3 block">
            Confirmar senha:
          </label>
          <InputGroup>
            <InputGroupAddon>
              <i class="text-white pi pi-lock"></i>
            </InputGroupAddon>
            <Password
              placeholder="Confirmar senha"
              v-model="confirmPassword"
              toggleMask
              :feedback="false"
              variant="filled"
            />
          </InputGroup>
        </div>

        <div class="m-3 mt-7 fadeUp">
          <Button label="Fazer cadastro" class="px-20 w-full"> </Button>
        </div>

        <div class="m-3 fadeUp flex justify-center items-center">
          <Checkbox v-model="checked" :binary="true" id="newsletter" />
          <label for="newsletter" class="text-sm ml-2">
            Aceito receber comunicações via email ou telefone.</label
          >
        </div>

        <div class="m-5 fadeUp"></div>
      </div>
    </div>
    <div
      class="w-full max-w-[60vw] flex flex-col justify-center items-center"
      id="pictureSide"
    >
      <h1></h1>
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
import InputMask from "primevue/inputmask";
import Checkbox from "primevue/checkbox";
import Divider from "primevue/divider";


const user = ref("");
const value1 = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const phone = ref("");
const checked = ref(true);
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

#signUpSide {
  position: relative;
  overflow: hidden;
  .blurEffect {
    position: absolute;
    top: -10%;
    right: -10%;
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
      bottom: -10%;
      left: -10%;
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
