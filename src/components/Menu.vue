<template>
    <div class="menu">
        <div 
            class="menu__item" 
            v-for="(item,index) in items"
            :key="index">
            {{ item.name }}
        </div>
    </div>
</template>
<script>
export default {
    name: 'menu-items',
    data(){
        return {
            items: [
                {
                    name: 'Home'
                },
                {
                    name: 'Pilih Kota'
                },
                {
                    name: 'Lihat Jadwal'
                },
                {
                    name: 'Tentang'
                },
            ]
        }
    },
    mounted(){
        console.log('mounted', this.items)
    }
}
</script>
<style scoped>
.menu {
  display: flex;
}
.menu__item {
    padding: 12px;
    text-align: center;
    min-width: 100px;
}

</style>


