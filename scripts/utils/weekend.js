import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function isWeekend(date) {
  let today = dayjs(date);

  let daysToDelivery = 0;

  while (daysToDelivery < date) {
    today = today.add(1, 'day');
    const dateString = today.format('dddd');
    
    if(dateString !== 'Saturday' && dateString !== 'Sunday'){
      daysToDelivery++;
    }
  }
  return today.format('dddd, MMMM D');
};