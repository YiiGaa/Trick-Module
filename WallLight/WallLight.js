/********************
    @Describe: WallLight v1.0
    @Param: param = [*]
    @Return: null
    @BeCareful:
********************/ 
/*@@@@@@control-start@@@@@@*/

function ControlWallLight(params) {
    var ModuleId = {
        "bodyId":"#id_WallLight_body"
    }
    var Config = {
        "colorList":["#42B396","#8F53E7","#472FC8"]
    }

    var VueObject_Body;
    this.initialize = function(){
        try {
            VueObject_Body = new Vue({
                el:ModuleId["bodyId"],
                data:{
                    Vue_WallLight_Title:params["title"],
                    Vue_WallLight_List:params["list"],
                },
                methods:{
                    Vue_WallLight_PieceDownFunction: function (data) {
                        if(data%3 == 1){
                            return true;
                        }
                        return false;
                    },
                    Vue_WallLight_ColorFunction: function (data) {
                        var length = Config["colorList"].length
                        return Config["colorList"][data%length]
                    }
                }
            });
        } catch (e) {
            console.log("WallLight exception.");
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
        if(data["title"]){
            VueObject_Body.Vue_WallLight_Title = data["title"]
        }

        if(data["list"]){
            VueObject_Body.Vue_WallLight_List = data["list"]
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

var WallLight;
var ControlInit = function(){
    var WallLightInfo = {
        "title":"大标题",                                              //大标题
        "list":[                                                      //如果初始化时，无数据，可以使用空值 "list":[]
            {"title":"内容1", "info":"详细内容"},
            {"title":"内容2", "info":"<p>第一行</p><p>第二行</p>"},      //详细内容info是允许写html元素的
            {"title":"内容3", "info":"内容内容"}
        ]
    };
    WallLight = new ControlWallLight(WallLightInfo);
    WallLight.initialize();                                           //调用初始化方法

    setTimeout(function(){                                            //定时器只是为了模拟接口请求等场景的延迟
        var WallLightUpdate = {
            "title":"大标题2",                                         //更新大标题，如果不需要，则不设置title
            "list":[                                                  //更新内容，如果不需要，则不设置list
                {"title":"内容4", "info":"详细内容"},
                {"title":"内容5", "info":"<p>第一行</p><p>第二行</p>"},
                {"title":"内容6", "info":"内容内容"}
            ]
        };
        WallLight.UpdateNew(WallLightUpdate);                          //调用更新方法
    }, 3000 )
}
