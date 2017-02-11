import { FETCH_UPLOADS, UPLOAD_HISTORY_SET_SEARCH_SPECS  } from '../constant';
import { checkHttpStatus, parseJSON } from '../utils';
import * as constants from '../constants';
import 'whatwg-fetch';

const fillUploads = (uploads) => {
  console.log("Inside fillUploads");
  console.log(uploads);
  return{
    type: FETCH_UPLOADS,
    payload: {
      uploads
    }
  }
}

export const fetchUploads = (sellerId, type, orderBy, from, to, category, search_text, page) => {
  return function(dispatch){
    let url = constants.fetchUploads;
    url = url.replace(":seller_id", sellerId);
    if(type && typeof(type)!=='undefined') url = url + `${type}`;
    if(orderBy && typeof(orderBy)!=='undefined') url = url + `&orderBy=${orderBy}`;
    if(from && typeof(from)!=='undefined' && from !== 'Invalid date') url = url + `&from=${from}`; //Invalid date is assigned when we do moment().format()
    if(to && typeof(to)!=='undefined' && to !== 'Invalid date') url = url + `&to=${to}`;
    if(category && typeof(category)!=='undefined') url = url + `&category=${category}`;
    if(search_text && typeof(search_text)!=='undefined') url = url + `&search_text=${search_text}`;
    if(page && typeof(page)!=='undefined')  url = url + `&page=${page}`;

    return fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then( response => { dispatch(fillUploads(response)); })
    .catch( error => { console.log("Failed to fetch orders ", error); })
  }
}

export const setSearchSpecs = ( searchSpecs ) => {
  return{
    type: UPLOAD_HISTORY_SET_SEARCH_SPECS,
    payload: {
      searchSpecs
    }
  }
}
