<template>
  <div class="relative z-30">
    <InputGroup>
      <InputText
        v-model="searchQuery"
        placeholder="Procurar pelo nome"
        @input="searchMovie"
      />
      <InputGroupAddon
        v-if="searchQuery.trim().length > 0"
        @click="searchQuery = ''"
        class="cursor-pointer"
      >
        <i class="pi pi-times"></i>
      </InputGroupAddon>

      <InputGroupAddon v-if="searchQuery.trim().length === 0">
        <i class="pi pi-search"></i>
      </InputGroupAddon>
    </InputGroup>
  </div>

  <div
    class="fixed z-20 inset-0 bg-[#111] fadeFromInvisible opacity-0 pt-20"
    v-show="searchQuery.trim().length > 0"
  >
    <div class="w-full h-full flex flex-col px-10">
      <div class="border-b-2 border-gray-700 w-full pb-2 mb-10">
        <h1>Resultados para: {{ searchQuery }}</h1>
      </div>

      <div
        class="w-full overflow-y-auto max-h-[80dvh]"
        v-if="movies.length > 0"
      >
        <div
          v-for="(movie, index) in movies"
          :key="index"
          class="flex my-10 mx-5 movieCard"
          :style="{ '--bgUrl': `url(${baseImgUrl}${movie.backdrop_path})` }"
        >
          <img
            :src="baseImgUrl + movie.poster_path"
            alt=""
            class="max-w-[300px]"
          />
          <img
            src="@/assets/img/defaultMoviePoster.jpg"
            alt=""
            v-if="!movie.poster_path"
          />
          <div class="flex flex-col justify-between p-5 mx-2">
            <div class="flex flex-col">
              <h2>{{ movie.title }}</h2>
              <span class="text-sm text-slate-500 mb-2 mt-1"
                >{{ movie.original_title }} -
                <i class="fa fa-star text-yellow-300"></i>

                {{ movie.vote_average.toString().substring(0, 3) }}</span
              >

              <span class="text-slate-500 mb-5 text-sm">Data de lançamento: {{ movie.release_date.split("-").reverse().join("/") }}</span>
            </div>
            <p class="text-gray-400 max-w-[30vw] text-justify">
              {{
                movie.overview.length > 400
                  ? movie.overview.substring(0, 400) + "..."
                  : movie.overview
              }}
            </p>

            <div class="w-full my-2">
              <Button label="Quero ver mais" rounded></Button>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full h-full flex justify-center items-center" v-if="movies.length === 0">
            <h1>Nenhum resultado encontrado!</h1>
        </div>  

    </div>

    <div v-if="loading" class="loadingBox">
      <ProgressSpinner />
    </div>

    <div></div>
  </div>
</template>

<script setup lang="ts">
import type IUpcomingMovie from "@/interfaces/IUpcomingMovie";
import axios from "axios";
import Button from "primevue/button";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputText from "primevue/inputtext";
import ProgressSpinner from "primevue/progressspinner";
import { ref, type Ref } from "vue";

const token = import.meta.env.VITE_TMDB_API_TOKEN;
const baseURL = `https://api.themoviedb.org/3/search/movie`;
const baseImgUrl = "https://image.tmdb.org/t/p/original";
const searchQuery: Ref<string> = ref("");
const movies: Ref<IUpcomingMovie[]> = ref([]);
const lang = "pt-BR";
const loading: Ref<boolean> = ref(false);
let timeOut: number = setTimeout("a", 300);

const searchMovie = async () => {
  clearTimeout(timeOut);

  loading.value = true;
  movies.value = []

  timeOut = setTimeout(async () => {
    try {
      loading.value = true;

      const request = await axios.get(baseURL, {
        params: {
          language: lang,
          query: searchQuery.value,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await request.data;

      movies.value = response.results;
    } catch (error) {
      loading.value = false;
      alert(error);
    } finally {
      loading.value = false;
    }
  }, 500);
};
</script>

<style scoped lang="scss">
.loadingBox {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(black, 0.2);
  backdrop-filter: blur(10px);
}

.movieCard {
  --bgUrl: "";
  background-image: linear-gradient(
      to right,
      rgba(black, 0.95),
      rgba(black, 0.95),
      rgba(black, 0.95),
      rgba(black, 0.6),
      rgba(black, 0.2),
    ),
    var(--bgUrl);
  background-size: cover;
  background-position: top;
  border-radius: 20px;

  img {
    border-start-start-radius: 20px;
    border-end-start-radius: 20px;
  }
}
</style>
