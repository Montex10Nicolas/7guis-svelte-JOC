<script lang="ts">
  import "../app.css";

  let { children } = $props();
</script>

<nav class="mt-4 flex flex-wrap gap-3 border-b border-gray-800 pb-2 pl-2">
  <a class="border-pinky rounded-sm border bg-cyan-400 px-4 py-2 uppercase" href="/">home</a>
  <a class="border-pinky rounded-sm border bg-cyan-400 px-4 py-2 uppercase" href="counter"
    >counter</a
  >
  <a
    class="border-pinky rounded-sm border bg-cyan-400 px-4 py-2 uppercase"
    href="temperatureConverter">Temperature</a
  >
  <a class="border-pinky rounded-sm border bg-cyan-400 px-4 py-2 uppercase" href="flightbooker"
    >flight</a
  >
  <a class="border-pinky rounded-sm border bg-cyan-400 px-4 py-2 uppercase" href="timer">timer</a>
  <a class="border-pinky rounded-sm border bg-cyan-400 px-4 py-2 uppercase" href="crud">crud</a>
</nav>
{@render children()}
