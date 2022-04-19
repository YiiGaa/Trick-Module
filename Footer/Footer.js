/********************
    @Describe: Footer v1.0
    @Param: param = [*]
    @Return: null
    @BeCareful:
********************/ 
/*@@@@@@control-start@@@@@@*/

function ControlFooter(params) {
    var ModuleId = {
        "bodyId":"#id_Footer_body"
    }
    var Config = {
        
    }

    var VueObject_Body;
    this.initialize = function(){
        try {
            VueObject_Body = new Vue({
                el:ModuleId["bodyId"],
                data:{
                    Vue_Foote_logo:params["logo"],
                    Vue_Foote_infoLogo:params["infoLogo"],
                    Vue_Foote_info:params["info"],
                    Vue_Foote_contact:params["contact"],
                    Vue_Foote_link:params["link"],
                },
                methods:{
                    Vue_Footer_Function: function (data) {
                        NotifyCallBackFunction("selectCallBackFunction", data)
                    }
                }
            });
        } catch (e) {
            console.log("Footer exception.");
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
        //VueObject_Body.Vue_Footer = data;
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

var Footer;
var ControlInit = function(){
    var FooterInfo = {
        "logo":"./test/logo.svg",                                                                 //中间logo
        "infoLogo":"./test/footer.svg",                                                           //左侧logo
        "info":[                                                                                  //左侧信息，多行
            "信息行1信息行1信息行1信息行1信息行1信息行1信息行1信息行1信息行1信息行1信息行1信息行1信息行1信息行1信息行1信息行1",
            "&nbsp;",
            "信息行2信息行2信息行2信息行2信息行2信息行2信息行2",
            "<a target='_blank' href='https://stoprefactoring.com'>信息行3</a>",                   //可以使用html标签
        ],
        "contact":{                                                                               //底部信息
            "info":"底部信息",
            "img":"./test/contact.jpg"
        },
        "link":[                                                                                  //右侧地图信息，最好是3组
            {
                "title":"组1标题",                                                                 //单组的标题
                "list":[
                    {
                        "title":"连接标题1",                                                       //连接标题
                        "link":"https://stoprefactoring.com"                                      //跳转的连接
                    },{
                        "title":"连接标题2",
                        "link":"https://stoprefactoring.com"
                    },{
                        "title":"连接标题3",
                        "link":"https://stoprefactoring.com"
                    }
                ]
            },{
                "title":"组2标题",
                "list":[
                    {
                        "title":"连接标题1",
                        "link":""
                    },{
                        "title":"连接标题2",
                        "link":""
                    },{
                        "title":"连接标题3",
                        "link":""
                    }
                ]
            }
        ]
    };
    Footer = new ControlFooter(FooterInfo);
    Footer.initialize();                                                                          //调用初始化方法
}
