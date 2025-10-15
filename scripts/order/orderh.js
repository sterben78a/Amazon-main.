import { orders } from "../data/orders.js";
import { loadProductsFetch , getProduct } from "../data/products.js";
console.log(orders);

async function loading() {
  const hh = await loadProductsFetch();
  
  let orderHTML = "";
  orders.forEach((item , index) => {
    const productId = item.products[index].productId;
    const matching = getProduct(productId);
    console.log(productId);
    

    orderHTML += `
      <div class="order-details-grid">
        <div class="product-image-container">
          <img src="${matching.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${matching.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: August 15
          </div>
          <div class="product-quantity">
            Quantity: 1
          </div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
            <a href="tracking.html">  
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>

        <div class="product-image-container">
          <img src="images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg">
        </div>

        <div class="product-details">
          <div class="product-name">
            Adults Plain Cotton T-Shirt - 2 Pack
          </div>
          <div class="product-delivery-date">
            Arriving on: August 19
          </div>
          <div class="product-quantity">
            Quantity: 2
          </div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      </div>
      `;
  });

  document.querySelector('.js-main').innerHTML += orderHTML;
}

loading();