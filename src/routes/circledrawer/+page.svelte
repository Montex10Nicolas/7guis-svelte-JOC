<script lang="ts">
  // Known bug: when overing a circles the closes became circle[0]
  interface Circle {
    id: string;
    cx: number;
    cy: number;
    r: number;
  }

  let status = $state<"drawing" | "editing">("drawing");
  let circles: Circle[] = $state([]);
  let radius = $state(10);
  let selected = $state<Circle>();

  let snapshots: Circle[][] = $state([]);
  let history = $state(-1);

  function drawCircle(event: MouseEvent) {
    if (status === "editing") return;
    const svgEl = event.target as SVGElement;
    const { left, top } = svgEl.getBoundingClientRect();

    const x = event.x - left,
      y = event.y - top;

    circles.push({
      id: (circles.length + 1).toString(),
      cx: x,
      cy: y,
      r: radius,
    });
    snapshot();
  }

  function choseSelected(event: MouseEvent) {
    if (status === "editing") return;
    if (!circles.length) return;

    const svgEl = event.target as SVGElement;
    const { left, top } = svgEl.getBoundingClientRect();
    interface Point {
      x: number;
      y: number;
    }

    const mousePoints: Point = { x: event.x - left, y: event.y - top };
    function calcDist(point: Point) {
      return Math.sqrt(Math.pow(mousePoints.x - point.x, 2) + Math.pow(mousePoints.y - point.y, 2));
    }

    let tempCircle = circles[0];
    let dist = calcDist({ x: circles[0].cy, y: circles[0].cy });
    for (let i = 1; i < circles.length; i++) {
      const point = { x: circles[i].cx, y: circles[i].cy };
      const checkDist = calcDist(point);

      if (dist > checkDist) {
        dist = checkDist;
        tempCircle = circles[i];
      }
    }
    selected = tempCircle;
  }

  function undo() {
    if (history === 0) {
      circles = [];
      return;
    }
    circles = snapshots[--history];
  }

  function redo() {
    if (snapshots.length < history + 1) return;
    circles = snapshots[history++];
  }

  function snapshot() {
    history++;
    snapshots.push($state.snapshot(circles));
  }
</script>

<div class="my-2 flex justify-center gap-6">
  <button class="cursor-pointer rounded-sm border border-black px-3" onclick={undo}>Undo</button>
  <button class="cursor-pointer rounded-sm border border-black px-3" onclick={redo}>Redo</button>
</div>
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<svg
  class="h-96 w-96 border border-black"
  oncontextmenu={(event) => {
    event.stopPropagation();
    event.preventDefault();
    if (!circles.length) return;
    status = status === "editing" ? "drawing" : "editing";
  }}
  onmousemove={choseSelected}
  onclick={drawCircle}
>
  {#each circles as circle}
    <circle
      cx={circle.cx}
      cy={circle.cy}
      r={circle.r}
      fill={selected && circle.id === selected.id ? "red" : "blue"}
      stroke="black"
      stroke-width="2"
    ></circle>
  {/each}
</svg>
{#if status === "editing" && selected !== undefined}
  <div class="w-3/4 border border-black">
    <p>Adjust the diaeter of circle at ({selected.cx}, {selected.cy})</p>
    <input
      type="range"
      bind:value={radius}
      min="1"
      max="30"
      step="1"
      oninput={() => {
        if (!selected) return;
        selected.r = radius;
      }}
      onchange={snapshot}
    />
  </div>
{/if}
