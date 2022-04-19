/********************
    @Describe: ListBlock v1.0
    @Param: param = [*]
    @Return: null
    @BeCareful:
********************/ 
/*@@@@@@control-start@@@@@@*/

function ControlListBlock(params) {
    var ModuleId = {
        "bodyId":"#id_ListBlock_body"
    }
    var Config = {
    }

    var VueObject_Body;
    this.initialize = function(){
        try {
            VueObject_Body = new Vue({
                el:ModuleId["bodyId"],
                data:{
                    Vue_ListBlock_Index:params["index"],
                    Vue_ListBlock_List:params["list"],
                    Vue_ListBlock_More:params["more"]
                },
                methods:{
                }
            });
        } catch (e) {
            console.log("ListBlock exception.");
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
        if(data["index"]){
            VueObject_Body.Vue_ListBlock_Index = data["index"];
        }
        if(data["list"]){
            VueObject_Body.Vue_ListBlock_List = data["list"];
        }
    }

    this.UpdatePush = function(data){
        if(data["index"]){
            var tempVue_ListBlock_Index = VueObject_Body.Vue_ListBlock_Index;
            var tempIndex = data["index"];
            if(!tempVue_ListBlock_Index){
                tempVue_ListBlock_Index = [];
            }
            for(var i=0; i<tempIndex.length; i++){
                tempVue_ListBlock_Index.push(tempIndex[i]);
            }
            VueObject_Body.Vue_ListBlock_Index = tempVue_ListBlock_Index;
        }
        if(data["list"]){
            var tempVue_ListBlock_List = VueObject_Body.Vue_ListBlock_List;
            var tempIndex = data["list"];
            if(!tempVue_ListBlock_List){
                tempVue_ListBlock_List = {}
            }
            if(!tempIndex["index"]){
                tempIndex["index"] = [];
            }
            for(var key in tempIndex){
                tempVue_ListBlock_List[key] = tempIndex[key]
            }
            console.log(tempVue_ListBlock_List)
            VueObject_Body.Vue_ListBlock_List = tempVue_ListBlock_List;
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

var ListBlock;
var ControlInit = function(){
    var ListBlockInfo = {
        "more":"查看更多",                                                                       //查看更多按钮文字
        "index":[                                                                               //定义1级标题和信息块数量，如果初始化时，无数据，可以使用空值 "index":[]
            {
                "title":"1级标题",
                "index":[                                                                       //如果初始化时，无数据，可以使用空值 "index":[]
                    {"id":"1-1", "title":"2级块标题1", "link":"https://stoprefactoring.com"},    //id作为下面list具体内容的关联，id只要保证唯一即可
                    {"id":"1-2", "title":"2级块标题2", "link":"https://stoprefactoring.com"}     //link为查看更多的链接，a标签跳转
                ]
            },
        ],
        "list":{
            "1-1":[                                                                            //与上面index中的id关联，如果初始化时，无数据，可以使用空值 "xx":[]，或直接不设置
                {"title":"列表信息1-1", "link":"https://stoprefactoring.com"},                    //每个信息块中的列表信息
                {"title":"内容内容内容内容内容内容内容内容内容内容", "link":"https://stoprefactoring.com"}
            ]
        }
    };
    ListBlock = new ControlListBlock(ListBlockInfo);
    ListBlock.initialize();                                                                    //调用初始化方法

    setTimeout(function(){                                                                          //定时器只是为了模拟接口请求等场景的延迟
        //替换数据
        var ListBlockUpdate = {
            "index":[                                                                               //直接替换index所有内容，如果不需要，则不设置index
                {
                    "title":"1级标题",
                    "index":[                                                                       //如果初始化时，无数据，可以使用空值 "index":[]
                        {"id":"1-1", "title":"新级块标题1", "link":"https://stoprefactoring.com"},    //id作为下面list具体内容的关联，id只要保证唯一即可
                        {"id":"1-2", "title":"新级块标题2", "link":"https://stoprefactoring.com"}     //link为查看更多的链接，a标签跳转
                    ]
                },
            ],
            "list":{                                                                                //直接替换list所有内容，如果不需要，则不设置list
                "1-1":[                                                                             //与上面index中的id关联，如果初始化时，无数据，可以使用空值 "xx":[]
                    {"title":"内容内容内容内容内容内容内容内容内容内容", "link":"https://stoprefactoring.com"},
                    {"title":"新列表信息1-1", "link":"https://stoprefactoring.com"}
                ],
                "1-2":[
                    {"title":"新列表信息1-2", "link":"https://stoprefactoring.com"}
                ]
            }
        }
        ListBlock.UpdateNew(ListBlockUpdate);                                                       //调用更新方法（直接替换数据）
    }, 3000 )

    setTimeout(function(){                                                                          //定时器只是为了模拟接口请求等场景的延迟
        //追加数据，非完全替换
        var ListBlockPush = {
            "index":[                                                                               //追加index中的数据，如果不需要，则不设置index
                {                                                                                   //内容是直接追加的
                    "title":"追加1级标题",
                    "index":[
                        {"id":"3-1", "title":"追加标题1", "link":"https://stoprefactoring.com"},
                        {"id":"3-2", "title":"追加标题2", "link":"https://stoprefactoring.com"}
                    ]
                },
            ],
            "list":{                                                                                //追加list中的数据，如果不需要，则不设置list
                "3-1":[                                                                             //如果id存在，会替换内容
                    {"title":"追加内容3-1", "link":"https://stoprefactoring.com"}
                ],
                "3-2":[                                                                             //如果id不存在，则会追加内容
                    {"title":"追加内容3-2", "link":"https://stoprefactoring.com"}
                ]
            }
        }
        ListBlock.UpdatePush(ListBlockPush);                                                        //调用追加方法（追加数据）
    }, 8000 )
}
