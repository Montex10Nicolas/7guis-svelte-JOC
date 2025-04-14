<script lang="ts">
  let elapsed = $state(0);
  let duration = $state(0);

  $effect(() => {
    if (duration > 0 && elapsed < duration) {
      const interval = setInterval(() => {
        elapsed += 0.1;
      }, 100);

      return () => {
        clearInterval(interval);
      };
    }
  });
</script>

<main class="mt-8 ml-4 flex w-80 flex-col gap-4">
  <div class="flex gap-2">
    <p>Elapsed Time:</p>
    <div class="relative h-6 w-48 rounded-sm border bg-gray-400">
      <div
        class="top-0 left-0 h-full bg-blue-500"
        style="width: {elapsed === 0 || duration === 0 ? 0 : (elapsed / duration) * 100}%;"
      ></div>
    </div>
  </div>
  <p>{elapsed.toFixed(1)}s</p>
  <input type="range" min="0" max="60" step="0.10" bind:value={duration} />
  <button onclick={() => (elapsed = 0)} class="w-full rounded-sm border border-black bg-white"
    >Reset</button
  >
</main>
