/********************
    @Describe: IndexBlock v1.0
    @Param: param = [*]
    @Return: null
    @BeCareful:
********************/ 
/*@@@@@@control-start@@@@@@*/

function ControlIndexBlock(params) {
    var ModuleId = {
        "bodyId":"#id_IndexBlock_body"
    }
    var Config = {
        "selectCallBackFunction":params["selectCallBackFunction"]
    }

    var VueObject_Body;
    this.initialize = function(){
        try {
            var show = -1;
            var activeTitle = params["title"];
            var list = params["list"]
            for(var i=0;i<list.length;i++){
                var list_1 = list[i]['list']
                for(var j=0;j<list_1.length;j++){
                    if(list_1[j]["key"] == params["active"]){
                        activeTitle = list_1[j]["title"]
                        show = i;
                    };
                }
                if(show != -1){
                    break;
                }
            }

            VueObject_Body = new Vue({
                el:ModuleId["bodyId"],
                data:{
                    Vue_IndexBlock_ShowButton:show,
                    Vue_IndexBlock_Title:params["title"],
                    Vue_IndexBlock_List:params["list"],
                    Vue_IndexBlock_Active:params["active"],
                    Vue_IndexBlock_ActiveTitle:activeTitle,
                    Vue_IndexBlock_Show:false
                },
                methods:{
                    Vue_IndexBlock_ShowIndex: function (data) {
                        this.Vue_IndexBlock_Show = !this.Vue_IndexBlock_Show
                    },
                    Vue_IndexBlock_Select: function (data) {
                        this.Vue_IndexBlock_Active = data["key"]
                        this.Vue_IndexBlock_Show = false;
                        NotifyCallBackFunction("selectCallBackFunction", data);
                    }
                }
            });

            //phone
            if(screen.width<=768){
                document.addEventListener("click", function(){ 
                    VueObject_Body.Vue_IndexBlock_Show
                });
            }
        } catch (e) {
            console.log("IndexBlock exception.");
            console.log(e);
        }
    };

    var NotifyCallBackFunction = function(key, data) {
        var notify = Config[key]
        if (notify) {
            notify(data)
        }
    }

    var ShowActive = function(){
        var activeTitle = VueObject_Body.Vue_IndexBlock_Title;
        var list = VueObject_Body.Vue_IndexBlock_List
        for(var i=0;i<list.length;i++){
            var list_1 = list[i]['list']
            var isClose = true;
            for(var j=0;j<list_1.length;j++){
                if(list_1[j]["key"] == VueObject_Body.Vue_IndexBlock_Active){
                    VueObject_Body.Vue_IndexBlock_ShowButton = i;
                    activeTitle = list_1[j]["title"]
                    isClose = false;
                };
            }
            if(isClose == true){
                $("#id_IndexBlock_IndexBody_handOne"+i+" .accordion-button").addClass("collapsed")
                $("#id_IndexBlock_IndexBody_collapseOne"+i).removeClass("show")
            }
        }
        VueObject_Body.Vue_IndexBlock_ActiveTitle = activeTitle;
    }

    this.UpdateNew = function(data){
        if(data["active"]){
            VueObject_Body.Vue_IndexBlock_Active = data["active"]            
        }
        if(data["list"]){
            VueObject_Body.Vue_IndexBlock_List = data["list"]
        }
        ShowActive()
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

var IndexBlock;
var ControlInit = function(){
    var IndexBlockInfo = {
        "title":"目录",                                                          //title文字
        "active":"1-1",                                                         //选中目录的key，与list中的key对应，如果初始化时无数据，可设置为空，"active":""
        "list":[                                                                //定义目录，如果初始化时，无数据，可以使用空值 "list":[]
            {
                "title":"标题1",
                "list":[
                    {"title":"子标题1-1", "key":"1-1", "link":"#"}               //link为跳转地址，a标签跳转，如果不需要，可以去掉
                ]
            },{
                "title":"标题2",
                "list":[
                    {"title":"子标题2-1", "key":"2-1", "link":"#"}
                ]
            }
        ],
        "selectCallBackFunction":testfunction,                                   //点击目录回调函数，可缺省，如果需要用，需要把上面目录的link去掉
    };
    IndexBlock = new ControlIndexBlock(IndexBlockInfo);
    IndexBlock.initialize();                                                     //调用初始化方法

    setTimeout(function(){                                                       //定时器只是为了模拟接口请求等场景的延迟
        var IndexBlockUpdate = {
            "active":"1-2",                                                      //更新选中目录，如果不需要，则不设置active
            "list":[                                                             //更新目录，如果不需要，则不设置list
                {
                    "title":"新标题1",
                    "list":[
                        {"title":"新子标题1-1", "key":"1-1", "link":"#"},
                        {"title":"新子标题1-2", "key":"1-2", "link":"#"},
                    ]
                },{
                    "title":"新标题2",
                    "list":[
                        {"title":"新子标题2-1", "key":"2-1", "link":"#"},
                        {"title":"新子标题2-2", "key":"2-2", "link":"#"}
                    ]
                }
            ]
        }
        IndexBlock.UpdateNew(IndexBlockUpdate);                                  //调用更新方法（直接替换数据）
    }, 3000 )
}
