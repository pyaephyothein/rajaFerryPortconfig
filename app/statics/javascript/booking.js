$(function(){
	getBookingRight();
})


function getBookingRight(){
	$.ajax({
		type:"GET",
		url: url+"/route/booking-right",
		data: {},
		beforeSend:function(){
			$(".booking-right").html('<div class="right-loading"></div>');
		},
		success: function (data) {
			$(".booking-right").html(data);
		}
	});	 //  end ajax

}


function getBookingRight2(id,date_start,date_end){

	$.ajax({
		type:"GET",
		url: url+"/route/booking-right2",
		data: {"id":id,"date_start":date_start,"date_end":date_end},
		beforeSend:function(){
			$(".booking-right2").html('<div class="right-loading"></div>');
		},
		success: function (data) {
			$(".booking-right2").html(data);
		}
	});	 //  end ajax

}



function getPickArea(id,val,sel, set, tp){

	$.ajax({
		type:"GET",
		url: url+"/route/getPickArea",
		data: {"val":val, "id":sel, 'set':set, 'tp':tp},
		beforeSend:function(){

		},
		success: function (data) {
			$("#"+id).html(data);
		}
	});	 //  end ajax

}




function getPickPrice(id,val,set){

	$.ajax({
		type:"GET",
		url: url+"/route/getPickPrice",
		data: {"id":val, 'set':set},
		beforeSend:function(){
		},
		success: function (data) {
			getBookingRight();
			$("#"+id).val(data);
		}

	});	 //  end ajax

}


function getPickPoint(val,type, set){

	$.ajax({
		type:"GET",
		url: url+"/route/getPickPoint",
		data: {"val":val,"type":type, 'set':set},
		beforeSend:function(){
		},
		success: function (data) {
			getBookingRight();
		}

	});	 //  end ajax

}



function getNotePoint(val,type){

	$.ajax({
		type:"GET",
		url: url+"/route/getNotePoint",
		data: {"val":val,"type":type},
		beforeSend:function(){
		},
		success: function (data) {

		}

	});	 //  end ajax

}


function setCarService(id, val, set){

	if(val.checked==true){
		type = 1;
		$("table tr#tr-"+val.id).fadeIn(300);

	}else{
		type = '';
		$("table tr#tr-"+val.id).fadeOut(300);
	}


	$.ajax({
		type:"GET",
		url: url+"/route/setCarService",
		data: {"id":id,"type":type, "set":set},
		beforeSend:function(){
		},
		success: function (data) {
			getBookingRight();
		}

	});	 //  end ajax

}

function getMainMap(id){

	$(".map-slide-main").animate({'width': '0px'}, 200,function(){

		if(id!=""){
			$.ajax({
				type:"GET",
				url: url+"/route/map-main",
				data: {"id":id},
				beforeSend:function(){
				},
				success: function (data) {
					$(".map-slide-main").animate({'width': '314px'}, 200);
					$(".map-slide-main-sub").html(data);
				}
			});	 //  end ajax
		}

	});



}


function getRightMap(){
	$.ajax({
		type:"GET",
		url: url+"/route/map-right",
		data: {  },
		beforeSend:function(){
			$(".booking-right-map").html('<div class="right-loading"></div>');
		},
		success: function (data) {
			$(".booking-right-map").html(data);
		}
	});	 //  end ajax

}

function getRightMap2(id){
	$.ajax({
		type:"GET",
		url: url+"/route/map-right",
		data: {'id':id},
		beforeSend:function(){
			$(".booking-right-map").html('<div class="right-loading"></div>');
		},
		success: function (data) {
			$(".booking-right-map").html(data);
		}
	});	 //  end ajax

}

function getRightMap3(start,end){

	$.ajax({
		type:"GET",
		url: url+"/route/map-right",
		data: {'start':start, 'end':end},
		beforeSend:function(){
			$(".booking-right-map").html('<div class="right-loading"></div>');
		},
		success: function (data) {
			$(".booking-right-map").html(data);
		}
	});	 //  end ajax

}

function setFocusDate(id){
	$("#"+id).focus();
}

function postPage(p1,p2,ptitle,status){
	var gurl = '';
	if(status==1)
		gurl = permalink(p2,ptitle,0);
	else
		gurl = permalink(p1,ptitle,0);

	window.location.href= gurl;

}




