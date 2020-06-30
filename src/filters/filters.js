import Vue from 'vue'

Vue.filter('formatDate', function (value) {
    if (!value) return ''
    return new Date(value).toISOString().substr(0, 10)
})
