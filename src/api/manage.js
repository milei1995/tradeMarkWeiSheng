import axios from 'axios'

export function postAction(url, parameter) {//post
    return axios({
        url: url,
        method: 'post',
        data: parameter
    })
}

//get
export function getAction(url, parameter) {
    return axios({
        url: url,
        method: 'get',
        params: parameter
    })
}