function checkCaptcha(){

	if(document.getElementById('checkCF').checked==false){
		alertPopup(setLanguage("คุณไม่ได้ยอมรับเงื่อนไขและข้อตกลงการใช้บริการ","You do not accept these Terms of Use."));
		document.getElementById('checkCF').focus();
	}else{
		$(".btn-submit1").fadeOut(0);
		$(".btn-loading").fadeIn(0);
		showProgress();
		$('.confirm-booking').submit();
	}

} //  end


function checkSearch(){

	var messages = 0;
	if($('.booking-tiket #route').val()==''){
		$('.booking-tiket #route').addClass('error');
		messages++;
	}else{
		$('.booking-tiket #route').removeClass('error');
	}

	if($('.booking-tiket #route_to').val()==''){
		$('.booking-tiket #route_to').addClass('error');
		messages++;
	}else{
		$('.booking-tiket #route_to').removeClass('error');
	}


	if($('.booking-tiket #type').val()==''){
		$('.booking-tiket #type').addClass('error');
		messages++;
	}else{
		$('.booking-tiket #type').removeClass('error');
	}

	if($('.booking-tiket #date_start').val()==''){
		$('.booking-tiket #alternate_start').addClass('error');
		messages++;
	}else{
		$('.booking-tiket #alternate_start').removeClass('error');
	}

	if($('.booking-tiket #date_end').val()==''){
		if(document.getElementsByName('route_type').item(0).checked==true){
			$('.booking-tiket #alternate_end').addClass('error');
			messages++;
		}else{
			$('.booking-tiket #alternate_end').removeClass('error');
		}
	}else{
		$('.booking-tiket #alternate_end').removeClass('error');
	}

	if($('.booking-tiket #outward_people_num').val()==0){
		if($('.booking-tiket #type').val()=='100100'){
			$('.booking-tiket #outward_people_num').addClass('error');
			messages++;
		}else{
			$('.booking-tiket #outward_people_num').removeClass('error');
		}
	}else{
		$('.booking-tiket #outward_people_num').removeClass('error');
	}

	if($('.booking-tiket #type').val()!='100100'){
		if($('.booking-tiket #outward_car_num').val()==0){
			$('.booking-tiket #outward_car_num').addClass('error');
			messages++;
		}else{
			$('.booking-tiket #outward_car_num').removeClass('error');
		}
	}else{
		$('.booking-tiket #outward_car_num').removeClass('error');
	}

	$('.booking-tiket input').change(function(){
		if($(this).val()!=""){
			$(this).removeClass('error');
		}else{
			$(this).addClass('error');
		}
	});


	if(messages!=""){
		return false;
	}else{
		return true;
	}


} //  link form Vaildation




function checkSearch2(){

	var messages = '';
	if($('.booking-car #route').val()=='') messages += setLanguage("กรุณาเลือกเส้นทาง","Please select the route.")+"\n";
	if($('.booking-car #route_end').val()=='')  messages += setLanguage("กรุณาเลือกประเภทรถ","Please select a car type.")+"\n";
	if($('.booking-car #date_start').val()=='')   messages += setLanguage("กรุณาเลือกวันที่ออกเดินทาง","Please select a departure date.")+"\n";
	if($('.booking-car #date_end').val()==''){

		if((document.getElementById('route_type2').value==1 && document.getElementsByName('route_type2').length == 1)  || (document.getElementsByName('route_type2').item(0).checked == true && document.getElementsByName('route_type2').length == 2)){
			messages += setLanguage("กรุณาเลือกวันที่เดินทางกลับ","Please select a return date.")+"\n";
		}
	}

	if($('.booking-car #outward_people_num').val()==0){messages += setLanguage("กรุณาเลือกจำนวนผู้เดินทางขาไป","Select the number of travelers.")+"\n";}



	if(messages!=""){
		alertPopup(messages);
		return false;
	}else{
		return true;
	}



} //  link form Vaildation


function checkSearch3(){

	var messages = '';

	if($('#type').val()=='')  messages += setLanguage("กรุณาเลือกประเภทตั๋วเดินทาง","Please select the category Tickets.")+"\n";

	var packet_type = $("#packet_type").val();
	for(var p=1;p<=packet_type;p++){
		if($('#date_start'+p).val()=='')   messages += setLanguage("กรุณาเลือกวันที่ออกเดินทาง ","Please select a departure date. ")+p+"\n";
	}

	if($('#outward_people_num').val()==0){
		if($('#type').val()=='100100'){
			messages += setLanguage("กรุณาเลือกจำนวนผู้เดินทาง","Select the number of travelers.")+"\n";
		}
	}

	if($('#type').val()!='100100'){
		if($('#outward_car_num').val()==0){
			messages += setLanguage("กรุณาเลือกจำนวนรถ","Please select the number of vehicles.")+"\n";
		}
	}


	if(messages!=""){
		alertPopup(messages);
		return false;
	}else{
		return true;
	}



} //  link form Vaildation



