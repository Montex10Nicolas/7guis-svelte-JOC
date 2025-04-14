<script lang="ts">
  import "../app.css";

  let { children } = $props();
</script>

<nav class="mt-4 ml-2">
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
</nav>
{@render children()}
