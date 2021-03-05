import axios from "axios";

axios.defaults.withCredentials = true;

function ajax(url, data={}, type='get'){
    return new Promise((resolve, reject) => {
        let promise;
        if(type === 'get'){
            promise = axios.get(url, {
                params: data
            });
        }else{
            console.log('post数据')
            promise = axios.post(url, data);
        }
        promise.then(response => {
            resolve(response.data);
        }).catch(err => {
            console.log('请求出错');
        });
    });
}

export default ajax;