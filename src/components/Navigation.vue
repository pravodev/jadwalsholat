<template>
    <div class="navigation">
        <h2 class="navigation__title">
            Hari ini
            <div class="float-right">{{ hijriDate }}</div>
        </h2>
        <div class="navigation__content pray__today">
            <table class="table table-striped table-sm">
                <tr>
                    <td>Imsak</td>
                    <td>:</td>
                    <td>{{ today.imsak }}</td>
                </tr>
                <tr>
                    <td>Shubuh</td>
                    <td>:</td>
                    <td>{{ today.fajr }}</td>
                </tr>
                <tr>
                    <td>Dhuhr</td>
                    <td>:</td>
                    <td>{{ today.dhuhr }}</td>
                </tr>
                <tr>
                    <td>Ashar</td>
                    <td>:</td>
                    <td>{{ today.asr }}</td>
                </tr>
                <tr>
                    <td>Magrib</td>
                    <td>:</td>
                    <td>{{ today.maghrib }}</td>
                </tr>
                <tr>
                    <td>Isya</td>
                    <td>:</td>
                    <td>{{ today.isha }}</td>
                </tr>
            </table>
        </div>
        <h2 class="navigation__title">Fanpage</h2>
        <div class="navigation__content">
            <div class="fb-page" data-href="https://www.facebook.com/pondokitcom/" data-tabs="timeline" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/pondokitcom/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/pondokitcom/">Pondok IT</a></blockquote></div>
        </div>
    </div>
</template>

<script>
import hijri from 'hijri';
const hijriToday = hijri.convert(new Date, 0);

export default {
    props: ['today'],
    data: () => ({
        hijriDate: hijriToday.year + ' - ' + hijriToday.dayOfMonth + ' -  ' + hijriToday.monthText        
    }),
    created(){
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0&appId=1717383648589097&autoLogAppEvents=1';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    },
}
</script>


<style lang="scss" scoped>
.navigation {
    background: white;
    box-shadow: 1px 1px 4px #00000038;
}
h2.navigation__title {
    font-size: 27px;
    padding: 8px 12px;
    margin: 0;
    border-bottom: 1px solid #ececec;
}
.navigation__content {
    padding: 15px;
}
</style>

