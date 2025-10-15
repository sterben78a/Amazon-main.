import { renderOrderSummary } from "./checkout/ordersummary.js";
import { renderPaymentSummary } from "./checkout/paymentsummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js';
// import '../data/backend-practice.js'

async function loadPage() {
  try{
    await loadProductsFetch();
  
    await new Promise((resolve) => {
      loadCart(() => {
  
        resolve();
      });
    });

  }
  catch(error) {
    alert('hh.')
  }

  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();

// Promise.all([
//   loadProductsFetch(),
// new Promise((resolve) => {
//   loadCart(() => {

//     resolve();
//   });
// })
// ]).then(() => {
//   renderOrderSummary();
//   renderPaymentSummary();
// });

/*
loadProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/