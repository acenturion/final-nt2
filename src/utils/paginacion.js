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
  function getTotalPage(pageSize, lista){
      let paginas = 0
      try{
        let tamanio = lista.length
        paginas = Math.floor(tamanio/pageSize)
        if (tamanio%pageSize > 0){
          paginas++
        }
      }catch (err){
        paginas = 0
      }
      return paginas
    }
export default {
    getPage,
    getTotalPage
  }