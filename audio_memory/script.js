// import memory from "./memory.js";
// import dropdown from "./dropdown.js";

/*

const ready = new Promise(res => {
    window.onYouTubeIframeAPIReady = () => res();
});

ready.then(_ => console.info(221));

const $container = document.querySelector("#tiles");
document.querySelector("#video").addEventListener("change", evt => {
    const value = evt.target.value;
    const set = sets.find(set => set.id === value);
    new AudioMemory().setContainer($container).loadSet(set);
});

class AudioMemory {
    #openend_tile = null;

    constructor() {
        document.body.addEventListener("click", async evt => {
            const button = evt.target.closest("[data-player-id]");
            if (button === undefined)
                return;

            const player_id = button.dataset.playerId;
            const tile = this.tiles.find(tile => tile.id === player_id);

            if (tile.flipped)
                return;

            if (this.#openend_tile === null) {
                this.#openend_tile = tile;
                tile.flip();
                return;
            }

            const flip = tile.flip();
            if (this.#openend_tile.start === tile.start) {
                this.#openend_tile = null;
                console.info("yes!");
            } else {
                await flip;
                this.#openend_tile.flip();
                tile.flip();
                this.#openend_tile = null;
                console.info("noppa");
            }
        });
    }

    setContainer($container) {
        this.$container = $container;
        return this;
    }
    
    renderSet() {
        // const tile = tiles.splice(crypto.getRandomValues(new Uint32Array(1))[0] % tiles.length, 1);

        for (const tile of this.tiles) {
            tile.id = `player_${this.set_id}_${tile.piece}_${tile.start}_${tile.end}`.replace(/\./g, "_");
            this.$container.insertAdjacentHTML("beforeend", `
                <div class="tile" data-tile-id="${tile.id}" data-flipped="false">
                    <div id="${tile.id}" data-state="paused"></div>
                    <button data-player-id="${tile.id}">Я</button>
                </div>
            `); 
            tile.flip = async _ => new Promise(res => {
                const $tile = document.querySelector(`[data-tile-id="${tile.id}"]`);

                tile.flipped = !tile.flipped;
                $tile.dataset.flipped = tile.flipped;
                if (tile.flipped === false)
                    return; 

                tile.player.seekTo(tile.start, true);
                tile.player.playVideo();
                const int = setInterval(_ => {
                    if (tile.player.getCurrentTime() > tile.end) {
                        clearInterval(int);
                        tile.player.pauseVideo();
                        res();
                    }
                }, 500);
            });
            tile.player = new YT.Player(tile.id, {
                width: 160 * 3,
                height: 90 * 3,
                endSeconds: tile.end,
                videoId: this.set_id,
                events: {
                    // onReady: _ => this.setupPlayerFor(tile),
                    // onStateChange: onPlayerStateChange
                },
                playerVars: {
                    modestbranding: 1,
                    rel: 0,
                    controls: 0,
                },
            });
        } 
    }

    loadSet(set) {
        this.set_id = set.id;
        this.tiles = set.tiles.flatMap(t => [
            structuredClone({ piece: 1, flipped: false, ...t }),
            structuredClone({ piece: 2, flipped: false, ...t }),
        ]);
        this.renderSet();
        return this;
    }
};

*/
