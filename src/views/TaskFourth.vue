<template>
  <div>
    <DataTable :value="mass" tableStyle="min-width: 50rem">
      <Column field="time" header="Time"></Column>
      <Column field="text" header="Text"></Column>
    </DataTable>
  </div>
</template>
  
  <script setup lang="ts">
import { ref, onMounted } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

interface LogEntry {
  time: string;
  text: string;
}

const mass = ref<LogEntry[]>([]);
const str = ref<string>(
  "[13:36:53] Расчетное время: 9 мин[13:36:58] Открыть клапан откачки К1[13:36:58] Включить вакуумный насос[13:36:58] Закрыть клапан К5[13:36:58] Закрыть клапан дистилляции К2[13:36:58] Ожидание: 8 с[13:37:06] Заливка 2.2мл. в испаритель[13:37:06] Заданно 26.50602409638554 шагов[13:37:09] Заливка перекиси завершена[13:37:09] Открыть клапан дистилляции К2[13:42:09] Включить нагрев испарителя[13:42:09] Закрыть клапан дистилляции К2[13:42:09] конечное давление1.0960040758227925 торр[13:42:09] Выпаривание через К2[13:42:09] Выпаривание длилось5 мин[13:42:09] Откачка до 1 торр[13:42:15] Закрыть клапан откачки К1[13:43:09] Открыть клапан откачки К1[13:43:14] Аппаратное смещение 0 денсит. = -0.313683180809021[13:43:14] Закрыть клапан дистилляции К2"
);

onMounted(() => {
  let strMass: any[] = str.value.split("[");
  strMass.shift();
  strMass = strMass.map((el) => {
    let m = el.split("] ")
    return { time: "[" + m[0] + "]", text: m[1] }
  });
  
  /* const regex = /\[(\d{2}:\d{2}:\d{2})\]\s*(.*?)(?=\[\d{2}:\d{2}:\d{2}\]|$)/g;
  let match;
  const logEntries: LogEntry[] = [];

  while ((match = regex.exec(str.value)) !== null) {
    logEntries.push({ time: `[${match[1]}]`, text: match[2] });
  } */

  mass.value = strMass;
});
</script>