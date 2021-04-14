const key = require('./location_api_key')

const axios = require('axios').default
const axios_instance = axios.create({
    baseURL: 'http://api.positionstack.com/v1/',
    timeout: 10000,
})

export function api_getLocationReverse(callback, location){
    console.log("api_getLocationReverse location query",location)
    console.log("api_getLocationReverse key",key.API_KEY)
    axios_instance.get('reverse',{
        params: {
            access_key: key.API_KEY,
            query: location
        },
        responseType: 'json'
    })
    .then(resp => {
        callback(resp.data, resp.status)
    })
    .catch(error => {
        if (error.response) {
            // console.log("api_getLocationReverse -> error respon",error.response.status);
            callback({ "message": "Responses error" }, error.response.status)
        } else if (error.request) {
            // console.log("api_getLocationReverse -> error request",error.request);
            callback({ "message": "Request error" }, error.request._response)
        } else {
            console.log("api_getLocationReverse -> unknown error: ", error)
            callback({ "message": "Unknown error" }, 600)
        }
    })
}