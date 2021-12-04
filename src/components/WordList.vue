<template>
  <div id="word-list">
    <div class="va-select" style="width: 500px;">
      <va-select placeholder="select a chapter" v-model="selectedTestName" :options="testNames" />
    </div>
    <answer-sheet :items="items"/>
  </div>
</template>

<script setup>
import AnswerSheet from './AnswerSheet.vue'
import { listeningAssets } from "../utils/config"
import { ref, computed, onMounted, watch } from "vue"

const items = computed(() => {
  const asset = listeningAssets.filter(asset => asset.name === selectedTestName.value)[0];
  if (asset) return asset.items;
  else return [];
});

let selectedTestName = ref("");

watch(selectedTestName, (name) => {
  console.log("handle asset change", selectedTestName.value);
  localStorage.setItem("__CURRENT_CHAPTER__", selectedTestName.value);
})

const testNames = computed(() => {
  return listeningAssets.map(asset => asset.name);
});

onMounted(() => {
  const testName = localStorage.getItem("__CURRENT_CHAPTER__");
  console.log("test name", testName);
  if (testName)
  selectedTestName.value = testName;
  else return;
})
</script>

<style scoped>
#word-list {
  text-align: center;
}
.va-select {
  display: inline-block;
}
</style>
