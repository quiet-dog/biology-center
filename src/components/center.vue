<template>
  <div class="bigscreen_ct_box">
    <div class="bigscreen_ct">
      <JinRiBaoJing />
    </div>
    <div class="bigscreen_cb">
      <img class="bigscreen_ditu_nei" :src="diTu2" alt="" srcset="">

      <template v-for="item in address">
        <div class="address_img" :style="{ left: item.left, top: item.top }" @click="handleLink(item.link)">
          <el-popover v-model:visible="vi" :popper-style="{
            '--el-text-color-primary': '#031B32',
            width: 'auto'
          }" effect="dark" placement="top-start" v-if="item.labels.length > 1">
            <template #reference>
              <el-badge :value="item.total">
                <img style="cursor: pointer;" :src="item.img" alt="" srcset="" />
              </el-badge>
            </template>
            <div>
              <template v-for="label in item.labels" :value="label.total">
                <el-badge v-if="label.show" :value="label.total">
                  <!-- <el-button type="primary" text> -->
                  <span class="text-style" @click="handleLink(label.link)" style="cursor: pointer;">{{ label.name
                  }}</span>
                  <!-- </el-button> -->
                </el-badge>
                <span v-else class="text-style" style="cursor: pointer;">
                  {{ label.name
                  }}
                </span>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </template>

            </div>
          </el-popover>
          <el-badge v-else :value="item.total">
            <img style="cursor: pointer;" :src="item.img" alt="" srcset="" />
          </el-badge>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import { geteventTotal } from "../api/home";
import { Close } from "@element-plus/icons-vue";
import img from "../../public/img/0.png";
import img1 from "../../public/img/1.png";
import img2 from "../../public/img/2.png";
import img3 from "../../public/img/3.png";
import img4 from "../../public/img/4.png";
import img5 from "../../public/img/5.png";
import img6 from "../../public/img/6.png";
import img7 from "../../public/img/7.png";
import img8 from "../../public/img/8.png";
import img9 from "../../public/img/9.png";
import TuOne from "./tuone/index.vue";
import TuTwo from "./tutwo/index.vue";
import TuThree from "./tuthree/index.vue";
import TuFour from "./tufour/index.vue";
import { ElButton, ElTabs } from "element-plus";
import { useDeviceStore } from "./device";
import { useIntervalFn } from '@vueuse/core'
import diTu from "../assets/map.png";
import diTu2 from "../assets/map2.png";
import JiaoBiao from "../layout/img/Group 1321315001.png";
import JinRiBaoJing from "./JinRiBaoJing/index.vue";
const vi = ref(true)

const designWidth = 992;
const designHeight = 865;

function adaptiveWidth(px: number) {
  return `${(px / designWidth) * 100}px`;
}

function adaptiveHeight(px: number) {
  return `${(px / designHeight) * 100}px`;
}


const address = ref([{
  left: adaptiveWidth(6010),
  top: adaptiveHeight(3000),
  img: JiaoBiao,
  title: "武汉",
  link: "https://" + location.hostname + ":27677/#/home",
  total: 0,
  labels: [{
    name: "武汉",
    url: "https://" + location.hostname + ":27677/api/manage/event/getTodayAlarmCount",
    total: 0,
    link: "https://" + location.hostname + ":27677/#/home",
    show: true
  }, {
    name: "哈兽研",
    url: "https://" + location.hostname + ":27677/api/manage/swAlarm/getJinRiAlarmNum",
    total: 0,
    link: "https://" + location.hostname + ":27677/#/ketisan",
    show: true
  }, {
    name: "中疾控",
    url: "https://" + location.hostname + ":27677/api/manage/swAlarm/jinRiBaoJingNum",
    total: 0,
    link: "https://" + location.hostname + ":27677/#/ketisi",
    show: true
  }, {
    name: "建研院",
    url: "https://" + location.hostname + ":27677/api/manage/swAlarm/jinRiBaoJingNum",
    total: 0,
    link: "https://" + location.hostname + ":27677/#/ketisi",
    show: false
  }]
}, {
  left: adaptiveWidth(6600),
  top: adaptiveHeight(1675),
  img: JiaoBiao,
  title: "北京",
  total: 0,
  link: "https://" + location.hostname + ":7677",
  labels: [{
    name: "北京",
    url: "https://" + location.hostname + ":7677/api/manage/event/getTodayAlarmCount",
    total: 0,
    link: "https://" + location.hostname + ":7677",
    show: true
  }]
}, {
  left: adaptiveWidth(8000),
  top: adaptiveHeight(1100),
  img: JiaoBiao,
  title: "长春",
  link: "https://" + location.hostname + ":17677",
  labels: [{
    name: "长春",
    url: "https://" + location.hostname + ":17677/api/manage/event/getTodayAlarmCount",
    total: 0,
    link: "https://" + location.hostname + ":17677",
    show: true
  }],
  total: 0,
}])

