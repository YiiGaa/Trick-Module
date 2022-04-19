/********************
    @Describe: ListRolling v1.0
    @Param: param = [*]
    @Return: null
    @BeCareful:
********************/ 
/*@@@@@@control-start@@@@@@*/

function ControlListRolling(params) {
    var ModuleId = {
        "bodyId":"#id_ListRolling_body"
    }
    var Config = {
        "indexCallBackFunction":params["indexCallBackFunction"],
        "listCallBackFunction":params["listCallBackFunction"],
        "listLength":params["index"].length,
        "timer":params["timer"]?params["timer"]:0
    }

    var VueObject_Body;
    this.initialize = function(){
        try {
            VueObject_Body = new Vue({
                el:ModuleId["bodyId"],
                data:{
                    Vue_ListRolling_logo:params["logo"],
                    Vue_ListRolling_button:params["button"],
                    Vue_ListRolling_index:params["index"],
                    Vue_ListRolling_moreLink:params["index"][0]?params["index"][0]["link"]:"",
                    Vue_ListRolling_active:0,
                    Vue_ListRolling_key:params["index"][0]?params["index"][0]["id"]:"",
                    Vue_ListRolling_list:params["list"]
                },
                methods:{
                    Vue_ListRolling_MenuFunction: function(data, index) {
                        this.Vue_ListRolling_active = index;
                        this.Vue_ListRolling_key = this.Vue_ListRolling_index[index]["id"];
                        this.Vue_ListRolling_moreLink = this.Vue_ListRolling_index[index]["link"]
                    },
                    Vue_ListRolling_StartTimerFunction: function (data) {
                        StartTimer()
                    },
                    Vue_ListRolling_StopTimerFunction: function (data) {
                        StopTimer()
                    },
                    Vue_ListRolling_indexSelectFunction: function (data) {
                        NotifyCallBackFunction("indexCallBackFunction", data)
                    },
                    Vue_ListRolling_listSelectFunction: function (data) {
                        NotifyCallBackFunction("listCallBackFunction", data)
                    },
                    Vue_ListRolling_leftFunction:function(data){
                        //var max = document.getElementById('id_GiftList_MenuBody').scrollWidth
                        var width = $(".ListRolling_LeftBodyMini_body").width();
                        var scroll = $(".ListRolling_LeftBodyMini_body").scrollLeft();
                        $(".ListRolling_LeftBodyMini_body").animate({scrollLeft: scroll-width/2+'px'}, 300);
                    },
                    Vue_ListRolling_rightFunction:function(data){
                        var width = $(".ListRolling_LeftBodyMini_body").width();
                        var scroll = $(".ListRolling_LeftBodyMini_body").scrollLeft();
                        $(".ListRolling_LeftBodyMini_body").animate({scrollLeft: scroll+width/2+'px'}, 300);
                    }
                }
            });
            VueObject_Body.$nextTick(function(){
                StartTimer()
            });
        } catch (e) {
            console.log("ListRolling exception.");
            console.log(e);
        }
    };

    var NotifyCallBackFunction = function(key, data) {
        var notify = Config[key]
        if (notify) {
            notify(data)
        }
    }

    var timer;
    var StartTimer = function(data){
        if(Config["timer"] == 0){
            return;
        }
        timer = setInterval(function(){
            if(Config["listLength"] <= VueObject_Body.Vue_ListRolling_active+1){
                VueObject_Body.Vue_ListRolling_active = 0;
            }else{
                VueObject_Body.Vue_ListRolling_active = VueObject_Body.Vue_ListRolling_active+1;
            }
            VueObject_Body.Vue_ListRolling_moreLink = VueObject_Body.Vue_ListRolling_index[VueObject_Body.Vue_ListRolling_active]["link"],
            VueObject_Body.Vue_ListRolling_key = VueObject_Body.Vue_ListRolling_index[VueObject_Body.Vue_ListRolling_active]["id"];
        },Config["timer"]);
    }

    var StopTimer = function(data){
        if(Config["timer"] == 0){
            return;
        }
        clearInterval(timer)
    }

    this.UpdateNew = function(data){
        if(data["index"]){
            VueObject_Body.Vue_ListRolling_index = data["index"];
        }
        if(data["list"]){
            VueObject_Body.Vue_ListRolling_list = data["list"];
        }

        if(VueObject_Body.Vue_ListRolling_moreLink==""){
            VueObject_Body.Vue_ListRolling_moreLink = VueObject_Body.Vue_ListRolling_index[0]["link"]
        }
        if(VueObject_Body.Vue_ListRolling_key==""){
            VueObject_Body.Vue_ListRolling_key = VueObject_Body.Vue_ListRolling_index[0]["id"]
        }
        Config["listLength"] = VueObject_Body.Vue_ListRolling_index.length;
    }

    this.UpdatePush = function(data){
        if(data["index"]){
            var tempVue_ListRolling_index = VueObject_Body.Vue_ListRolling_index;
            var tempIndex = data["index"];
            if(!tempVue_ListRolling_index){
                tempVue_ListRolling_index = [];
            }
            for(var i=0; i<tempIndex.length; i++){
                tempVue_ListRolling_index.push(tempIndex[i]);
            }
            VueObject_Body.Vue_ListRolling_index = tempVue_ListRolling_index;
        }
        if(data["list"]){
            var tempVue_ListRolling_list = VueObject_Body.Vue_ListRolling_list;
            var tempIndex = data["list"];
            if(!tempVue_ListRolling_list){
                tempVue_ListRolling_list = {}
            }
            if(!tempIndex["index"]){
                tempIndex["index"] = [];
            }
            for(var key in tempIndex){
                tempVue_ListRolling_list[key] = tempIndex[key]
            }
            VueObject_Body.Vue_ListRolling_list = tempVue_ListRolling_list;
        }

        if(VueObject_Body.Vue_ListRolling_moreLink==""){
            VueObject_Body.Vue_ListRolling_moreLink = VueObject_Body.Vue_ListRolling_index[0]["link"]
        }
        if(VueObject_Body.Vue_ListRolling_key==""){
            VueObject_Body.Vue_ListRolling_key = VueObject_Body.Vue_ListRolling_index[0]["id"]
        }
        Config["listLength"] = VueObject_Body.Vue_ListRolling_index.length;
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

var ListRolling;
var ControlInit = function(){
    var ListRollingInfo = {
        "logo":"./test/logo.png",                                                    //左边logo
        "button":"查看更多",                                                          //左边按钮文字
        "timer":10000,                                                               //自动切换时间，毫秒，不需要自动切换可设置为0，鼠标停留在列表时不会自动切换
        "index":[                                                                    //定义菜单，如果初始化时，无数据，可以使用空值 "index":[]
            {"id":"1-1", "title":"标签1-2", "link":"https://stoprefactoring.com"},    //id作为下面list具体内容的关联，id只要保证唯一即可
            {"id":"1-2", "title":"标签1-2", "link":"https://stoprefactoring.com"},    //link为查看更多的跳转路径，a标签跳转
        ],
        "list":{                                                                     //定义列表数据，如果初始化时，无数据，可以使用空值 "list":[]
            "1-1":[                                                                  //与上面index中的id关联，如果初始化时，无数据，可以使用空值 "xx":[]，或直接不设置
                {"img":"./test/logo.svg", "title":"标题1", "link":"https://stoprefactoring.com", "text":"text1","info":"info1", "data":"2020 12.07"},
                {"img":"./test/logo.svg", "title":"标题2", "link":"https://stoprefactoring.com", "text":"Some quick example text to build on the card title and make up the bulk of the card's content.","info":"Some quick example text to build on the card title and make up the bulk of the card's content.", "data":"2020 12.07"}
            ],
            "1-2":[
                {"img":"./test/logo.svg", "title":"标题3", "link":"https://stoprefactoring.com", "text":"text3", "info":"info3","data":"2020 12.07"}
            ]
        },
        "indexCallBackFunction":testfunction,                                        //查看更多点击回调函数，可缺省，需要需要用，需要把上面菜单的link去掉
        "listCallBackFunction":testfunction,                                         //列表点击回调函数，可缺省，需要需要用，需要把上面列表的link去掉
    };
    ListRolling = new ControlListRolling(ListRollingInfo);
    ListRolling.initialize();                                                        //调用初始化方法

    setTimeout(function(){                                                               //定时器只是为了模拟接口请求等场景的延迟
        //替换数据
        var ListRollingUpdate = {
            "index":[                                                                    //直接替换index所有内容，如果不需要，则不设置index
                {"id":"1-1", "title":"新标签1-2", "link":"https://stoprefactoring.com"},
                {"id":"1-2", "title":"新标签1-2", "link":"https://stoprefactoring.com"},
            ],
            "list":{                                                                     //直接替换list所有内容，如果不需要，则不设置list
                "1-1":[                                                                  //与上面index中的id关联
                    {"img":"./test/logo.svg", "title":"新标题1", "link":"https://stoprefactoring.com", "text":"Some quick example text to build on the card title and make up the bulk of the card's content.","info":"Some quick example text to build on the card title and make up the bulk of the card's content.", "data":"2020 12.07"}
                ],
                "1-2":[
                    {"img":"./test/logo.svg", "title":"标题3", "link":"https://stoprefactoring.com", "text":"text3", "info":"info3","data":"2020 12.07"}
                ]
            },
        }
        ListRolling.UpdateNew(ListRollingUpdate);                                        //调用更新方法（直接替换数据）
    }, 3000 )

    setTimeout(function(){                                                               //定时器只是为了模拟接口请求等场景的延迟
        //追加数据
        var ListRollingPush = {
            "index":[                                                                    //追加index中的数据，如果不需要，则不设置index
                {"id":"3-1", "title":"新标签3-1", "link":"https://stoprefactoring.com"},  //追加内容，不覆盖
            ],
            "list":{                                                                     //直接替换list所有内容，如果不需要，则不设置list
                "1-1":[                                                                  //如果id存在，会替换内容
                    {"img":"./test/logo.svg", "title":"替换标题1", "link":"https://stoprefactoring.com", "text":"Some quick example text to build on the card title and make up the bulk of the card's content.","info":"Some quick example text to build on the card title and make up the bulk of the card's content.", "data":"2020 12.07"}
                ],
                "3-1":[                                                                  //如果id不存在，则会追加内容
                    {"img":"./test/logo.svg", "title":"追加标题1", "link":"https://stoprefactoring.com", "text":"text3", "info":"info3","data":"2020 12.07"}
                ]
            },
        }
        ListRolling.UpdatePush(ListRollingPush);                                         //调用追加方法（直接替换数据）
    }, 8000 )
}
