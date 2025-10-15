import { orders } from "../data/orders.js";
import { loadProductsFetch, products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import {  isWeekend } from "./utils/weekend.js";

console.log(orders);

async function loadTrack() {
  await loadProductsFetch();

  let trackHTML = "";

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("orderId");
  const productId = url.searchParams.get("productId");

  orders.forEach((order) => {
    if (order.id === orderId) {
      order.products.forEach((item) => {

      const matching = products.find(p => p.id === productId);
        
        if (matching && item.productId === productId) {
          trackHTML = `
          <div class="order-tracking">
            <a class="back-to-orders-link link-primary" href="orders.html">
              View all orders
            </a>

            <div class="delivery-date">
              Arriving on ${isWeekend(item.estimatedDeliveryTime)}
            </div>

            <div class="product-info">
              
            </div>

            <div class="product-info">
              Quantity: ${item.quantity}
            </div>

            <img class="product-image" src="${matching.image}">

            <div class="progress-labels-container">
              <div class="progress-label">
                Preparing
              </div>
              <div class="progress-label current-status">
                Shipped
              </div>
              <div class="progress-label">
                Delivered
              </div>
            </div>

            <div class="progress-bar-container">
              <div class="progress-bar"></div>
            </div>
          </div>
          `;
        }
      });
      document.querySelector('.main').innerHTML = trackHTML
    }
  });
}

loadTrack();
