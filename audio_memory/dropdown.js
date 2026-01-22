import { sets } from "./sets.js";

customElements.define("am-set-select", class extends HTMLElement {
    connectedCallback() {
        const select = this.select = this.appendChild(document.createElement("select"));

        const opt = document.createElement("option");
        opt.selected = true;
        opt.disabled = true;
        opt.textContent = "Видео";
        select.append(opt);

        for (const set of sets) {
            const opt = document.createElement("option");
            opt.value = set.id;
            opt.textContent = set.name;
            select.append(opt);
        }
    }

    reset() {
        this.select.selectedIndex = 0;
    }
});