function registerValdiation(){

	var error = 0;
	$("#register-form .request").each(function(){
		var req = $(this);
		$(this).find('input').each(function(){
			if($(this).val()==""){
				req.addClass('error');
				error++;
			}else{
				req.removeClass('error');
			}
		})

		$(this).find('textarea').each(function(){
			if($(this).val()==""){
				req.addClass('error');
				error++;
			}else{
				req.removeClass('error');
			}
		})

		$(this).find('select').each(function(){
			if($(this).val()==""){
				req.addClass('error');
				error++;
			}else{
				req.removeClass('error');
			}
		})

		if($(this).find('input').hasClass('email')==true) {
			if (validateEmail($(this).find('input').val())) {
				req.removeClass('error');
			}else{
				req.addClass('error');
				error++;
			}
		}

	})

	$("#register-form .request").each(function(){
		var req = $(this);
		$(this).find('input').change(function(){
			if($(this).val()==""){
				req.addClass('error');
			}else{
				req.removeClass('error');
			}
		})

		$(this).find('textarea').change(function(){
			if($(this).val()==""){
				req.addClass('error');
			}else{
				req.removeClass('error');
			}
		})

		$(this).find('select').change(function(){
			if($(this).val()==""){
				req.addClass('error');
			}else{
				req.removeClass('error');
			}
		})

	})

	if(error > 0){
		return false;
	}else{
		return true;
	}



} //  link form Vaildation


function checkPassenger(){

	$.ajax({
		type:"GET",
		url: url+"/route/checkPassenger",
		data: {},
		success: function (status) {
			if(status==1){
				$('.booking-passenger').submit();
				showProgress();
			}else{
				alertPopup(setLanguage("กรุณาเข้าสู่ระบบหรือลงทะเบียนก่อน","Please login or register."));
			}
		}
	});//  end ajax


}


function setSelectTime(time_id,time_id2){

	var departs_outward = (time_id!="")? document.getElementById('departs_outward['+time_id+']').value:'';
	var arrives_outward = (time_id!="")? document.getElementById('arrives_outward['+time_id+']').value:'';
	var departs_return = (time_id2!="")? document.getElementById('departs_return['+time_id2+']').value:'';
	var arrives_return = (time_id2!="")? document.getElementById('arrives_return['+time_id2+']').value:'';
	var car_price = $("#car_price").val();
	var people_price = $("#people_price").val();
	var car_price_return = $("#car_price_return").val();
	var people_price_return = $("#people_price_return").val();
	var token = $("input[name=_token]").val();

	
    $.post(url+"/add_booking",{ 
		'_token': token,
		'set':'time',
		'car_price':car_price,
		'people_price':people_price,
		'car_price_return':car_price_return,
		'people_price_return':people_price_return,
		'time_id':time_id,
		'time_id2':time_id2,
		'departs_outward':departs_outward,
		'arrives_outward':arrives_outward,
		'departs_return':departs_return,
		'arrives_return':arrives_return
		
	},function(){
		window.location.reload();
	});
	

}


function setSelectTime2(time_id,time_id2,id,date_start,date_end){

	var departs_outward = (time_id!="")? document.getElementById('departs_outward['+time_id+']').value:'';
	var arrives_outward = (time_id!="")? document.getElementById('arrives_outward['+time_id+']').value:'';
	var departs_return = (time_id2!="")? document.getElementById('departs_return['+time_id2+']').value:'';
	var arrives_return = (time_id2!="")? document.getElementById('arrives_return['+time_id2+']').value:'';

	$.ajax({
		type:"GET",
		url: url+"/route/add_edit_booking",
		data: {
			
			'set':'time',
			'time_id':time_id,
			'time_id2':time_id2,
			'departs_outward':departs_outward,
			'arrives_outward':arrives_outward,
			'departs_return':departs_return,
			'arrives_return':arrives_return
		},
		beforeSend:function(){
			showProgress();
		},
		success: function (data) {
			setTimeout(function(){
				hideOverlay();
				getBookingRight2(id,date_start,date_end);
			},1000);
		}
	});	 //  end ajax

}

