var userId=sessionStorage.getItem("useid");
$(function(){
	var talent_Url = game_http_url+'/activity/posts/list';
	var zan_url=game_http_url+"/activity/praise/save";
	var activityId=sessionStorage.getItem("activityId");
	var childId = sessionStorage.getItem("childId");
	var pageNo=1
	var talent_statr = {
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
				type:"post",
				url:talent_Url,
				dataType:"JSON",
				contentType:contenttype,
				data:JSON.stringify({
					userId:userId,
					activityId:activityId,
					childId:childId,
					pageNo:pageNo,
				}),
			   timeout:10000,
			   success:function(data){
			   	console.log(data.data)
			   	 if(data.data.results.length<5){
						$(".onloading").show().text("没有更多了");
					}
			   	 if(data.data.results!=""){					
						talent_statr.appendactlist(data.data);
						pageNo++;
					}else{
						$(".onloading").text("没有更多了");
				 }
					initPhotoSwipeFromDOM('.demo-gallery');
			   },
			   error:function(){
			   	
			   }
			});
		},
	   ajax2:function(thiss,targetId,targetType){
			$.ajax({
				url:zan_url,
				contentType:contenttype,
				type:"POST",
				dataType:"Json",
				data:JSON.stringify({
					userId:userId,
					targetId:targetId,
					targetType:targetType,
					activityId:activityId
				}),
				success: function(data){
					//console.log(data)
					var zans=parseInt(thiss.find("i").text())+1;
					console.log(zans);
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
	   appendactlist:function(datalist){
	      	$(".act_box").empty();
			var prize_list='',peravatar='',zansrc,comnum;
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
				prize_list ='<div class="dynamic_box activity_dyn" id="'+datalist.results[i].id+'">'
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
				            +'<span class="zan tiezan"><a praiseid="'+datalist.results[i].praiseId+'"><img src="'+zansrc+'" width="13" height="12"><i tartype="0" class="zansnum">'+comnum+'</i></a></span>'
				            +'<span><a><img src="images/icon/icon5.png" width="13" height="13" i="'+datalist.results[i].id+'" onclick="gocom(this)"><i class="comnum">'+datalist.results[i].commentNum+'</i></a></span>'
				            +'</div>'
				            +'</div>'
				            +'</div>'
				            +'<div class="clear"></div>'
				            +'</div>';
				console.log(datalist.results[i].createTime)
				$(".act_box").append(prize_list);
				talent_statr.appendactpic(datalist,datalist.results[i].id,i);
				talent_statr.appendactcomment(datalist,datalist.results[i].id,i);          
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
						talent_statr.ajax2($(this),targetid,tartype);						
					}
////				}else if(online==2){
//					alert("活动已结束，不能赞了！");
//				}				
			});
			$("body").on("click",".endzan",function(){
				alert("活动已结束，不能赞了！")
			})
		},
	gocom:function(){
//			alert(1)
				var ttid=$(this).parents(".dynamic_box").attr("id");
				window.location.href='game-page-details.html?user_id='+userId+'&tietid='+ttid;
		},
	init:function(){
		talent_statr.ajax1();
		talent_statr.zan();
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
	}
}
talent_statr.init();
function scroll( fn ) {
		var beforeScrollTop = document.body.scrollTop,
			fn = fn || function() {};
		window.addEventListener("scroll", function() {
			var afterScrollTop = document.body.scrollTop,
				delta = afterScrollTop - beforeScrollTop;
			if( delta === 0 ) return false;
			fn( delta > 0 ? "down" : "up" );
			beforeScrollTop = afterScrollTop;
		}, false);
	}  
})
function gocom(id){
	var tieid=$(id).attr("i");
	window.location.href='game-page-details?user_id='+userId+'&tietid='+tieid;
	
}
