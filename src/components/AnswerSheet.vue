 <template>
  <div class="va-table-responsive">
    <br>
    <table class="va-table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Status</th>
        <th>Your Word</th>
        <th>Correct word</th>
        <th>Translation</th>
        <th>History Score</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td>{{index}}</td>
                <td><va-badge
            :text="checked ? score[index] ? 'correct' : 'uncorrect' : 'unjudged'"
            :color="checked ? score[index] ? 'success' : 'danger' : 'warning'"
          /></td>
        <td><va-input
          v-model="inputWords[index]"
        /></td>
        <td>{{checked ? item[0] : ""}}</td>
        <td>{{(showTranslation || checked) ? item[1] : ""}}</td>
        <td>
          {{ checked ? historyScoreItem[index] : "" }}
        </td>
      </tr>
      </tbody>
    </table>
    <br>
    <va-button color="danger" @click="checkInput"> Check! </va-button>
    <va-button color="info" @click="toggleShowTanslation"> {{ showTranslation ? "Hide Translation" : "Show Tranlation" }} </va-button>
    <va-button color="info" @click="showModal = !showModal"> Clear History </va-button>
    <va-modal v-model="showModal" color="warning" message="do you want to clear test history?" title="Warning" @ok="clearHistory" />

  </div>
</template>
<script setup>
import { listeningAssets } from "../utils/config"
import { ref, computed } from "vue"
const props = defineProps({
  items: Array
})

const inputWords = ref([]);
let checked = ref(false);
let showTranslation = ref(false);
let historyScoreItem = ref([]);
let triggerRefresh = ref(false);
let showModal = ref(false);
let score = computed(() => props.items.map((item, index) => {
	return item[0] === String(inputWords.value[index]).trim();
}));

const itemHistoryCorrectCount = computed(() => {
  triggerRefresh = !triggerRefresh.value;
  return 
})

function checkInput() {
  checked.value = true;
  console.log(props.items, inputWords.value);
  let historyScore;
  try {
    historyScore = JSON.parse(localStorage.getItem(listeningAssets[0].name));
  } catch (e) {
    console.warn("parse history score failed, clear storage!");
    localStorage.clear(listeningAssets[0].name);
  }
  console.log("score", score.value.map(itemScore => Number(itemScore)));
  console.log("history score", historyScore);
  if (!historyScore) {
    historyScoreItem.value = score.value.map(itemScore => `${Number(itemScore)}/1 (${(Number(itemScore)/1 * 100).toFixed(1)}%)`);

    localStorage.setItem(listeningAssets[0].name, JSON.stringify({ testCount: 1, score: score.value.map(itemScore => Number(itemScore))}));
  } else {
    historyScoreItem.value = historyScore.score.map((itemHistoryScore, index) => `${Number(itemHistoryScore) + Number(score.value[index])}/${historyScore.testCount} (${(Number(itemHistoryScore) + Number(score.value[index])/historyScore.testCount * 100).toFixed(1)}%)`);

    localStorage.setItem(listeningAssets[0].name, JSON.stringify({
      testCount: historyScore.testCount + 1,
      score: historyScore.score.map((itemHistoryScore, index) => Number(itemHistoryScore) + Number(score.value[index]))}));
  }
}

function toggleShowTanslation() {
  showTranslation.value = !showTranslation.value;
}

function clearHistory() {
  historyScoreItem.value = props.items.map(i => "0/0")
  localStorage.clear(listeningAssets[0].name);
}

</script>

<style scoped>
.va-select {
  display: inline-block;
}
.va-table-response {
  display: inline-block;
  text-align: center;
}
.va-table {
  display: inline-block;
}
.va-button {
  margin-left: 10px;
  margin-top: 20px;
}
</style>