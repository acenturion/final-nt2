function getPage (pageNumber, pageSize, lista) {
    let pagina = []
    let inicioIndex = (pageNumber-1)*pageSize
    let finIndex = inicioIndex + pageSize
    if (finIndex > lista.length){
      finIndex = lista.length
    }
    for (let index = inicioIndex; index < finIndex; index++) {
      let tope = lista[index]
      pagina.push(tope)
    }
    return pagina
  }

  export default {
    getPage
}