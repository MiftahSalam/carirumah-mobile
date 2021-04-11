const axios = require('axios').default
// axios.defaults.baseURL = 'http://192.168.1.184:8000/api/property/'
axios.defaults.baseURL = 'http://192.168.43.173:8000/api/property/'
axios.defaults.timeout = 10000

export function api_getPropertyBySearch(callback, query_text){
    console.log("api_getPropertyBySearch with text query",query_text)
    axios.get(axios.defaults.baseURL+'search/',{
        params:{
            query_text: query_text
        },
        responseType: 'json'
    })
    .then(resp => {
        callback(resp.data, resp.status)
    })
    .catch(error => {
        if (error.response) {
            console.log("api_getPropertyBySearch -> error respon",error.response.status);
            callback({ "message": "Responses error" }, error.response.status)
        } else if (error.request) {
            console.log("api_getPropertyBySearch -> error request",error.request);
            callback({ "message": "Request error" }, error.request._response)
        } else {
            console.log("api_getPropertyBySearch -> unknown error: ", error)
            callback({ "message": "Unknown error" }, 600)
        }
    })
}
export const api_getPropertyDetail = (callback,id) => {
    console.log("api_getPropertyDetail with id", id)
    axios({
        method: 'GET',
        url: axios.defaults.baseURL+`${id}/`,
        responseType: 'json'
    })
    .then(function(resp) {
        callback(resp.data, resp.status)
    })
    .catch((error) => {
        if (error.response) {
            console.log("api_getPropertyDetail -> error respon",error.response.status);
            callback({ "message": "Responses error" }, error.response.status)
        } else if (error.request) {
            console.log("api_getPropertyDetail -> error request",error.request);
            callback({ "message": "Request error" }, error.request._response)
        } else {
            console.log("api_getPropertyDetail -> unknown error: ", error)
            callback({ "message": "Unknown error" }, 600)
        }
    })
}
export function api_getPropertyList(callback, page = null, is_ajax = false) {
    console.log("api_getPropertyList with page", page, ". ajax mode ", is_ajax)
    let ajax_header = {}
    if (is_ajax) {
        ajax_header = { 'X-Requested-With': 'XMLHttpRequest' }
    }
    var header = { ...axios.defaults.headers, ...ajax_header }

    axios.get('', {
        headers: header,
        params: {
            page: page
        }
    })
        .then((resp) => {
            callback(resp.data, resp.status)
        })
        .catch((error) => {
            if (error.response) {
                // console.log("error response", error.request);
                // console.log(error.response.data);
                console.log(error.response.status);
                // console.log(error.response.headers);
                callback({ "message": "Responses error" }, error.response.status)
            } else if (error.request) {
                // console.log("error request", error.request);
                callback({ "message": "Request error" }, error.request._response)
            } else {
                console.log("api_getPropertyList -> error: ", error)
                callback({ "message": "Unknown error" }, 600)
            }
        })
        .then(() => {
            console.log("always executed")
        })
}


// const connection_url = "http://127.0.0.1:8000/api/property/"

// export function api_getPropertyList(callback) {
//     fetch(connection_url, {
//         method: "GET",
//     })
//         .then((resp) => {
//             let data = resp.json();
//             let status = resp.status;
//             console.log("fetch response. Data: ", data);
//             console.log("fetch response. Status: ", status);
//             callback(data, status)
//         })
//         .catch(function (error) {
//             console.log("fetch error", error.code);
//             callback({ "message": "error fetching" }, error.status)
//         }
//         );
// }