<template>
  <div class="base_link">
    <div class="base_link-block" v-if="!showInput">
      <a class="base_link-title" :href="value">
        {{ linkTitle }}
      </a>
      <i
        @click="focusInput"
        class="pi pi-pencil base_link-pencil"
        style="cursor: pointer"
      ></i>
    </div>
    <InputText
      class="base_link-input"
      v-else
      ref="link"
      v-model="value"
      placeholder="https://"
      @blur="saveLink"
      @keyup.enter="clickEnter"
    />
  </div>
</template>
  
  <script lang="ts" setup>
import { ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import InputText from "primevue/inputtext";

const router = useRouter();

const value = ref("");
const linkTitle = ref("");
const showInput = ref(true);

/* const link = ref<InstanceType<typeof InputText> | null>(null); */
const link = ref<any>(null);

const focusInput = async () => {
  showInput.value = true;
  await nextTick();
  if (link.value) {
    console.log(link.value.$el);

    link.value?.$el?.focus();
  }
};

const normalizeUrl = (url: string): string => {
  // можно ввести /link а можно и http://domen/link
  try {
    const urlObj = new URL(url);
    return urlObj.pathname;
  } catch (e) {
    return url;
  }
};

const clickEnter = () => {
  // при нажатии enter в любом случае потеря фокуса
  if (link.value) {
    link.value?.$el?.blur();
  }
};

const saveLink = () => {
  if (value.value) {
    const normalizedPath = normalizeUrl(value.value);
    const routes = router.getRoutes();
    const route = routes.find(
      (r) => r.path.toLowerCase() === normalizedPath.toLowerCase()
    );

    if (route && route.meta.title) {
      linkTitle.value = route.meta.title as string;
      showInput.value = false;
    }
  }
};
</script>
<style lang="scss">
.base_link {
  height: 40px;
  &-block {
    height: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
    gap: 10px;
  }
}
</style>
  