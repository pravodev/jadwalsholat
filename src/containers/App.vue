<template>
	<div id="app">
        <div id="fb-root"></div>
		<nav class="topnav">
			<menu-bar></menu-bar>
			<div class="top-title">Jadwal Sholat</div>
		</nav>
		<header class="header">
			<div class="header__background img--parallax">
			    <h1 class="title">“Sesungguhnya shalat itu adalah fardhu/wajib yang ditentukan waktunya atas orang-orang yang beriman”. [ QS. An Nisa’ (4) : 103]</h1>
			</div>
		</header>
		<section class="content">
            <router-view></router-view>
		</section>
        <footer class="footer">
            Made with &hearts; in Kretek, Bantul Regency
        </footer>
	</div>
</template>


<script>
export default {
    name: 'app',
}
</script>

<!-- CSS libraries -->
<style src="normalize.css/normalize.css"></style>
<style src="bootstrap/dist/css/bootstrap.css"></style>
<style src="open-iconic/font/css/open-iconic-foundation.css"></style>
<style src="print-js/src/css/print.css"></style>



<!-- Global CSS -->
<style lang="scss">
@import '../assets/scss/App.scss';
</style>