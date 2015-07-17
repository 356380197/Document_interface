var userId=sessionStorage.getItem("useid");
$(function(){
	$(".activity_dyn:last").css("margin-bottom","0");
	var game_list_url=game_http_url+"/activity/posts/list";
	var game_view_url =game_http_url+"/activity/activity/view";
	var zan_url= game_http_url+"/activity/praise/save";
	var id=sessionStorage.getItem("id");
//	var isRanking=sessionStorage.getItem("isRanking");
	var activityId=sessionStorage.getItem("activityId")
    var isRanking = true;

	var pageNo=1,maxResults=5;
	var keyword;
	var suc=true;
	var game_start = {
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
		chcekout:$(".check"),
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
					url:game_view_url,
					type:"POST",
					contentType:contenttype,
					dataType:"JSON",
					data:JSON.stringify({
						userId:userId,
						id:id
					}),
					timeout:10000,
					success: function(data){
						game_start.loading.hide();
					    game_start.mack.hide();
						game_start.appendactdetail(data.data);
					},
					error:function(){
					  game_start.mack.show();
					  game_start.dialog.show();
					}
				})
	     },
	    ajax2:function(){
				$.ajax({
					url:game_list_url,
					type:"POST",
					contentType:contenttype,
					dataType:"JSON",
					data:JSON.stringify({
						userId:userId,
						activityId:activityId,
						isRanking:isRanking,
						pageNo:pageNo,
						maxResults:maxResults
					}),
					timeout:10000,
					success: function(data){
						console.log(data.data.results);
					if(data.data.results.length<5){
						$(".onloading").show().text("没有更多了");
					 }
						game_start.loading.hide();
					if(data.data.results!=""){					
						game_start.appendactlist(data.data,isRanking);
						pageNo++;
					}else{
						$(".onloading").text("没有更多了");
					}
					suc=true;
					initPhotoSwipeFromDOM('.demo-gallery');
					},
					error:function(){
					  game_start.mack.show();
					  game_start.dialog.show();
					}
				})
	     },
	    ajax3:function(thiss,targetId,targetType){
			$.ajax({
				url:zan_url,
				contentType:contenttype,
				type:"POST",
				dataType:"Json",
				data:JSON.stringify({
					userId:userId,
					targetId:targetId,
					targetType:targetType
				}),
				success: function(data){
					//console.log(data)
					var zans=parseInt(thiss.find("i").text())+1;
					thiss.find("img").attr("src","images/icon/icon4_3.png");
					thiss.find("i").text(zans);
					thiss.attr("praiseid",1);
				},
				error:function(){
					alert("您没有赞成功");
					return;
				}
			})
		},
	appendactdetail:function(titdata){
			game_start.start.html(titdata.title);
			game_start.time.html(titdata.startDate.substring(0,16));
			game_start.act_con.html(titdata.description);
			game_start.imgbox.attr("src",titdata.pic);
			game_start.detail.attr("href",titdata.url+"?user_id="+userId);
			game_start.imgbox.parent("a").attr("href",titdata.url+"?user_id="+userId);
			game_start.chcekout.on("click",function(){
				window.location.href='talent_list.html?user_id='+userId;
			})
		},
   appendactlist:function(listdata,isRanking){
   	   var game_list='',atv_list,peravatar='',zansrc,comnum;
   	   for(var i=0;i<listdata.results.length;i++){
				if(listdata.results[i].user.avatar==""){
					peravatar="images/avatar.png";
				}else{
					peravatar=listdata.results[i].user.avatar;
		}
		zansrc='images/icon/icon4.png';
		end_zansrc ='images/icon/icon4_2.png'
		comnum=listdata.results[i].praiseNum;
		if(listdata.results[i].praiseId!=null){
					zansrc='images/icon/icon4_3.png';
					//comnum="已赞";
		}
		if(listdata.results[i].isRanking==0){isRanking=true;}else{isRanking=false}
		game_list='<div class="dynamic_box" id="'+listdata.results[i].id+'">'
		                  +'<div class="gamebox">'
				          +'<div class="gametit">'
				          +'<span>第'+listdata.results[i].matchRanking.rank+'名</span>'
				          +'<span>'+listdata.results[i].matchRanking.childName+'</span>'
				          +'<span>'+listdata.results[i].matchRanking.voteNum+'票</span>'
				          +'</div>'
				          +'<div class="votebox">'
				          +'<button>投 票</button>'
				          +'<a href="#" class="fr">邀请好友投票</a>'
				          +'</div>'
				          +'</div>'
				          +'<div class="person fl">'
				          +'<img src="'+peravatar+'" width="100%"/>'
				          +'</div>'
				          +'<div class="dynamic_con fr">'
				          +'<div>'
				          +'<div class="dyn_tit">'
				          +'<h3>'+listdata.results[i].user.fullName+'</h3>'
				          +'<span class="dyn_time">'+listdata.results[i].createTime+'</span>'
				          +'</div>'
				          +'<div class="clear"></div>'
				          +'<div class="dyn_articl" i="'+listdata.results[i].id+'" onclick="gocom(this)">'+listdata.results[i].content+'</div>'
				          +'</div>'
				          +'<div class="dyn_cz">'
				          +'<span class="zan tiezan"><a praiseid="'+listdata.results[i].praiseId+'"><img src="images/icon/icon4.png" width="13" height="12"><i tartype="0" class="zansnum">'+listdata.results[i].praiseNum+'</i></a></span>'
				          +'<span><a><img src="images/icon/icon5.png" width="13" height="13" i="'+listdata.results[i].id+'" onclick="gocom(this)"><i class="comnum">'+listdata.results[i].commentNum+'</i></a></span>'
				          +'</div>'
				          +'</div>'
				          +'<div class="clear">'
				          +'</div></div>';
		          atv_list='<div class="dynamic_box" id="'+listdata.results[i].id+'">'
				          +'<div class="person fl">'
				          +'<img src="'+peravatar+'" width="100%"/>'
				          +'</div>'
				          +'<div class="dynamic_con fr">'
				          +'<div>'
				          +'<div class="dyn_tit">'
				          +'<h3>'+listdata.results[i].user.fullName+'</h3>'
				          +'<span class="dyn_time">'+listdata.results[i].createTime+'</span>'
				          +'</div>'
				          +'<div class="clear"></div>'
				          +'<div class="dyn_articl" i="'+listdata.results[i].id+'" onclick="gocom(this)">'+listdata.results[i].content+'</div>'
				          +'<div class="dyn_cz">'
				          +'<span class="zan"><a><img src="images/icon/icon4_2.png" width="13" height="12"><i class="zansnum">'+listdata.results[i].praiseNum+'</i></a></span>'
				          +'<span><a><img src="images/icon/icon5.png" width="13" height="13" i="'+listdata.results[i].id+'" onclick="gocom(this)"><i class="comnum">'+listdata.results[i].commentNum+'</i></a></span>'
				          +'</div>'
				          +'</div>'
				          +'</div>'
				          +'<div class="clear">'
				          +'</div></div>';
				     console.log(listdata.results[i].activityType);
				     var actgame = listdata.results[i].activityType;
				     var isgame = listdata.results[i].isonline
				     console.log(listdata.results[i].isonline);
		if(actgame == 1 && isgame == 1 ){
		    $(".tab_box .tab_show:first").append(game_list);
			game_start.appendactpic(listdata,listdata.results[i].id,i);
			game_start.appendactcomment(listdata,listdata.results[i].id,i);
		}else if(actgame == 0 && isgame == 1){
	        $(".tab_box .tab_show:last").append(atv_list);
	        game_start.act_box.append(atv_list);
			game_start.appendactpic(listdata,listdata.results[i].id,i);
			game_start.appendactcomment(listdata,listdata.results[i].id,i);
		}
		var cr_time = listdata.results[i].createTime;
	    $("#"+listdata.results[i].id).find(".dyn_time").text(cr_time.substring(0,16));
	    if(listdata.results[i].praiseNum == 0 ){
			$("#"+listdata.results[i].id).find(".zansnum").hide();
		}
		if( listdata.results[i].commentNum == 0){
			$("#"+listdata.results[i].id).find(".comnum").hide();
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
					//if(n==2){return false;}
				}
				if(datalist.results[i].hotComment.length>=3){
					more_comment='<div class="more_com" i="'+datalist.results[i].id+'" onclick="gocom(this)"><a href="javascript:void(0)">更多评论 <span>》</span></a></div>';
					$("#"+tietid).find(".comment_box").after(more_comment);
				}
			}
		},
	zan:function(){			
			$("body").on("click",".tiezan a",function(){		
//				if(online==1){
					if($(this).attr("praiseid")!="null"){
						alert("您已赞过了！");
					}else{
						var tartype=$(this).find("i").attr("tartype");
//						if(tartype==0){
//							tartype=0
//						}else{
//							tartype=1
//						}
						var targetid=$(this).parents(".dynamic_con").attr("id");
						game_start.ajax3($(this),targetid,tartype);
						
					}
////				}else if(online==2){
//					alert("活动已结束，不能赞了！");
//				}
				
			});
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
					game_start.tab_show.empty();
					pageNo=1;
					$(".onloading").text("正在加载...");
					if(tabIndex==1){
						game_start.ajax2(false);
					}else if(tabIndex==0){
						game_start.ajax2(true);
					}
				});
			});
		},
		gocom:function(){
//			alert(1)
				var ttid=$(this).parents(".dynamic_box").attr("id");
				window.location.href='game-page-details.html?user_id='+userId+'&tietid='+ttid;
		},
		init:function(){
			game_start.tab_show.empty();
			game_start.act_box.empty();			
			game_start.ajax1();			
			//if($(".tab_show").length=0){
				game_start.zan();
			//}
			
//			if($(".tab_show").length>0){
//				game_start.ajax2(true);
//			}else{
//				game_start.ajax2(false);
//			}
			game_start.tabs($(".tab_box"),".tab_li","click","cur",".tab_show");			
			$("#mayjion").bind("click",function(){
				if (game_start.versions.ios || game_start.versions.iPhone || game_start.versions.iPad) {
					window.location.href ="objc://joinActivity?activityName#"+keyword;
					}
					else if (game_start.versions.android) {
					   window.android.joinActivity(keyword);
					}
			})
			$("#share_btn").bind("click",function(){
				if (game_start.versions.ios || game_start.versions.iPhone || game_start.versions.iPad) {
					window.location.href ="objc://shareActivity?content#"+encodeURIComponent($(".content .con p").text()) + "&imgUrl#" + $(".content .imgbox img").attr("src") + "&url#" + shareUrl;
					}
					else if (game_start.versions.android) {
					   window.android.share($(".content .con p").text(),$(".content .imgbox img").attr("src"),shareUrl);

					}
			})
			
			//photo.photoshow();
		}
 }
	game_start.init();
$(window).scroll(function () {
		if(suc==true){
			var scrollTop = $(this).scrollTop();
			var scrollHeight = $(document).height();
			var windowHeight = $(this).height();
			if (scrollTop + windowHeight == scrollHeight) {
				if($(".tab_show").length>0){
					if($(".tab_box .tab_show:first").hasClass("dis_none")){
						game_start.ajax2(false);
					}else{
						game_start.ajax2(true);
					}
				}else{
					game_start.ajax2(false);
				}
	
			}
		}else{
			return
		}
    });
})
function gocom(id){
	var tieid=$(id).attr("i");
	window.location.href='game-page-details.html?user_id='+userId+'&tietid='+tieid;
	
}
function video(thiss){
	var videosrc=$(thiss).attr("videosrc");
	window.location.href='video.html?videosrc='+videosrc;
}
