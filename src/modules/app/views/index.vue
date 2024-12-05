<script setup lang="ts">
import Layout from "@/app/components/Layout/index.vue";
const route = useRoute();
const single = new Set(["/"]);
const isSingle = computed(() => {
  return single.has(route.path);
});
</script>

<template>
  <template v-if="isSingle">
    <RouterView />
  </template>
  <template v-else>
    <Layout>
      <RouterView />
    </Layout>
  </template>
</template>
