import Vue from 'vue'

Vue.filter('formatDate', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.slice(0, 19).replace('T', ' ')
})
