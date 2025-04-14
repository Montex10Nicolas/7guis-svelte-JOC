<script lang="ts">
  import { Crud } from "./crud.svelte";
  let list = $state([new Crud("Hans", "Emil"), new Crud("Max", "MUstermann")]);
  let selected = $state(0);
  let itemCopy = $state(new Crud("a", "b"));

  $effect(() => {
    if (selected > list.length) {
      selected = list.length;
      return;
    }
    const item = list[selected];
    itemCopy = new Crud(item.name, item.surname);
  });
</script>

<main class="p-4">
  <div class="flex items-center gap-3">
    <p>Filter prefix:</p>
    <input type="text" class="h-8 w-24" />
  </div>
  <div class="my-2 grid grid-cols-2 gap-4">
    <div class="flex h-40 w-full flex-col items-start gap-1 border border-gray-800 bg-white">
      {#each list as person, index}
        <button
          onclick={() => (selected = index)}
          class={[
            selected === index && "bg-blue-300 text-white",
            "w-full cursor-pointer text-left",
          ]}
        >
          {person.fullName()}</button
        >
      {/each}
    </div>
    <div class="flex flex-col gap-3">
      <div class="flex items-center justify-between gap-3">
        <p>Name:</p>
        <input type="text" name="name" bind:value={itemCopy.name} class="h-8 w-1/2" />
      </div>
      <div class="flex items-center justify-between gap-3">
        <p>Surname:</p>
        <input type="text" name="surname" bind:value={itemCopy.surname} class="h-8 w-1/2" />
      </div>
    </div>
  </div>
  <div class="flex gap-4">
    <button
      onclick={() => {
        list.push(new Crud(itemCopy.name, itemCopy.surname));
        itemCopy = list[selected];
      }}
      class="cursor-pointer rounded-sm border border-amber-700 px-3">Create</button
    >
    <button
      onclick={() => {
        list[selected].updatePerson(itemCopy);
      }}
      class="cursor-pointer rounded-sm border border-amber-700 px-3">Update</button
    >
    <button
      onclick={() => {
        list.splice(selected, 1);
      }}
      class="cursor-pointer rounded-sm border border-amber-700 px-3">Delete</button
    >
  </div>
</main>