function setSelectTime3(time_id,p,id){

	var departs_outward = new Array('');
	var arrives_outward = new Array('');
	var time_id2 = new Array('');

	for(var p=1; p<=id; p++){
		$('.table-booking tr td #check-booking-'+p).each(function(i){
			if(document.getElementsByName("check-booking["+p+"]").item(i).checked==true){
				time_id2[p] = (time_id!="")? document.getElementsByName("check-booking["+p+"]").item(i).value:'';
				departs_outward[p] = (time_id!="")? document.getElementById('departs_outward-'+p+'-'+document.getElementsByName("check-booking["+p+"]").item(i).value).value :'';
				arrives_outward[p] = (time_id!="")? document.getElementById('arrives_outward-'+p+'-'+document.getElementsByName("check-booking["+p+"]").item(i).value).value:'';
			}
		})
	}

	var car_price = $("#car_price").val();
	var people_price = $("#people_price").val();

	$.ajax({
		type:"GET",
		url: url+"/route/add_to_booking3",
		data: {
			
			'set':'time',
			'car_price':car_price,
			'people_price':people_price,
			'time_id':time_id2,
			'departs_outward':departs_outward,
			'arrives_outward':arrives_outward,
		},
		beforeSend:function(){
			showProgress();
		},
		success: function (data) {
			setTimeout(function(){
				hideOverlay();
				//getBookingRight();
			},1000);
		}
	});	 //  end ajax

}


function setDisabled(){

	$("#type").attr("disabled","disabled").animate({opacity: 0.5}, 0);
	$("#alternate_start").attr("readonly","readonly").attr("disabled","disabled").animate({opacity: 0.5}, 0);
	$("#alternate_end").attr("readonly","readonly").attr("disabled","disabled").animate({opacity: 0.5}, 0);
	$("#outward_people_num").attr("disabled","disabled").animate({opacity: 0.5}, 0);
	$("#outward_car_num").attr("disabled","disabled").animate({opacity: 0.5}, 0);
	$("#pro_code").attr("readonly","readonly").animate({opacity: 0.5}, 0);

}

function setShowRouteType(val){

	if($("#route").val()!=""){

		if(val==1){
			$("#alternate_end").removeAttr("disabled").animate({opacity: 1}, 200)
		}else if(val==2){
			$("#alternate_end").attr("readonly","readonly").attr("disabled","disabled").animate({opacity: 0.5}, 0);
		}
	}

}


function setRouteType(val){

	if(val==1){
		$("#alternate_start").removeAttr("disabled").animate({opacity: 1}, 200);
		$("#alternate_end").removeAttr("disabled").animate({opacity: 1}, 200);

	}else{

		$("#alternate_start").removeAttr("disabled").animate({opacity: 1}, 200);
		$("#alternate_end").attr({"readonly":"readonly", "disabled":"disabled"}).animate({opacity: 0.5}, 200);

	}


}

function setShowRouteStart(val){

	$.ajax({
		type:"GET",
		url: url+"/route/showRouteStart",
		data: {type:val},
		beforeSend:function(){
		},
		success: function (data) {
			$("#route").html(data);
			setShowRouteEnd('');
		}
	});	 //  end ajax

	if(val==1){
		$("#outward_car_num").removeAttr("disabled").animate({opacity: 1}, 200);
	}else{
		$("#outward_car_num").attr("disabled","disabled").animate({opacity: 0.5}, 0);
		setOneNum('#outward_car_num',0);
	}

}


function setShowRouteEnd(val){

	var type = $("#service").val();


	$.ajax({
		type:"GET",
		url: url+"/route/showRouteEnd",
		data: {type:type, id:val},
		beforeSend:function(){
		},
		success: function (data) {
			$("#route_to").html(data);
		}
	});	 //  end ajax

}


function setShowRoute(val){

	if(val != ""){
		$("#type").removeAttr("disabled").animate({opacity: 1}, 200);
		if(document.getElementsByName('route_type').item(0).checked==true){
			$("#alternate_start").removeAttr("disabled").animate({opacity: 1}, 200);
			$("#alternate_end").removeAttr("disabled").animate({opacity: 1}, 200)
		}else{
			$("#alternate_start").removeAttr("disabled").animate({opacity: 1}, 200);
			$("#alternate_end").attr("readonly","readonly").attr("disabled","disabled").animate({opacity: 0.5}, 0);
		}
		getRightMap2(val);
		$("#pro_code").removeAttr("readonly").animate({opacity: 1}, 200);

	}else{
		setDisabled();
	}


}


