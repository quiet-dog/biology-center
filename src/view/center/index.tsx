import { reactive, } from "vue";

export function useAllCity() {
    const beiJing = "https://" + location.hostname + ":7288/beijing/#/home"
    const wuhan = "https://" + location.hostname + ":7288/wuhan/#/home"
    const changChun = "https://" + location.hostname + ":7288/changchun/#/home"

    // const beiJingUrl = "https://" + location.hostname + ":7677"
    // const wuhanUrl = "https://" + location.hostname + ":27677"
    // const changChunUrl = "https://" + location.hostname + ":17677"
    const beiJingUrl = "/beijing"
    const wuhanUrl = "/wuhan"
    const changChunUrl = "/changchun"

    const leftConfig = reactive([
        {
            type: "中心侧数据汇总",
            Url: beiJingUrl,
            address: "北京",
            component: markRaw(defineAsyncComponent(() => import("../../components/ZhongXinCeShuJuHuiZong/index.vue"))),
            link: beiJing
        },
        {
            type: "细节处理",
            Url: beiJingUrl,
            address: "北京",
            component: markRaw(defineAsyncComponent(() => import("../../components/XiJie/index.vue"))),
            link: beiJing
        },
        {
            type: "细节处理",
            Url: wuhanUrl,
            address: "武汉",
            component: markRaw(defineAsyncComponent(() => import("../../components/XiJie/index.vue"))),
            link: wuhan
        },


    ])

    const rightConfig = reactive([
        {
            type: "细节处理",
            Url: changChunUrl,
            address: "长春",
            component: markRaw(defineAsyncComponent(() => import("../../components/XiJie/index.vue"))),
            link: changChun
        },
        {
            type: "人体生命数据数据",
            Url: wuhanUrl,
            address: "中国农业科学院哈尔滨兽医研究所",
            component: markRaw(defineAsyncComponent(() => import("../../components/RenTiXiJie/index.vue"))),
            link: wuhan
        },
        {
            type: "浓度数据",
            Url: wuhanUrl,
            address: "中国疾病预防控制中心",
            component: markRaw(defineAsyncComponent(() => import("../../components/NongDuXiJie/index.vue"))),
            link: wuhan
        },
        // {
        //     type: "阀门数据",
        //     Url: wuhanUrl,
        //     address: "建研院",
        //     component: markRaw(defineAsyncComponent(() => import("../../components/FaMenXiJie/index.vue"))),
        //     link: wuhan
        // },
    ])

    return {
        leftConfig,
        rightConfig
    }
}