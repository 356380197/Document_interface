// JavaScript Document
$(document).ready(function(e) {
	var myact_url = http_url+"/activity/activity/list_by_user";
	var myoveract_url=http_url+"/activity/posts/list_in_activity";
	var userId = sessionStorage.getItem("useid");
	var pageNo = 1;
	var maxResults = 5;
	$("#my-act").bind("click",function(){
		window.location.href="movable-page.html?user_id="+userId;
	})
	
	var myact_start={
		loading:$(".loading"),
		mack:$(".mack"),
		dialog:$(".dialog"),
		main:$(".main"),
		online_act:$(".online_act"),
		over_act:$(".over_act"),
		act_box:".act_box",
		list:{
			ajax1:function(){
				$.ajax({
					url:myact_url,
					type:"POST",
					contentType:contenttype,
					dataType:"json",
					data:JSON.stringify({
						userId:userId,
						pageNo:pageNo,
						maxResults:maxResults
					}),
					timeout:10000,
					success: function(data){
						if(data.data.results.length<5){
							$(".onloading").text("没有更多了");
						}
						myact_start.loading.hide();
						myact_start.mack.hide();
						myact_start.main.show();
						if(data.data.results!=""){
							myact_start.list.appendlist(data.data);
							pageNo++;
						}else{
							$(".onloading").text("没有更多了");
						}
						initPhotoSwipeFromDOM('.demo-gallery');
					},
					error:function(){
						myact_start.mack.show();
						myact_start.dialog.show();
					}
				})
			},
			ajax2:function(overid,thiss,title){
				$.ajax({
					url:myoveract_url,
					type:"POST",
					contentType:contenttype,
					dataType:"json",
					data:JSON.stringify({
						userId:userId,
						activityId:overid
					}),
					timeout:10000,
					success: function(data){
						myact_start.list.appendoverlist(data.data,thiss,title);
					},
					error:function(){
						myact_start.mack.show();
						myact_start.dialog.show();
					}
				})
			},
			appendlist:function(datalist){
				for(var i=0;i<datalist.results.length;i++){
					if(datalist.results[i].isonline==1){
						myact_start.online_act.append('<p class="act_tit" id="'+datalist.results[i].id+'"><a href="#" class="start_txt">'+datalist.results[i].title+' >></a></p><div class="act_box"></div>');
						myact_start.list.appendonlinetie(datalist,i,datalist.results[i].id);
						/*$("#"+datalist.results[i].id).click(function(){
							$(this).next(myact_start.act_box).toggle();
						});*/
						
					}else if(datalist.results[i].isonline==2){
						myact_start.over_act.append('<p class="clearfix act_tit" id="'+datalist.results[i].id+'"><a href="#" class="end_txt">'+datalist.results[i].title+' >></a><span class="fr badge_arrow"><i class="badge">已结束</i></span></p><div class="act_box"></div>');
						myact_start.list.ajax2(datalist.results[i].id,$("#"+datalist.results[i].id).next(),datalist.results[i].keyword);
						//myact_start.list.overact_onlick(datalist.results[i].id);
					}
				}
			},
			appendonlinetie:function(datalist,i,actid){
				var onlineact = '',peravatar='';
				for(var n=0;n<datalist.results[i].posts.length;n++){
					
					if(datalist.results[i].posts[n].user.avatar==""){
						peravatar="images/avatar.png";
					}else{
						peravatar=datalist.results[i].posts[n].user.avatar;
					}
					onlineact='<div class="dynamic_box activity_my clearfix" id="'+datalist.results[i].posts[n].id+'">'
					          +'<div class="person fl">'
					          +'<img src="'+datalist.results[i].posts[n].user.avatar+'" width="100%"/>'
					          +'</div>'
					          +'<div class="dynamic_con fr">'
					          +'<div class="dyn_tit">'
					          +'<h3>'+datalist.results[i].posts[n].user.fullName+'</h3>'
					          +'<span class="dyn_time">'+datalist.results[i].posts[n].createTime+'</span>'
					          +'</div>'
					          +'<div class="clear"></div>'
					          +'<div class="dyn_articl">'
					          +'<a href="javascript:void(0)">'+datalist.results[i].posts[n].content+'</a>'
					          +'</div>'
					          +'<div class="dyn_cz">'
					          +'<span class="zan"><a><img src="images/icon/icon4_2.png" width="13" height="12">'+datalist.results[i].posts[n].praiseNum+'</a></span>'
					          +'<span><a><img src="images/icon/icon5_2.png" width="13" height="13">'+datalist.results[i].posts[n].commentNum+'</a></span>'
					          +'</div>'
					          +'</div>'
					          +'</div>';
					$("#"+datalist.results[i].posts[n].id).find(".dyn_time").text(datalist.results[i].posts[n].createTime.substring(0,16));
					$("#"+actid).next(".act_box").append(onlineact);
					if(datalist.results[i].keyword!=null){
						var keyword='<a href="#" class="actname">'+datalist.results[i].keyword+'</a> ';
						$("#"+datalist.results[i].posts[n].id).find(".dyn_articl").prepend(keyword);
					}
					
					var rankhtml='<div class="number"><p>第'+datalist.results[i].posts[n].ranking+'名</p><img src="images/no'+datalist.results[i].posts[n].ranking+'.png" width="100%"></div>';
					if(datalist.results[i].posts[n].ranking>0){
						$("#"+datalist.results[i].posts[n].id).prepend(rankhtml);
						if(datalist.results[i].posts[n].ranking>3){
							$("#"+datalist.results[i].posts[n].id).find(".number img").attr("src","images/no4.png");
						}
					}
					
					
					myact_start.list.appendonline_tie_pic(datalist,i,n,datalist.results[i].posts[n].id);
				}
			},
			appendonline_tie_pic:function(datalist,i,n,tieid){
				var photobox='',onlinepic='',video='',videolen,videohttp='';
				//console.log(datalist.results[i].posts[n].pics)
				if(datalist.results[i].posts[n].pics.length>0){
					photobox='<div class="dyn_photo demo-gallery" id="demo-test-gallery"><ul></ul><div class="clear"></div></div>';
					$("#"+tieid).find(".dynamic_con").append(photobox);
					for(var x=0;x<datalist.results[i].posts[n].pics.length;x++){
						onlinepic='<li class="gallery-item">'
//						          +'<a href="'+datalist.results[i].posts[n].pics[x][0]+'"><img src="'+datalist.results[i].posts[n].pics[x][1]+'" width="100%">'
                                  +'<a href="'+datalist.results[i].posts[n].pics[x][0]+'" data-size="1600x1600" data-med="'+datalist.results[i].posts[n].pics[x][0]+'" data-med-size="1024x1024" data-author="Folkert Gorter" class="demo-gallery__img--main">'
					              +'<img src="'+datalist.results[i].posts[n].pics[x][1]+'" width="100%">'
						          +'</a>'
						          +'</li>';
						$("#"+tieid).find(".dyn_photo").find("ul").append(onlinepic);
						if(x==8){return false;}
					}
				}else if(datalist.results[i].posts[n].videoName!=""){
					video=datalist.results[i].posts[n].bucket+'.'+datalist.results[i].posts[n].domain+datalist.results[i].posts[n].videoName;
					videolen=video.length-3
					videohttp=video.substr(0,videolen);
					photobox='<div class="videobox" videosrc="http://'+video+'" onclick="video(this)"><img src="images/icon/shipin_icon.png" width="40" height="40" class="shipinicon"><img src="http://'+videohttp+'jpg" width="100%"></div>';
					$("#"+tieid).find(".dynamic_con").append(photobox);
				}
				
			},
			/*overact_onlick:function(overid){
				$("#"+overid).click(function(){
					var title=$(this).find(".end_txt").text();
					
					if($(this).next(myact_start.act_box).hasClass("dis_none") && $(this).next(myact_start.act_box).find(".dynamic_box").length>0){
						$(this).next(myact_start.act_box).removeClass("dis_none");
						mscroh=$(this).next(myact_start.act_box).height();
					}else if($(this).next(myact_start.act_box).hasClass("dis_none")){
						myact_start.list.ajax2(overid,$(this).next(),title,$(this));
						$(this).next(myact_start.act_box).removeClass("dis_none");
					}else{
						$(this).next(myact_start.act_box).addClass("dis_none");
						mscroh=$(this).next(myact_start.act_box).height();
					}
						
				})
			},*/
			appendoverlist:function(datalist,thiss,keyword){
				var overcon='',keywords='',photobox='',overpic='',video='',videolen,videohttp='',peravatar='';
				for(var i=0;i<datalist.length;i++){
					if(datalist[i].user.avatar==""){
						peravatar="images/avatar.png";
					}else{
						peravatar=datalist[i].user.avatar;
					}
					overcon='<div class="dynamic_box activity_my clearfix" id="'+datalist[i].id+'">'
					        +'<div class="person fl"><img src="'+peravatar+'" width="100%"/></div>'
					        +'<div class="dynamic_con fr">'
					        +'<div class="dyn_tit">'
					        +'<h3>'+datalist[i].user.fullName+'</h3>'
					        +'<span class="dyn_time">'+datalist[i].createTime+'</span>'
					        +'</div>'
					        +'<div class="clear"></div>'
					        +'<div class="dyn_articl"><a href="javascript:void(0)">'+datalist[i].content+'</a></div>'
					        +'<div class="dyn_cz">'
					        +'<span class="zan"><a><img src="images/icon/icon4_2.png" width="13" height="12">'+datalist[i].praiseNum+'</a></span>'
					        +'<span><a><img src="images/icon/icon5_2.png" width="13" height="13">'+datalist[i].commentNum+'</a></span>'
					        +'</div>'
					        +'</div>'
					        +'</div>';
					thiss.append(overcon);
					if(keyword!=null){
						keywords='<a href="#" class="actname">'+keyword+'</a> ';
						$("#"+datalist[i].id).find(".dyn_articl").prepend(keywords);
					}
					if(datalist[i].pics.length>0){
						photobox='<div class="dyn_photo"><ul></ul><div class="clear"></div></div>';
						$("#"+datalist[i].id).find(".dynamic_con").append(photobox);
						for(var x=0;x<datalist[i].pics.length;x++){
							overpic='<li><img src="'+datalist[i].pics[x][1]+'" i="'+datalist[i].pics[x][0]+'" width="100%"></li>';
							$("#"+datalist[i].id).find(".dyn_photo").find("ul").append(overpic);
							if(x==8){return false;}
						}
					}else if(datalist[i].videoName!=""){
						video=datalist[i].bucket+'.'+datalist[i].domain+datalist[i].videoName;
						videolen=video.length-3
						videohttp=video.substr(0,videolen);
						photobox='<div class="videobox"><img src="http://'+videohttp+'jpg" width="100%"></div>';
						$("#"+datalist[i].id).find(".dynamic_con").append(photobox);
						
						onlinepic='<div><video width="100%" height="100%" src="http://'+video+'" controls></div>';
						$("#"+datalist[i].id).find(".videobox").append(onlinepic);
					}
					$("#"+datalist[i].id).find(".dyn_time").text(datalist[i].createTime.substring(0,16));
				}
			},
			init:function(){
				myact_start.online_act.empty();
				myact_start.over_act.empty()
				
				myact_start.list.ajax1();
				
				
				$("body").on("click",".dyn_articl a:last-child",function(){
					window.location.href='allcomment.html?user_id='+userId+'&tietid='+$(this).parents(".dynamic_box").attr("id");
				});
				
				//photo.photoshow();
				
			}
		}
	}
	myact_start.list.init();
	
	
	$("html").scroll(function () {
		var scrollTop = $(this).scrollTop();
		var scrollHeight = $(document).height();
		var windowHeight = $(this).height();
		if (scrollTop + windowHeight == scrollHeight) {
			myact_start.list.ajax1();

		}
	});
});
function video(thiss){
	var videosrc=$(thiss).attr("videosrc");
	window.location.href='video.html?videosrc='+videosrc;
}
