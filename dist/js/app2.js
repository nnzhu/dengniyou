$(function () {

    function bindRidoesForSwitch (){
        var ev = $._data($('#menu input[type=radio][name="optradio"]')[0], 'events');
        if(!ev || !ev.change) {
            $('#menu input[type=radio][name="optradio"]').change(function(e){
                var usr = $.rogerGetLoginUser();
                if(!usr) {
                    $.rogerShowLogin();
                    return;
                }
                var url = $(this).next('a').attr('href');
                $.rogerTrigger('#app',url, {UserID:usr.UserID});
            });
        }
    }
	var ctrlDashboard = function(response, realView) {
        if( !$.trim( $('#modal').html() ) ) {
            $('#modal').rogerReloadFile('./fragment/dialog-login.html');
        }
        if(!$.rogerGetURLJsonParams()) {
            if(!$.rogerIsLogined()) {
                $.rogerShowLogin();
            }else{
                var usr = $.rogerGetLoginUser();
                if(!usr) {
                    $.rogerShowLogin();
                    return;
                }
                $.rogerLocation('#/?UserID='+usr.UserID)
            }
        }
        $('#usercenter').rogerOnceClick(null, function () {
            var user = $.rogerGetLoginUser();
            if(!user) {
                $.rogerShowLogin();
                return;
            }

            $.rogerLocation('#/orderlist?userID='+user.UserID+'&usertype=1&status=0&page=1');
        });
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

        bindRidoesForSwitch();
        realView.rogerCropImages();
    };
    var ctrlTemplateplanDetail = function(response, realView) {

        $('#refundpolicy').html(response.PlansByUser[0].Policy.replace(/\r\n/g, '<br>'));
        $('#costpolicy').html(response.PlansByUser[0].CostInclude.replace(/\r\n/g, '<br>'));
        $('#excostpolicy').html(response.PlansByUser[0].CostExclude.replace(/\r\n/g, '<br>'));
        $('#visapolicy').html(response.PlansByUser[0].VisaNotice.replace(/\r\n/g, '<br>'));
        $('#noticepolicy').html(response.PlansByUser[0].Notice.replace(/\r\n/g, '<br>'));

        bindRidoesForSwitch();
        realView.rogerCropImages();
    };
    var initTemplateplanNew = function(params){
        var usr =$.rogerGetLoginUser();
        var type = $.rogerGetUrlParam('type');
        return {
            PlanInfo:{
                PlanName:'', PlanType: type, PlanPriceBase:0,PicURL:[],CarURL:[],PlanDays:1,StartCity:'',StartCityID:0,Policy:'',CostInclude:'',
                CostExclude:'',VisaNotice:'',Notice:'',CreateUserID:usr.UserID, AdultPrice:0,KidPrice:0, PlanStatus:3,

                Picture: {
                    Pics: []
                },
                Summary:{
                    PlanName:'',
                    PlanFeature:'',
                    PlanLabels:['观光旅游','艺术','轻探险','亲子','浪漫','游学','传统文化','自然风光','美食','商务与投资'],
                },
                PlanSchedule: [{
                    Spot:[{CountryID:'',CountryNameCn:'test',CountryNameEn:'test',CityID:'',CityNameCn:'test',CityNameEn:'test',AirportCode:'',AirportNameCn:'',AirportNameEn:'',SpotID:'',SpotName:'',SpotLocalName:'',SpotTravelTime:'',HotelStarLevel:'',ScheduleType:0,SpotPicUrl:''},
                          {CountryID:'',CountryNameCn:'test',CountryNameEn:'test',CityID:'',CityNameCn:'test',CityNameEn:'test',AirportCode:'',AirportNameCn:'',AirportNameEn:'',SpotID:'',SpotName:'',SpotLocalName:'',SpotTravelTime:'',HotelStarLevel:'',ScheduleType:1,SpotPicUrl:''},
                          {CountryID:'',CountryNameCn:'test',CountryNameEn:'test',CityID:'',CityNameCn:'test',CityNameEn:'test',AirportCode:'',AirportNameCn:'',AirportNameEn:'',SpotID:'',SpotName:'',SpotLocalName:'',SpotTravelTime:'',HotelStarLevel:'',ScheduleType:2,SpotPicUrl:''},
                          {CountryID:'',CountryNameCn:'test',CountryNameEn:'test',CityID:'',CityNameCn:'test',CityNameEn:'test',AirportCode:'',AirportNameCn:'',AirportNameEn:'',SpotID:'',SpotName:'',SpotLocalName:'',SpotTravelTime:'',HotelStarLevel:'',ScheduleType:3,SpotPicUrl:''},
                          {CountryID:'',CountryNameCn:'test',CountryNameEn:'test',CityID:'',CityNameCn:'test',CityNameEn:'test',AirportCode:'',AirportNameCn:'',AirportNameEn:'',SpotID:'',SpotName:'',SpotLocalName:'',SpotTravelTime:'',HotelStarLevel:'',ScheduleType:4,SpotPicUrl:''},
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
                PlanName:'', PlanType: type, PlanPriceBase:0,PicURL:[],CarURL:[],PlanDays:1,StartCity:'',StartCityID:0,Policy:'',CostInclude:'',
                CostExclude:'',VisaNotice:'',Notice:'',CreateUserID:usr.UserID, AdultPrice:0,KidPrice:0, PlanStatus:3,

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
                    for ( var j = 0; j < ps.Spot.length ; i ++ ) {
                        if(ps.Spot[i] === data.SpotItem) {
                            ps.Spot[i]= {CountryID:country[0],CountryNameCn:country[1],CountryNameEn:country[2],CityID:city[0],CityNameCn:city[1],CityNameEn:city[2],AirportCode:'',AirportNameCn:'',AirportNameEn:'',
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
                    for ( var j = 0; j < ps.Spot.length ; i ++ ) {
                        if(ps.Spot[i] === data.SpotItem) {
                            ps.Spot[i]= {CountryID:'',CountryNameCn:'',CountryNameEn:'',CityID:'',CityNameCn:'',CityNameEn:'',AirportCode:airport[0],AirportNameCn:airport[1],AirportNameEn:airport[2],
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
                Spot:[{CountryID:'',CountryNameCn:'test',CountryNameEn:'test',CityID:'',CityNameCn:'test',CityNameEn:'test',AirportCode:'',AirportNameCn:'',AirportNameEn:'',SpotID:'',SpotName:'',SpotLocalName:'',SpotTravelTime:'',HotelStarLevel:'',ScheduleType:1,SpotPicUrl:''},
                    {CountryID:'',CountryNameCn:'test',CountryNameEn:'test',CityID:'',CityNameCn:'test',CityNameEn:'test',AirportCode:'',AirportNameCn:'',AirportNameEn:'',SpotID:'',SpotName:'',SpotLocalName:'',SpotTravelTime:'',HotelStarLevel:'',ScheduleType:1,SpotPicUrl:''},
                    {CountryID:'',CountryNameCn:'test',CountryNameEn:'test',CityID:'',CityNameCn:'test',CityNameEn:'test',AirportCode:'',AirportNameCn:'',AirportNameEn:'',SpotID:'',SpotName:'',SpotLocalName:'',SpotTravelTime:'',HotelStarLevel:'',ScheduleType:2,SpotPicUrl:''},
                    {CountryID:'',CountryNameCn:'test',CountryNameEn:'test',CityID:'',CityNameCn:'test',CityNameEn:'test',AirportCode:'',AirportNameCn:'',AirportNameEn:'',SpotID:'',SpotName:'',SpotLocalName:'',SpotTravelTime:'',HotelStarLevel:'',ScheduleType:3,SpotPicUrl:''},
                    {CountryID:'',CountryNameCn:'test',CountryNameEn:'test',CityID:'',CityNameCn:'test',CityNameEn:'test',AirportCode:'',AirportNameCn:'',AirportNameEn:'',SpotID:'',SpotName:'',SpotLocalName:'',SpotTravelTime:'',HotelStarLevel:'',ScheduleType:4,SpotPicUrl:''},
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
            var item = getItemWithStartCityID(data.PlanInfo.PlanSchedule[0].Spot);
            if(item && item.CityID > 0) {
                if (!Plan.PlanInfo.PlanID) {
                    var data = {PlanInfo: e.data.PlanInfo};
                    data.PlanInfo.StartCityID = item.CityID;
                    data.PlanInfo.Summary._PlanLabels = data.PlanInfo.Summary.PlanLabels.join();
                    $.rogerPost('/new/tmpplan', data, function (respJSON) {
                        $.rogerNotice({Message: '模板方案成功'});
                    });
                } else {
                    $.rogerPost('/delete/plan', {PlanID: Plan.PlanInfo.PlanID}, function (respJSON) {
                        var data = {PlanInfo: e.data.PlanInfo};
                        data.PlanInfo.StartCityID = item.CityID;
                        data.PlanInfo.Summary._PlanLabels = data.PlanInfo.Summary.PlanLabels.join();
                        $.rogerPost('/new/tmpplan', data, function (respJSON) {
                            $.rogerNotice({Message: '模板方案发布成功'});
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


        $('#save').rogerOnceClick(Plan, function(e){
            if(!Plan.PlanInfo.PlanID) {
                var data = {PlanInfo:e.data.PlanInfo};
                data.PlanInfo.Summary._PlanLabels = data.PlanInfo.Summary.PlanLabels.join();
                $.rogerPost('/new/shortplan', data, function(respJSON){
                    $.rogerNotice({Message:'快捷方案保存成功'});
                });
            }else {
                var data = {PlanInfo:e.data.PlanInfo};
                data.PlanInfo.Summary._PlanLabels = data.PlanInfo.Summary.PlanLabels.join();
                $.rogerPost('/delete/plan', {PlanID:data.PlanInfo.PlanID}, function(respJSON){
                    $.rogerPost('/new/shortplan', data, function(respJSON){
                        $.rogerNotice({Message:'快捷方案保存成功'});
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
    };

    var ctrlOrderlist = function(response, realView) {

        $('#usercenter').rogerOnceClick(null, function () {
            var user = $.rogerGetLoginUser();
            if(!user) {
                $.rogerShowLogin();
                return;
            }

            $.rogerLocation('#/orderlist?userID='+user.UserID+'&usertype=2&status=0&page=1');
        });

        $('#confirm').rogerOnceClick(null, function () {
            var orderid= $('#confirm').data('id');
            var status= $('#confirm').data('status');
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

    var ctrlServicedetail = function(response, realView) {

        realView.rogerCropImages();

    };

    var ctrlFacilityDetail = function(response, realView) {

        bindRidoesForSwitch();
        realView.rogerCropImages();
    };

    var ctrlTravelogueDetail = function(response, realView) {

        bindRidoesForSwitch();
        realView.rogerCropImages();
    };


    var initAttractionEdit=function(){
        return {
        SpotDetail: 
        {
            SpotsID:'' ,
            UserID:'' ,
            CountryID:'' ,
            CityID:'' ,
            SpotsTypeID:'' ,
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
            SpotPics: [
                {PicURL: ''},
                {PicURL: ''}
            ], 
            SpotLabels: [
                {ClassifyLabel: "场馆"}, 
                {ClassifyLabel: "建筑"}, 
                {ClassifyLabel: "历史"}
            ], 
        },        
        IMGHOST: "http://123.59.144.47/" };
    },ctrlAttractionEdit=function(Plan, realView){

        // Plan.createDay = function(Plan, PlanShort){ 
        //     PlanShort.push({Label:'', Day:PlanShort.length+1, Content:null, PicURL: null, PicEnable:false});
        //     $.rogerRefresh(Plan);

        $('#save').rogerOnceClick(Plan, function(e){

            console.log('test');
        });

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
            SpotPics: [
                {PicURL: ""},
                {PicURL: ""},
                {PicURL: ""}  
            ],
            SpotLabels: [
                {ClassifyLabel: "民宿"}, 
                {ClassifyLabel: "人文"}, 
                {ClassifyLabel: "历史"}
            ],
        },        
        IMGHOST: "http://123.59.144.47/"
    };
    },ctrlAccommodationEdit=function(Plan, realView){
        $('#save').rogerOnceClick(Plan, function(e){

            console.log('test');
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
            SpotPics: [
                {PicURL: ""}, 
                {PicURL: ""}, 
                {PicURL: ""}, 
                {PicURL: ""}, 
                {PicURL: ""}, 
                {PicURL: ""}
            ], 
            SpotLabels: [
                {ClassifyLabel: "咖啡简餐"},
                {ClassifyLabel: "甜点"}
            ],   
        },         
        IMGHOST: "http://123.59.144.47/"
     };
    },ctrlDelicacyEdit=function(Plan, realView){
        $('#save').rogerOnceClick(Plan, function(e){
            console.log('test');
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
        $('#save').rogerOnceClick(Plan, function(e){
            console.log('test');
        });

        bindRidoesForSwitch();
        realView.rogerCropImages();
    } ;

     var initServiceCarEdit=function(){
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
                serviceOutTimePrice: '',
                incMileage: '',
                exMileagePrice: '',
                freeForDelay: '',
                waitOutTimePrice: '',
                description: '',
                serviceStatus: '',
                serviceMethod: '',
                Picture: [
                    {picURL: '', cover: ''},
                    {picURL: '', cover: ''},
                    {picURL: '', cover: ''}
                ],
                DetailServiceMethod: [ ],
                Facility: [
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
                Airports: [ ], 
                Policy: [
                    {
                      PolicyType: 1, 
                      PolicyID: 26, 
                      PolicyName: "退订政策", 
                      ServiceTypeID: 1, 
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
                      Type: 1
                    }, 
                    {
                      PolicyType: 2, 
                      PolicyID: 984, 
                      PolicyName: '费用包含', 
                      ServiceTypeID: 1, 
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
                      Type: 5
                    }, 
                    {
                      PolicyType: 3, 
                      PolicyID: 985, 
                      PolicyName: '费用不包含', 
                      ServiceTypeID: 1, 
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
                      Type: 5
                    }, 
                    {
                      PolicyType: 4, 
                      PolicyID: 986, 
                      PolicyName: '预订须知', 
                      ServiceTypeID: 1, 
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
                      Type: 5
                    }
                ], 
                VehicleInfo: [ ], 
                VehicleCharges: [ ], 
                VehicleAddress: [ ], 
                VehicleSchedule: [ ], 
                Labels: ["咖啡简餐"], 
                ActivityPrice: [ ], 
                HouseInfo: [ ]
            }, 
            IMGHOST: "http://123.59.144.47/"
        };
    },ctrlServiceCarEdit=function(Plan, realView){
        $('#save').rogerOnceClick(Plan, function(e){
            console.log('test');
        });

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
        $('#save').rogerOnceClick(Plan, function(e){
            console.log('text')
        });

        bindRidoesForSwitch();
        realView.rogerCropImages();
    } ;

     var initServiceOtherEdit=function(){
        return {
            DetailMain: [
                {
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
                    covers: ''
                }
            ],
            DetailServiceMethod: [],
            Facility: [],
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
            IMGHOST: 'http://123.59.144.47/'
        };
    },ctrlServiceOtherEdit=function(Plan, realView){
        $('#save').rogerOnceClick(Plan, function(e){
            console.log('text');
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
                    {
                        articleID: 135,
                        articleDetailID: 283,
                        label: 'ssssssss',
                        picURL: null,
                        content: null,
                        DAY: 1
                    },
                    {
                        articleID: 135,
                        articleDetailID: 283,
                        label: null,
                        picURL: "group1/M00/01/B6/CgkB6VhjMWmAGBzOAAECKGQnCKs190.jpg",
                        content: null,
                        DAY: null
                    },
                    {
                        articleID: 135,
                        articleDetailID: 284,
                        label: null,
                        picURL: null,
                        content: "阿富汗伊斯兰共和国简称阿富汗，是一个位于亚洲中南部的内陆国家，坐落在亚洲的心脏地区。阿富汗的位置有不同的定义，有时候会被认为处在中亚或者南亚，甚至被归类于中东地区（西亚）。阿富汗与大部分比邻的国家有着宗教上、语言上、地理上相当程度的关联。阿富汗的北部和土库曼斯坦、乌兹别克斯坦以及塔吉克斯坦接壤，东部与中国以及部分巴基斯坦控制查谟-克什米尔地区（有争议）接壤，南部与巴基斯坦接壤，西部与伊朗接壤。\n阿富汗的名字在普什图语中的意思就是“普什图人的地方”，而普什图人亦是现时国内人口最多的族群。\n阿富汗领土中的五分之三交通不便。农业是主要的经济支柱，但可耕地还不足农用地的2/3。人口为3000多万，是世界上最贫穷的国家之一。阿富汗是个落后的农牧业国家，阿矿藏资源较为丰富，但未得到充分开发。阿富汗的河流大部分是内陆河，多注入沙漠和湖泊。主要河流有阿姆河、喀布尔河、赫尔曼德河和哈里鲁河等。",
                        DAY: null
                    },
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
            temp.STATUS=0;
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
                 $.alert(respJSON.toString());
                 $.rogerNotice({Message:'保存攻略成功'});

             });
         });

        bindRidoesForSwitch();
        realView.rogerCropImages();
    } ;

    var initEquipEdit=function(){
        return {
            BaseInfo:{
                ServiceName:'',
                ServiceTypeID:'',
                ServiceTypeName:'',
                PriceType:'',
                PrimaryPrice:'',
                Description:'',
                CoverPicURL:'',
                PicURL:[],
                Policy:'',
                CostInclude:'',
                CostExclude:'',
                Notice:''
            }
        };
    },ctrlEquipEdit=function(Plan, realView){
        $('#save').rogerOnceClick(Plan, function(e){

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

        '#/citychooser':                  {fragment: 'fragment/dialog-city-chooser.html',           init: initCityChooser,                                                    ctrl: ctrlCityChooser},
        '#/spotchooser':                  {fragment: 'fragment/dialog-spot-chooser.html',           init: initSpotChooser,                                                    ctrl: ctrlSpotChooser},
        '#/airportchooser':              {fragment: 'fragment/dialog-airport-chooser.html',        init: initAirportChooser,                                                 ctrl: ctrlAirportChooser},

        '#/servicecardetail':             {view:'product-service-car-detail.html',                  rootrest:'/dashboard/product/service/detail',                      ctrl: ctrlServicedetail},
        '#/cardetail':                    {view:'product-car-detail.html',                             rootrest:'/dashboard/product/service/detail',                      ctrl: ctrlServicedetail},
        '#/serviceactivitydetail':       {view:'product-activity-detail.html',                      rootrest:'/dashboard/product/service/detail',                      ctrl: ctrlServicedetail},
        '#/servicepickupdetail':        {view:'product-service-pickup-detail.html',	              rootrest:'/dashboard/product/service/detail',                      ctrl: ctrlServicedetail},
        '#/equipdetail':                  {view:'product-equip-detail.html',                          rootrest:'/facility/detail',                                          ctrl: ctrlFacilityDetail},
        '#/traveloguedetail':            {view:'travelogue-detail.html',	                          rootrest:'/travelogue/detail',                                       ctrl: ctrlTravelogueDetail},
        '#/servicecardetail':            {view:'product-service-car-detail.html',	                  rootrest:'/dashboard/product/service/detail',                      ctrl: ctrlServicedetail},
        '#/cardetail':                    {view:'product-car-detail.html',	                          rootrest:'/dashboard/product/service/detail',                      ctrl: ctrlServicedetail},
        '#/serviceactivitydetail':       {view:'product-activity-detail.html',	                      rootrest:'/dashboard/product/service/detail',                      ctrl: ctrlServicedetail},
        '#/servicepickupdetail':         {view:'product-service-pickup-detail.html',	              rootrest:'/dashboard/product/service/detail',                      ctrl: ctrlServicedetail},
        '#/equipdetail':                  {view:'product-equip-detail.html',	                          rootrest:'/facility/detail',                                          ctrl: ctrlFacilityDetail},
        '#/traveloguedetail':            {view:'travelogue-detail.html',	                           rootrest:'/travelogue/detail',                                       ctrl: ctrlTravelogueDetail},
        '#/attractionedit':               {fragment: 'fragment/product-attraction-edit.html',       init: initAttractionEdit,                                                 ctrl: ctrlAttractionEdit},
        '#/accommodationedit':            {fragment: 'fragment/product-accommodation-edit.html',   init: initAccommodationEdit,                                              ctrl: ctrlAccommodationEdit},
        '#/activityedit':                 {fragment: 'fragment/product-activity-edit.html',          init: initActivityEdit,                                                   ctrl: ctrlActivityEdit},
        '#/delicacyedit':                 {fragment: 'fragment/product-delicacy-edit.html',          init: initDelicacyEdit,                                                   ctrl: ctrlDelicacyEdit},
        '#/caredit':                       {fragment: 'fragment/product-car-edit.html',                init: initCarEdit,                                                        ctrl: ctrlCarEdit},
        '#/servicecaredit':               {fragment: 'fragment/product-service-car-edit.html',       init: initServiceCarEdit,                                                 ctrl: ctrlServiceCarEdit},
        '#/servicepickupedit':            {fragment: 'fragment/product-service-pickup-edit.html',   init: initServicePickupEdit,                                              ctrl: ctrlServicePickupEdit},
        '#/serviceotheredit':             {fragment: 'fragment/product-service-other-edit.html',    init: initServiceOtherEdit,                                               ctrl: ctrlServiceOtherEdit},
        '#/travelogueedit':               {fragment: 'fragment/travelogue-edit.html',                 init: initTraveLogueEdit,                                                 ctrl: ctrlTraveLogueEdit},
        '#/equipedit':      {fragment: 'fragment/product-equip-edit.html',     init: initEquipEdit,   ctrl: ctrlEquipEdit},
        '#/servicecardetail':            {view:'product-service-car-detail.html',	                  rootrest:'/dashboard/product/service/detail',                      ctrl: ctrlServicedetail},
        '#/orderdetail':            {view:'payCompletion.html',	                  rootrest:'/order/detail',                      ctrl: ctrlOrderdetail},
       
    });


	
});