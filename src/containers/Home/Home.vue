<template>
    <article>
        <dtitle :title="'Jadwal Sholat untuk ' + selected.city.name + ' dan sekitarnya'"/>        
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
                        <button class="btn btn-primary"  @click="() => changeDate('decrement')">Sebelumnya</button>
                        <div class="button__right float-right">
                            <div class="btn-group" role="group">
                                <button class="btn btn-primary" @click="() => changeDate('increment')">Selanjutnya {{ nextDate }}</button>
                                <button class="btn btn-secondary" @click="printPage">
                                    <icon name="fi-print"/> Cetak
                                </button>
                            </div>
                        </div>
                    </div>
                    <table class="table table-responsive-sm" id="print__container">
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
                    <navigation :today="today" :date="date"></navigation>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
import provinces from '../../database/provinces.json'
import hijri from 'hijri'
import _ from 'lodash';
import printJS from 'print-js';

const hijriToday = hijri.convert(new Date, 0);
const coordinate = {
    lat: -7.797220,
    lon: 110.368790,
    timezone: 7
}

// console.log('printContent: ', printContent);

export default {
    name: 'home',
    data: () => ({
        cities: _.map(provinces, data => ({
            name: data.province_name,
            value: data.province_name_en,
            latidude: data.province_lat,
            longitude: data.province_lon,
            timezone: data.timezone
        })),
        coordinate,
        selected: {
            city: {
                name: 'DI Yogyakarta'
            }
        },
        date: new Date()
    }),
    watch: {
        ['selected.city'](val){
            window.prayTimes.setMethod('Makkah');
        
            this.coordinate = {
                lat: val.latidude,
                lon: val.longitude,
                timezone: val.timezone
            }

            this.selected.city = val;
        }
    },
    computed:{
        listTimes: function(){
            return this.createList(this.coordinate)
        },
        today: function(){
            const { lat, lon, timezone } = this.coordinate;
            return window.prayTimes.getTimes(new Date(), [ lat, lon ], timezone)
        },
        nextDate(){
            const date = this.date;
            let tomorrow = new Date(new Date().setDate(date.getDate() + 1))
            return this.formatDate(tomorrow);
        },
        previousDate(){
            const date = this.date;
            let yesterday = new Date(date.setDate(date.getDate() - 1))
            return this.formatDate(yesterday);
        },
    },
    methods:{
        formatDate(date){
            return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
        },
        changeDate(key){
            console.log('key: ', key);
            let date = this.date.getDate() + 1;
            if(key === 'decrement'){
                date = this.date.getDate() - 1;            
            }
            // this.date.setDate(
            this.date = new Date(this.date.setDate(date));
        },
        createList({lat, lon, timezone}){
            let el = [];
            let date = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
            let endDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);

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
            return el;
        },
        printPage(){
            printJS({
                printable: 'print__container',
                type: 'html',
                header: 'Jadwal Sholat Untuk daerah ' + this.selected.city.name,
                headerStyle: 'text-align:center',
            })
        }
    },
    updated(){
        this.$nextTick(function(){
            console.log('updated', this.date);
        })
    }
}
</script>

<style lang="scss" scoped>
.button__action button {
    margin: 2px;
}
</style>
