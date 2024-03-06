<template>
  <header>
    <div class="content">
      <div class="logoBox">
        <img src="" alt="Logo" />
      </div>

      <nav>
        <ul>
          <li><RouterLink to="/"> Home </RouterLink></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {}
  }
})
</script>

<style scoped></style>
