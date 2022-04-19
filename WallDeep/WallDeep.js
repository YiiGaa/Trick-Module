/********************
    @Describe: WallDeep v1.0
    @Param: param = [*]
    @Return: null
    @BeCareful:
********************/ 
/*@@@@@@control-start@@@@@@*/

function ControlWallDeep(params) {
    var ModuleId = {
        "bodyId":"#id_WallDeep_body"
    }
    var Config = {
    }

    var VueObject_Body;
    this.initialize = function(){
        try {
            VueObject_Body = new Vue({
                el:ModuleId["bodyId"],
                data:{
                    Vue_WallDeep_Title:params["title"],
                    Vue_WallDeep_List:params["list"]
                },
                methods:{
                }
            });
        } catch (e) {
            console.log("WallDeep exception.");
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
            VueObject_Body.Vue_WallDeep_Title = data["title"]
        }

        if(data["list"]){
            VueObject_Body.Vue_WallDeep_List = data["list"]
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

var WallDeep;
var ControlInit = function(){
    var WallDeepInfo = {
        "title":"大标题",                
        "list":[                                                                                    //如果初始化时，无数据，可以使用空值 "list":[]
            {"img":"./test/logo.png", "title":"内容", "info":"内容内容"},
            {"img":"./test/logo.png", "title":"内容", "info":"<p>第一行</p><p>第二行</p>"},            //详细内容info是允许写html元素的
            {"img":"./test/logo.png", "title":"内容", "info":"内容内容"}
        ]
    };
    WallDeep = new ControlWallDeep(WallDeepInfo);
    WallDeep.initialize();                                                                           //调用初始化方法

    setTimeout(function(){                                                                           //定时器只是为了模拟接口请求等场景的延迟
        var WallDeepUpdate = {
            "title":"大标题2",                                                                        //更新大标题，如果不需要，则不设置title
            "list":[                                                                                 //更新内容，如果不需要，则不设置list
                {"img":"./test/logo.png", "title":"内容4", "info":"<p>第一行</p><p>第二行</p>"},
                {"img":"./test/logo.png", "title":"内容5", "info":"详细内容"},
                {"img":"./test/logo.png", "title":"内容6", "info":"内容内容"}
            ]
        };
        WallDeep.UpdateNew(WallDeepUpdate);                                                          //调用更新方法
    }, 3000 )
}
