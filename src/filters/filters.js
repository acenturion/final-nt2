import Vue from 'vue'



Vue.filter('formatDate', function (value) {
    if (!value) return ''
    return new Date(value).toISOString().substr(0, 10)
})

Vue.filter('fechaddMMyyyy', function(date) {
    var d = new Date(date),
        mes = '' + (d.getMonth() + 1),
        dia = '' + d.getDate(),
        anio = d.getFullYear();

    if (mes.length < 2) 
        mes = '0' + mes;
    if (dia.length < 2) 
        dia = '0' + dia;

    return [dia, mes, anio].join('-');
})


Vue.filter('formatearNumero',function (num){
    num +='';
    var splitStr = num.split('.');
    var splitLeft = splitStr[0];
    var splitRight = splitStr.length > 1 ? ',' + splitStr[1] : '';
    var regx = /(\d+)(\d{3})/;
    while (regx.test(splitLeft)) {
    splitLeft = splitLeft.replace(regx, '$1' + '.' + '$2');
    }
    return splitLeft +splitRight;
})

