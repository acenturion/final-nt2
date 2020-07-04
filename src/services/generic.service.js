import Axios from 'axios'

function getData(url) {
    return Axios.get(url)
}

function delData(id,url) {
    return Axios.delete(url, {
        data: {
            idPais: id
        }
    })
}

function addData(nuevo,url) {
    return Axios.post(url, nuevo)
}

function editData(modificado,url) {
    return Axios.put(url, modificado);
}

export default {
    getData,
    delData,
    addData,
    editData
}
