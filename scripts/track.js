import { orders } from "../data/orders.js";
import { loadProductsFetch, products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { isWeekend } from "./utils/weekend.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

loadTrack();

async function loadTrack() {
  await loadProductsFetch();

  let trackHTML = "";

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("orderId");
  const productId = url.searchParams.get("productId");

  orders.forEach((order) => {
    if (order.id === orderId) {
      order.products.forEach((item) => {
        if (item.productId === productId) {
          const matching = products.find((p) => p.id === productId);
          if (matching) {
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
                  <div class="progress-label current-status st-shipped">
                    Shipped
                  </div>
                  <div class="progress-label st-delivered">
                    Delivered
                  </div>
                </div>

                <div class="progress-bar-container">
                  <div class="progress-bar"></div>
                </div>
              </div>
          `;
          document.querySelector(".main").innerHTML = trackHTML;
          const progressBar = document.querySelector('.progress-bar');
          const delivered = document.querySelector('.st-delivered');
          const shipped = document.querySelector('.st-shipped');
          productTrackChecker(isWeekend(item.estimatedDeliveryTime) , progressBar, delivered, shipped);
          }
        }
      });
    }
  });
}



function productTrackChecker(recived , bar , deliver , shipped) {

  const day = dayjs();
  const dayStr = day.format('dddd, MMMM D');

  if(recived === dayStr){
    bar.style.width = '100%';
    deliver.classList.add('current-status');
    shipped.classList.remove('current-status');
  }
  
}