import { orders } from "../data/orders.js";
import { loadProductsFetch, products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { isWeekend } from "./utils/weekend.js";


async function renderOrder() {
  await loadProductsFetch();

  let ht = "";

  // Loop through each order
  orders.forEach(order => {
    let productsHtml = "";

    // Loop through each product in the order
    order.products.forEach(orderProduct => {
      // Find matching product info by productId
      const matching = products.find(p => p.id === orderProduct.productId);

      if (matching) {
        productsHtml += `
          <div class="order-details-grid">
            <div class="product-image-container">
              <img src="${matching.image}" alt="${matching.name}">
            </div>

            <div class="product-details">
              <div class="product-name">${matching.name}</div>
              <div class="product-delivery-date">
                Arriving on: ${isWeekend(orderProduct.estimatedDeliveryTime)}
              </div>
              <div class="product-quantity">
                Quantity: ${orderProduct.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png" alt="Buy again icon">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${orderProduct.productId}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          </div>
        `;
      }
    });

    ht += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${isWeekend(order.orderDate)}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        ${productsHtml}
      </div>
    `;
  });

  document.querySelector('.js-order-grid').innerHTML = ht;

}
const quan = localStorage.getItem('quan');

document.querySelector('.cart-quantity').textContent = quan;

renderOrder();
