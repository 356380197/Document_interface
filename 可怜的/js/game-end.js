// JavaScript Document
var userId=sessionStorage.getItem("useid");
$(document).ready(function(e) {
	$(".activity_dyn:last").css("margin-bottom","0");
	
	var suc=true;
	
	var prize_url=game_http_url+"/activity/activity/view";
	var list_url=game_http_url+"/activity/posts/list";
	var zan_url=game_http_url+"/activity/praise/save";
	var del_zan_url = game_http_url+"/activity/praise/remove";

	
	var id=sessionStorage.getItem("id");
	var isRanking=sessionStorage.getItem("isRanking");
	var activityId=sessionStorage.getItem("activityId");
	//var id=19;
//	var isRanking=true;
    var createTime;
	var pageNo=1,maxResults=5;
	var keyword;
	
	var prize_start={
		loading:$(".loading"),
		mack:$(".mack"),
		dialog:$(".dialog"),
		start:$(".start"),
		time:$(".time"),
		act_con:$(".con p"),
		imgbox:$(".imgbox img"),
		detail:$(".detail"),
		tab_box:$(".tab_box"),
		tab_show:$(".tab_show"),
		act_box:$(".act_box"),
		versions: function() {
					var u = navigator.userAgent, app = navigator.appVersion;
					return {//移动终端浏览器版本信息 
					trident: u.indexOf('Trident') > -1, //IE内核
					presto: u.indexOf('Presto') > -1, //opera内核
					webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
					gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
					mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
					ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
					android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
					iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
					iPad: u.indexOf('iPad') > -1, //是否iPad
					webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
					};
					}(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase(),
		pageNo:1,
		ajax1:function(){
			$.ajax({
				url:prize_url,
				type:"POST",
				contentType:contenttype,
				dataType:"JSON",
				data:JSON.stringify({
					userId:userId,
					id:id,
					activityId:activityId
				}),
				timeout:10000,
				success: function(data){
					prize_start.loading.hide();
					prize_start.mack.hide();
					
		            shareUrl = data.data.url
					keyword=data.data.keyword;
					prize_start.appendactdetail(data.data);
					
				},
				error:function(){
					prize_start.mack.show();
					prize_start.dialog.show();
				}
			})
		},
		ajax2:function(isRanking){
			suc=false;
			$.ajax({
				url:list_url,
				type:"POST",
				contentType:contenttype,
				dataType:"JSON",
				data:JSON.stringify({
					userId:userId,
					id:id,
					isRanking:isRanking,
					pageNo:pageNo,
					maxResults:maxResults,
					createTime:createTime,
					activityId:activityId
				}),
				timeout:10000,
				success: function(data){
					console.log(data);
					if(data.data.results.length<5){
						$(".onloading").show().text("没有更多了");
					}
					prize_start.loading.hide();
					
					if(data.data.results!=""){
						
						prize_start.appendactlist(data.data,isRanking);
						pageNo++;
					}else{
						$(".onloading").text("没有更多了");
					}
					suc=true;
					initPhotoSwipeFromDOM('.demo-gallery');
				},
				error:function(){
					prize_start.mack.show();
					prize_start.dialog.show();
				}
			})
		},
		ajax3:function(thiss,targetId,targetType,activityId){
			$.ajax({
				url:zan_url,
				contentType:contenttype,
				type:"POST",
				dataType:"Json",
				data:JSON.stringify({
					userId:userId,
					activityId:activityId,
					targetId:targetId,
					targetType:targetType
				}),
				success: function(data){
					console.log(data)
					prize_start.data(data)
					var zans=parseInt(thiss.find("i").text())+1;
					thiss.find("img").attr("src","images/icon/icon4_3.png");
					thiss.find("i").text(zans);
					thiss.find("i").show();
					thiss.attr("praiseid",1);
				},
				error:function(){
					alert("您没有赞成功");
					return;
				}
			})
		},
		data:function(data_list){
			zan();
		}
		ajax4:function(zthis,zanid){
			$.ajax({
				url:del_zan_url,
				contentType:contenttype,
				type:"POST",
				dataType:"Json",
				data:JSON.stringify({
					userId:userId,
					activityId:activityId,
					id:id
				}),
				success: function(data){
				    var delzan = parseInt(zthis.find("i").text())-1;
				    var delzans = zthis.find("i").attr("num");
				    if(delzans == 0){
						zthis.find("i").hide();
					}
				    zthis.find("img").attr("src","images/icon/icon4.png");
				    zthis.find("i").text(delzan);
				    zthis.attr("praiseid","null");
//				    myrefresh();
					console.log(data)
					
				},
				error:function(){
					alert("您点赞失败");
					return;
				}
			})
		},
		appendactdetail:function(datalist){
			prize_start.start.html(datalist.title);
			prize_start.time.html(datalist.startDate.substring(0,16));
			prize_start.act_con.html(datalist.description);
			prize_start.imgbox.attr("src",datalist.pic);
			prize_start.detail.attr("href",datalist.url+"?user_id="+userId);
			prize_start.imgbox.parent("a").attr("href",datalist.url+"?user_id="+userId);
		},
		appendactlist:function(datalist,isRanking){
			var prize_list='',prize_list2,peravatar='',zansrc,comnum;
			for(var i=0;i<datalist.results.length;i++){
				if(datalist.results[i].user.avatar==""){
					peravatar="images/avatar.png";
				}else{
					peravatar=datalist.results[i].user.avatar;
				}
				
				zansrc='images/icon/icon4.png';
				end_zansrc ='images/icon/icon4_2.png'
				comnum=datalist.results[i].praiseNum;
				if(datalist.results[i].praiseId!=null){
					zansrc='images/icon/icon4_3.png';
					//comnum="已赞";
				}
				if(datalist.results[i].isRanking==0){isRanking=true;}else{isRanking=false}
				prize_list='<div class="dynamic_box" id="'+datalist.results[i].id+'">'
				          +'<div class="gamebox">'
				          +'<div class="gametit">'
				          +'<span>第一名</span>'
				          +'<span>张美丽</span>'
				          +'<span>12156票</span>'
				          +'</div>'
				          +'</div>'
				          +'<div class="number">'
				          +'<p>第'+datalist.results[i].ranking+'名</p>'
				          +'<img src="images/no'+(i+1)+'.png" width="100%">'
				          +'</div>'
				          +'<div class="person fl">'
				          +'<img src="'+peravatar+'" width="100%"/>'
				          +'</div>'
				          +'<div class="dynamic_con fr">'
				          +'<div>'
				          +'<div class="dyn_tit">'
				          +'<h3>'+datalist.results[i].user.fullName+'</h3>'
				          +'<span class="dyn_time">'+datalist.results[i].createTime+'</span>'
				          +'</div>'
				          +'<div class="clear"></div>'
				          +'<div class="dyn_articl" i="'+datalist.results[i].id+'" onclick="gocom(this)">'+datalist.results[i].content+'</div>'
				          +'<div class="dyn_cz">'
				          +'<span class="zan"><a><img src="images/icon/icon4_2.png" width="13" height="12"><i class="zansnum">'+datalist.results[i].praiseNum+'</i></a></span>'
				          +'<span><a><img src="images/icon/icon5.png" width="13" height="13" i="'+datalist.results[i].id+'" onclick="gocom(this)"><i class="comnum">'+datalist.results[i].commentNum+'</i></a></span>'
				          +'</div>'
				          +'</div>'
				          +'</div>'
				          +'<div class="clear">'
				          +'</div></div>';
				
				prize_list2='<div class="dynamic_box activity_dyn" id="'+datalist.results[i].id+'">'
				            +'<div class="person fl">'
				            +'<img src="'+peravatar+'" width="100%"/>'
				            +'</div>'
				            +'<div class="dynamic_con fr" id="'+datalist.results[i].id+'">'
				            +'<div>'
				            +'<div class="dyn_tit">'
				            +'<h3>'+datalist.results[i].user.fullName+'</h3>'
				            +'<span class="dyn_time">'+datalist.results[i].createTime+'</span>'
				            +'</div>'
				            +'<div class="clear"></div>'
				            +'<div class="dyn_articl" i="'+datalist.results[i].id+'" onclick="gocom(this)">'+datalist.results[i].content+'</div>'
				            +'<div class="dyn_cz">'
				            +'<span class="zan tiezan"><a praiseid="'+datalist.results[i].praiseId+'"><img src="'+zansrc+'" width="13" height="12"><i tartype="0" class="zansnum" num="'+datalist.results[i].praiseNum+'">'+comnum+'</i></a></span>'
				            +'<span><a><img src="images/icon/icon5.png" width="13" height="13" i="'+datalist.results[i].id+'" onclick="gocom(this)"><i class="comnum">'+datalist.results[i].commentNum+'</i></a></span>'
				            +'</div>'
				            +'</div>'
				            +'</div>'
				            +'<div class="clear"></div>'
				            +'</div>';
			   prize_list3='<div class="dynamic_box activity_dyn" id="'+datalist.results[i].id+'">'
				            +'<div class="person fl">'
				            +'<img src="'+peravatar+'" width="100%"/>'
				            +'</div>'
				            +'<div class="dynamic_con fr" id="'+datalist.results[i].id+'">'
				            +'<div>'
				            +'<div class="dyn_tit">'
				            +'<h3>'+datalist.results[i].user.fullName+'</h3>'
				            +'<span class="dyn_time">'+datalist.results[i].createTime+'</span>'
				            +'</div>'
				            +'<div class="clear"></div>'
				            +'<div class="dyn_articl" i="'+datalist.results[i].id+'" onclick="gocom(this)">'+datalist.results[i].content+'</div>'
				            +'<div class="dyn_cz">'
				            +'<span class="zan endzan"><a praiseid="'+datalist.results[i].praiseId+'"><img src="'+end_zansrc+'" width="13" height="12"><i tartype="0" class="zansnum">'+comnum+'</i></a></span>'
				            +'<span><a><img src="images/icon/icon5_2.png" width="13" height="13" i="'+datalist.results[i].id+'" onclick="gocom(this)"><i class="comnum">'+datalist.results[i].commentNum+'</i></a></span>'
				            +'</div>'
				            +'</div>'
				            +'</div>'
				            +'<div class="clear"></div>'
				            +'</div>';
				createTime = datalist.results[i].createTime;
				if(isRanking==true){
					$(".tab_box .tab_show:first").append(prize_list);
					prize_start.appendactpic(datalist,datalist.results[i].id,i);
					prize_start.appendactcomment(datalist,datalist.results[i].id,i);
				}else{
					$(".tab_box .tab_show:last").append(prize_list3);
					prize_start.act_box.append(prize_list2);
					
					prize_start.appendactpic(datalist,datalist.results[i].id,i);
					prize_start.appendactcomment(datalist,datalist.results[i].id,i);
				}
				
				if(datalist.results[i].ranking>3){
					$("#"+datalist.results[i].id).find(".number img").attr("src","images/no4.png");
				}
				if(datalist.results[i].ranking == 999){
					$("#"+datalist.results[i].id).find(".number img").attr("src","images/no4.png");
					$("#"+datalist.results[i].id).find(".number p").text("已获奖");
				}
				var cr_time = datalist.results[i].createTime;
				$("#"+datalist.results[i].id).find(".dyn_time").text(cr_time.substring(0,16));
				//prize_start.ishavezan(datalist,i);
				if(datalist.results[i].praiseNum == 0 ){
					$("#"+datalist.results[i].id).find(".zansnum").hide();
				}
				if( datalist.results[i].commentNum == 0){
					$("#"+datalist.results[i].id).find(".comnum").hide();
				}
			}
			
		},
		appendactpic:function(datalist,tietid,i){
			var photobox='',onlinepic='',video='',videolen,videohttp='';
			if(datalist.results[i].pics.length>0){
				photobox='<div class="dyn_photo demo-gallery" id="demo-test-gallery"><ul></ul><div class="clear"></div></div>';
				$("#"+tietid).find(".dynamic_con").append(photobox);
				for(var x=0;x<datalist.results[i].pics.length;x++){
					onlinepic='<li>'
//					          +'<img src="'+datalist.results[i].pics[x][1]+'" i="'+datalist.results[i].pics[x][0]+'" width="100%" class="imglist">'
                              +'<a href="'+datalist.results[i].pics[x][0]+'" data-size="1600x1600" data-med="'+datalist.results[i].pics[x][0]+'" data-med-size="1024x1024" data-author="Folkert Gorter" class="demo-gallery__img--main">'
					          +'<img src="'+datalist.results[i].pics[x][1]+'" width="100%">'
					          +'</a>'
					          +'</li>';
					$("#"+tietid).find(".dyn_photo").find("ul").append(onlinepic);
					if(x==8){return false;}
					var img = document.createElement("img");
					img.src =datalist.results[i].pics[x][0];
				}
			}else if(datalist.results[i].videoName!=""){
				video=datalist.results[i].bucket+'.'+datalist.results[i].domain+datalist.results[i].videoName;
				videolen=video.length-3
				videohttp=video.substr(0,videolen);
				photobox='<div class="videobox" videosrc="http://'+video+'" onclick="video(this)"><img src="images/icon/shipin_icon.png" width="40" height="40" class="shipinicon"><img src="http://'+videohttp+'jpg" width="100%"></div>';
				$("#"+tietid).find(".dynamic_con").append(photobox);
				
				//onlinepic='<div><video width="100%" height="100%" src="'++'" controls loop></div>';
//				$("#"+tietid).find(".videobox").append(onlinepic);
			}
		},
		appendactcomment:function(datalist,tietid,i){
			var commentbox='',hotcomment='',more_comment='';
			if(datalist.results[i].hotComment.length>0){
				commentbox='<div class="comment_box" i="'+datalist.results[i].id+'" onclick="gocom(this)"><h2 class="hot_answer"><span></span>热门回复</h2><ul class="comment combg"></ul></div><div class="clear"></div></div>';
				$("#"+tietid).find(".dynamic_con").append(commentbox);
				for(var n=0;n<datalist.results[i].hotComment.length;n++){
					hotcomment='<li><div class="com_tit"><h3>'+datalist.results[i].hotComment[n].user.fullName+'</h3><span class="comtime">'+datalist.results[i].hotComment[n].createTime+'</span></div><p>'+datalist.results[i].hotComment[n].content+'</p></li>';
					$("#"+tietid).find(".dynamic_con").find("ul.comment").append(hotcomment);
					$("#"+tietid).find(".dynamic_con").find(".comtime").text(datalist.results[i].hotComment[n].createTime.substring(0,16));
					//if(n==2){return false;}
				}
				if(datalist.results[i].hotComment.length>=3){
					more_comment='<div class="more_com" i="'+datalist.results[i].id+'" onclick="gocom(this)"><a href="javascript:void(0)">更多评论 <span>》</span></a></div>';
					$("#"+tietid).find(".comment_box").after(more_comment);
				}
			}
		},
		/*ishavezan:function(datalist,i){
			//if(datalist.results[i].praiseId!=null){
				//$("#"+datalist.results[i].id).find(".zan img").attr("src","images/icon/icon4.png");
			//}else{
				$("#"+datalist.results[i].id).find(".zan img").attr("src","images/icon/icon4_2.png");
			//}
			
		},*/
		//点赞
		zan:function(){
			
			$("body").on("click",".tiezan a",function(){
				
//				if(online==1){
	             
	               var zanid = $(this).attr("praiseid")
					if($(this).attr("praiseid")!="null"){
					   prize_start.ajax4($(this),zanid);
					}else{
						var tartype=$(this).find("i").attr("tartype");
//						if(tartype==0){
//							tartype=0
//						}else{
//							tartype=1
//						}
						var targetid=$(this).parents(".dynamic_con").attr("id");
						prize_start.ajax3($(this),targetid,tartype);
						
					}
////				}else if(online==2){
//					alert("活动已结束，不能赞了！");
//				}
				
			});
			$("body").on("click",".endzan",function(){
				alert("活动已结束，不能赞了！")
			})
		},
		tabs:function(tabbox,targetBtn,eventTrigger,curClass,showBox,theFunc){
			return tabbox.each(function(){
				var tBtn = $(this).find(targetBtn).children();
				var tShow = $(this).find(showBox);
				tBtn.bind(eventTrigger,function(){
					var tabIndex = $(this).index();
					tBtn.removeClass(curClass);
					tBtn.eq(tabIndex).addClass(curClass);
					tShow.addClass("dis_none");
					tShow.eq(tabIndex).removeClass("dis_none");
					prize_start.tab_show.empty();
					pageNo=1;
					$(".onloading").text("正在加载...");
					if(tabIndex==1){
						prize_start.ajax2(false);
					}else if(tabIndex==0){
						prize_start.ajax2(true);
					}
				});
			});
		},gocom:function(){
//			alert(1)
				var ttid=$(this).parents(".dynamic_box").attr("id");
				window.location.href='allcomment.html?user_id='+userId+'&tietid='+ttid;
		},
		init:function(){
			prize_start.tab_show.empty();
			prize_start.act_box.empty();
			
			prize_start.ajax1();
			
			//if($(".tab_show").length=0){
				prize_start.zan();
			//}
			
			if($(".tab_show").length>0){
				prize_start.ajax2(true);
			}else{
				prize_start.ajax2(false);
			}
			prize_start.tabs($(".tab_box"),".tab_li","click","cur",".tab_show");
			
			$("#mayjion").bind("click",function(){
				if (prize_start.versions.ios || prize_start.versions.iPhone || prize_start.versions.iPad) {
					window.location.href ="objc://joinActivity?activityName#"+keyword;
					}
					else if (prize_start.versions.android) {
					   window.android.joinActivity(keyword);
					}
			})
			$("#share_btn").bind("click",function(){
				if (prize_start.versions.ios || prize_start.versions.iPhone || prize_start.versions.iPad) {
					window.location.href ="objc://shareActivity?content#"+encodeURIComponent($(".content .con p").text()) + "&imgUrl#" + $(".content .imgbox img").attr("src") + "&url#" + shareUrl;
					}
					else if (prize_start.versions.android) {
					   window.android.share($(".content .con p").text(),$(".content .imgbox img").attr("src"),shareUrl);

					}
			})
			
			//photo.photoshow();
		}
	}

	prize_start.init();
	
	$(window).scroll(function () {
		if(suc==true){
			var scrollTop = $(this).scrollTop();
			var scrollHeight = $(document).height();
			var windowHeight = $(this).height();
			if (scrollTop + windowHeight == scrollHeight) {
				if($(".tab_show").length>0){
					if($(".tab_box .tab_show:first").hasClass("dis_none")){
						prize_start.ajax2(false);
					}else{
						prize_start.ajax2(true);
					}
				}else{
					prize_start.ajax2(false);
				}
	
			}
		}else{
			return
		}
    });

});
function gocom(id){
	var tieid=$(id).attr("i");
	window.location.href='allcomment.html?user_id='+userId+'&tietid='+tieid;
	
}
function video(thiss){
	var videosrc=$(thiss).attr("videosrc");
	window.location.href='video.html?videosrc='+videosrc;
}
function myrefresh(){
   window.location.reload();
}

