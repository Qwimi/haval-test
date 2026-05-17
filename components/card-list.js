import { carsData } from '../assets/bata.js';

class CardList extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        // language=HTML
        this.innerHTML = `
			<section class="card-list container">
			</section>
        `;

        const container = this.querySelector('.card-list');

        carsData.forEach(car => {
            const card = document.createElement('car-card');
            card.setAttribute('card-data', JSON.stringify(car));
            container.appendChild(card);
        });
    }
}

customElements.define('card-list', CardList);