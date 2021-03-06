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
        "title":"??????",                                                          //title??????
        "active":"1-1",                                                         //???????????????key??????list??????key?????????????????????????????????????????????????????????"active":""
        "list":[                                                                //?????????????????????????????????????????????????????????????????? "list":[]
            {
                "title":"??????1",
                "list":[
                    {"title":"?????????1-1", "key":"1-1", "link":"#"}               //link??????????????????a?????????????????????????????????????????????
                ]
            },{
                "title":"??????2",
                "list":[
                    {"title":"?????????2-1", "key":"2-1", "link":"#"}
                ]
            }
        ],
        "selectCallBackFunction":testfunction,                                   //?????????????????????????????????????????????????????????????????????????????????link??????
    };
    IndexBlock = new ControlIndexBlock(IndexBlockInfo);
    IndexBlock.initialize();                                                     //?????????????????????

    setTimeout(function(){                                                       //?????????????????????????????????????????????????????????
        var IndexBlockUpdate = {
            "active":"1-2",                                                      //???????????????????????????????????????????????????active
            "list":[                                                             //?????????????????????????????????????????????list
                {
                    "title":"?????????1",
                    "list":[
                        {"title":"????????????1-1", "key":"1-1", "link":"#"},
                        {"title":"????????????1-2", "key":"1-2", "link":"#"},
                    ]
                },{
                    "title":"?????????2",
                    "list":[
                        {"title":"????????????2-1", "key":"2-1", "link":"#"},
                        {"title":"????????????2-2", "key":"2-2", "link":"#"}
                    ]
                }
            ]
        }
        IndexBlock.UpdateNew(IndexBlockUpdate);                                  //??????????????????????????????????????????
    }, 3000 )
}
