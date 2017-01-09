import { checkHttpStatus, parseJSON } from '../utils';
import { FETCH_ORDERS } from '../constant';
import * as constants from '../constants';
import 'whatwg-fetch';

const fillOrders = (orders) => {
  console.log("Inside fillOrders");
  console.log(orders);
  return{
    type: FETCH_ORDERS,
    payload: {
      orders
    }
  }
}

export const fetchOrders = (sellerId, type, orderBy, from, to) => {
  return function(dispatch){
    let url = constants.fetchOrders;
    url = url.replace(":seller_id", sellerId);
    if(type) url = url + `${type}`;
    if(orderBy) url = url + `&orderBy=${orderBy}`;
    if(from) url = url + `&from=${from}`;
    if(to) url = url + `&to=${to}`;

    return fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then( response => { dispatch(fillOrders(response)); })
    .catch( error => { console.log("Failed to fetch orders ", error); })
  }
}
