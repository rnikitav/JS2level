Vue.component('err', {
    props: ['showerr'],
    template: `
        <div v-show="showerr">
            <h1>Не получены данные с сервера</h1>
        </div>    
    `
});