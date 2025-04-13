<script lang="ts">
  import { parse } from "svelte/compiler";

  let combobox: "one-way" | "return-flight" = $state("one-way");
  let t1 = $state("");
  let t2 = $state("");

  function checkDate(s: string): boolean {
    if (s.length < 10) {
      for (let char of s) {
        if (char === ".") continue;
        if (isNaN(parseInt(char))) return false;
      }
      return true;
    }
    if (s.length !== 10) return false;
    const dates = s.split(".").flatMap((s) => parseInt(s));

    if (dates.length !== 3) return false;
    for (let d of dates) {
      if (isNaN(d)) return false;
    }
    return true;
  }

  function impossibleReturn() {
    if (combobox === "one-way") return true;
    if (!checkDate(t1) || !checkDate(t2)) return false;
    const dT1 = t1.split(".").flatMap((s) => parseInt(s));
    const dT2 = t2.split(".").flatMap((s) => parseInt(s));
    const dateT1 = new Date(dT1[2], dT1[1], dT1[0]);
    const dateT2 = new Date(dT2[2], dT2[1], dT2[0]);
    if (dateT1 > dateT2) return false;
    return true;
  }
</script>

<main class="mt-10 ml-2">
  <div class="flex w-2/3 flex-col gap-2">
    <select bind:value={combobox}>
      <option value="one-way">one-way flight</option>
      <option value="return-flight">return flight</option>
    </select>
    <input class={!checkDate(t1) ? "bg-red-600" : null} type="text" bind:value={t1} />
    <input
      class="disabled:bg-gray-300 {!checkDate(t2) ? 'bg-red-600' : null}"
      disabled={combobox === "one-way"}
      bind:value={t2}
      type="text"
    />
    <button
      onclick={() =>
        alert(
          `You have booked a ${combobox} on ${t1} ${combobox === "return-flight" ? "from " + t2 : ""}`,
        )}
      disabled={!checkDate(t1) ||
        !checkDate(t2) ||
        t1.length < 10 ||
        (combobox === "return-flight" && t2.length < 9) ||
        !impossibleReturn()}
      class="cursor-pointer rounded-sm border border-gray-700 py-1 disabled:cursor-default disabled:bg-cyan-300"
      >Book</button
    >
  </div>
</main>
