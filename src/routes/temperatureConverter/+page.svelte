<script lang="ts">
  let celcius = $state(0);
  let fahrenheit = $state(0);
</script>

<div class="flex gap-2 p-4">
  <input
    oninput={(e: Event) => {
      const inputEvent = e as InputEvent;
      const data = inputEvent.data;
      if (data === null || (data !== null && isNaN(parseInt(data)))) {
        return;
      }
      fahrenheit = celcius * (9 / 5) + 32;
    }}
    class="w-16 border border-gray-700 p-0 px-2"
    type="number"
    bind:value={celcius}
  />
  <p>Celsius =</p>
  <input
    class="w-16 border border-gray-700 p-0 px-2"
    bind:value={fahrenheit}
    oninput={(e: Event) => {
      const inputEvent = e as InputEvent;
      const data = inputEvent.data;
      if (data === null || (data !== null && isNaN(parseInt(data)))) {
        return;
      }
      celcius = ((fahrenheit - 32) * 5) / 9;
    }}
  />
  <p>Fahrenheit</p>
</div>
