<template>
    <div class="container">
        <Swiper :modules="[Autoplay]" :slides-per-view="3" :loop="true"
            :autoplay="{ delay: 5000, disableOnInteraction: false }">
            <SwiperSlide v-for="item in dataSource">
                <div class="content text-style">
                    今日{{ item.address }}报警数量: <span class="alarm-style">{{ item.num }}</span>
                </div>
            </SwiperSlide>
        </Swiper>
    </div>
</template>
<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import { useIntervalFn } from '@vueuse/core';
const dataSource = ref([
    {
        address: "北京",
        num: 0,
        url: "https://" + location.hostname + ":7677"+ "/api/manage/event/getTodayAlarmCount"
    },
    {
        address: "长春",
        num: 0,
        url: "https://" + location.hostname + ":17677"+ "/api/manage/event/getTodayAlarmCount"
    },
    {
        address: "武汉",
        num: 0,
        url: "https://" + location.hostname + ":27677"+ "/api/manage/event/getTodayAlarmCount"
    },
    {
        address: "哈兽研",
        num: 0,
        url: "https://" + location.hostname + ":27677"+"/api/manage/smAlarm/getJinRiAlarmNum"
    }
])

const getDataTimer = useIntervalFn(() => {
    getDataTimer.pause()
    dataSource.value.forEach(async (item) => {
        const res = await axios.get(item.url, {
            headers: {
                "Authorization": `Bearer MASTER_TOKEN_123456`
            },
            timeout: 2000
        })
        item.num = res.data.data.num;
    })
}, 2000)

</script>
<style lang="scss" scoped>
$design-width: 1920;
$design-height: 1080;

@function adaptiveWidth($px) {
    @return #{$px / $design-width * 100}vw;
}

@function adaptiveHeight($px) {
    @return #{$px / $design-height * 100}vh;
}

@function adaptiveFontSize($px) {
    @return #{$px / $design-width * 100}vw;
}

.container {
    width: 100%;
    height: 100%;
}

.content {
    height: 100%;
    width: 100%;
    color: white;
}


.text-style {
    font-family: "youshe";
    font-size: adaptiveFontSize(20);
    /* 上下渐变文字 */
    background: linear-gradient(to bottom, #ffffff, #006fd0);
    /* 上红下蓝，可换颜色 */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
    display: inline-block;
}

.alarm-style {
    background: linear-gradient(to bottom, #ffffff,rgb(255, 0, 0));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
    display: inline-block;
}
</style>
