// Redoing tiles does not work, they cannot be clicked. Maybe still marked as correct??

const base = "assets/";

let idd = 0;
const getLetter = _ => {
   const l = "абвгдежзийклмнопрстуфхцчшщъыьэюя"; 
   return l.substr(idd++, 1);
};

export const createAudioMapTile = ({ idx, audiomap, id, audio: { from, to } }) => {
    const tile = document.createElement("am-tile");
    tile.idx = idx;
    const card = tile.appendChild(document.createElement("div"));
    card.classList.add("card");
    const front = card.appendChild(document.createElement("div"));
    front.classList.add("front");
    front.textContent = getLetter();
    const back = card.appendChild(document.createElement("div"));
    back.classList.add("back");
    const audio = back.appendChild(document.createElement("audio"));
    audio.controls = true;
    audio.src = base + `${id}/${audiomap}`;
    tile.setAttribute("from", from);
    tile.setAttribute("to", to);
    tile.setAttribute("type", "audiomap");
    return tile;
}

export const createImageTile = ({ idx, img, id }) => {
    const tile = document.createElement("am-tile");
    tile.idx = idx;
    const card = tile.appendChild(document.createElement("div"));
    card.classList.add("card");
    const front = card.appendChild(document.createElement("div"));
    front.textContent = getLetter();
    front.classList.add("front");
    const back = card.appendChild(document.createElement("div"));
    back.classList.add("back");
    const image = back.appendChild(document.createElement("img"));
    image.src = base + `${id}/${img}`;
    tile.setAttribute("type", "image");
    return tile;
}

export const createTile = ({ set_id, start, end }) => {
    const tile = document.createElement("am-tile");
    tile.setAttribute("video_id", set_id);
    tile.setAttribute("start", start);
    tile.setAttribute("end", end);
    return tile;
}

/*
let player;
let x;
setTimeout(_ => {
    x = document.documentElement.appendChild(document.createElement("div"));
    let ready = false;
    player = new YT.Player(x, {
        width: 160 * 3,
        height: 90 * 3,
        videoId: "sQP5Fd8EeiU",
        events: {
            onReady: _ => ready = true,
        },
    });
}, 2000);
*/

export class AmTile extends HTMLElement {
    #open = false;

    get id() {
        return `${this.start}_${this.end}`;
    }

    connectedCallback() {
        this.type = this.getAttribute("type");
        switch (this.type) {
            case "audiomap": {
                this.from = Number(this.getAttribute("from"));
                this.to = Number(this.getAttribute("to"));
            } break;
            case "image": {
            } break;
        }

        this.setAttribute("open", this.#open);

        // const node = this.appendChild(document.createElement("div"));
        // this.is_player_loaded = new Promise(res => this.player_loaded = res);
    }

    flipOpen() {
        return new Promise(async opened => {
            this.#open = true;
            this.setAttribute("open", this.#open);

            switch (this.type) {
                case "image": {
                    setTimeout(_ => opened(this), 1024);
                } break;
                case "audiomap": 
                    const audio = this.querySelector("audio");
                    audio.currentTime = this.from;
                    audio.play();
                    const int = setInterval(_ => {
                        if (audio.currentTime > this.to) {
                            clearInterval(int);
                            audio.pause();
                            opened(this);
                        }
                    }, 64);
                {} break;
            }

            // FIXME
        });
    }

    flipClose() {
        this.#open = !this.#open;
        this.setAttribute("open", this.#open);
    }

    markCorrect() {
        this.state = "correct";
        this.setAttribute("state", "correct");
    }
};

customElements.define("am-tile", AmTile);
