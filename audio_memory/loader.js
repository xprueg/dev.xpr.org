customElements.define("am-loader", class extends HTMLElement {
    constructor() {
        super();

        window.addEventListener("amsetloadedtilescount", ({ detail: count }) => {
            this.$progress.max = count;
        });

        this.value = 0;
        window.addEventListener("amtileloaded", _ => {
            this.$progress.value = ++this.value;
        });
    }

    connectedCallback() {
        this.$progress = this.appendChild(document.createElement("progress"));
    }
});