function setShowType(val){

	if(val == '100100'){
		$("#outward_people_num").removeAttr("disabled").animate({opacity: 1}, 200);
		$("#outward_car_num").attr("disabled","disabled").animate({opacity: 0.5}, 200);
		$("#outward_people_num").val(1);
		$("#outward_car_num").val(0);
		/*setOneNum('#outward_people_num',1);
		setOneNum('#outward_car_num',0);*/
	}else if(val != ""){
		$("#outward_people_num").removeAttr("disabled").animate({opacity: 1}, 200);
		$("#outward_car_num").removeAttr("disabled").animate({opacity: 1}, 200);
		$("#outward_people_num").val(0);
		$("#outward_car_num").val(1);
		/*setOneNum('#outward_people_num',0);
		setOneNum('#outward_car_num',1);*/
	}else{
		$("#outward_people_num").attr("disabled","disabled").animate({opacity: 0.5}, 200);
		$("#outward_car_num").attr("disabled","disabled").animate({opacity: 0.5}, 200);
		$("#outward_people_num").val(0);
		$("#outward_car_num").val(0);
	}

}


function setShowType2(val){

	if(val == 100100){
		$("#outward_people_num").removeAttr("disabled").animate({opacity: 1}, 200);
		$("#outward_car_num").attr("disabled","disabled").animate({opacity: 0.5}, 200);
		setOneNum('#outward_people_num',1);
		setOneNum('#outward_car_num',0);
	}else if(val != ""){
		$("#outward_people_num").removeAttr("disabled").animate({opacity: 1}, 200);
		$("#outward_car_num").removeAttr("disabled").animate({opacity: 1}, 200);
		setOneNum('#outward_people_num',0);
		setOneNum('#outward_car_num',1);
	}else{
		$("#outward_people_num").attr("disabled","disabled").animate({opacity: 0.5}, 200);
		$("#outward_car_num").attr("disabled","disabled").animate({opacity: 0.5}, 200);
		setOneNum('#outward_people_num',0);
		setOneNum('#outward_car_num',0);
	}

}



function setShowType3(val){

	if(val == '100100'){
		$(".main-booking #outward_people_num").removeAttr("disabled").animate({opacity: 1}, 200);
		$(".main-booking #outward_car_num").attr("disabled","disabled").animate({opacity: 0.5}, 200);
		setOneNum('.main-booking #outward_people_num',1);
		setOneNum('.main-booking #outward_car_num',0);
	}else if(val != ""){
		$(".main-booking #outward_people_num").removeAttr("disabled").animate({opacity: 1}, 200);
		$(".main-booking #outward_car_num").removeAttr("disabled").animate({opacity: 1}, 200);
		setOneNum('.main-booking #outward_people_num',0);
		setOneNum('.main-booking #outward_car_num',1);

	}else{
		$(".main-booking #outward_people_num").attr("disabled","disabled").animate({opacity: 0.5}, 200);
		$(".main-booking #outward_car_num").attr("disabled","disabled").animate({opacity: 0.5}, 200);
		setOneNum('.main-booking #outward_people_num',0);
		setOneNum('.main-booking #outward_car_num',0);
	}

}

function setOneNum(id,num){

	$(id+" option").removeAttr('selected').filter('[value='+num+']').attr('selected', true);

	/*$(id+" option").each(function(i){
	 if(num>=1){
	 if($(this).val()==num){
	 $(this).attr("selected",true);
	 }
	 }else{
	 if($(this).val()==0){
	 $(this).attr("selected",true);
	 }
	 }

	 });*/

}


function setPeopleReturn(val){

	if(document.getElementsByName('route_type').item(0).checked==true){
		$('#return_people_num option').each(function(i){
			if($(this).val()==val){
				$(this).attr("selected","selected");
			}
		})
	}

}


function setCarReturn(val){

	if(document.getElementsByName('route_type').item(0).checked==true){
		$('#return_car_num option').each(function(i){
			if($(this).val()==val){
				$(this).attr("selected","selected");
			}
		})
	}

}



