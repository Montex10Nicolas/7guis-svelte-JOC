<script lang="ts">
  let counter = $state(0);
</script>

<div class="flex gap-4 p-4">
  <p class="w-16 border border-gray-600 px-1">{counter}</p>
  <button class="w-16 cursor-pointer rounded-sm border border-black" onclick={() => counter++}
    >count</button
  >
</div>
