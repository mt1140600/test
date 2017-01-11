import { checkHttpStatus, parseJSON } from '../utils';
import { FETCH_ORDERS, SET_SEARCH_SPECS } from '../constant';
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

export const fetchOrders = (sellerId, type, orderBy, from, to, category, search_text) => {
  console.log("Inside fetchOrders function");
  console.log(orderBy);
  return function(dispatch){
    let url = constants.fetchOrders;
    url = url.replace(":seller_id", sellerId);
    if(type && typeof(type)!=='undefined') url = url + `${type}`;
    if(orderBy && typeof(orderBy)!=='undefined') url = url + `&orderBy=${orderBy}`;
    if(from && typeof(from)!=='undefined' && from !== 'Invalid date') url = url + `&from=${from}`; //Invalid date is assigned when we do moment().format()
    if(to && typeof(to)!=='undefined' && to !== 'Invalid date') url = url + `&to=${to}`;
    if(category && typeof(category)!=='undefined') url = url + `&category=${category}`;
    if(search_text && typeof(search_text)!=='undefined') url = url + `&search_text=${search_text}`;

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

export const setSearchSpecs = ( searchSpecs ) => {
  return{
    type: SET_SEARCH_SPECS,
    payload: {
      searchSpecs
    }
  }
}
