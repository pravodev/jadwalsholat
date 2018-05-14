<template>
    <div class="menu__container">
        <span class="barmenu" @click="toggleSidebar()"><icon name="fi-menu"/></span>
        <div class="sidebar" :class="visibility === false &&'hide'">
            <span class="barmenu" @click="toggleSidebar()"><icon name="fi-menu"/></span>            
            <div class="header__sidebar">
                <img src="../images/ramadhan_cute.jpg"/>
            </div>
            <div class="sidebar__menu">
                <div class="menu">
                    <router-link to="/">Home</router-link>
                </div>
                <div class="menu">
                    <router-link to="/about">About</router-link>
                </div>
                <div class="menu">
                    <router-link to="/contact">Contact</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'menubar',
    data: () => ({
        visibility: false
    }),
    methods: {
        toggleSidebar(){
            this.visibility = !this.visibility
        }
    }
}
</script>

<style lang="scss" scoped>
.menu__container {
    padding: 14px
}
.barmenu {
    cursor: pointer;
}
.sidebar {
    position: absolute;
    display: block;
    background: #f9f9f9;
    left: 0;
    top: 0;
    z-index: 1;
    width: 250px;
    height: 100vh;
    box-shadow: 0 0 5px #00000052;
    &.hide {
        display: none;
    }
    .barmenu {
        color: black;
        position: absolute;
        left: 0;
        padding: 14px;
    }
    .header__sidebar {
        height: 100px;
        overflow: hidden;
    }
    .sidebar__menu {
        & {
            text-align: left;
        }
        .menu {
            // color: #3ca5b3;
            padding: 10px 15px;
            color: black;
            // background: #dedcdc;
            // margin: 10px;
            // border-bottom: 2px solid #3ca5b3;
            // border-radius: 7px;
            font-weight: bold;
        }
    }
}
</style>
