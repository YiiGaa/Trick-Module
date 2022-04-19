/********************
    @Describe: Carousel v1.0
    @Param: param = [*]
    @Return: null
    @BeCareful:
********************/ 
/*@@@@@@control-start@@@@@@*/

function ControlCarousel(params) {
    var ModuleId = {
        "bodyId":"#id_Carousel_body",
        "carouselId":"#id_Carousel_carousel"
    }
    var Config = {
    }

    var VueObject_Body;
    this.initialize = function(){
        try {
            VueObject_Body = new Vue({
                el:ModuleId["bodyId"],
                data:{
                    Vue_Carousel_interval:params["interval"],
                    Vue_Carousel_isHideButton:params["isHideButton"],
                    Vue_Carousel_isHideIndicator:params["isHideIndicator"],
                    Vue_Carousel_list:params["list"]
                },
                methods:{
                }
            });
            VueObject_Body.$nextTick(()=>{
                new bootstrap.Carousel(document.querySelector(ModuleId["carouselId"]))
            });

        } catch (e) {
            console.log("Carousel exception.");
            console.log(e);
        }

    };

    var NotifyCallBackFunction = function(key, data) {
        var notify = Config[key]
        if (notify) {
            notify(data)
        }
    }

    this.UpdateNew = function(data){
        if(data["list"]){
            VueObject_Body.Vue_Carousel_list = data["list"];
        }
    }
}

/*@@@@@@control-end@@@@@@*/

/**Loading Common Lib**/
var ControlLoad = function(){
    lib_Load('../../Common/Lib/', ControlInit);
}

/**The following code is the test code**/
var testfunction = function(data){
    console.log(data)
}

var Carousel;
var ControlInit = function(){
    var CarouselInfo = {
        "interval":"5000",                                                       //自动切换毫秒数
        "isHideButton":false,                                                    //是否隐藏左右切换按钮
        "isHideIndicator":false,                                                 //是否隐藏底部切换按钮
        "list":[                                                                 //如果初始化时没有图片，则可使用空值 "list":[]
            {"src":"./test/adv1.png", "link":"https://stoprefactoring.com"},     //图片路径，跳转链接
            {"src":"./test/adv2.png", "link":""}                                 //图片的字写在图片里
        ]
    };
    Carousel = new ControlCarousel(CarouselInfo);
    Carousel.initialize();                                                       //调用初始化方法

    setTimeout(function(){                                                       //定时器只是为了模拟接口请求等场景的延迟
        //替换轮播图
        var CarouselUpdate = {
            "list":[                                                             //更换图片的信息
                {"src":"./test/adv2.png", "link":"https://stoprefactoring.com"},
                {"src":"./test/adv3.png", "link":""},
                {"src":"./test/adv1.png", "link":""}
            ]
        }
        Carousel.UpdateNew(CarouselUpdate);                                      //调用更新方法
    }, 3000 )
}
