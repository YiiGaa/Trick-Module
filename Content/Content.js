/********************
    @Describe: Content structure
    @Param: param = [*]
    @Return: null
    @BeCareful:
********************/ 
/*@@@@@@control-start@@@@@@*/

function ControlContent(params) {
    var ModuleId = {
        "bodyId":"#id_Content_body"
    }
    var Config = {
    }

    var VueObject_Body;
    this.initialize = function(){
        try {
            VueObject_Body = new Vue({
                el:ModuleId["bodyId"],
                data:{
                    Vue_Content_Title:params["title"],
                    Vue_Content_Content:params["content"],
                    Vue_Content_Info:params["info"]
                },
                methods:{
                }
            });
        } catch (e) {
            console.log("Content exception.");
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
            VueObject_Body.Vue_Content_Title = data["title"]
        }

        if(data["info"]){
            VueObject_Body.Vue_Content_Info = data["info"]
        }

        if(data["content"]){
            VueObject_Body.Vue_Content_Content = data["content"]
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

var Content;
var ControlInit = function(){
    var ContentInfo = {
        "title":"标题",                                 //标题，如果初始化时无数据，可设置为空("")
        "info":"2022.01.01",                           //日期，如果初始化时无数据，可设置为空("")
        "content":"<p>测试内容</p>"                     //内容，支持html内容，如果初始化时无数据，可设置为空("")
    };
    Content = new ControlContent(ContentInfo);
    Content.initialize();                              //调用初始化方法

    var ContentUpdate = {
        "title":"标题",                                 //更新标题，如果不需要，则不设置title
        "info":"2022.01.01",                           //更新日期，如果不需要，则不设置info
        "content":"<p>测试内容</p>"                      //更新内容，如果不需要，则不设置content             
    }
    Content.UpdateNew(ContentUpdate);                   //调用更新方法
}
