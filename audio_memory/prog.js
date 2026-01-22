customElements.define("am-prog", class extends HTMLElement {
    amSetSelect = document.createElement("am-set-select");
    amTiles = document.createElement("am-tiles");

    constructor() {
        super();

        this.amSetSelect.addEventListener("change", evt => {
            const setid = evt.target.value;
            this.amTiles.set_id = setid;
            this.append(this.amTiles);
        });

        this.amTiles.addEventListener("amtilesfinished", _ => {
            this.amSetSelect.reset();
            this.amTiles.remove();
        });
    }

    connectedCallback() {
        this.append(this.amSetSelect);
    }
});
