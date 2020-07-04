import axios from 'axios';

const url = 'http://localhost:5000/api/';

class RequestService {
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

    static deleteRequest(endPoint, id) {
        return axios.delete(`${url}${endPoint}/${id}`);
    }
}

export default RequestService;