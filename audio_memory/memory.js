import { getSetById } from "./sets.js";
import { AmTile, createTile, createAudioMapTile, createImageTile } from "./memorytile.js";

customElements.define("am-tiles", class extends HTMLElement {
    constructor() {
        super();

        this.clicked_tiles = [];
        this.clicked_tile_queue = [];
        this.addEventListener("click", evt => {
            const tile = evt.target;
            if (!(tile instanceof AmTile))
                return;
            if (tile.state === "correct")
                return;
            if (tile.getAttribute("open") === "true")
                return;

            if (this.clicked_tiles.length < 2) {
                this.clicked_tiles.push(tile.flipOpen());
                this.resolveQueue();
            } else {
                this.clicked_tile_queue.push(tile);
            }
        });
    }

    async resolveQueue() {
        if (this.clicked_tiles.length !== 2)
            return;

        const tiles = await Promise.all(this.clicked_tiles);
        const [a, b] = tiles;

        if (a.idx === b.idx) {
            tiles.forEach(tile => tile.markCorrect());

            // if (this.correct_tiles === this.tiles_count) {
            //     this.render();                
            // }
        } else {
            tiles.forEach(tile => tile.flipClose());
        }

        if (this.tiles.some(tile => tile.state !== "correct")) {
            this.clicked_tiles = this.clicked_tile_queue.splice(0, 2).map(tile => tile.flipOpen());
            this.resolveQueue();
        } else {
            this.dispatchEvent(new CustomEvent("amtilesfinished"));
        }
    }

    connectedCallback() {
        const tile_size = Number(getComputedStyle(this).getPropertyValue("--tile-size").replace(/px/, ""));
        const size = this.getBoundingClientRect();

        const cols = Math.floor(size.width / tile_size);
        const rows = Math.floor(size.height / tile_size);
        const max_tile_count_per_page = cols * rows;
        this.style.setProperty("--cols", cols);
        this.style.setProperty("--rows", rows);

        // TODO: Extra classes for different set types
        const set = getSetById(this.set_id);
        this.tiles = set.tiles.flatMap((tile, idx) => [
            createAudioMapTile({ idx, ...set, ...tile }),            
            createImageTile({ idx, ...set, ...tile }),            
        ]);
        this.append(...this.tiles);
    }

    disconnectedCallback() {
        this.replaceChildren();
    }
});
