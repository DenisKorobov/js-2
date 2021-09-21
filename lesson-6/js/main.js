const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        error: false
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.error = true;
                    console.log(error);
                })
        },
    },
    computed: {
        showError() {
            let error = '';
            if (this.error)
                error = 'error';
            return error;
        }
    },
    mounted() {
        console.log(this);
    }
});