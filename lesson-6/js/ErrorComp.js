Vue.component('error', {
    data() {
        return {
            invisible: true
        }
    },
    computed: {
        show() {
            this.invisible = false;
        }
    },
    template: `
        <div :class="{ invisible: invisible }">Ошибка!</div>
    `
});