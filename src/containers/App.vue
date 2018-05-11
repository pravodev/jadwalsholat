<template>
	<div id="app">
        <div id="fb-root"></div>
        <dtitle :title="'Jadwal Sholat untuk ' + selected.city.name + ' dan sekitarnya'"/>
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
			<article>
                <div class="content__title">
                    Jadwal Sholat untuk {{selected.city.name}} dan sekitarnya
                </div>
                <div class="content__body container-fluid">
                    <div class="row">
                        <div class="col-md-8 col-sm-12">
                            <div class="filter__prayer">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <label class="input-group-text" for="inputGroupSelect01">Pilih Kota</label>
                                        </div>
                                        <select class="custom-select" id="inputGroupSelect01" v-model="selected.city">
                                            <option selected>Choose...</option>
                                            <option v-for="(city, key) in cities" :key="key" :value="city">{{ city.name }}</option>
                                        </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style="margin:10px 0" class="button__action">
                                <button class="btn btn-primary">Sebelumnya</button>
                                <div class="button__right float-right">
                                    <button class="btn btn-warning float-right"><icon name="fi-print"/></button>
                                    <button class="btn btn-primary float-right">Selanjutnya</button>
                                </div>
                            </div>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Tanggal</th>
                                        <th>Imsak</th>
                                        <th>Shubuh</th>
                                        <th>Dhuhur</th>
                                        <th>Ashar</th>
                                        <th>Magrib</th>
                                        <th>Isya</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(time, key) in listTimes" :key="key" :class="time.isToday && 'table-active'">
                                        <td>{{ time.day }}</td>
                                        <td>{{ time.imsak }}</td>
                                        <td>{{ time.fajr }}</td>
                                        <td>{{ time.dhuhr }}</td>
                                        <td>{{ time.asr }}</td>
                                        <td>{{ time.maghrib }}</td>
                                        <td>{{ time.isha }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-md-4 col-sm-12">
                            <navigation :today="today"></navigation>
                        </div>
                    </div>
                </div>
			</article>
		</section>
        <footer class="footer">
            Made with &hearts; in Kretek, Bantul Regency
        </footer>
	</div>
</template>


<script>
import provinces from '../database/provinces.json'
import hijri from 'hijri'
import _ from 'lodash';

const hijriToday = hijri.convert(new Date, 0);
const coordinate = {
    lat: -7.797220,
    lon: 110.368790,
    timezone: 7
}


export default {
    name: 'app',
    data: () => ({
        cities: _.map(provinces, data => ({
            name: data.province_name,
            value: data.province_name_en,
            latidude: data.province_lat,
            longitude: data.province_lon,
            timezone: data.timezone
        })),
        today: {},
        selected: {
            city: {
                name: 'DI Yogyakarta'
            }
        },
        listTimes: [],
    }),
    watch: {
        ['selected.city'](val){
            window.prayTimes.setMethod('Makkah');
            let coordinate = {
                lat: val.latidude,
                lon: val.longitude,
                timezone: val.timezone
            }

            this.createList(coordinate);
            this.selected.city = val;
            this.today = window.prayTimes.getTimes(new Date(), [coordinate.lat, coordinate.lon], coordinate.timezone);
        }
    },
    methods:{
        createList({lat, lon, timezone}){
            let el = [];
            let date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
            let endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
            while(date <= endDate) {
                let times = window.prayTimes.getTimes(date, [lat, lon], timezone);
                times.day = date.getDate()
                let today = new Date();
                el.push({...times,
                    day: date.getDate(),
                    isToday: (date.getMonth() == today.getMonth()) && (date.getDate() == today.getDate())
                })
                date.setDate(date.getDate()+ 1)
            }
            this.listTimes = el;
        },
    },
    mounted(){
        console.log(window.prayTimes);
        this.createList(coordinate)
        this.today = window.prayTimes.getTimes(new Date(), [coordinate.lat, coordinate.lon], coordinate.timezone);
    }
}
</script>

<!-- CSS libraries -->
<style src="normalize.css/normalize.css"></style>
<style src="bootstrap/dist/css/bootstrap.css"></style>
<style src="open-iconic/font/css/open-iconic-foundation.css"></style>



<!-- Global CSS -->
<style>
@import url('https://fonts.googleapis.com/css?family=Shadows+Into+Light+Two|Archivo+Narrow|Cairo');

body, html {
	height: 100%;
	margin: 0;
	padding: 0; 
	background: #f8f8f8;
    font-family: 'Cairo', sans-serif;
}

header.header {
	color: white;
	font-size: 84px; 
	position: relative;
	font-family: 'Shadows Into Light Two', cursive;
}
header.header .header__background {
    background-image: url("../images/background.jpg");
    background-color: #7e9c7f;
    background-blend-mode: multiply;
    height: 450px;
    display: flex;
    justify-content: center;
    align-items: center; 
}
section.content {
    position: relative;
}
.content__title {
    position: absolute;
    left: 10%;
    width: calc(100% - 20%);
    z-index: 12;
    top: -40px;
    display: flex;
    text-align: center;
    height: 50px;
    align-items: center;
    justify-content: center;
    font-size: 25px;
}
.content__body {
    /* margin-top: 50px; */
    padding: 40px;
}
.header__background:after {
    content: " ";
    display: block;
    background: #f8f8f8;
    height: 40px;
    width: calc(100% - 20%);
    position: absolute;
    bottom: 0;
    border-radius: 10px 10px 0 0;
}
.img--parallax {
	background-attachment: fixed;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
}
nav.topnav {
    display: flex;
    align-items: center;
    background: #3e3c42;
    color: white;
    position: fixed;
    width: 100%;
    z-index: 5;
    height: 50px;
    text-align: center;
}
.logo {
    width: 200px;
    text-align: center;
}
.footer {
    text-align: center;
    padding: 20px;
}
</style>

<style scoped>
.top-title, .title {
    text-align: center;
}
.top-title {
    flex:1;
    font-size: 23px;
}
.title {
    width: 35vw;    
    font-size: 0.3em;
    /* font-family: '' */
}
.button__action button {
    margin: 2px;
}
</style>