function setDisabledCar(){

	$(".booking-car #route_end").attr("disabled","disabled").animate({opacity: 0.5}, 0);
	$(".booking-car #alternate_start2").attr("readonly","readonly").attr("disabled","disabled").animate({opacity: 0.5}, 0);
	$(".booking-car #alternate_end2").attr("readonly","readonly").attr("disabled","disabled").animate({opacity: 0.5}, 0);
	$(".booking-car #outward_people_num").attr("disabled","disabled").animate({opacity: 0.5}, 0);
	$(".booking-car #pro_code").attr("readonly","readonly").animate({opacity: 0.5}, 0);

}


function setShowRouteTypeCar(val){

	if($(".booking-car #route").val()!=""){

		if(val==1){
			$(".booking-car #alternate_end2").removeAttr("disabled").animate({opacity: 1}, 200)
		}else if(val==2){
			$(".booking-car #alternate_end2").attr("readonly","readonly").attr("disabled","disabled").animate({opacity: 0.5}, 0);
		}
	}

}



function setRouteTypeCar(val){

	if(val==1){
		$("#alternate_start2").removeAttr("disabled").animate({opacity: 1}, 200);
		$("#alternate_end2").removeAttr("disabled").animate({opacity: 1}, 200);
	}else{
		$("#alternate_start2").removeAttr("disabled").animate({opacity: 1}, 200);
		$("#alternate_end2").attr({"readonly":"readonly", "disabled":"disabled"}).animate({opacity: 0.5}, 200);
	}


}



function setShowRouteCar(val){

	var service = document.getElementById('route_type2').value;
	if(val != ""){
		$(".booking-car #route_end").removeAttr("disabled").animate({opacity: 1}, 200);
		if((document.getElementById('route_type2').value==1 && document.getElementsByName('route_type2').length == 1)  || (document.getElementsByName('route_type2').item(0).checked == true && document.getElementsByName('route_type2').length == 2)){
			$("#alternate_start2").removeAttr("disabled").animate({opacity: 1}, 200);
			$("#alternate_end2").removeAttr("disabled").animate({opacity: 1}, 200);
			$(".booking-car #outward_people_num").removeAttr("disabled").animate({opacity: 1}, 200);
		}else{
			$(".booking-car #alternate_start2").removeAttr("disabled").animate({opacity: 1}, 200);
			$(".booking-car #alternate_end2").attr("readonly","readonly").attr("disabled",'disabled').animate({opacity: 0.5}, 0);
			$(".booking-car #outward_people_num").removeAttr("disabled").animate({opacity: 1}, 200);
		}

		$(".booking-car #pro_code").removeAttr("readonly").animate({opacity: 1}, 200);

	}else{
		setDisabledCar();
	}

	getRouteEnd(val,'',service);


}

function setShowRouteCar2(val,service){

	if(val != ""){
		$(".booking-car #route_end").removeAttr("disabled").animate({opacity: 1}, 200);
		if((document.getElementById('route_type2').value==1 && document.getElementsByName('route_type2').length == 1)  || (document.getElementsByName('route_type2').item(0).checked == true && document.getElementsByName('route_type2').length == 2)){
			$("#alternate_start2").removeAttr("disabled").animate({opacity: 1}, 200);
			$("#alternate_end2").removeAttr("disabled").animate({opacity: 1}, 200);
			$(".booking-car #outward_people_num").removeAttr("disabled").animate({opacity: 1}, 200);
		}else{
			$(".booking-car #alternate_start2").removeAttr("disabled").animate({opacity: 1}, 200);
			$(".booking-car #alternate_end2").attr("readonly","readonly").attr("disabled",'disabled').animate({opacity: 0.5}, 0);
			$(".booking-car #outward_people_num").removeAttr("disabled").animate({opacity: 1}, 200);
		}

		$(".booking-car #pro_code").removeAttr("readonly").animate({opacity: 1}, 200);

	}else{
		setDisabledCar();
	}

	getRouteEnd(val,'',service);


}

function getRouteEnd(start,type,service){

	$.ajax({
		type:"GET",
		url: url+"/route/routeEnd",
		data: {'start':start, 'type':type, 'TID':service},
		success: function (data) {
			$('.show_route_end').html(data);
		}
	});

}

function setPeopleReturnCar(val){

	if((document.getElementById('route_type2').value==1 && document.getElementsByName('route_type2').length == 1)  || (document.getElementsByName('route_type2').item(0).checked == true && document.getElementsByName('route_type2').length == 2)){
		$('.booking-car #return_people_num option').each(function(i){
			if($(this).val()==val){
				$(this).attr("selected","selected");
			}
		})
	}

}

