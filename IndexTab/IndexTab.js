/********************
    @Describe: IndexTab v1.0
    @Param: param = [*]
    @Return: null
    @BeCareful:
********************/ 
/*@@@@@@control-start@@@@@@*/

function ControlIndexTab(params) {
    var ModuleId = {
        "bodyId":"#id_IndexTab_body"
    }
    var Config = {
        "selectCallBackFunction":params["selectCallBackFunction"]
    }

    var VueObject_Body;
    this.initialize = function(){
        try {
            VueObject_Body = new Vue({
                el:ModuleId["bodyId"],
                data:{
                    Vue_IndexTab_index:params["index"],
                    Vue_IndexTab_active:params["active"]
                },
                methods:{
                    Vue_IndexTab_MenuFunction: function(data) {
                        this.Vue_IndexTab_active = data.title;
                        NotifyCallBackFunction("selectCallBackFunction", data)
                    },
                    Vue_IndexTab_leftFunction:function(data){
                        var width = $(".IndexTab_LeftBodyMini_body").width();
                        var scroll = $(".IndexTab_LeftBodyMini_body").scrollLeft();
                        $(".IndexTab_LeftBodyMini_body").animate({scrollLeft: scroll-width/2+'px'}, 300);
                    },
                    Vue_IndexTab_rightFunction:function(data){
                        var width = $(".IndexTab_LeftBodyMini_body").width();
                        var scroll = $(".IndexTab_LeftBodyMini_body").scrollLeft();
                        $(".IndexTab_LeftBodyMini_body").animate({scrollLeft: scroll+width/2+'px'}, 300);
                    }
                }
            });
        } catch (e) {
            console.log("IndexTab exception.");
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
        if(data["active"]){
            VueObject_Body.Vue_IndexTab_active = data["active"]
        }
        if(data["index"]){
            VueObject_Body.Vue_IndexTab_index = data["index"]
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

var IndexTab;
var ControlInit = function(){
    var IndexTabInfo = {
        "active":"标题1",                                        //选中tab的title，与下面index中的title对应                                     
        "index":[                                               //tab目录，如果初始化时，无数据，可以使用空值 "index":[]
            {"title":"标题1", "link":"#"},                       //link，a标签跳转
            {"title":"标题2", "link":"#"},
            {"title":"标题3", "link":"#"}
        ],
        "selectCallBackFunction":testfunction,                  //选中回调函数，可缺省，如果需要用，需要把上面目录的link去掉
    };
    IndexTab = new ControlIndexTab(IndexTabInfo);
    IndexTab.initialize();                                      //调用初始化方法

    setTimeout(function(){                                      //定时器只是为了模拟接口请求等场景的延迟
        var IndexTabUpdate = {
            "active":"新标题2",                                  //更新选中标题，如果不需要，则不设置active
            "index":[                                           //更新tab目录，如果不需要，则不设置index
                {"title":"新标题1", "link":"#"},
                {"title":"新标题2", "link":"#"},
                {"title":"新标题3", "link":"#"}
            ],
        }
        IndexTab.UpdateNew(IndexTabUpdate);                     //调用更新方法（直接替换数据）
    }, 3000 )
}
