$(function () { 
    var policy1 = '1  游客在行程开始日期前60天以上提出取消，扣除已产生的费用以外的全部费用；\r\n2  游客在行程开始日期前30天以上提出取消，退还总费用的50%；\r\n3  游客在行程开始日期前15天以上提出取消，退还总费用的20%；\r\n4  游客在行程开始日期前15天（含）以内提出取消，不退还服务费用。';
    var policy2 = '1  一辆如服务描述（或同级别）的车辆使用费（在限定时间和里程范围内）；\r\n2  服务发布者本人作为司机兼导游的服务费（限定时间内），含小费；\r\n3  燃油费\r\n4  停车费\r\n5  车载WiFi热点每天1GB流量\r\n6  高速，桥梁，隧道的过路费，进城费\r\n7  司机/导游的住宿费，空程费\r\n8  如下景点的门票费用：\r\n9  行程描述中酒店（或同等级别酒店）的双人标准间；\r\n10  酒店内自助式早餐；\r\n11  旅行医疗及意外保险；\r\n12  签证办理费用。';
    var policy3 = '1  景点游览和公务/商务活动期间的服务费用；\r\n2  超时等待的费用，资费参看服务描述；\r\n3  机场和送达目的地的停车费。';
    var policy4 = '1  公务和商务活动中的专业翻译费用（可另付费提供）\r\n2  护照费用；\r\n3  航空公司燃油涨幅；\r\n4  酒店内电话、上网，传真、洗熨、收费电视、饮料等额外费用；\r\n5  酒店门童，餐馆服务生小费；\r\n6  报价中未提及的门票；\r\n7  因不可抗拒的客观原因（如天灾、战争、罢工等）、航空公司航班延误或取消等特殊情况导致行程取消或变更，由此产生的额外费用（如延期签证费、住、食及交通费、国家航空运价调整等）；\r\n8  导游及司机加班工资，资费如服务描述；\r\n9  导游及司机行程中缺餐补助，资费如服务描述；\r\n10  服务及方案描述中未提及的景点费用。';
    var policy5 = '1  因游客擅自行动走失，发生事故等产生的费用由游客自行承担；\r\n2  如遇不可预见的事件，如堵车，交通事故等，导游与游客商定可临时合理更改行程，并继续旅程，由此产生的加班费用和超程费用由游客承担；\r\n3  旅客不可要求导游进行违反交通规则、法律、当地风俗的活动，如旅客有违规、违法行为倾向导游须劝阻，劝阻无效则报警处理；\r\n4  导游不可强制旅客参与购物活动或参加自费项目，约定行程外项目需取得旅客同意；\r\n5  原则上导游与游客共进正餐（午餐和晚餐），费用由游客支付，缺少正餐时游客应支付缺餐补助；\r\n6  如导游陪同游客游览景点，游客需为导游支付门票费用。';
    function bindRidoesForSwitch (){
        var ev = $._data($('#menu input[type=radio][name="optradio"]')[0], 'events');
        if(!ev || !ev.change) {
            $('#menu input[type=radio][name="optradio"]').unbind().change(function(e){
                var usr = $.rogerGetLoginUser();
                if(!usr) {
                    $.rogerShowLogin();
                    return;
                }
                var url = $(this).next('div').data('href');
                $.rogerTrigger('#app',url, {UserID:usr.UserID});
            });
        }
        $('#usercenter').rogerOnceClick2(null, function () {
            var user = $.rogerGetLoginUser();
            if(!user) {
                $.rogerLogin('#homeLogin', '/login');
                $.rogerShowLogin();
                return;
            }
            $.rogerLocation('#/orderlist?userID='+user.UserID+'&usertype=2&status=0&page=1');
        });
    }
	var ctrlDashboard = function(response, realView) {
        if( !$.trim( $('#modal').html() ) ) {
            $('#modal').rogerReloadFile('./fragment/dialog-login.html');
        }
        if(!$.rogerGetURLJsonParams()) {
            if(!$.rogerIsLogined()) {
                $.rogerLogin('#homeLogin', '/login');
                $.rogerShowLogin();
            }else{
                var usr = $.rogerGetLoginUser();
                if(!usr) {
                    $.rogerLogin('#homeLogin', '/login');
                    $.rogerShowLogin();
                    return;
                }
                $.rogerLocation('#/?UserID='+usr.UserID)
            }
        }
        
        bindRidoesForSwitch();
        realView.rogerCropImages();
	};
    var ctrlSpecialplan = function(response, realView) {
        bindRidoesForSwitch();
        realView.rogerCropImages();
    };
    var ctrlClassicplan = function(response, realView) {

        bindRidoesForSwitch();
        realView.rogerCropImages();
    };
    var ctrlService = function(response, realView) {

        bindRidoesForSwitch();
        realView.rogerCropImages();
    };
    var ctrlActivity = function(response, realView) {

        bindRidoesForSwitch();
        realView.rogerCropImages();
    };
    var ctrlCar = function(response, realView) {

        bindRidoesForSwitch();
        realView.rogerCropImages();
    };
    var ctrlAttraction = function(response, realView) {
        realView.rogerCropImages();
        if(response.Counts > 10) {

        }
    };
    var ctrlAccommodation = function(response, realView) {

        bindRidoesForSwitch();
        realView.rogerCropImages();
    };
    var ctrlDelicacy = function(response, realView) {

        bindRidoesForSwitch();
        realView.rogerCropImages();
    };
    var ctrlTravelogue = function(response, realView) {

        bindRidoesForSwitch();
        realView.rogerCropImages();
    };

    var ctrlShortplanDetail = function(response, realView) {
        if( response.PlanInfo[0].Policy ){
            $('#policy').html(response.PlanInfo[0].Policy.replace(/\r\n/g, '<br>'));
        }
        if( response.PlanInfo[0].CostInclude ){
            $('#costinc').html(response.PlanInfo[0].CostInclude.replace(/\r\n/g, '<br>'));
        }
        if( response.PlanInfo[0].CostExclude ){
            $('#costexc').html(response.PlanInfo[0].CostExclude.replace(/\r\n/g, '<br>'));
        }
        if( response.PlanInfo[0].VisaNotice ){
            $('#visa').html(response.PlanInfo[0].VisaNotice.replace(/\r\n/g, '<br>'));
        }
        if( response.PlanInfo[0].Notice ){
            $('#warning').html(response.PlanInfo[0].Notice.replace(/\r\n/g, '<br>'));
        }
        bindRidoesForSwitch();
        realView.rogerCropImages();
    };
    var ctrlTemplateplanDetail = function(response, realView) {

        if( response.PlanInfo[0].Policy ){
            $('#policy').html(response.PlanInfo[0].Policy.replace(/\r\n/g, '<br>'));
        }
        if( response.PlanInfo[0].CostInclude ){
            $('#costinc').html(response.PlanInfo[0].CostInclude.replace(/\r\n/g, '<br>'));
        }
        if( response.PlanInfo[0].CostExclude ){
            $('#costexc').html(response.PlanInfo[0].CostExclude.replace(/\r\n/g, '<br>'));
        }
        if( response.PlanInfo[0].VisaNotice ){
            $('#visa').html(response.PlanInfo[0].VisaNotice.replace(/\r\n/g, '<br>'));
        }
        if( response.PlanInfo[0].Notice ){
            $('#warning').html(response.PlanInfo[0].Notice.replace(/\r\n/g, '<br>'));
        }

        bindRidoesForSwitch();
        realView.rogerCropImages();
    };
    var initTemplateplanNew = function(params){
        var usr =$.rogerGetLoginUser();
        var type = $.rogerGetUrlParam('type');
        return {
            PlanInfo:{
                PlanName:'', PlanType: type, PlanPriceBase:0,PicURL:[],CarURL:[],PlanDays:1,StartCity:'',StartCityID:0,Policy:policy1,CostInclude:policy2,
                CostExclude:policy3,VisaNotice:policy4,Notice:policy5,CreateUserID:usr.UserID, AdultPrice:0,KidPrice:0, PlanStatus:3,

                Picture: {
                    Pics: []
                },
                Summary:{
                    PlanName:'',
                    PlanFeature:'',
                    PlanLabels:['观光旅游','艺术','轻探险','亲子','浪漫','游学','传统文化','自然风光','美食','商务与投资'],
                },
                PlanSchedule: [{
                    Spot:[{CountryID:'',CountryNameCn:'',CountryNameEn:'',CityID:'',CityNameCn:'',CityNameEn:'',AirportCode:'',AirportNameCn:'',AirportNameEn:'',SpotID:'',SpotName:'',SpotLocalName:'',SpotTravelTime:'',HotelStarLevel:'',ScheduleType:0,SpotPicUrl:''},
                          {CountryID:'',CountryNameCn:'',CountryNameEn:'',CityID:'',CityNameCn:'',CityNameEn:'',AirportCode:'',AirportNameCn:'',AirportNameEn:'',SpotID:'',SpotName:'',SpotLocalName:'',SpotTravelTime:'',HotelStarLevel:'',ScheduleType:1,SpotPicUrl:''},
                          {CountryID:'',CountryNameCn:'',CountryNameEn:'',CityID:'',CityNameCn:'',CityNameEn:'',AirportCode:'',AirportNameCn:'',AirportNameEn:'',SpotID:'',SpotName:'',SpotLocalName:'',SpotTravelTime:'',HotelStarLevel:'',ScheduleType:2,SpotPicUrl:''},
                          {CountryID:'',CountryNameCn:'',CountryNameEn:'',CityID:'',CityNameCn:'',CityNameEn:'',AirportCode:'',AirportNameCn:'',AirportNameEn:'',SpotID:'',SpotName:'',SpotLocalName:'',SpotTravelTime:'',HotelStarLevel:'',ScheduleType:3,SpotPicUrl:''},
                          {CountryID:'',CountryNameCn:'',CountryNameEn:'',CityID:'',CityNameCn:'',CityNameEn:'',AirportCode:'',AirportNameCn:'',AirportNameEn:'',SpotID:'',SpotName:'',SpotLocalName:'',SpotTravelTime:'',HotelStarLevel:'',ScheduleType:4,SpotPicUrl:''},
                    ],
                    TravelInstruction:'',
                    DayName:''
                }]  //0 city, 1 airport, 2 attraction, 3 delicacy, 4 accommodation
            },
            IMGHOST:$.rogerImgHost()
        };
    };
    var initCityChooser = function (PS) {
        return {
            UserData:0,
            Spot:PS.Spot,
            Plan:PS.Plan
        };
    };

    var initSpotChooser = function (PS) {
        return {
            Type:PS.Type,
            Spot:PS.Spot,
            Plan:PS.Plan,
            TypeCn:PS.TypeCn,
            SpotItem:PS.SpotItem,
            Replace:PS.Replace
        };
    };
    var initAirportChooser = function (PS) {
        return {
            Spot:PS.Spot,
            Plan:PS.Plan,
            SpotItem:PS.SpotItem,
            Replace:PS.Replace
        };
    };
    var initShortplanNew = function(params){
        var usr =$.rogerGetLoginUser();
        var type = $.rogerGetUrlParam('type');
        return {
            PlanInfo:{
                PlanName:'', PlanType: type, PlanPriceBase:0,PicURL:[],CarURL:[],PlanDays:1,StartCity:'',StartCityID:null,Policy:policy1,CostInclude:policy2,
                CostExclude:policy3,VisaNotice:policy4,Notice:policy5,CreateUserID:usr.UserID, AdultPrice:0,KidPrice:0, PlanStatus:3,

                Picture:{
                    Pics:[]
                },
                Summary:{
                    PlanName:'',
                    PlanFeature:'',
                    PlanLabels:['观光旅游','艺术','轻探险','亲子','浪漫','游学','传统文化','自然风光','美食','商务与投资'],
                },
                PlanShort: []
            },
            IMGHOST:$.rogerImgHost()
        };
    };
    function getItemWithStartCityID(Spot) {
        for(var i in Spot) {
            if(Spot[i].CityID > 0 && Spot[i].ScheduleType == 0){
                return Spot[i];
            }
        }
        return null;
    };
    function getSpotBySpotItem(PlanSchedule, SpotItem) {
        for(var i = 0 ; i < PlanSchedule.length ; i ++ ){
            var ps = PlanSchedule[i];
            for ( var j = 0; j < ps.Spot.length ; j ++ ) {
                if(ps.Spot[j] === SpotItem) {
                    return ps.Spot;
                }
            }
        }
        return null;
    };

    var ctrlCityChooser = function (PS, realView) {
        $('#cityChooser').modal('show');
        $('#cityChooserOK').rogerOnceClick(PS,function (e) {
            var data = e.data;
            var country = $('#country option:selected').val().split(':');
            var city = $('#city option:selected').val().split(':');
            data.Spot.push({CountryID:country[0],CountryNameCn:country[1],CountryNameEn:country[2],CityID:city[0],CityNameCn:city[1],CityNameEn:city[2],AirportCode:'',AirportNameCn:'',AirportNameEn:'',
                SpotID:'',SpotName:'',SpotLocalName:'',SpotTravelTime:'',HotelStarLevel:'',ScheduleType:0,SpotPicUrl:''});
            $('#cityChooser').modal('hide');
            $.rogerRefresh(data.Plan);
        });
    };
    var ctrlCityChooser2 = function (PS, realView) {
        $('#cityChooser').modal('show');
        $('#cityChooserOK').rogerOnceClick(PS,function (e) {
            var data = e.data;
            var country = $('#country option:selected').val().split(':');
            var city = $('#city option:selected').val().split(':');
            data.Plan.PlanInfo.StartCityID = city[0];
            data.Plan.PlanInfo.StartCity = city[1];
            $('#cityChooser').modal('hide');
            $.rogerRefresh(data.Plan);
        });
    };
    var ctrlSpotChooser = function (PS, realView) {
        $('#spotChooser').modal('show');
        $('#spotlist').html('').append('<li class="list-group-item">'+PS.TypeCn+'</li>');
        $('#city').change(PS, function (e) {
            var data = e.data;
            var city = $('#city option:selected').val().split(':');
            if(city && city[0]) {
                $('#spotlist').rogerDialogTrigger('fragment/dialog-spotlist.html', '/dialog/'+PS.Type, {CityID:city[0]}, function (data, realView) {
                    //console.log('spot');
                    $("#spotlist .list-group-item").click(function(e) {
                        $("#spotlist .list-group-item").removeClass("active");
                        $(this).addClass("active");
                    });
                });
            }
        });
        var item = getItemWithStartCityID(getSpotBySpotItem(PS.Plan.PlanInfo.PlanSchedule, PS.SpotItem));
        if(item && item.CityID > 0) {
            setCountryCity(item.CountryNameCn, item.CityID);
            $('#spotlist').rogerDialogTrigger('fragment/dialog-spotlist.html', '/dialog/'+PS.Type, {CityID:item.CityID}, function (data, realView) {
                //console.log('spot');
                realView.rogerCropImages();
                $("#spotlist .list-group-item").click(function(e) {
                    $("#spotlist .list-group-item").removeClass("active");
                    $(this).addClass("active");
                });
            });
        }
        $('#spotChooserOK').rogerOnceClick(PS,function (e) {
            var data = e.data;
            var country = $('#country option:selected').val().split(':');
            var city = $('#city option:selected').val().split(':');
            var spot = $('#spotlist  .list-group-item.active').data('info').split(':');
            //${SpotsID}:${NameCh}:${NameEn}:${PicURL}:${Rank}:${TravelTime}:${SpotsTypeID}
            if(data.Replace) {
                ok:
                for(var i = 0 ; i < data.Plan.PlanInfo.PlanSchedule.length ; i ++ ){
                    var ps = data.Plan.PlanInfo.PlanSchedule[i];
                    for ( var j = 0; j < ps.Spot.length ; j ++ ) {
                        if(ps.Spot[j] === data.SpotItem) {
                            ps.Spot[j]= {CountryID:country[0],CountryNameCn:country[1],CountryNameEn:country[2],CityID:city[0],CityNameCn:city[1],CityNameEn:city[2],AirportCode:'',AirportNameCn:'',AirportNameEn:'',
                                SpotID:spot[0],SpotName:spot[1],SpotLocalName:spot[2],SpotTravelTime:spot[5],HotelStarLevel:spot[4],ScheduleType:parseInt(spot[6])+1,SpotPicUrl:spot[3]};
                            break ok;
                        }
                    }
                }
            }else {
                data.Spot.push({CountryID:country[0],CountryNameCn:country[1],CountryNameEn:country[2],CityID:city[0],CityNameCn:city[1],CityNameEn:city[2],AirportCode:'',AirportNameCn:'',AirportNameEn:'',
                SpotID:spot[0],SpotName:spot[1],SpotLocalName:spot[2],SpotTravelTime:spot[5],HotelStarLevel:spot[4],ScheduleType:parseInt(spot[6])+1,SpotPicUrl:spot[3]});
            }
            $('#cityChooser').modal('hide');
            $.rogerRefresh(data.Plan);
        });
    };
    var ctrlAirportChooser = function (PS, realView) {
        $('#airportChooser').modal('show');
        $('#airportlist').html('').append('<li class="list-group-item">机场</li>');
        $('#airportlist').rogerDialogTrigger('fragment/dialog-airportlist.html', '/dialog/airport', {}, function (data, realView) {
            $('#searchlist').btsListFilter('#searchinput', {itemChild: '.list-group-item-text',initial:false});
            $("#airportlist .list-group-item").click(function(e) {
                $("#airportlist .list-group-item").removeClass("active");
                $(this).addClass("active");
            });
        });
        $('#airportChooserOK').rogerOnceClick(PS,function (e) {
            var data = e.data;
            var airport = $('#airportlist  .list-group-item.active').data('info').split(':');
            //${AirPortCode}:${NameCh}:${NameEn}
            if(data.Replace) {
                ok:
                for(var i = 0 ; i < data.Plan.PlanInfo.PlanSchedule.length ; i ++ ){
                    var ps = data.Plan.PlanInfo.PlanSchedule[i];
                    for ( var j = 0; j < ps.Spot.length ; j ++ ) {
                        if(ps.Spot[j] === data.SpotItem) {
                            ps.Spot[j]= {CountryID:'',CountryNameCn:'',CountryNameEn:'',CityID:'',CityNameCn:'',CityNameEn:'',AirportCode:airport[0],AirportNameCn:airport[1],AirportNameEn:airport[2],
                                SpotID:'',SpotName:'',SpotLocalName:'',SpotTravelTime:'',HotelStarLevel:'',ScheduleType:1,SpotPicUrl:''}
                            break ok;
                        }
                    }
                }
            }else {
                if(data.Plan.Airports){
                    data.Plan.Airports.AirportCode = airport[0];
                    data.Plan.Airports.NameCh = airport[1];
                    data.Plan.Airports.NameEn = airport[2];
                }else{
                data.Spot.push({CountryID:'',CountryNameCn:'',CountryNameEn:'',CityID:'',CityNameCn:'',CityNameEn:'',AirportCode:airport[0],AirportNameCn:airport[1],AirportNameEn:airport[2],
                    SpotID:'',SpotName:'',SpotLocalName:'',SpotTravelTime:'',HotelStarLevel:'',ScheduleType:1,SpotPicUrl:''});
                }
            }
            $('#cityChooser').modal('hide');
            $.rogerRefresh(data.Plan);
        });
    };
    var ctrlTemplateplanNew = function(Plan, realView) {
        $('img[name="needPrefix"]').each(function () {
            var src = $(this).attr('src');
            if(src.indexOf('group1') > -1) {
                $(this).attr('src',Plan.IMGHOST+src);
            }
        })
        Plan.createDay = function(Plan, PlanSchedule){  //  PlanSchedule ==> data-pointer="/PlanInfo/PlanSchedule/-"
            PlanSchedule.push({
                Spot:[{CountryID:'',CountryNameCn:'',CountryNameEn:'',CityID:'',CityNameCn:'',CityNameEn:'',AirportCode:'',AirportNameCn:'',AirportNameEn:'',SpotID:'',SpotName:'',SpotLocalName:'',SpotTravelTime:'',HotelStarLevel:'',ScheduleType:1,SpotPicUrl:''},
                    {CountryID:'',CountryNameCn:'',CountryNameEn:'',CityID:'',CityNameCn:'',CityNameEn:'',AirportCode:'',AirportNameCn:'',AirportNameEn:'',SpotID:'',SpotName:'',SpotLocalName:'',SpotTravelTime:'',HotelStarLevel:'',ScheduleType:1,SpotPicUrl:''},
                    {CountryID:'',CountryNameCn:'',CountryNameEn:'',CityID:'',CityNameCn:'',CityNameEn:'',AirportCode:'',AirportNameCn:'',AirportNameEn:'',SpotID:'',SpotName:'',SpotLocalName:'',SpotTravelTime:'',HotelStarLevel:'',ScheduleType:2,SpotPicUrl:''},
                    {CountryID:'',CountryNameCn:'',CountryNameEn:'',CityID:'',CityNameCn:'',CityNameEn:'',AirportCode:'',AirportNameCn:'',AirportNameEn:'',SpotID:'',SpotName:'',SpotLocalName:'',SpotTravelTime:'',HotelStarLevel:'',ScheduleType:3,SpotPicUrl:''},
                    {CountryID:'',CountryNameCn:'',CountryNameEn:'',CityID:'',CityNameCn:'',CityNameEn:'',AirportCode:'',AirportNameCn:'',AirportNameEn:'',SpotID:'',SpotName:'',SpotLocalName:'',SpotTravelTime:'',HotelStarLevel:'',ScheduleType:4,SpotPicUrl:''},
                ],
                TravelInstruction:'',
                DayName:''
            });
            Plan.PlanInfo.PlanDays ++;
            $.rogerRefresh(Plan);
        };

        Plan.createCity = function (Plan, Spot) {
            $.rogerTrigger('#modal', '#/citychooser', {Plan:Plan, Spot:Spot});
        };
        Plan.createAttraction = function (Plan, Spot) {
            $.rogerTrigger('#modal', '#/spotchooser', {Plan:Plan, Spot:Spot, Type:'attraction', TypeCn:'景点'});
        };
        Plan.createDelicacy = function (Plan, Spot) {
            $.rogerTrigger('#modal', '#/spotchooser', {Plan:Plan, Spot:Spot, Type:'delicacy', TypeCn:'美食'});
        };
        Plan.createAccommodation = function (Plan, Spot) {
            $.rogerTrigger('#modal', '#/spotchooser', {Plan:Plan, Spot:Spot, Type:'accommodation',TypeCn:'酒店'});
        };
        Plan.changeAttraction = function (Plan, SpotItem) {
            $.rogerTrigger('#modal', '#/spotchooser', {Plan:Plan,   Type:'attraction', TypeCn:'景点', SpotItem:SpotItem,Replace:true});
        };
        Plan.changeDelicacy = function (Plan, SpotItem) {
            $.rogerTrigger('#modal', '#/spotchooser', {Plan:Plan,   Type:'delicacy', TypeCn:'美食', SpotItem:SpotItem,Replace:true});
        };
        Plan.changeAccommodation = function (Plan, SpotItem) {
            $.rogerTrigger('#modal', '#/spotchooser', {Plan:Plan,   Type:'accommodation', TypeCn:'酒店',SpotItem:SpotItem,Replace:true});
         };
        Plan.createAirport = function (Plan, Spot) {
            $.rogerTrigger('#modal', '#/airportchooser', {Plan:Plan, Spot:Spot});
        };
        Plan.changeAirport = function (Plan, SpotItem) {
            $.rogerTrigger('#modal', '#/airportchooser', {Plan:Plan, SpotItem:SpotItem, Replace: true});
        };

        $('#save').rogerOnceClick(Plan, function(e){
            var item = getItemWithStartCityID(Plan.PlanInfo.PlanSchedule[0].Spot);
            if(item && item.CityID > 0) {
                if (!Plan.PlanInfo.PlanID) {
                    var data = {PlanInfo: e.data.PlanInfo};
                    data.PlanInfo.StartCityID = item.CityID;
                    data.PlanInfo.Summary._PlanLabels = data.PlanInfo.Summary.PlanLabels.join();
                    $.rogerPost('/new/tmpplan', data, function (respJSON) {
                        $.rogerNotice({Message: '模板方案成功'});
                        $('#show').removeClass("btn btn-warning invisible");
                        $('#show').addClass("btn btn-warning");
                        $('#show').attr('href','#/templateplandetail?version=2&PlanID='+respJSON.PlanInfo.insertId);
                    });
                } else {
                    $.rogerPost('/delete/plan', {PlanID: Plan.PlanInfo.PlanID}, function (respJSON) {
                        var data = {PlanInfo: e.data.PlanInfo};
                        data.PlanInfo.StartCityID = item.CityID;
                        data.PlanInfo.Summary._PlanLabels = data.PlanInfo.Summary.PlanLabels.join();
                        $.rogerPost('/new/tmpplan', data, function (respJSON) {
                            $.rogerNotice({Message: '模板方案发布成功'});
                            $('#show').removeClass("btn btn-warning invisible");
                            $('#show').addClass("btn btn-warning");
                            $('#show').attr('href','#/templateplandetail?version=2&PlanID='+respJSON.PlanInfo.insertId);
                        });
                    });
                }
            }else {
                $.rogerNotice({Message: '请选择起始城市'});
            }
        });
      /*$('#publish').rogerOnceClick(Plan, function(e){
            $.rogerPost('/publish/plan', {PlanID:Plan.PlanInfo.PlanID,Status:1}, function(respJSON){
                $.rogerNotice({Message:'模板方案待审核..'});
                $.rogerRefresh(Plan);
            });
        });*/
        $('#cancel').rogerOnceClick(Plan, function(e){
            $.rogerPost('/publish/plan', {PlanID:Plan.PlanInfo.PlanID,Status:3}, function(respJSON){
                $.rogerNotice({Message:'模板方案已取消发布..'});
                $.rogerRefresh(Plan);
            });
        });

        bindRidoesForSwitch();
        realView.rogerCropImages();
    };
    var ctrlShortplanNew = function(Plan, realView) {
        $('img[name="needPrefix"]').each(function () {
            var src = $(this).attr('src');
            if(src.indexOf('group1') > -1) {
                $(this).attr('src',Plan.IMGHOST+src);
            }
        })
        Plan.createDay = function(Plan, PlanShort){  //  PlanSchedule ==> data-pointer="/PlanInfo/PlanSchedule/-"
            PlanShort.push({Label:'', Day:PlanShort.length+1, Content:null, PicURL: null, PicEnable:false});
            $.rogerRefresh(Plan);
        };
        Plan.createPicture = function(Plan, PlanShort){  //  PlanSchedule ==> data-pointer="/PlanInfo/PlanSchedule/-"
            PlanShort.push({Label:null, Day:null, Content:null, PicURL: null, PicEnable:true});
            $.rogerRefresh(Plan);
        };
        Plan.createContent = function(Plan, PlanShort){  //  PlanSchedule ==> data-pointer="/PlanInfo/PlanSchedule/-"
            PlanShort.push({Label:null, Day:null, Content:'desc', PicURL: null, PicEnable:false});
            $.rogerRefresh(Plan);
        };
        Plan.createCity = function (Plan, CityID) {
            $.rogerTrigger('#modal', '#/citychooser2', {Plan:Plan, CityID:CityID});
        };


        $('#save').rogerOnceClick(Plan, function(e){
            if(!Plan.PlanInfo.PlanID) {
                var data = {PlanInfo:e.data.PlanInfo};
                data.PlanInfo.Summary._PlanLabels = data.PlanInfo.Summary.PlanLabels.join();
                $.rogerPost('/new/shortplan', data, function(respJSON){
                    $.rogerNotice({Message:'快捷方案发布成功'});
                    $('#show').removeClass("btn btn-warning invisible");
                    $('#show').addClass("btn btn-warning");
                    $('#show').attr('href','#/shortplandetail?version=2&PlanID='+respJSON.PlanInfo.insertId);
                });
            }else {
                var data = {PlanInfo:e.data.PlanInfo};
                data.PlanInfo.Summary._PlanLabels = data.PlanInfo.Summary.PlanLabels.join();
                $.rogerPost('/delete/plan', {PlanID:data.PlanInfo.PlanID}, function(respJSON){
                    $.rogerPost('/new/shortplan', data, function(respJSON){
                        $.rogerNotice({Message:'快捷方案发布成功'});
                        $('#show').removeClass("btn btn-warning invisible");
                        $('#show').addClass("btn btn-warning");
                        $('#show').attr('href','#/shortplandetail?version=2&PlanID='+respJSON.PlanInfo.insertId);
                    });
                });
            }
        });

        $('#publish').rogerOnceClick(Plan, function(e){
            $.rogerPost('/publish/plan', {PlanID:Plan.PlanInfo.PlanID,Status:1}, function(respJSON){
                $.rogerNotice({Message:'模板方案待审核..'});
                $.rogerRefresh(Plan);
            });
        });
        $('#cancel').rogerOnceClick(Plan, function(e){
            $.rogerPost('/publish/plan', {PlanID:Plan.PlanInfo.PlanID,Status:3}, function(respJSON){
                $.rogerNotice({Message:'模板方案已取消发布..'});
                $.rogerRefresh(Plan);
            });
        });

        bindRidoesForSwitch();
        realView.rogerCropImages();
    };

    var ctrlFacilityList = function(response, realView) {
        console.log(response);
        bindRidoesForSwitch();
        realView.rogerCropImages();
    };

    var ctrlDelicacyDetail = function(response, realView) {

        bindRidoesForSwitch();
        realView.rogerCropImages();
    };

    var ctrlAccommodationDetail = function(response, realView) {

        bindRidoesForSwitch();
        realView.rogerCropImages();
    };

    var ctrlAttractionDetail = function(response, realView) {

        bindRidoesForSwitch();
        realView.rogerCropImages();

        $('#release').rogerOnceClick(response, function (e) {
                temp = e.data.SpotDetail[0];
                var status = $('#release').data("status")
                //3,隐藏，4发布
                $.rogerPost('/update/service/status', {Status: status, SpotsID: temp.SpotsID}, function (respJSON) {
                    $.rogerNotice({Message: '发布成功'});

                });
            }
        );

        $('#edit').rogerOnceClick(response, function (e) {
                temp = e.data.SpotDetail[0];
                $.rogerLocation('#/attractionedit?SpotsID='+temp.SpotsID);
            }
        );

        // $('#delete').rogerOnceClick(response, function (e) {
        //         temp = e.data.DetailMain[0];
        //         $.rogerPost('/delete/service', {ServiceId:temp.serviceID}, function (respJSON) {
        //             $.rogerNotice({Message: '删除成功'});
        //             $.rogerLocation('#/service'+"?UserID="+usr.UserID);
        //         });
        //     }
        // );

    };

    var ctrlOrderlist = function(response, realView) {
        var usr = $.rogerGetLoginUser();
        var Avatar = $.rogerImgHost() + usr.AvatarPicURL;
        $('.avatar img').attr('src', Avatar);

        $('#personInfo').rogerOnceClick( null, function () {
            $.rogerLocation('#/userinfo?UserID='+usr.UserID);
        });
        $('#orderList').rogerOnceClick( null, function () {
            $.rogerLocation('#/orderlist?userID='+usr.UserID+'&usertype=1&status=0&page=1');
        });
        $("#order-a_all").find("a").each(function () {
            var el = $(this);
            el.rogerOnceClick(null, function () {
                var user = $.rogerGetLoginUser();
                if(!user) {
                    $.rogerShowLogin();
                    return;
                }
                data_href = el.attr("data-value");
                $.rogerLocation(data_href+'&userID='+user.UserID);
            });

        });

        $('.confirm').on('click',function () {
            var orderid= $(this).data('id');
            var status= $(this).data('status');
            var user = $.rogerGetLoginUser();
            if('2'==status) {
                $.rogerPost('/update/order',{OrderID:orderid,Status:3, CloseReason:'',OperateDesc:'',OperateUserID:user.UserID},function () {
                    $.rogerRefresh();
                });
            }
            if('3'==status) {

                $.rogerPost('/update/order',{OrderID:orderid,Status:4, CloseReason:'',OperateDesc:'',OperateUserID:user.UserID},function () {
                    $.rogerRefresh();
                });
            }
        });


        bindRidoesForSwitch();
        realView.rogerCropImages();

    };
    var ctrlUserInfo = function(response, realView) {
        var usr = $.rogerGetLoginUser();
        console.log(usr,usr.Labels.split(','));
        result = {
            User: [{
                CityName:'',
                CountryName:'',
                CityID:usr.CityID,
                CountryID:usr.CountryID,
                Labels:usr.Labels.split(','),
                Sex:usr.Sex,
                TrueName:usr.TrueName,
                UserID:usr.UserID,
                UserName:usr.UserName,
                ComLogo:usr.ComLogo,
                ComAdv:usr.ComAdv,
                AvatarPicURL:usr.AvatarPicURL
            }],
            IMGHOST:$.rogerImgHost()
        };

        response.createCity = function (result, Spot) {
            $.rogerTrigger('#modal', '#/citychooser2', {User:result});
        };

        $('#userUpdate').rogerOnceClick(response, function (e) {
            var data = e.User;
            console.log(e.User);
            //data.Labels = data.Labels.join();
            $.rogerPost('/user/update', data, function (respJSON) {
                $.rogerNotice({Message: '个人信息修改成功'});
            });
        });

        response.createLabel = function (User) {
            User.Labels.push('');
        };

        realView.rogerCropImages();
        bindRidoesForSwitch();
    };

    var ctrlServicedetail = function (response, realView) {
        var usr = $.rogerGetLoginUser();

        $('#release').rogerOnceClick(response, function (e) {
                temp = e.data.DetailMain[0];
                var status = $('#release').data("status")
            //3,隐藏，4发布
                $.rogerPost('/update/service/status', {Status: status, ServiceId: temp.serviceID}, function (respJSON) {
                    $.rogerNotice({Message: '发布成功'});

                });
            }
        );

        $('#edit').rogerOnceClick(response, function (e) {
                temp = e.data.DetailMain[0];
                $.rogerLocation('#/servicecaredit?ServiceID='+temp.serviceID);
            }
        );
        //租车
        $('#editCar').rogerOnceClick(response, function (e) {
                temp = e.data.DetailMain[0];
                $.rogerLocation('#/caredit?ServiceID='+temp.serviceID);
            }
        );

        $('#delete').rogerOnceClick(response, function (e) {
                temp = e.data.DetailMain[0];
                $.rogerPost('/delete/service', {ServiceId:temp.serviceID}, function (respJSON) {
                    $.rogerNotice({Message: '删除成功'});
                    $.rogerLocation('#/service'+"?UserID="+usr.UserID);
                });
            }
        );

        realView.rogerCropImages();

    };

    var ctrlFacilityDetail = function(response, realView) {

        console.log(JSON.stringify(response));
        $('#release').rogerOnceClick(response, function (e) {
                temp = e.data.DetailMain[0];
                var status = $('#release').data("status")
                //3,隐藏，4发布
                $.rogerPost('/update/service/status', {Status: status, ServiceId: temp.serviceID}, function (respJSON) {
                    $.rogerNotice({Message: '发布成功'});

                });
            }
        );

        $('#edit').rogerOnceClick(response, function (e) {
                temp = e.data.Facility[0];
                $.rogerLocation('#/equipedit?facilityID='+temp.facilityID);
            }
        );

        $('#delete').rogerOnceClick(response, function (e) {
                temp = e.data.DetailMain[0];
                $.rogerPost('/delete/service', {ServiceId:temp.serviceID}, function (respJSON) {
                    $.rogerNotice({Message: '删除成功'});
                    $.rogerLocation('#/service'+"?UserID="+usr.UserID);
                });
            }
        );
        bindRidoesForSwitch();
        realView.rogerCropImages();
    };

    var ctrlTravelogueDetail = function(response, realView) {

        bindRidoesForSwitch();
        realView.rogerCropImages();
    };

    var ctrlCityChooser3 = function (PS, realView) {
        $('#cityChooser').modal('show');
        $('#cityChooserOK').rogerOnceClick(PS,function (e) {
            var data = e.data.Plan.SpotDetail;
            var country = $('#country option:selected').val().split(':');
            var city = $('#city option:selected').val().split(':');
            $('#cityChooser').modal('hide');
            data.CountryID=country[0];
            data.CountryName=country[1];
            data.CityID=city[0];
            data.CityName=city[1];
            $.rogerRefresh(e.data.Plan);
        });
    };

    var initCityChooser3 = function (PS) {
        return {
            UserData:0,
            Spot:PS.Spots,
            Plan:PS.Spots
        };
    };

    var initAttractionEdit=function(){
        var SpotsID = $.rogerGetUrlParam('SpotsID');
        var usr =$.rogerGetLoginUser();
        var returnvalue = {
        SpotDetail: 
        {
            SpotsID:'' ,
            UserID:usr.UserID ,
            CountryID:'' ,
            CityID:'' ,
            SpotsTypeID:'1' ,
            CommondReason: '' ,
            CreateDate:'' ,
            SpotsType:'' ,
            NameEn:'' ,
            NameCh:'',
            Status:'',
            UpdateDate: '' ,
            Flavor:'' ,
            PicURL:''  ,
            Address:'' ,
            ZipCode:'' ,
            ZoneCode:'' ,
            Tel:'' ,
            Description:'' ,
            Price:''  ,
            Score: '' ,
            LocalName: '',
            Alias:'' ,
            comment: '' ,
            TravelTime:'' ,
            CountryName:'' ,
            CityName: '',
            picURLs:{picURLs:[]},
            SpotLabels: {
                LabelIDs:[],                
                Labels:[],
            },
            ClassifyLabels:[]
        },        
        IMGHOST: "http://123.59.144.47/" };

        $.rogerPost('/dashboard/product/attraction/detail', {"spotsID": SpotsID, "userID": usr.UserID}, function (respJSON, reqJSON) {
            if(respJSON){
                console.log(JSON.stringify(respJSON));
                if (null != respJSON["SpotDetail"] && respJSON["SpotDetail"].length > 0) {
                    var spotdetail = respJSON["SpotDetail"][0];

                    if (null == respJSON["SpotPics"] || '' == respJSON["SpotPics"] || respJSON["SpotPics"].length==0) {
                        spotdetail["picURLs"]=returnvalue["SpotDetail"]["picURLs"]

                    }else {

                        picURLs = [];
                        for( key in respJSON["SpotPics"]){
                            picURLs.push(respJSON["SpotPics"][key].PicURL);
                            // spotdetail["picURLs"]["picURLs"][key]=respJSON["SpotPics"][key].PicURL

                        }
                        spotdetail["picURLs"]={"picURLs":picURLs};
                    }

                    if (null == respJSON["SpotLabels"] || '' == respJSON["SpotLabels"] || respJSON["SpotLabels"].length==0) {
                        spotdetail["SpotLabels"]=returnvalue["SpotDetail"]["SpotLabels"]

                    }else {

                        LabelIDs = [];
                        Labels=[];
                        for( key in respJSON["SpotLabels"]){
                            LabelIDs.push(respJSON["SpotLabels"][key]["ClassifyLabelID"]);
                            Labels.push(respJSON["SpotLabels"][key]["ClassifyLabel"])
                        }
                        spotdetail["SpotLabels"]={"LabelIDs":LabelIDs};
                        spotdetail["SpotLabels"]={"Labels":Labels};
                    }

                    returnvalue = {"SpotDetail":spotdetail}

                    console.log(returnvalue["SpotDetail"])

                }
                if (null != respJSON["ClassifyLabels"] && '' != respJSON["ClassifyLabels"]) {
                     returnvalue['SpotDetail']["ClassifyLabels"] = respJSON["ClassifyLabels"];
                 }
            }

            $.rogerRefresh(returnvalue);
        });

        return returnvalue;
    },ctrlAttractionEdit=function(Spots, realView){

        Spots.createLabel = function(Spots, Labels){
            var newLabel = [];
            var newLabelID = [];
            $('#attrLabel li input').each(function(){
                if ($(this).prop('checked')) {
                    var temp = $(this).next().text();
                    var tempID = $(this).val();
                    newLabel.push(temp);
                    newLabelID.push(tempID);
                }
            });            

            Spots.SpotDetail.SpotLabels.LabelIDs = newLabelID;
            Spots.SpotDetail.SpotLabels.Labels = newLabel;
            console.log(Spots);
            $.rogerRefresh(Spots);
        };

        Spots.createCity = function (Spots) {
            $.rogerTrigger('#modal', '#/citychooser3', {Spots:Spots});
        };

        $('#save').rogerOnceClick(Spots, function(e){

            temp = e.data.SpotDetail;

            if(null != temp.SpotsID && '' != temp.SpotsID){
                tempSpotLabels = []
                if(null != temp.SpotLabels.LabelIDs && 0< temp.SpotLabels.LabelIDs.length){
                    for(key in temp.SpotLabels.LabelIDs){
                        tempSpotLabels.push({LabelID:temp.SpotLabels.LabelIDs[0],SpotsID:temp.SpotsID})
                    }
                }


                var data = {
                    DeleteSpotsPics:temp,
                    DeleteTravelSpotsLabel:temp,
                    SpotDetail:temp,
                    picURLs:{picURLs:temp.picURLs.picURLs,SpotsID:temp.SpotsID},
                    SpotLabels:tempSpotLabels,
                    // file:filedata,
                    // coverFile:coverFiledata,
                    IMGHOST:e.data.IMGHOST
                };
                $.rogerPost('/update/spots', data, function(respJSON){
                    $.rogerNotice({Message:'景点修改成功'});

                });
            } else {

                temp["Status"]=1;
                var data = {
                    SpotDetail:temp,
                    // file:filedata,
                    // coverFile:coverFiledata,
                    IMGHOST:e.data.IMGHOST
                };
                $.rogerPost('/new/spots', data, function(respJSON){
                    $.rogerNotice({Message:'景点保存成功'});

                });
            }

        });


        // $('#publish').rogerOnceClick(Spots, function(e){
        //     console.data.log('publish');
        //
        //     temp = e.data.SpotDetail;
        //
        //     if(null != temp.SpotsID && '' != temp.SpotsID){
        //         tempSpotLabels = []
        //         if(null != temp.SpotLabels.LabelIDs && 0< temp.SpotLabels.LabelIDs.length){
        //             for(key in temp.SpotLabels.LabelIDs){
        //                 tempSpotLabels.push({LabelID:temp.SpotLabels.LabelIDs[0],SpotsID:temp.SpotsID})
        //             }
        //         }
        //
        //
        //         var data = {
        //             DeleteSpotsPics:temp,
        //             DeleteTravelSpotsLabel:temp,
        //             SpotDetail:temp,
        //             picURLs:{picURLs:temp.picURLs.picURLs,SpotsID:temp.SpotsID},
        //             SpotLabels:tempSpotLabels,
        //             // file:filedata,
        //             // coverFile:coverFiledata,
        //             IMGHOST:e.data.IMGHOST
        //         };
        //
        //         temp["Status"]=2;
        //
        //         $.rogerPost('/update/spots', data, function(respJSON){
        //             $.rogerNotice({Message:'景点发布成功'});
        //
        //         });
        //     } else {
        //
        //         temp["Status"]=2;
        //         var data = {
        //             SpotDetail:temp,
        //             // file:filedata,
        //             // coverFile:coverFiledata,
        //             IMGHOST:e.data.IMGHOST
        //         };
        //         $.rogerPost('/new/spots', data, function(respJSON){
        //             $.rogerNotice({Message:'景点发布成功'});
        //
        //         });
        //     }
        //
        //
        //
        //
        // });

        bindRidoesForSwitch();
        realView.rogerCropImages();
    } ;

     var initAccommodationEdit=function(){
        return {
        SpotDetail:
        {
            SpotsID: '',
            UserID: '',
            CountryID: '',
            CityID: '',
            SpotsTypeID:'',
            CommondReason: '',
            CreateDate: '',
            SpotsType: '',
            NameEn: '',
            NameCh: '',
            Status: '',
            UpdateDate: '',
            Flavor: '',
            PicURL: '',
            Address: '',
            ZipCode: '',
            ZoneCode: '',
            Tel: '',
            Description:'',
            Rank: '',
            Price: '',
            Score: '',
            LocalName: '',
            Alias: '',
            comment:'',
            TravelTime: '',
            CountryName: '',
            CityName: '',
            picURLs:[],
            coverURL:'',
            SpotPics: [
                {PicURL: ''},
                {PicURL: ''}
            ],
            Labels:["场馆","建筑","历史"],
            SpotLabels: [
                {ClassifyLabel: "民宿"},
                {ClassifyLabel: "人文"},
                {ClassifyLabel: "历史"}
            ],
        },
        IMGHOST: "http://123.59.144.47/"
    };
    },ctrlAccommodationEdit=function(Plan, realView){
        Plan.createLabel = function(Plan, Labels){
            Labels .push('');
            $.rogerRefresh(Plan);
        };
        $('#save').rogerOnceClick(Plan, function(e){

            console.log('');
        });

        bindRidoesForSwitch();
        realView.rogerCropImages();
    } ;

    var initActivityEdit=function(){
        return {
            DetailMain:
            {
                serviceID: '',
                userID: '',
                serviceName: '',
                serviceTypeID: '',
                serviceTypeName: '',
                primaryPrice: '',
                unit: '',
                priceType: '',
                serviceTime: '',
                serviceOutTimePrice:'',
                incMileage: '',
                exMileagePrice: '',
                freeForDelay: '',
                waitOutTimePrice:'',
                description:'',
                serviceStatus: '',
                serviceMethod: '',
                pictureIDs: {},
                picURLs: [],
                coverURL:'',
                covers: '',
                DetailServiceMethod: [],
                Facility: [
                    {
                        serviceID:'',
                        facilityID:'',
                        userID: '',
                        facilityType: '',
                        facilityName: '',
                        brand: '',
                        model: '',
                        produceYear:'',
                        seats: '',
                        person: '',
                        clazz: '',
                        insurance: '',
                        description: '',
                        luggage: '',
                        facilityPics: []
                    }
                ],
                Airports: [],
                Policy: [
                {
                    PolicyType: 1,
                    PolicyID: '',
                    PolicyName: '',
                    ServiceTypeID:'',
                    Day1: '',
                    Ratio1: '',
                    Day2: '',
                    Ratio2:'',
                    Day3: '',
                    Ratio3:'',
                    Day4: '',
                    Ratio4:'',
                    CustomRatio:'',
                    Caution: '',
                    Description:'',
                    Type: ''
                },
                {
                    PolicyType: 2,
                    PolicyID: '',
                    PolicyName: '',
                    ServiceTypeID:'',
                    Day1: '',
                    Ratio1: '',
                    Day2: '',
                    Ratio2:'',
                    Day3: '',
                    Ratio3:'',
                    Day4: '',
                    Ratio4:'',
                    CustomRatio:'',
                    Caution: '',
                    Description:'',
                    Type: ''
                },
                {
                    PolicyType: 3,
                    PolicyID: '',
                    PolicyName: '',
                    ServiceTypeID:'',
                    Day1: '',
                    Ratio1: '',
                    Day2: '',
                    Ratio2:'',
                    Day3: '',
                    Ratio3:'',
                    Day4: '',
                    Ratio4:'',
                    CustomRatio:'',
                    Caution: '',
                    Description:'',
                    Type: ''
                },
                {
                    PolicyType: 4,
                    PolicyID: '',
                    PolicyName: '',
                    ServiceTypeID:'',
                    Day1: '',
                    Ratio1: '',
                    Day2: '',
                    Ratio2:'',
                    Day3: '',
                    Ratio3:'',
                    Day4: '',
                    Ratio4:'',
                    CustomRatio:'',
                    Caution: '',
                    Description:'',
                    Type: ''
                }],
                VehicleInfo: [],
                VehicleCharges: [],
                VehicleAddress: [],
                VehicleSchedule: [],
                Labels: [],
                ActivityPrice: [
                    {
                        activityID: '',
                        serviceID: '',
                        adultPrice: '',
                        kidPrice: '',
                        duration: ''
                    }
                ],
                HouseInfo: [],
            },
            IMGHOST:$.rogerImgHost()
        };
    },ctrlActivityEdit=function(Plan, realView){
        $('#save').rogerOnceClick(Plan, function(e){
            console.log('text');
        });

        bindRidoesForSwitch();
        realView.rogerCropImages();
    } ;

     var initDelicacyEdit=function(){
        return {
        SpotDetail:
        {
            SpotsID: '',
            UserID:'' ,
            CountryID:'',
            CityID: '',
            SpotsTypeID: '',
            CommondReason: '',
            CreateDate: '',
            SpotsType: '',
            NameEn: '',
            NameCh: '',
            Status: '',
            UpdateDate: '',
            Flavor: '',
            PicURL: '',
            Address: '',
            ZipCode: '',
            ZoneCode: '',
            Tel: '',
            Description: '',
            Rank: '',
            Price: '',
            Score: '',
            LocalName:'' ,
            Alias:'' ,
            comment:'' ,
            TravelTime:'',
            CountryName: '',
            CityName: '',
            picURLs:[],
            coverURL:'',
            SpotPics: [
                {PicURL: ""},
                {PicURL: ""},
                {PicURL: ""},
                {PicURL: ""},
                {PicURL: ""},
                {PicURL: ""}
            ],
            Labels:[],
            SpotLabels: [
                {ClassifyLabel: "咖啡简餐"},
                {ClassifyLabel: "甜点"}
            ],
        },
        IMGHOST: "http://123.59.144.47/"
     };
    },ctrlDelicacyEdit=function(Plan, realView){

        Plan.createLabel = function(Plan, Labels){
            Labels .push('');
            $.rogerRefresh(Plan);
        };

        $('#save').rogerOnceClick(Plan, function(e){

        });

        bindRidoesForSwitch();
        realView.rogerCropImages();
    } ;

     var initCarEdit=function(){
        return {
            DetailMain:
            {
                serviceID:'',
                userID: '',
                serviceName:'',
                serviceTypeID: '',
                serviceTypeName: '',
                primaryPrice: '',
                unit: '',
                priceType: '',
                serviceTime: '',
                serviceOutTimePrice: '',
                incMileage: '',
                exMileagePrice: '',
                freeForDelay: '',
                waitOutTimePrice: '',
                description: '',
                serviceStatus: '',
                serviceMethod: '',
                pictureIDs: {
                            type: '',
                            data: []
                            },
                Picture: [
                    {picURL: '', cover: ''},
                    {picURL: '', cover: ''},
                    {picURL: '', cover: ''}
                ],
                DetailServiceMethod: [ ],
                Facility: [ ],
                Airports: [ ],
                Policy: [
                {
                    PolicyType: 1,
                    PolicyID: 2167,
                    PolicyName: '退订政策',
                    ServiceTypeID: 5,
                    Day1: '',
                    Ratio1: '',
                    Day2: '',
                    Ratio2: '',
                    Day3: '',
                    Ratio3: '',
                    Day4: '',
                    Ratio4: '',
                    CustomRatio: '',
                    Caution: '',
                    Description: '',
                    Type: 2
                },
                {
                    PolicyType: 2,
                    PolicyID: 2174,
                    PolicyName: '费用包含',
                    ServiceTypeID:5,
                    Day1: '',
                    Ratio1: '',
                    Day2: '',
                    Ratio2: '',
                    Day3: '',
                    Ratio3: '',
                    Day4: '',
                    Ratio4: '',
                    CustomRatio: '',
                    Caution: '',
                    Description: '',
                    Type: 6
              },
              {
                    PolicyType: 3,
                    PolicyID: 2175,
                    PolicyName: '费用不包含',
                    ServiceTypeID: 5,
                    Day1: '',
                    Ratio1: '',
                    Day2: '',
                    Ratio2: '',
                    Day3: '',
                    Ratio3: '',
                    Day4: '',
                    Ratio4: '',
                    CustomRatio: '',
                    Caution: '',
                    Description: '',
                    Type: 7
              },
              {
                    PolicyType: 4,
                    PolicyID: 2176,
                    PolicyName: '注意事项',
                    ServiceTypeID: 5,
                    Day1: '',
                    Ratio1: '',
                    Day2: '',
                    Ratio2: '',
                    Day3: '',
                    Ratio3: '',
                    Day4: '',
                    Ratio4: '',
                    CustomRatio: '',
                    Caution: '',
                    Description: '',
                    Type: 8
                }
                ],
                VehicleInfo: [
                {
                    vehicleInfoID: '',
                    serviceID: '',
                    brand: '',
                    model: '',
                    produceYear: '',
                    seats: '',
                    person: '',
                    clazz: '',
                    insurance: '',
                    luggage: ''
                }
                ],
                VehicleCharges: [
                {
                    chargeID: 100674,
                    serviceID: 100388,
                    chargeType: 1,
                    chargePrice: ''
                },
                {
                    chargeID: 100675,
                    serviceID: 100388,
                    chargeType: 2,
                    chargePrice: ''
                },
                {
                    chargeID: 100676,
                    serviceID: 100388,
                    chargeType: 3,
                    chargePrice: ''
                }
                ],
                VehicleAddress: [
                {
                    addressID: 100761,
                    serviceID: 100388,
                    addressType: 1,
                    address: ''
                },
                {
                    addressID: 100762,
                    serviceID: 100388,
                    addressType: 2,
                    address: ''
                }
                ],
                VehicleSchedule: [ ],
                Labels: [ ],
                ActivityPrice: [ ],
                HouseInfo: [ ],
            },
            IMGHOST: "http://123.59.144.47/"
        };
    },ctrlCarEdit=function(Plan, realView){
        var tmplItem = $.tmplItem($('#carBrand')).data;
        console.log(tmplItem);
        var html;
        var typeVal;
        $('#policydiv input[type=radio]').on('click',function(){
            html = $(this).parent().next().html();
            $('#type').val($(this).val());
            $('#type').trigger("keyup");
            typeVal = $(this).val();
        });
        $("#policyconfirm").on('click',function(){
            var days = $('#policycontent4 p');
            if(typeVal == 5 || typeVal == '5'){
                html = '<h3>自定义的退订政策</h3>'+
                       '<p>1、服务开始前'+ days.eq(0).find('input').val() +'天(含)以上退订，退还服务费用的99%；</p>'+
                       '<p>2、服务开始前'+ days.eq(1).find('input').val() +'天(含)以上退订，退还服务费用的50%；</p>'+
                       '<p>3、服务开始前'+ days.eq(2).find('input').val() +'天(含)以上退订，退还服务费用的20%；</p>'+
                       '<p>4、服务开始前'+ days.eq(3).find('input').val() +'天以内退订，不退还服务费用；</p>'+
                       '<p>5、导游未及时接单或拒绝订单，全额退还服务费用</p>';
            }
            $("#policyView").html(html);            
        });

        $('#carList input[type=radio]').on('click',function(){
            var val = $(this).val();
            var detail = $(this).parent().next().find('li');
            $('#facilityID').val(val).trigger("keyup");
            tmplItem.DetailMain.facility[0].brand = detail.eq(0).find('span').text();
            tmplItem.DetailMain.facility[0].model = detail.eq(1).find('span').text();
            tmplItem.DetailMain.facility[0].person = detail.eq(2).find('span').text();
            tmplItem.DetailMain.facility[0].luggage = detail.eq(3).find('span').text();
            var clazz = detail.eq(4).find('span').text();
            if(clazz == '经济'){
                tmplItem.DetailMain.facility[0].clazz = '1';
            }else if(clazz == '舒适'){
                tmplItem.DetailMain.facility[0].clazz = '2';
            }else if(clazz == '豪华'){
                tmplItem.DetailMain.facility[0].clazz = '3';
            }
            var insurance = detail.eq(5).find('span').text();
            if( insurance == '有'){
                tmplItem.DetailMain.facility[0].insurance = '1';
            }else if( insurance == '无'){
                tmplItem.DetailMain.facility[0].insurance = '0';
            }

            $('#facilityconfirm').on('click',function(){
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                $.rogerRefresh(tmplItem);
            });    

        });

        $('#save').rogerOnceClick(DetailMain, function(e){
            var usr =$.rogerGetLoginUser();
            console.log('test');
            temp = e.data.DetailMain;
            var filedata = e.data.DetailMain.picURLs;
            var coverFiledata = e.data.DetailMain.coverURL;
            // var filedata2=[];
            // coverFiledata = coverFiledata.substr(coverFiledata.indexOf("base64,")+7,10);
            // for(key in filedata){
            //     itemtemp = filedata[key].substr(filedata[key].indexOf("base64,")+7,10);
            //     filedata2.push(itemtemp);
            // }
            // filedata = null;
            // filedata = filedata2;

            temp["userID"]=usr.UserID;
            temp["serviceTypeID"]=1;
            temp["unit"]='天';
            temp["priceType"]='1';
            temp["serviceStatus"]='3';

            temp["policyBean"]= temp["Policy"][0];
            temp["feeBean"]= temp["Policy"][1];
            temp["feeBean"]["type"]=5;
            temp["feeNoBean"]= temp["Policy"][2];
            temp["feeNoBean"]["type"]=5;
            temp["noticeBean"]= temp["Policy"][3];
            temp["noticeBean"]["type"]=5;
            temp["coverFile"]=coverFiledata;
            temp["files"]=filedata;

            if(4 == temp["policyBean"]["type"]){
                temp["policyBean"]["policyID"] = 29;
            }else if(3 == temp["policyBean"]["type"]){
                temp["policyBean"]["policyID"] = 28;
            }else if(2 == temp["policyBean"]["type"]){
                temp["policyBean"]["policyID"] = 27;
            }else if(1 == temp["policyBean"]["type"]){
                temp["policyBean"]["policyID"] = 26;
            } else {
                temp["policyBean"]["ratio1"]=0.89;
                temp["policyBean"]["ratio2"]=0.85;
                temp["policyBean"]["ratio3"]=0.82;
                temp["policyBean"]["ratio4"]=0.75;
            }

            temp["imghost"]=e.data.IMGHOST;
            console.log('test');
            var data = {
                reqUploadService:temp,
                // file:filedata,
                // coverFile:coverFiledata,
                IMGHOST:e.data.IMGHOST
            };
            $.rogerPost('/new/service/car', data, function(respJSON){
                $.rogerNotice({Message:'保存包车成功'});

                if(respJSON){
                    //跳转到详情页面
                    $.rogerLocation('#/servicecardetail?ServiceID='+respJSON.ServiceID);
                }

            });

        });


        bindRidoesForSwitch();
        realView.rogerCropImages();
    } ;

     var initServiceEdit=function(){
         var ServiceID = $.rogerGetUrlParam('ServiceID');
         var usr = $.rogerGetLoginUser();
         result = {
             DetailMain:
             {
                 serviceID: '',
                 userID: '',
                 serviceName: '',
                 serviceTypeID: '',
                 serviceTypeName: '',
                 primaryPrice: '',
                 unit: '',
                 priceType: '',
                 serviceTime: '',
                 serviceOutTimePrice: '',
                 incMileage: '',
                 exMileagePrice: '',
                 freeForDelay: '',
                 waitOutTimePrice: '',
                 description: '',
                 serviceStatus: '',
                 serviceMethod: '',
                 picURLs:[],
                 coverURL:'',
                 detailServiceMethod: [123],
                 facility: [
                     {
                         serviceID: '',
                         facilityID: '',
                         userID: '',
                         facilityType: '',
                         facilityName: '',
                         brand: '',
                         model: '',
                         produceYear: '',
                         seats: '',
                         person: '',
                         clazz: '',
                         insurance: '',
                         description: '',
                         luggage: '',
                         facilityPics: [
                             // "group1/M00/00/00/CgkB6Vfo4B-AIZdyAAFCQ2cYzZ8551.jpg"
                         ]
                     }
                 ],
                 airports: [ ],
                 policy: [
                     {
                       policyType: 1,
                       policyID: 26,
                       policyname: "退订政策",
                       serviceTypeID: 1,
                       day1: '',
                       ratio1: '',
                       day2: '',
                       ratio2: '',
                       day3: '',
                       ratio3: '',
                       day4: '',
                       ratio4: '',
                       customRatio: '',
                       caution: '',
                       description: '',
                       type: 1
                     },
                     {
                       policyType: 2,
                       policyID: 984,
                       policyName: '费用包含',
                       serviceTypeID: 1,
                       day1: '',
                       ratio1: '',
                       day2: '',
                       ratio2: '',
                       day3: '',
                       ratio3: '',
                       day4: '',
                       ratio4: '',
                       customRatio: '',
                       caution: '',
                       description: '',
                       type: 5
                     },
                     {
                       policyType: 3,
                       policyID: 985,
                       policyName: '费用不包含9999',
                       serviceTypeID: 1,
                       day1: '',
                       ratio1: '',
                       day2: '',
                       ratio2: '',
                       day3: '',
                       ratio3: '',
                       day4: '',
                       ratio4: '',
                       customRatio: '',
                       caution: '',
                       description: '',
                       type: 5
                     },
                     {
                       policyType: 4,
                       policyID: 986,
                       policyName: '预订须知',
                       serviceTypeID: 1,
                       day1: '',
                       ratio1: '',
                       day2: '',
                       ratio2: '',
                       day3: '',
                       ratio3: '',
                       day4: '',
                       ratio4: '',
                       customRatio: '',
                       caution: '',
                       description: '',
                       type: 5
                     }
                 ],
                 vehicleInfo:
                 {
                     vehicleInfoID: '',
                     serviceID: '100388',
                     brand: '',
                     model: '',
                     produceYear: '',
                     seats: '',
                     person: '',
                     clazz: '',
                     insurance: '',
                     luggage: ''
                 },
                 vehicleCharges: [
                 {
                     chargeID:'',
                     chargePrice:'',
                     chargeType:'',
                     serviceID:''
                 },
                 {
                     chargeID:'',
                     chargePrice:'',
                     chargeType:'',
                     serviceID:''
                 },
                 {
                     chargeID:'',
                     chargePrice:'',
                     chargeType:'',
                     serviceID:''
                 }],
                 vehicleAddress: [{
                    addressID: '', 
                    serviceID: '', 
                    addressType: '', 
                    address: ''
                 }],
                 vehicleSchedule: [ ],
                 labels: ["咖啡简餐"],
                 activityPrice: [ ],
                 houseInfo:
                 {
                    houseID: '',
                    serviceID: '',
                    person: '',
                    room: '',
                    bed: '',
                    address: '',
                    zipCode: '',
                    zoneCode: '+86',
                    tel: '',
                    toilet: '',
                    checkInTime: '',
                    checkOutTime: '',
                    countryID: '',
                    countryNameCn: '',
                    countryNameEn:'' ,
                    cityID: '',
                    cityNameCn: '',
                    cityNameEn: ''
                 }
             },
             IMGHOST: "http://123.59.144.47/"
         };
         $.rogerPost('/dashboard/product/service/detail', {"ServiceID": ServiceID, "userID": usr.UserID}, function (respJSON, reqJSON) {
             if(respJSON){

                 if (null != respJSON["DetailMain"] && respJSON["DetailMain"].length > 0) {


                     if (null != respJSON["DetailServiceMethod"] && '' != respJSON["DetailServiceMethod"]) {
                         result["DetailMain"]["detailServiceMethod"] = respJSON["DetailServiceMethod"]
                     }
                     if (null != respJSON["Facility"] && '' != respJSON["Facility"]) {
                         result["DetailMain"]["facility"] = respJSON["Facility"]
                     }
                     if (null != respJSON["UserFacilities"] && '' != respJSON["UserFacilities"]) {
                         result["DetailMain"]["userFacilities"] = respJSON["UserFacilities"]
                     }
                     if (null != respJSON["Airports"] && '' != respJSON["Airports"]) {
                         result["DetailMain"]["airports"] = respJSON["Airports"]
                     }
                     if (null != respJSON["Policy"] && '' != respJSON["Policy"]) {
                        while(respJSON["Policy"].length < 4)
                            {
                             respJSON["policy"].push({policyType: '',policyID: '',policyName: '',serviceTypeID: '',day1: '',ratio1: '',day2: '',ratio2: '',day3: '',ratio3: '',day4: '',ratio4: '',customRatio: '',caution: '',description: '',type: 5});
                            }
                         result["DetailMain"]["policy"] = respJSON["Policy"];
                     }
                     if (null != respJSON["VehicleInfo"] && '' != respJSON["VehicleInfo"]) {
                         result["DetailMain"]["vehicleInfo"] = respJSON["VehicleInfo"][0]
                     }
                     if (null != respJSON["VehicleCharges"] && '' != respJSON["VehicleCharges"]) {
                         result["DetailMain"]["vehicleCharges"] = respJSON["VehicleCharges"]
                     }
                     if (null != respJSON["VehicleAddress"] && '' != respJSON["VehicleAddress"]) {
                         result["DetailMain"]["vehicleAddress"] = respJSON["VehicleAddress"]
                     }
                     if (null != respJSON["VehicleSchedule"] && '' != respJSON["VehicleSchedule"]) {
                         result["DetailMain"]["vehicleSchedule"] = respJSON["VehicleSchedule"]
                     }
                     if (null != respJSON["Labels"] && '' != respJSON["Labels"]) {
                         result["DetailMain"]["labels"] = respJSON["Labels"]
                     }
                     if (null != respJSON["ActivityPrice"] && '' != respJSON["ActivityPrice"]) {
                         result["DetailMain"]["activityPrice"] = respJSON["ActivityPrice"]
                     }
                     if (null != respJSON["HouseInfo"] && '' != respJSON["HouseInfo"]) {
                         result["DetailMain"]["houseInfo"] = respJSON["HouseInfo"]
                     }
                     
                    result["DetailMain"]= deepCopy(result["DetailMain"],respJSON.DetailMain[0],respJSON.IMGHOST);
                     function deepCopy(des,source,img) {      
                        for (var key in source) {
                            if(key){
                                if(typeof source[key]==='object'){
                                   //deepCopy(des[key],source[key])
                                   des[key] = JSON.stringify(source[key]);
                                   des[key] = JSON.parse(des[key]);
                                   // if(key == 'picURLs'){
                                   //      for(var i = 0; i < source[key].length ; i++){
                                   //          des[key][i] = img + source[key][i];
                                   //      }
                                   //  }else{
                                        
                                   //  }                                   
                                }else{
                                        des[key] = source[key];
                                                                   
                                }
                              //des[key] = typeof source[key]==='object'? deepCopy(des[key],source[key]): source[key];
                              //des[key] = source[key];
                            }
                           } 
                        return des; 
                    }
                     console.log(result["DetailMain"]);

                 }
             }

             $.rogerRefresh(result);
         });
         return result;

    },ctrlServiceCarEdit=function(DetailMain, realView){
        var tmplItem = $.tmplItem($('#carBrand')).data;
        console.log(tmplItem);
        var html;
        var typeVal;
        $('#policydiv input[type=radio]').on('click',function(){
            html = $(this).parent().next().html();
            $('#type').val($(this).val());
            $('#type').trigger("keyup");
            typeVal = $(this).val();
        });
        $("#policyconfirm").on('click',function(){
            var days = $('#policycontent4 p');
            if(typeVal == 5 || typeVal == '5'){
                html = '<h3>自定义的退订政策</h3>'+
                       '<p>1、服务开始前'+ days.eq(0).find('input').val() +'天(含)以上退订，退还服务费用的99%；</p>'+
                       '<p>2、服务开始前'+ days.eq(1).find('input').val() +'天(含)以上退订，退还服务费用的50%；</p>'+
                       '<p>3、服务开始前'+ days.eq(2).find('input').val() +'天(含)以上退订，退还服务费用的20%；</p>'+
                       '<p>4、服务开始前'+ days.eq(3).find('input').val() +'天以内退订，不退还服务费用；</p>'+
                       '<p>5、导游未及时接单或拒绝订单，全额退还服务费用</p>';
            }
            $("#policyView").html(html);            
        });

        $('#carList input[type=radio]').on('click',function(){
            var val = $(this).val();
            var detail = $(this).parent().next().find('li');
            $('#facilityID').val(val).trigger("keyup");
            tmplItem.DetailMain.facility[0].brand = detail.eq(0).find('span').text();
            tmplItem.DetailMain.facility[0].model = detail.eq(1).find('span').text();
            tmplItem.DetailMain.facility[0].person = detail.eq(2).find('span').text();
            tmplItem.DetailMain.facility[0].luggage = detail.eq(3).find('span').text();
            var clazz = detail.eq(4).find('span').text();
            if(clazz == '经济'){
                tmplItem.DetailMain.facility[0].clazz = '1';
            }else if(clazz == '舒适'){
                tmplItem.DetailMain.facility[0].clazz = '2';
            }else if(clazz == '豪华'){
                tmplItem.DetailMain.facility[0].clazz = '3';
            }
            var insurance = detail.eq(5).find('span').text();
            if( insurance == '有'){
                tmplItem.DetailMain.facility[0].insurance = '1';
            }else if( insurance == '无'){
                tmplItem.DetailMain.facility[0].insurance = '0';
            }

            $('#facilityconfirm').on('click',function(){
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                //$.rogerRefresh(tmplItem);
            });    

        });

        // DetailMain.createLabel = function (User) {
        //     User.Labels.push('');
        // };




        $('#save').rogerOnceClick(DetailMain, function(e){
            var usr =$.rogerGetLoginUser();
            console.log('test');
            temp = e.data.DetailMain;
            var filedata = e.data.DetailMain.picURLs;
            var coverFiledata = e.data.DetailMain.coverURL;
            // var filedata2=[];
            // coverFiledata = coverFiledata.substr(coverFiledata.indexOf("base64,")+7,10);
            // for(key in filedata){
            //     itemtemp = filedata[key].substr(filedata[key].indexOf("base64,")+7,10);
            //     filedata2.push(itemtemp);
            // }
            // filedata = null;
            // filedata = filedata2;

            temp["userID"]=usr.UserID;
            temp["serviceTypeID"]=1;
            temp["unit"]='天';
            temp["priceType"]='1';
            temp["serviceStatus"]='3';

            temp["policyBean"]= temp["policy"][0];
            temp["feeBean"]= temp["policy"][1];
            temp["feeBean"]["type"]=5;
            temp["feeNoBean"]= temp["policy"][2];
            temp["feeNoBean"]["type"]=5;
            temp["noticeBean"]= temp["policy"][3];
            temp["noticeBean"]["type"]=5;
            temp["coverFile"]=coverFiledata;
            temp["files"]=filedata;

            if(4 == temp["policyBean"]["type"]){
                temp["policyBean"]["policyID"] = 29;
            }else if(3 == temp["policyBean"]["type"]){
                temp["policyBean"]["policyID"] = 28;
            }else if(2 == temp["policyBean"]["type"]){
                temp["policyBean"]["policyID"] = 27;
            }else if(1 == temp["policyBean"]["type"]){
                temp["policyBean"]["policyID"] = 26;
            } else {
                temp["policyBean"]["ratio1"]=0.89;
                temp["policyBean"]["ratio2"]=0.85;
                temp["policyBean"]["ratio3"]=0.82;
                temp["policyBean"]["ratio4"]=0.75;
            }

            temp["imghost"]=e.data.IMGHOST;
            console.log('test');
            var data = {
                reqUploadService:temp,
                // file:filedata,
                // coverFile:coverFiledata,
                IMGHOST:e.data.IMGHOST
            };
            $.rogerPost('/new/service/car', data, function(respJSON){
                $.rogerNotice({Message:'保存包车成功'});

                if(respJSON){
                    //跳转到详情页面
                    $.rogerLocation('#/servicecardetail?ServiceID='+respJSON.ServiceID);
                }

            });

        });

        $('#saveCar').rogerOnceClick(DetailMain, function(e){
            var usr =$.rogerGetLoginUser();
            console.log('test');
            temp = e.data.DetailMain;
            var filedata = e.data.DetailMain.picURLs;
            var coverFiledata = e.data.DetailMain.coverURL;
            // var filedata2=[];
            // coverFiledata = coverFiledata.substr(coverFiledata.indexOf("base64,")+7,10);
            // for(key in filedata){
            //     itemtemp = filedata[key].substr(filedata[key].indexOf("base64,")+7,10);
            //     filedata2.push(itemtemp);
            // }
            // filedata = null;
            // filedata = filedata2;

            temp["userID"]=usr.UserID;
            temp["serviceTypeID"]=5;
            temp["unit"]='天';
            temp["priceType"]='1';
            temp["serviceStatus"]='3';

            temp["policyBean"]= temp["policy"][0];
            temp["feeBean"]= temp["policy"][1];
            temp["feeBean"]["type"]=5;
            temp["feeNoBean"]= temp["policy"][2];
            temp["feeNoBean"]["type"]=5;
            temp["noticeBean"]= temp["policy"][3];
            temp["noticeBean"]["type"]=5;
            temp["coverFile"]=coverFiledata;
            temp["files"]=filedata;

            if(4 == temp["policyBean"]["type"]){
                temp["policyBean"]["policyID"] = 29;
            }else if(3 == temp["policyBean"]["type"]){
                temp["policyBean"]["policyID"] = 28;
            }else if(2 == temp["policyBean"]["type"]){
                temp["policyBean"]["policyID"] = 27;
            }else if(1 == temp["policyBean"]["type"]){
                temp["policyBean"]["policyID"] = 26;
            } else {
                temp["policyBean"]["ratio1"]=0.89;
                temp["policyBean"]["ratio2"]=0.85;
                temp["policyBean"]["ratio3"]=0.82;
                temp["policyBean"]["ratio4"]=0.75;
            }


            //提车地址
            lendAddresses = [];
            //repayAddresses
            repayAddresses = [];
            for(key in temp["vehicleAddress"]){
                if(1 == temp["vehicleAddress"][key]["addressType"]){
                    lendAddresses.push(temp["vehicleAddress"][key])
                }else{
                    repayAddresses.push(temp["vehicleAddress"][key])
                }

            }
            temp["lendAddresses"]=lendAddresses;
            temp["repayAddresses"]=repayAddresses;

            temp["imghost"]=e.data.IMGHOST;
            console.log('test');
            var data = {
                reqUploadService:temp,
                // file:filedata,
                // coverFile:coverFiledata,
                IMGHOST:e.data.IMGHOST
            };
            $.rogerPost('/new/service/car', data, function(respJSON){
                $.rogerNotice({Message:'保存包车成功'});

                if(respJSON){
                    //跳转到详情页面
                    $.rogerLocation('#/servicecardetail?ServiceID='+respJSON.ServiceID);
                }

            });

        });

        //服务的编辑页面不需要发布按钮
         // $('#publish').rogerOnceClick(DetailMain, function(e){
         //     var usr =$.rogerGetLoginUser();
         //     console.log('test');
         //     temp = e.data.DetailMain;
         //
         //     var picURLs = e.data.DetailMain.picURLs;
         //     var coverURL = e.data.DetailMain.coverURL;
         //     var Pictures =[];
         //     for(key in picURLs){
         //         Pictures.push({"picURL":picURLs[key],"cover":0});
         //     }
         //
         //     if (null != coverURL && coverURL!=''){
         //         Pictures.push({"picURL":coverURL,"cover":1});
         //     }
         //
         //     temp["Pictures"]=Pictures;
         //     temp["userID"]=usr.UserID;
         //     temp["serviceTypeID"]=1;
         //     temp["unit"]='天';
         //     temp["priceType"]='1';
         //     temp["serviceStatus"]='4';
         //
         //     var data = {
         //         DetailMain:temp,
         //         IMGHOST:e.data.IMGHOST
         //     };
         //     $.rogerPost('/new/service/car', data, function(respJSON){
         //         $.rogerNotice({Message:'发布包车成功'});
         //
         //     });
         //
         // });

        bindRidoesForSwitch();
        realView.rogerCropImages();
    } ;

     var initServicePickupEdit = function(){
        return {
            DetailMain: [
                {
                    serviceID: '',
                    userID: '',
                    serviceName: '',
                    serviceTypeID: '',
                    serviceTypeName: '接机',
                    primaryPrice:'',
                    unit: '',
                    priceType: '',
                    serviceTime: '',
                    serviceOutTimePrice:'',
                    incMileage: '',
                    exMileagePrice: '',
                    freeForDelay: '',
                    waitOutTimePrice: '',
                    description:'',
                    serviceStatus: '',
                    serviceMethod: '',
                    pictureIDs: {},
                    picURLs: [],
                    covers: ''
                }
            ],
            DetailServiceMethod: [],
            Facility: [
                {
                    serviceID: '',
                    facilityID: '',
                    userID: '',
                    facilityType: '',
                    facilityName: '',
                    brand:  '',
                    model: '',
                    produceYear: '',
                    seats: '',
                    person: '',
                    clazz: '',
                    insurance: '',
                    description: '',
                    luggage: '',
                    facilityPics: []
                }
            ],
            Airports:[{
                    AirportID: '',
                    ServiceID: '',
                    AirportCode: '',
                    NameEn: '',
                    NameCh: '',
                    CreateDate:''
                }],
            Policy: [
                {
                    PolicyType: 1,
                    PolicyID: '',
                    PolicyName: '',
                    ServiceTypeID:'',
                    Day1: '',
                    Ratio1: '',
                    Day2: '',
                    Ratio2:'',
                    Day3: '',
                    Ratio3:'',
                    Day4: '',
                    Ratio4:'',
                    CustomRatio:'',
                    Caution: '',
                    Description:'',
                    Type: ''
                },
                {
                    PolicyType: 2,
                    PolicyID: '',
                    PolicyName: '',
                    ServiceTypeID:'',
                    Day1: '',
                    Ratio1: '',
                    Day2: '',
                    Ratio2:'',
                    Day3: '',
                    Ratio3:'',
                    Day4: '',
                    Ratio4:'',
                    CustomRatio:'',
                    Caution: '',
                    Description:'',
                    Type: ''
                },
                {
                    PolicyType: 3,
                    PolicyID: '',
                    PolicyName: '',
                    ServiceTypeID:'',
                    Day1: '',
                    Ratio1: '',
                    Day2: '',
                    Ratio2:'',
                    Day3: '',
                    Ratio3:'',
                    Day4: '',
                    Ratio4:'',
                    CustomRatio:'',
                    Caution: '',
                    Description:'',
                    Type: ''
                },
                {
                    PolicyType: 4,
                    PolicyID: '',
                    PolicyName: '',
                    ServiceTypeID:'',
                    Day1: '',
                    Ratio1: '',
                    Day2: '',
                    Ratio2:'',
                    Day3: '',
                    Ratio3:'',
                    Day4: '',
                    Ratio4:'',
                    CustomRatio:'',
                    Caution: '',
                    Description:'',
                    Type: ''
                },
            ],
            VehicleInfo: [],
            VehicleCharges: [],
            VehicleAddress: [],
            VehicleSchedule: [],
            Labels: [],
            ActivityPrice: [],
            HouseInfo: [],
            IMGHOST: "http://123.59.144.47/"
        };
    },ctrlServicePickupEdit = function(Plan, realView){
        Plan.createAirport = function (Plan, Spot) {
            $.rogerTrigger('#modal', '#/airportchooser', {Plan:Plan, Airports:Spot});
        };

        $('#save').rogerOnceClick(DetailMain, function(e){
            var usr =$.rogerGetLoginUser();
            console.log('test');
            temp = e.data.DetailMain;
            var filedata = e.data.DetailMain.picURLs;
            var coverFiledata = e.data.DetailMain.coverURL;

            temp["userID"]=usr.UserID;
            temp["serviceTypeID"]=4;

            temp["unit"]='天';
            temp["priceType"]='1';
            temp["serviceStatus"]='3';

            temp["policyBean"]= temp["Policy"][0];
            temp["feeBean"]= temp["Policy"][1];
            temp["feeBean"]["type"]=5;
            temp["feeNoBean"]= temp["Policy"][2];
            temp["feeNoBean"]["type"]=5;
            temp["noticeBean"]= temp["Policy"][3];
            temp["noticeBean"]["type"]=5;
            temp["coverFile"]=coverFiledata;
            temp["files"]=filedata;

            if(4 == temp["policyBean"]["type"]){
                temp["policyBean"]["policyID"] = 29;
            }else if(3 == temp["policyBean"]["type"]){
                temp["policyBean"]["policyID"] = 28;
            }else if(2 == temp["policyBean"]["type"]){
                temp["policyBean"]["policyID"] = 27;
            }else if(1 == temp["policyBean"]["type"]){
                temp["policyBean"]["policyID"] = 26;
            } else {
                temp["policyBean"]["ratio1"]=0.89;
                temp["policyBean"]["ratio2"]=0.85;
                temp["policyBean"]["ratio3"]=0.82;
                temp["policyBean"]["ratio4"]=0.75;
            }

            var data = {
                reqUploadService:temp,
                // file:filedata,
                // coverFile:coverFiledata,
                IMGHOST:e.data.IMGHOST
            };
            // $.rogerPost('/new/service/car', data, function(respJSON){
            //     $.rogerNotice({Message:'接送机服务保存成功'});

            //     if(respJSON){
            //         //跳转到详情页面
            //         $.rogerLocation('#/servicecardetail?ServiceID='+respJSON.ServiceID);
            //     }

            // });

        });

        bindRidoesForSwitch();
        realView.rogerCropImages();
    } ;

     var initServiceOtherEdit=function(){
        return {
            DetailMain:{
                serviceID: '',
                userID: '',
                serviceName: '',
                serviceTypeID: '',
                serviceTypeName: '',
                primaryPrice: '',
                unit: '',
                priceType: '自定义价格',
                serviceTime: '',
                serviceOutTimePrice: '',
                incMileage: '',
                exMileagePrice: '',
                freeForDelay: '',
                waitOutTimePrice: '',
                description: '',
                serviceStatus: '',
                serviceMethod: '',
                pictureIDs: {},
                picURLs: [],
                covers: '',
                DetailServiceMethod: [],
                Facility: [],
                Airports: [],
                Policy: [
                    {
                       policyType: 1,
                       policyID: 26,
                       policyname: "退订政策",
                       serviceTypeID: 1,
                       day1: '',
                       ratio1: '',
                       day2: '',
                       ratio2: '',
                       day3: '',
                       ratio3: '',
                       day4: '',
                       ratio4: '',
                       customRatio: '',
                       caution: '',
                       description: '',
                       type: 1
                     },
                    {
                        PolicyType: 2,
                        PolicyID: '',
                        PolicyName: '',
                        ServiceTypeID:'',
                        Day1: '',
                        Ratio1: '',
                        Day2: '',
                        Ratio2:'',
                        Day3: '',
                        Ratio3:'',
                        Day4: '',
                        Ratio4:'',
                        CustomRatio:'',
                        Caution: '',
                        Description:'',
                        Type: ''
                    },
                    {
                        PolicyType: 3,
                        PolicyID: '',
                        PolicyName: '',
                        ServiceTypeID:'',
                        Day1: '',
                        Ratio1: '',
                        Day2: '',
                        Ratio2:'',
                        Day3: '',
                        Ratio3:'',
                        Day4: '',
                        Ratio4:'',
                        CustomRatio:'',
                        Caution: '',
                        Description:'',
                        Type: ''
                    },
                    {
                        PolicyType: 4,
                        PolicyID: '',
                        PolicyName: '',
                        ServiceTypeID:'',
                        Day1: '',
                        Ratio1: '',
                        Day2: '',
                        Ratio2:'',
                        Day3: '',
                        Ratio3:'',
                        Day4: '',
                        Ratio4:'',
                        CustomRatio:'',
                        Caution: '',
                        Description:'',
                        Type: ''
                    },
                ],
                VehicleInfo: [],
                VehicleCharges: [],
                VehicleAddress: [],
                VehicleSchedule: [],
                Labels: [],
                ActivityPrice: [],
                HouseInfo: [
                    {
                    houseID: '',
                    serviceID: '',
                    person: '',
                    room: '',
                    bed: '',
                    address: '',
                    zipCode: '',
                    zoneCode: '+86',
                    tel: '',
                    toilet: '',
                    checkInTime: '',
                    checkOutTime: '',
                    countryID: '',
                    countryNameCn: '',
                    countryNameEn:'' ,
                    cityID: '',
                    cityNameCn: '',
                    cityNameEn: ''
                }],
            },
            IMGHOST: 'http://123.59.144.47/'
        };
    },ctrlServiceOtherEdit=function(Plan, realView){
        $('#save').rogerOnceClick(DetailMain, function(e){
            var usr =$.rogerGetLoginUser();
            console.log('test');
            temp = e.data.DetailMain;
            var filedata = e.data.DetailMain.picURLs;
            var coverFiledata = e.data.DetailMain.coverURL;

            temp["userID"]=usr.UserID;
            temp["serviceTypeID"]=4;

            temp["unit"]='天';
            temp["priceType"]='1';
            temp["serviceStatus"]='3';

            temp["policyBean"]= temp["Policy"][0];
            temp["feeBean"]= temp["Policy"][1];
            temp["feeBean"]["type"]=5;
            temp["feeNoBean"]= temp["Policy"][2];
            temp["feeNoBean"]["type"]=5;
            temp["noticeBean"]= temp["Policy"][3];
            temp["noticeBean"]["type"]=5;
            temp["coverFile"]=coverFiledata;
            temp["files"]=filedata;

            if(4 == temp["policyBean"]["type"]){
                temp["policyBean"]["policyID"] = 29;
            }else if(3 == temp["policyBean"]["type"]){
                temp["policyBean"]["policyID"] = 28;
            }else if(2 == temp["policyBean"]["type"]){
                temp["policyBean"]["policyID"] = 27;
            }else if(1 == temp["policyBean"]["type"]){
                temp["policyBean"]["policyID"] = 26;
            } else {
                temp["policyBean"]["ratio1"]=0.89;
                temp["policyBean"]["ratio2"]=0.85;
                temp["policyBean"]["ratio3"]=0.82;
                temp["policyBean"]["ratio4"]=0.75;
            }
            console.log('test');
            var data = {
                reqUploadService:temp,
                // file:filedata,
                // coverFile:coverFiledata,
                IMGHOST:e.data.IMGHOST
            };
            // $.rogerPost('/new/service/car', data, function(respJSON){
            //     $.rogerNotice({Message:'服务保存成功'});

            //     if(respJSON){
            //         //跳转到详情页面
            //         $.rogerLocation('#/servicecardetail?ServiceID='+respJSON.ServiceID);
            //     }

            // });

        });

        bindRidoesForSwitch();
        realView.rogerCropImages();
    } ;

     var initTraveLogueEdit=function(){
        var usr =$.rogerGetLoginUser();
        var type = $.rogerGetUrlParam('type');

         // '/travelogue/detail'
        return {
            Travelogue: {
                articleID: '',
                userID: usr.UserID,
                articlePicURL: '',
                description: '',
                title: '',
                userName: null,
                avatarPicURL: '',
                type: '',
                STATUS: '',
                createDate: '',
                browseCount: '',
                praiseCount: '',
                evaluateCount: '',
                TravelogueDetail: [

                ],
            },

            IMGHOST:$.rogerImgHost()
        };

    },ctrlTraveLogueEdit=function(TraveLogue, realView){
         TraveLogue.createDay = function(Plan, TravelogueDetail){  //  PlanSchedule ==> data-pointer="/PlanInfo/PlanSchedule/-"
            TravelogueDetail.push({label:' ', DAY:'', content:null, picURL: null});
            $.rogerRefresh(Plan);
        };
         TraveLogue.createPicture = function(Plan, TravelogueDetail){  //  PlanSchedule ==> data-pointer="/PlanInfo/PlanSchedule/-"
            TravelogueDetail.push({label:null, DAY:null, content:null, picURL: null, PE:true});
            $.rogerRefresh(Plan);
        };
         TraveLogue.createContent = function(Plan, TravelogueDetail){  //  PlanSchedule ==> data-pointer="/PlanInfo/PlanSchedule/-"
            TravelogueDetail.push({label:null, DAY:null, content:'请输入描述', picURL: null});
            $.rogerRefresh(Plan);
        };


        $('#save').rogerOnceClick(TraveLogue, function(e){
            temp = e.data.Travelogue;
            temp["STATUS"]=0;

            TravelogueDetail = temp.TravelogueDetail;
            dayemp = '';
            for(key in temp.TravelogueDetail){

                if(TravelogueDetail[key]["DAY"]!=null && TravelogueDetail[key]["DAY"]!=''){
                    dayemp = TravelogueDetail[key]["DAY"];
                }else {
                    TravelogueDetail[key]["DAY"] = dayemp;
                }

            }

            var data = {
                Travelogue:temp,
                IMGHOST:e.data.IMGHOST
            };
            $.rogerPost('/new/travellogue', data, function(respJSON){
                $.rogerNotice({Message:'保存攻略成功'});

            });
        });

         $('#publish').rogerOnceClick(TraveLogue, function(e){
             temp = e.data.Travelogue;
             temp.STATUS=1;
             var data = {
                 Travelogue:temp,
                 IMGHOST:e.data.IMGHOST
             };
             $.rogerPost('/new/travellogue', data, function(respJSON){
                 $.rogerNotice({Message:'发布攻略成功'});

             });
         });

        bindRidoesForSwitch();
        realView.rogerCropImages();
    } ;

    var initEquipEdit=function(){
        return {
            Facility : {
                facilityID : 122,
                userID : 10083,
                facilityType : 1,
                facilityName : "奥迪A6",
                brand : "奥迪",
                model : "A6",
                produceYear : "2014-09-28",
                seats : 5,
                person : 5,
                clazz : 3,
                insurance : 1,
                description : null,
                luggage : 5,
                coverURL : "group1/M00/00/03/CgkB6VfrqGuAUSqlAAFKSs7UdPc666.jpg",
                pics : [
                    "group1/M00/00/03/CgkB6VfrqGuAQP3IAAFKSs7UdPc307.jpg"
                ]
            },
            IMGHOST : $.rogerImgHost()
        };


    },ctrlEquipEdit=function(Facility, realView){

        $('#save').rogerOnceClick(Facility, function(e){
            var usr =$.rogerGetLoginUser();
            console.log('ctrlEquipEdit');
            console.log(JSON.stringify(e.data.Facility));

            temp = e.data.Facility;

            picURLs=[];
            for(key in temp.pics) {
                picURLs.push({isCover:0,picUrl:temp.pics[0]});
            }
            picURLs.push({isCover:1,picUrl:coverURL});
            temp["picURLs"] = picURLs;

            var data = {
                Facility:temp,
                // file:filedata,
                // coverFile:coverFiledata,
                IMGHOST:e.data.IMGHOST
            };
            $.rogerPost('/new/facility', data, function(respJSON){
                $.rogerNotice({Message:'保存装备成功'});

                if(respJSON){
                    //跳转到详情页面
                    $.rogerLocation('#/equipdetail?facilityID='+respJSON.insertId);
                }

            });

        });


        bindRidoesForSwitch();
        realView.rogerCropImages();
    } ;

    var ctrlOrderdetail = function(response, realView) {

        bindRidoesForSwitch();
        realView.rogerCropImages();

    };


	$.rogerRouter({
		'#/':                               {view:'product-specialplan.html',                         rootrest:'/dashboard', 						                          ctrl: ctrlDashboard},
        '#/spcialplan':                   {view:'product-specialplan.html',                         rootrest:'/dashboard/product/specialplan',                          ctrl: ctrlSpecialplan},
        '#/classicplan':                  {view:'product-classicplan.html',                         rootrest:'/dashboard/product/classicplan',                                                 ctrl: ctrlClassicplan},
        '#/service':                       {view:'product-service.html',                              rootrest:'/dashboard/product/service',	                          ctrl: ctrlService},
        '#/activiy':                       {view:'product-activity.html',	                            rootrest:'/dashboard/product/activity',	                          ctrl: ctrlActivity},
        '#/car':                           {view:'product-car.html',                                   rootrest:'/dashboard/product/car', 		                          ctrl: ctrlCar},
        '#/attraction':                   {view:'product-attraction.html',                           rootrest:'/dashboard/product/attraction',	                          ctrl: ctrlAttraction},
        '#/delicacy':                     {view:'product-delicacy.html',                              rootrest:'/dashboard/product/delicacy',	                          ctrl: ctrlDelicacy},
        '#/accommodation':                {view:'product-accommodation.html',                       rootrest:'/dashboard/product/accommodation',                       ctrl: ctrlAccommodation},
        '#/travelogue':                    {view:'travelogue-list.html',                              rootrest:'/travelogue/list',                                         ctrl: ctrlTravelogue},
        '#/facilitylist':                 {view:'facilitylist.html',                                  rootrest:'/facility/list',                                            ctrl: ctrlFacilityList},
        '#/orderlist':                     {view: 'orderlist-guide.html',                             rootrest: '/order/list',                                              ctrl: ctrlOrderlist},

        '#/shortplandetail':             {view: 'product-shortplan-detail.html',                    rootrest: '/dashboard/product/shortplan/detail',                  ctrl: ctrlShortplanDetail},
        '#/templateplandetail':          {view: 'product-tempplan-detail.html',                     rootrest: '/dashboard/product/tempplan/detail',                   ctrl: ctrlTemplateplanDetail},

        '#/delicacydetail':               {view:'product-delicacy-detail.html',	                     rootrest:'/dashboard/product/delicacy/detail',                     ctrl: ctrlDelicacyDetail},
        '#/accommodationdetail':        {view:'product-accommodation-detail.html',                 rootrest:'/dashboard/product/accommodation/detail',	           ctrl: ctrlAccommodationDetail},
        '#/attractiondetail':            {view:'product-attraction-detail.html',                    rootrest:'/dashboard/product/attraction/detail',                  ctrl: ctrlAttractionDetail},

        '#/serviceotherdetail':           {view:'product-service-other-detail.html',               rootrest:'/dashboard/product/service/detail',                      ctrl: ctrlServicedetail},
        '#/shortplannew':                 {fragment: 'fragment/product-shortplan-edit.html',       init: initShortplanNew,                                                   ctrl: ctrlShortplanNew},
        '#/templateplannew':             {fragment: 'fragment/product-tempplan-edit.html',         init: initTemplateplanNew,                                                ctrl: ctrlTemplateplanNew},

        '#/shortplanedit':               {fragment: 'fragment/product-shortplan-edit.html',        rootrest:'/plan/detail/short',                                         ctrl: ctrlShortplanNew},
        '#/templateplanedit':            {fragment: 'fragment/product-tempplan-edit.html',         rootrest:'/plan/detail/tmpl',                                         ctrl: ctrlTemplateplanNew},

        '#/citychooser2':                  {fragment: 'fragment/dialog-city-chooser.html',           init: initCityChooser,                                                    ctrl: ctrlCityChooser2},
        '#/citychooser':                  {fragment: 'fragment/dialog-city-chooser.html',           init: initCityChooser,                                                    ctrl: ctrlCityChooser},
        '#/spotchooser':                  {fragment: 'fragment/dialog-spot-chooser.html',           init: initSpotChooser,                                                    ctrl: ctrlSpotChooser},
        '#/airportchooser':              {fragment: 'fragment/dialog-airport-chooser.html',        init: initAirportChooser,                                                 ctrl: ctrlAirportChooser},
        '#/userinfo':                     {fragment:'fragment/userInfo.html',                          rootrest: '/user/info',                                                ctrl: ctrlUserInfo},
        '#/equipdetail':                  {view:'product-equip-detail.html',                          rootrest:'/facility/detail',                                       ctrl: ctrlTravelogueDetail},
        '#/servicecardetail':            {view:'product-service-car-detail.html',	                  rootrest:'/dashboard/product/service/detail',                      ctrl: ctrlServicedetail},
        '#/cardetail':                    {view:'product-car-detail.html',	                          rootrest:'/dashboard/product/service/detail',                      ctrl: ctrlServicedetail},
        '#/serviceactivitydetail':       {view:'product-activity-detail.html',	                      rootrest:'/dashboard/product/service/detail',                      ctrl: ctrlServicedetail},
        '#/servicepickupdetail':         {view:'product-service-pickup-detail.html',	              rootrest:'/dashboard/product/service/detail',                      ctrl: ctrlServicedetail},
        '#/traveloguedetail':            {view:'travelogue-detail.html',	                           rootrest:'/travelogue/detail',                                       ctrl: ctrlTravelogueDetail},
        '#/attractionedit':               {fragment: 'fragment/product-attraction-edit.html',       init: initAttractionEdit,                                                 ctrl: ctrlAttractionEdit},
        '#/accommodationedit':            {fragment: 'fragment/product-accommodation-edit.html',   init: initAccommodationEdit,                                              ctrl: ctrlAccommodationEdit},
        '#/activityedit':                 {fragment: 'fragment/product-activity-edit.html',          init: initActivityEdit,                                                   ctrl: ctrlActivityEdit},
        '#/delicacyedit':                 {fragment: 'fragment/product-delicacy-edit.html',          init: initDelicacyEdit,                                                   ctrl: ctrlDelicacyEdit},
        '#/caredit':                       {fragment: 'fragment/product-car-edit.html',                init: initServiceEdit,                                                        ctrl: ctrlServiceCarEdit},
        '#/servicecaredit':               {fragment: 'fragment/product-service-car-edit.html',       init:initServiceEdit,                                               ctrl: ctrlServiceCarEdit},
        '#/servicepickupedit':            {fragment: 'fragment/product-service-pickup-edit.html',   init: initServiceEdit,                                              ctrl: ctrlServicePickupEdit},
        '#/serviceotheredit':             {fragment: 'fragment/product-service-other-edit.html',    init: initServiceEdit,                                               ctrl: ctrlServiceOtherEdit},
        '#/travelogueedit':               {fragment: 'fragment/travelogue-edit.html',                 init: initTraveLogueEdit,                                                 ctrl: ctrlTraveLogueEdit},
        '#/equipedit':                     {fragment: 'fragment/product-equip-edit.html',              init: initEquipEdit,                                                      ctrl: ctrlEquipEdit},
        '#/servicecardetail':            {view:'product-service-car-detail.html',	                    rootrest:'/dashboard/product/service/detail',                      ctrl: ctrlServicedetail},
        '#/orderdetail':                  {view:'payCompletion.html',	                                    rootrest:'/order/detail',                                              ctrl: ctrlOrderdetail},
        '#/citychooser3':                 {fragment: 'fragment/dialog-city-chooser.html',             init: initCityChooser3,                                                    ctrl: ctrlCityChooser3},
    });


	
});