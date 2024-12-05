<script setup lang="ts">
import clsx from "clsx";
import { useLocales } from "@i18n";
import { getYiyan } from "@/guide/service";
import { useThemes } from "@hooks";
import { useAppStore } from "@/app/store";
import { useGuideStore } from "@/guide/store";
const theme = useThemes();
const lng = useLocales();

const appStore = useAppStore();
const guideStore = useGuideStore();

const onGetYiyan = () => {
  getYiyan().then((resp) => console.log(resp.author));
};

const onOpen = () => {
  window.open("https://github.com/ubuding/Vite.Vue", "_blank");
};
</script>

<template>
  <div
    :class="
      clsx('w-full h-full', 'flex flex-col flex-1 justify-center items-center')
    "
  >
    <div :class="clsx('flex', 'absolute top-2 right-2')">
      <div
        :class="
          clsx('rounded-full cursor-pointer', 'p-2', 'shadow-md shadow-primary')
        "
        @click="lng.change(lng.value === 'zh' ? 'en' : 'zh')"
      >
        {{ lng.value }}
      </div>
      <div
        :class="
          clsx(
            'rounded-full cursor-pointer',
            'p-2 mx-2',
            'shadow-md shadow-primary',
          )
        "
        @click="onGetYiyan"
      >
        💌
      </div>
      <div
        :class="
          clsx('rounded-full cursor-pointer', 'p-2', 'shadow-md shadow-primary')
        "
        @click="theme.toggle()"
      >
        {{ theme.value === "light" ? "☀️" : "🔮" }}
      </div>
    </div>
    <div
      :class="
        clsx(
          'w-[580px] h-[50px] relative rounded-full',
          'mx-auto mb-8',
          'flex justify-center items-center',
          'shadow-md shadow-primary cursor-pointer',
          'bg-white text-black',
          'hover:bg-primary hover:text-white',
        )
      "
      @click="onOpen"
    >
      <span class="text-yellow-500">
        {{ $t("origin") }}.{{ $t("branches.name") }}
      </span>
      <span class="mx-3">-</span>
      <span>{{ $t("guide.introduction.value") }}</span>
    </div>

    <div>
      <span class="cursor-pointer" @click="appStore.count++">
        <span class="inline-block w-28">App:</span>
        <span class="mr-8 text-primary">{{ appStore.count }}</span>
      </span>

      <span class="cursor-pointer" @click="guideStore.count++">
        <span class="inline-block w-28">Overview:</span>
        <span class="text-primary">{{ guideStore.count }}</span>
      </span>
    </div>
  </div>
</template>