const getAllEventTimer = useIntervalFn(() => {
  getAllEventTimer.pause()
  address.value.forEach(async (item) => {
    let num = 0;
    for (const label of item.labels) {
      const res = await axios.get(label.url, {
        timeout: 5000,
        headers: { Authorization: "Bearer MASTER_TOKEN_123456" }
      })
      if (res.data?.data?.num) {
        num += res.data.data.num
      }
    }
    console.log("res.data.data.num", num)
    item.total = num
  })
}, 5000, {
  immediate: true
})

function handleLink(link: string) {
  // window.open(link, "_blank")
  const timestampMs = Date.now();
  window.open(link + "?timenow=" + timestampMs, "_blank")
}

const count1 = ref(0);
const count2 = ref(0);

const diTuDiv = computed(() => {
  return "bigscreen_ditu_nei"
})

// const activeName = ref("一层");


const geteventTotalFun = async () => {
  const { data } = await geteventTotal();
  count1.value = data.data.todayTotal;
  count2.value = data.data.allTotal;
};

const closeDevice = () => {
  useDeviceStore().isShowDetail = false;
  useDeviceStore().initPopover();
}

function shuimg(val: string): string {
  const imgMap: Record<string, string> = {
    "0": img,
    "1": img1,
    "2": img2,
    "3": img3,
    "4": img4,
    "5": img5,
    "6": img6,
    "7": img7,
    "8": img8,
    "9": img9,
  };
  return imgMap[val] || ""; // 如果值不存在，则返回空字符串
}

const { pause, resume, isActive } = useIntervalFn(() => {
  geteventTotalFun();
}, 5000)
onMounted(() => {
  geteventTotalFun();
});
onUnmounted(() => {
  pause()
  useDeviceStore().initPopover();
})
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

.bigscreen_ct_box {
  position: relative;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}

#my-tabs :deep(> div.el-tabs__header.is-top > div > div) {
  background-color: white;
}

#my-tabs {
  background-color: white;
  padding-left: 20px;
}

.bigscreen_ct {
  width: adaptiveWidth(840);
  height: adaptiveHeight(30);
  position: absolute;
  top: adaptiveHeight(132);
  left: 50%;
  margin-left: adaptiveWidth(-420);
  display: flex;
  justify-content: space-between;

  .bigscreen_ct_l {
    width: adaptiveWidth(208);
    height: 100%;

    span {
      color: rgba(242, 242, 242, 1);
      font-size: adaptiveFontSize(24);
    }

    .bigscreen_ct_lb {
      width: 100%;
      height: adaptiveHeight(72);
      margin-top: adaptiveHeight(12);
      display: flex;

      // justify-content: space-between;
      div {
        &:nth-child(1) {
          margin-left: 0;
        }

        width: adaptiveWidth(63);
        height: adaptiveHeight(72);
        margin-left: adaptiveWidth(12);
        background: url("/public/img/数字背景.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .bigscreen_ct_r {
    width: adaptiveWidth(353);
    height: 100%;

    span {
      color: rgba(242, 242, 242, 1);
      font-size: adaptiveFontSize(24);
    }

    .bigscreen_ct_rb {
      width: 100%;
      height: adaptiveHeight(72);
      margin-top: adaptiveHeight(12);
      display: flex;

      // justify-content: space-between;
      div {
        &:nth-child(1) {
          margin-left: 0;
        }

        width: adaptiveWidth(63);
        height: adaptiveHeight(72);
        margin-left: adaptiveWidth(12);
        background: url("/public/img/数字背景.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}

.bigscreen_cb {
  width: 992px;
  height: 865px;
  // height: adaptiveHeight(865);
  // background: url("/public/img/网格背景.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  bottom: 0;
  // left: 50%;
  // margin-left: adaptiveWidth(-498);
  display: flex;
  align-items: center;
  justify-content: center;

  .bigscreen_cb_nei {
    width: 100%;
    height: 100%;
    background: url("/public/img/主体图片.png") no-repeat;
    background-size: 100% 100%;
  }


  .bigscreen_ditu_nei {
    position: absolute;
    left: 0;
    top: 0;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    // width: adaptiveWidth(840);
    // height: adaptiveHeight(642);
    // background: url("/public/img/主体图片.png") no-repeat;
    // background: url("../assets/map.png") no-repeat;
    // background-size: 100% 100%;
  }

  .bigscreen_cb_dialog {
    position: absolute;
    width: adaptiveWidth(850);
    height: adaptiveHeight(600);
    // border: 1px solid red;
    overflow: scroll;
    overflow-x: scroll;
  }
}

.address_img {
  position: absolute;
}

.address_img:deep(.el-popover) {
  width: auto !important;
}
</style>
