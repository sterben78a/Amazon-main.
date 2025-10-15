export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
    orders.unshift(order);
    saveToStorage();
    localStorage.setItem('o' , JSON.stringify(orders));
    
}

function saveToStorage() {
    localStorage.setItem('orders' , JSON.stringify(orders));
}