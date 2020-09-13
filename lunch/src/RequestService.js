import axios from 'axios';

const url = 'http://localhost:5000/api/';

class RequestService {
    static getUrl() {
        return url;
    }

    static getRequest(endPoint) {
        return new Promise ((resolve,reject) => {
            axios.get(url + endPoint).then((res) => {
                const data = res.data;
                resolve(data);
            })
            .catch((err)=> {
                reject(err);
            });
        });
    }

    static sendRequest(endPoint, text) {
        return axios.post(url + endPoint, {
            text
        });
    }

    static getDataRequest(endPoint) {
        return new Promise ((resolve,reject) => {
            axios.get(url + endPoint).then((res) => {
                const data = res.data;
                // console.log(data);
                resolve(data);
            })
            .catch((err)=> {
                reject(err);
            });
        });
    }

    static sendDataRequest(endPoint, text) {
        return axios({
            method: 'post',
            url: url + endPoint,
            data: text,
            headers: {'Content-Type': 'multipart/form-data' }
        });
        // .then(function (response) {
        //     // handle success
        //     console.log(response);
        // })
        // .catch(function (response) {
        //     // handle error
        //     console.log(response);
        // });
    }

    static deleteRequest(endPoint, id) {
        return axios.delete(`${url}${endPoint}/${id}`);
    }

    static getMenuToday() {
        return new Promise ((resolve,reject) => {
            axios.get(url + 'menu/today').then((res) => {
                const data = res.data;
                // console.log(data);
                resolve(data);
            })
            .catch((err)=> {
                reject(err);
            });
        });
    }

    static getMenuWeek() {
        return new Promise ((resolve,reject) => {
            axios.get(url + 'menu/week').then((res) => {
                const data = res.data;
                // console.log(data);
                resolve(data);
            })
            .catch((err)=> {
                reject(err);
            });
        });
    }
}

export default RequestService;