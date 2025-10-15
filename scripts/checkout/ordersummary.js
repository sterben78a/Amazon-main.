import { cart, removeFromCart, updateQuantity, updateDeliveryOption, numOfItems } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOption.js";
import {isWeekend}  from "../utils/weekend.js";
import { renderPaymentSummary } from "./paymentsummary.js";

function updateItemsCount() {
  const nuOfItems = numOfItems();

  document.querySelector('.js-items-number').innerHTML = `${nuOfItems} items`;
}

export function renderOrderSummary() {

  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = isWeekend(deliveryOption.deliveryDays);

    cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            ${matchingProduct.getPrice()}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-link js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link js-update-${matchingProduct.id}"
              data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input is-editing-quantity js-input-${matchingProduct.id}">
            <span class="save-quantity-link is-editing-quantity link-primary js-save-link
              js-save-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
              Save
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
    `
  });

  function deliveryOptionHTML(matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const dateString = isWeekend(deliveryOption.deliveryDays);
      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
      <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `;
    });

    return html;
  }

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  updateItemsCount();

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
      updateItemsCount();
      renderPaymentSummary();
    });
  });


  document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      let update = document.querySelector(`.js-update-${productId}`);
      let save = document.querySelector(`.js-save-${productId}`);
      let input = document.querySelector(`.js-input-${productId}`);
      let quantity = document.querySelector(`.js-quantity-label-${productId}`);

      update.style.display = "none";
      quantity.style.display = "none";
      save.classList.remove('is-editing-quantity');
      input.classList.remove('is-editing-quantity');
    });
  });

  document.querySelectorAll('.js-save-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      let update = document.querySelector(`.js-update-${productId}`);
      let save = document.querySelector(`.js-save-${productId}`);
      let input = document.querySelector(`.js-input-${productId}`);
      let quantity = document.querySelector(`.js-quantity-label-${productId}`);

      update.style.display = "inline";
      quantity.style.display = "inline";
      save.classList.add('is-editing-quantity');
      input.classList.add('is-editing-quantity');

      if(input.value === '' || input.value === '0') {
        alert('Enter Quantity...');
      }

      updateQuantity(productId, quantity);
      updateItemsCount();
      renderPaymentSummary();
    });
  });

  updateItemsCount();

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}