function showBookingType(type){

	if(type==1){
		$(".main-booking").fadeIn(300);
		$(".main-booking2").fadeOut(0);
	}else{
		$(".main-booking2").fadeIn(300);
		$(".main-booking").fadeOut(0);
	}

}


function showShipCarRoute(type){

	routeService = type;

	$.ajax({
		type:"GET",
		url: url+"/route/showRouteCar",
		data: {"type":type},
		success: function (data) {
			$(".showShipCarRoute").html(data);
		}
	});	 //  end ajax

}




function showShipCarRoute2(type,start,end){

	$.ajax({
		type:"GET",
		url: url+"/route/showRouteCar2",
		data: {"type":type,"start":start},
		success: function (data) {
			$(".showShipCarRoute").html(data);
			getRouteEnd(start,end);
		}
	});	 //  end ajax

}

function checkTicketNo(e,id){


}

function setLanguage(th,en){

	return en;
}


function checkTicketNo2(e,id){

	$.ajax({
		type:"GET",
		url: url+"/route/checkTicketNo",
		data: {"val":e.value,"id":id},
		beforeSend:function(){

		},
		success: function (status) {

			if(status==0){
				alertPopup("เลขที่ตั๋วนี้ มีอยู่ในระบบแล้ว");
				e.focus();
			}

			return false;

		}
	});	 //  end ajax


}


function getTicketType(type,val){

	$.ajax({
		type:"GET",
		url: url+"/route/getTicketType",
		data: {"val":val, "type":type},
		beforeSend:function(){},
		success: function (data) {
			$("#form-booking #type").html(data);
		}
	});	 //  end ajax

}


function getTopuopbalance(type,page){

	$.ajax({
		type:"GET",
		url: url+"/route/get_topup_balance",
		data: {"type":type, "page":page},
		beforeSend:function(){
			$("#table-topup-balance #loading").fadeIn(0);
		},
		success: function (data) {
			if(data!=""){
				$("#table-topup-balance #showData").append(data);
				getTopuopbalance(type,page+1);
				runNumbertable();
			}else{
				$("#table-topup-balance #loading").remove();
			}

		}
	});

}


function getTopuopbalance2(type,page){

	$.ajax({
		type:"GET",
		url: url+"/route/get_topup_balance",
		data: {"type":type, "page":page},
		beforeSend:function(){
			$("#table-topup-balance #loading").fadeIn(0);
		},
		success: function (data) {
			if(data!=""){
				$("#table-topup-balance #showData").append(data);
				getTopuopbalance(type,page+1);
				runNumbertable();
			}else{
				$("#table-topup-balance #loading").remove();
				window.print();
			}

		}
	});

}


function runNumbertable(){

	$("#showData #num").each(function (i){
		$(this).html(i+1);
	})

	var total = 0;
	$("#showData #total").each(function (i){
		total += parseFloat($(this).html().replace(",",''));
	})

	$("#table-topup-balance tfoot #total").html(total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));

}

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function checkEmail(email) {

	setTimeout(function(){
		if (validateEmail(email)) {
			$(".form-email").removeClass('error')
			$("input#email").removeClass('red').addClass('strong');
		} else {
			$("input#email").removeClass('strong').addClass('red');
			$(".form-email").addClass('error');
		}
	},200)
}

function isPhoneNumber(p,id) {

	var val = p.value;
	var phoneRe = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
	var res = val.substring(0, 2);

	if(res=='02'){

		$('#'+id).keypress(function(event){
			if(event.which != 8 && event.which != 46 && isNaN(String.fromCharCode(event.which))){
				event.preventDefault(); //stop character from entering input
			}
		});

		$("#"+id).on('keyup',function () {
			var max = 9;
			var txt = $(this).val();
			$(this).val(txt.substr(0,max));
		})

	}else if(val.substring(0, 1)=="0"){

		$('#'+id).keypress(function(event){
			if(event.which != 8 && event.which != 46 && event.which != 46 && isNaN(String.fromCharCode(event.which))){
				event.preventDefault(); //stop character from entering input
			}
		});

		$("#"+id).on('keyup',function () {
			var max = 10;
			var txt = $(this).val();
			$(this).val(txt.substr(0,max));
		})

	}else{

		var digits = val.replace(/\D/g, "");
		if(phoneRe.test(digits)==true){

		}
	}

}

function showProgress(){

}