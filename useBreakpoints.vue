<script setup lang="ts">
import { useBreakpoint } from '~/composables/useBreakpoint';

const { currentBreakpoint, isAbove } = useBreakpoint();
</script>

<template>
  <section class="mt-4 h-fit grid grid-template-rows-2 bg-sky-300 dark:bg-sky-900">
    <h1 class="place-self-center">
        CurrentBreakpoint {{ currentBreakpoint }}
    </h1>
    <div v-if="isAbove('sm')">
      Your navigation menu. <!-- Replace with your own component-->
    </div>
    <div v-else>
      Your burger menu. <!-- Replace with your own component-->
    </div>
    <!-- You can also set the condition directly on your components as followed.
    <HorizontalNavigation v-if="isAbove('sm')" />
    <BurgerMenu v-else />
     -->
  </section>
</template>
