<template>
  
</template>

<script>
export default {
    name: 'dtitle',
    props: ['title'],
    created(){
        document.title = this.title
    },
    watch: {
        title(){
            document.title = this.title
        }
    }
}
</script>
