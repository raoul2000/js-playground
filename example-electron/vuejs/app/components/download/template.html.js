module.exports = `
<li>
  {{ item.name }}
  <button
    v-bind:disabled="inProgress"
    v-on:click="startDownload(item)">
      start {{progressPercent}}
  </button>

  {{inProgress}}<br/>

  <div
    v-if="count > 0"
    v-bind:style="{ color: activeColor}">
      {{ statusMessage }}
  </div>
</li>
`;
