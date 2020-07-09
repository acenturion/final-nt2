import Axios from 'axios'

function getData(url) {
    return Axios.get(url)
}

function delData(data,url) {
    return Axios.delete(url, {
        data: data
    })
}

function addData(nuevo,url) {
    return Axios.post(url, nuevo)
}

function editData(modificado,url) {
    return Axios.put(url, modificado);
}

function getDataId(id,url) {    
    return Axios.post(url,id)
}

export default {
    getData,
    delData,
    addData,
    editData,
    getDataId
}
