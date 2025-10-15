import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOption.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";


export function renderPaymentSummary() {
  let productPriceCens = 0;
  let shippingPriceCents = 0;
  let itemQuantity = 0;

  cart.forEach((cartItem) => {
    const Product = getProduct(cartItem.productId);
    productPriceCens += Product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;

    itemQuantity += cartItem.quantity;
  });
  const totalBeforeTax = shippingPriceCents + productPriceCens;
  const taxCents = totalBeforeTax * 0.1;
  const total = totalBeforeTax + taxCents;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>
    
    <div class="payment-summary-row">
      <div>Items (${itemQuantity}):</div>
      <div class="payment-summary-money">$${formatCurrency(productPriceCens)}</div>
    </div>
        
    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
    </div>
        
    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
    </div>
        
    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>
        
    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(total)}</div>
    </div>
        
    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button>`;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
  document.querySelector('.js-place-order').addEventListener('click', async () => {

    try {
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart
        })
      });
      const order = await response.json();
      addOrder(order);
      
    }catch(error) {
      alert('unexpected error. try again later.')
    }
    
    window.location.href = 'orders.html';
    
  });
}