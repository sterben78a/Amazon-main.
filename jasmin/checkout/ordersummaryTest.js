import { renderOrderSummary } from "../../scripts/checkout/ordersummary.js";

describe('test suites: render order summary fun' , () => {
    it('displays the cart', () => {
        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-order-summary"></div>
        `;
        // mock the localstorage getitem
    });
});