// JavaScript Document
$(document).ready(function(e) {
    var hotcom_url=http_url+"/activity/posts/view";
	var morecom_url=http_url+"/activity/comment/list";
	var send_url=http_url+"/activity/comment/save";
	var zan_url=http_url+"/activity/praise/save";
	var deltie_url=http_url+"/activity/posts/remove";
	var delcom_url=http_url+"/activity/comment/remove";
	var del_zan_url = http_url+"/activity/praise/remove";
	var userId=sessionStorage.getItem("useid");
	var id=sessionStorage.getItem("tietid");
	//var id="555b011f0cf2326a85393c04";
	var isRanking=sessionStorage.getItem("isRanking");
	if(isRanking==0){isRanking=true;}else{isRanking=false}
	var hfp,answer_floor,pageNo=1,online=1;
	var createTime;
//	alert(1);
	var allcom_start={
		loading:$(".loading"),
		mack:$(".mack"),
		dialog:$(".dialog"),
		main:$(".main"),
		tiebox:$(".tiebox"),
		pername:$(".pername"),
		tietime:$(".tietime"),
		tiezan:$(".tiezan"),
		tieanswer:$(".tieanswer"),
		hotcombox:$(".hotcombox"),
		allcombox:$(".allcombox"),
		more_answerbox:$(".more_answerbox"),
		versions:function(){
						var u = navigator.userAgent, app = navigator.appVersion;
						return {         //移动终端浏览器版本信息
							 trident: u.indexOf('Trident') > -1, //IE内核
							presto: u.indexOf('Presto') > -1, //opera内核
							webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
							gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
							mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
							ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
							android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
							iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
							iPad: u.indexOf('iPad') > -1, //是否iPad
							webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
						};
					 }(),
		language:(navigator.browserLanguage || navigator.language).toLowerCase(),
		ajax1:function(url,datacan){
			$.ajax({
				url:url,
				contentType:contenttype,
				type:"POST",
				dataType:"JSON",
				data:JSON.stringify(datacan),
				timeout:10000,
				success: function(data){
					isloading = false;
//					console.log(data.data);
					allcom_start.loading.hide();
					allcom_start.mack.hide();
					allcom_start.main.show();
					if(url==hotcom_url){
						allcom_start.appendtie(data.data,url);
					}else if(url==morecom_url){
						if(data.data.results.length<5){
							$(".onloading").show().text("没有更多了");
						}
						allcom_start.appendmorecom(data.data,url,pageNo);
						pageNo++;
					}
					initPhotoSwipeFromDOM('.demo-gallery');
				},
				error:function(){
					allcom_start.mack.show();
					allcom_start.dialog.show();
				}
			})
		
		},
		ajax2:function(url,userId,postsId,content,parentId){
			$.ajax({
				url:url,
				contentType:contenttype,
				type:"POST",
				dataType:"JSON",
				data:JSON.stringify({
					userId:userId,
					postsId:postsId,
					content:content,
					parentId:parentId
				}),
				success: function(data){
					
					if($(".moreanswer").length>0){
						allcom_start.appendnewcom(data);
					}else{
						var morecombox='<h2 class="hot_answer allhotans moreanswer"><span></span>更多回复</h2><div class="clear"></div><div class="morecomadd"></div>';
						allcom_start.more_answerbox.append(morecombox);
						
						allcom_start.appendnewcom(data);
					}
				},
				error:function(){
					alert("发表失败")
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
//					var zans=parseInt(thiss.find("i").text())+1;
                    var zan =thiss.find("i").attr("num");
					thiss.find("img").attr("src","images/icon/icon4_3.png");
					thiss.find("i").text("已赞");
					thiss.find("i").show();
					thiss.attr("praiseid",1);
				},
				error:function(){
					alert("您没有赞成功");
					return;
				}
			})
		},
		ajax4:function(id,isRanking,actid){
			$.ajax({
				url:deltie_url,
				contentType:contenttype,
				type:"POST",
				dataType:"JSON",
				data:JSON.stringify({
					userId:userId,
					id:id
				}),
				success: function(data){
					$(".del_ts").hide();
					$(".allcomspe,.allcomment,.write_box,.onloading").remove();
					$(".back_ts").show();
					$("#goback_ok").click(function(){
						if(isRanking==0){
							window.location.href='prize.html?user_id='+userId + '&id='+actid +'&isRanking=0';
						}else if(isRanking==1){
							window.location.href='activity.html?user_id='+userId + '&id='+actid +'&isRanking=1';;
						}
					});
				},
				error:function(){
					alert("删除失败！");
				}
			})
		},
		ajax5:function(id,thiss){
			$.ajax({
				url:delcom_url,
				contentType:contenttype,
				type:"POST",
				dataType:"JSON",
				data:JSON.stringify({
					userId:userId,
					id:id
				}),
				success: function(data){
					//console.log(data);
					$(".delcom_ts,.mack").hide();
//					console.log(thiss);
                     //console.log(thiss.parents(".dynamic_con").length);
                     //console.log(thiss.parents(".dynamic_con").find(".comment p").length);
					thiss.parents(".dynamic_con").find(".comment .nowcon").text("该评论已删除");
//					if(data.code == 200){
//						thiss.hide();
//					}
					
				},
				error:function(){
					alert("删除失败！");
				}
			})
		},
		ajax6:function(zthis,zanid){
			$.ajax({
				url:del_zan_url,
				contentType:contenttype,
				type:"POST",
				dataType:"Json",
				data:JSON.stringify({
					userId:userId,
					id:zanid
				}),
				success: function(data){
					var delzan = zthis.find("i").attr("num");
					if(delzan == 0){
						zthis.find("i").hide();
					}
                    zthis.find("img").attr("src","images/icon/icon4.png");
					zthis.find("i").text(delzan);
					zthis.attr("praiseid","null");

					console.log(data)
					
				},
				error:function(){
					alert("您点赞失败");
					return;
				}
			})
		},
		appendnewcom:function(data){
			var peravatar='';
			if(data.data.user.avatar==""){
				peravatar="images/avatar.png";
			}else{
				peravatar=data.data.user.avatar;
			}
			var copycom='<div class="person fl">'
			            +'<img src="'+peravatar+'" width="100%"/>'
			            +'</div>'
			            +'<div class="dynamic_con fr" id="'+data.data.id+'">'
			            +'<ul class="comment">'
			            +'<li>'
			            +'<div class="com_tit">'
			            +'<span class="fr dyn_lz">'+data.data.floor+'楼</span>'
			            +'<h3 class="fullname">'+data.data.user.fullName+'</h3>'
			            +'<span class="comtime">'+data.data.createTime+'</span>'
			            +'</div>'
			            +'<p class="nowcon">'+data.data.content+'</p>'
			            +'<div class="dyn_cz allcomcz">'
			            +'<span class="zan tiezan"><a praiseid="'+data.data.praiseId+'"><img src="images/icon/icon4.png" width="13" height="12"><i class="zannum" num ="'+data.data.praiseNum+'">'+data.data.praiseNum+'</i></a></span>'
			            +'<span class="zan"><a class="comanswer"><img src="images/icon/icon5.png" width="13" height="13">回复</a></span>'
			            +'<span><a class="del_com"><img src="images/icon/icon7.png" width="12" height="13"><i>删除</i></a></span>'
			            +'</div>'
			            +'</li>'
			            +'</ul>'
			            +'</div>'
			            +'<div class="clear"></div>';
			
			allcom_start.more_answerbox.find(".morecomadd").prepend(copycom);
			//console.log(data.data.praiseNum);
			$("#"+data.data.id).find(".comtime").text(data.data.createTime.substring(0,16));
			if(data.data.parents.length>0){
				allcom_start.more_answerbox.find("#"+data.data.id).children(".comment").children("li").children(".com_tit").after('<div class="parentfloor"></div>');
				for(var x=0; x<data.data.parents.length; x++){
					var floorcon='<div class="com_about"><div class="dynamic_con fr"><ul class="comment combg"><li><div class="com_tit"><h3>'+data.data.parents[x].user.fullName+'</h3><span class="comtime">'+data.data.parents[x].createTime+'</span></div><p>'+data.data.parents[x].content+'</p></li></ul></div><div class="clear"></div></div>';
					allcom_start.more_answerbox.find("#"+data.data.id).find(".comtime").text(data.data.parents[x].createTime.substring(0,16));
					allcom_start.more_answerbox.find("#"+data.data.id).find(".parentfloor").append(floorcon);
				
				}
			}
			if(data.data.praiseNum == 0){
		    	$("#"+data.data.id).find(".zannum").hide();
		    }
		},
		appendtie:function(datalist,url){
			
			var photobox='',video='',videolen,videohttp='',peravatar='',zansrc='',comsrc='',comnum;
			if(datalist.user.avatar==""){
				peravatar="images/avatar.png";
			}else{
				peravatar=datalist.user.avatar;
			}
			if(datalist.isonline==1){
				zansrc='images/icon/icon4.png';
				comsrc='images/icon/icon5.png';
				comnum=datalist.praiseNum;
				if(datalist.praiseId!=null){
					zansrc='images/icon/icon4_3.png';
					comnum="已赞";
				}
			}else if(datalist.isonline==2){
				zansrc='images/icon/icon4_2.png';
				comsrc='images/icon/icon5_2.png';
				comnum=datalist.praiseNum;
				online=2;
				$(".write_box").remove();
			}
			allcom_start.tiebox.empty();
			var tie='<div class="person fl">'
			     +'<img src="'+peravatar+'" width="100%"/>'
			     +'</div>'
			     +'<div class="dynamic_con fr" id="'+datalist.id+'" ranking="'+datalist.ranking+'" actid="'+datalist.activityId+'">'
			     +'<div class="dyn_tit">'
			     +'<h3 class="pername">'+datalist.user.fullName+'</h3>'
			     +'<div class="dyn_lz fr">楼主</div>'
			     +'<div class="clear"></div>'
			     +'</div>'
			     +'<p class="dyn_time">'+datalist.createTime+'</p>'
			     +'<div class="dyn_articl">'+datalist.content+'</div>'
			     +'<div class="dyn_cz allcomcz">'
			     +'<span class="zan tiezan"><a praiseid="'+datalist.praiseId+'"><img src="'+zansrc+'" width="13" height="12"><i tartype="0" class="zan_com" num ="'+datalist.praiseNum+'">'+comnum+'</i></a></span>'
			     +'<span class="zan"><a class="lzanswer"><img src="'+comsrc+'" width="13" height="13"><i class="comnum">'+datalist.commentNum+'</i></a></span>'
			     +'</div>'
			     +'</div>'
			     +'<div class="clear"></div>';
			allcom_start.tiebox.append(tie);
//         console.log(comnum);
          
			$("#"+datalist.id).find(".dyn_time").text(datalist.createTime.substring(0,16));
			var sharehtml='<span class="zan"><a id="share_btn"><img src="images/icon/icon6.png" width="11" height="11">分享</a></span><span><a id="del_tie"><img src="images/icon/icon7.png" width="12" height="13"><i>删除</i></a></span>';
			
			if(datalist.user.userId==userId){
				$(".tiebox").find(".allcomcz").append(sharehtml);
			}else{
				$(".tiebox").find(".allcomcz span:last").css("border","none");
			}
//			console.log(datalist.pics)
			if(datalist.pics.length>0){
				var tiepic='<div class="dyn_photo demo-gallery" id="demo-test-gallery"><ul></ul><div class="clear"></div></div>';
				allcom_start.tiebox.find(".dyn_articl").after(tiepic);
				for(var i=0; i<datalist.pics.length;i++){
					var pics='<li>'
//					         +'<a href="'+datalist.pics[i][0]+'"><img src="'+datalist.pics[i][1]+'" width="100%"></a>'
					         +'<a href="'+datalist.pics[i][0]+'" data-size="1600x1600" data-med="'+datalist.pics[i][0]+'" data-med-size="1024x1024" data-author="Folkert Gorter" class="demo-gallery__img--main">'
					         +'<img src="'+datalist.pics[i][1]+'" width="100%">'
					         +'</a>'
					         +'</li>';
					allcom_start.tiebox.find(".dyn_articl").next(".dyn_photo").find("ul").append(pics);
					if(i==8){return false;}
					var img = document.createElement("img");
					img.src =datalist.pics[i][0];
					img.onload=function(){
						imgmap[this.src+""]={};
						imgmap[this.src+""].width=this.width;
						imgmap[this.src+""].height=this.height;
//						console.log(imgmap[this.src+""]);
//						console.log(this.src);
					}
				}
			}else if(datalist.videoName!=""){
				video=datalist.bucket+'.'+datalist.domain+datalist.videoName;
				videolen=video.length-3
				videohttp=video.substr(0,videolen);
				photobox='<div class="videobox" videosrc="http://'+video+'" onclick="video(this)"><img src="images/icon/shipin_icon.png" width="40" height="40" class="shipinicon"><img src="http://'+videohttp+'jpg" width="100%"></div>';
				allcom_start.tiebox.find(".dyn_articl").after(photobox);
			}
		   if(comnum==0){
           	  $("#"+datalist.id).find(".zan_com").hide();
           }
           if(datalist.commentNum ==0){
           	 $("#"+datalist.id).find(".comnum").hide();
           }
			allcom_start.appendhotcom(datalist,url,datalist.isonline);			
		},
		appendhotcom:function(datalist,url,isonline){
			if(datalist.hotComment.length>0){
				var hotcombox='<h2 class="hot_answer allhotans"><span></span>热门回复</h2><div class="clear"></div><div class="hotcomadd"></div>';
				allcom_start.hotcombox.append(hotcombox);
				
				allcom_start.addcom(datalist.hotComment,url,isonline);
			}
			
		},
		appendmorecom:function(datalist,url,pageNo){
			if(datalist.results.length>0 && pageNo==1){
				var morecombox='<h2 class="hot_answer allhotans moreanswer"><span></span>更多回复</h2><div class="clear"></div><div class="morecomadd"></div>';
				allcom_start.more_answerbox.append(morecombox);
				
				allcom_start.addcom(datalist.results,url);
			}else{
				allcom_start.addcom(datalist.results,url);
			}
			
		},
		addcom:function(datalist,url,isonline,status){
			var peravatar='',zansrc='',comsrc='',comnum,isonlines,status;
			for(var n=0; n<datalist.length;n++){

				if(datalist[n].user.avatar==""){
					peravatar="images/avatar.png";
				}else{
					peravatar=datalist[n].user.avatar;
				}
				
				if(url==hotcom_url){
					isonlines=isonline
				}else if(url==morecom_url){
					isonlines=datalist[n].isonline;
				}
				if(isonlines==1){
					zansrc='images/icon/icon4.png';
					comsrc='images/icon/icon5.png';
					comnum=datalist[n].praiseNum;
					if(datalist[n].praiseId!=null){
						zansrc='images/icon/icon4_3.png';
						comnum="已赞";
					}
				}else if(isonlines==2){
					zansrc='images/icon/icon4_2.png';
					comsrc='images/icon/icon5_2.png';
					comnum=datalist[n].praiseNum;
				}
				
				var hotcom='<div class="person fl">'
				           +'<img src="'+peravatar+'" width="100%"/></div>'
				           +'<div class="dynamic_con fr" id="'+datalist[n].id+'">'
				           +'<ul class="comment">'
				           +'<li>'
				           +'<div class="com_tit">'
				           +'<span class="fr dyn_lz">'+datalist[n].floor+'楼</span>'
				           +'<h3 class="fullname">'+datalist[n].user.fullName+'</h3>'
				           +'<span class="comtime">'+datalist[n].createTime+'</span>'
				           +'</div>'
				           +'<p>'+datalist[n].content+'</p>'
				           +'<div class="dyn_cz allcomcz">'
				           +'<span class="zan tiezan"><a praiseid="'+datalist[n].praiseId+'"><img src="'+zansrc+'" width="13" height="12"><i class="zan_num" num ="'+datalist[n].praiseNum+'">'+comnum+'</i></a></span>'
				           +'<span class="zan del_choose"><a class="comanswer"><img src="'+comsrc+'" width="13" height="13">回复</a></span>'
				           +'</div>'
				           +'</li>'
				           +'</ul>'
				           +'</div>'
				           +'<div class="clear"></div>';
				if(url==hotcom_url){
					allcom_start.hotcombox.find(".hotcomadd").append(hotcom);
				}else if(url==morecom_url){
					if(datalist.length>0){
						allcom_start.more_answerbox.find(".morecomadd").append(hotcom);
						
						if(datalist[n].parents.length>0){
							allcom_start.more_answerbox.find("#"+datalist[n].id).children(".comment").children("li").children(".com_tit").after('<div class="parentfloor"></div>');
							for(var x=0; x<datalist[n].parents.length; x++){
								var floorcon='<div class="com_about"><div class="dynamic_con fr"><ul class="comment combg"><li><div class="com_tit"><h3>'+datalist[n].parents[x].user.fullName+'</h3><span class="comtime">'+datalist[n].parents[x].createTime+'</span></div><p>'+datalist[n].parents[x].content+'</p></li></ul></div><div class="clear"></div></div>';
								
								allcom_start.more_answerbox.find("#"+datalist[n].id).find(".parentfloor").append(floorcon);
							}
						}
						
						
						var delhtml='<span class="del_t"><a class="del_com"><img src="images/icon/icon7.png" width="12" height="13"><i>删除</i></a></span>';
					
					if(datalist[n].user.userId==userId){
							allcom_start.more_answerbox.find("#"+datalist[n].id).find(".allcomcz").append(delhtml);
						}
					}else{
						$(".onloading").text("没有更多了");
					}
				  createTime = datalist[n].createTime;
				  if(datalist[n].status ==2){
				  	  allcom_start.more_answerbox.find("#"+datalist[n].id).find(".del_choose").css("border","none");
					  allcom_start.more_answerbox.find("#"+datalist[n].id).find(".del_t").hide();
				  }
				}
				if(comnum == 0){
		           	  $("#"+datalist[n].id).find(".zan_num").hide();
		           }
				$("#"+datalist[n].id).find(".comtime").text(datalist[n].createTime.substring(0,16));
				$(".allcomcz span:last").css("border","none");
			}
			
		},
		zan:function(){
			
			$("body").on("click",".tiezan a",function(){
			
	              var zanid = $(this).attr("praiseid")
				if(online==1){
					if($(this).attr("praiseid")!="null"){
						allcom_start.ajax6($(this),zanid);
					}else{
						var tartype=$(this).find("i").attr("tartype");
						if(tartype==0){
							tartype=0
							allcom_start.ajax6($(this),zanid);
						}else{
							tartype=1
							allcom_start.ajax6($(this),zanid);
						}
						var targetid=$(this).parents(".dynamic_con").attr("id");
						allcom_start.ajax3($(this),targetid,tartype);
						
					}
				}else if(online==2){
					alert("活动已结束，不能赞了！");
				}
				
			});
		},
		del_tie:function(){
			var isRanking
			$("body").on("click","#del_tie",function(){
				var ranking=$(this).parents(".dynamic_con").attr("ranking");
				var actid=$(this).parents(".dynamic_con").attr("actid");
				if(ranking==0){
					$(".del_ts,.mack").show();
					var id=$(this).parents(".dynamic_con").attr("id");
					if(online==2){
						isRanking=0;
					}else if(online==1){
						isRanking=1;
					}
					$("#del_ok").click(function(){
						allcom_start.ajax4(id,isRanking,actid);
					});
				}else if(ranking>0){
					alert("中奖贴不可以删除");
				}
			});
			
			$("body").on("click",".del_com",function(){
				$(".delcom_ts,.mack").show();
				var id=$(this).parents(".dynamic_con").attr("id");
				var thiss=$(this);
				$("#delcom_ok").click(function(){
					allcom_start.ajax5(id,thiss);
				});
			});
		},
		init:function(){
			
			var anstext="";
			
			allcom_start.allcombox.empty();
			
			allcom_start.ajax1(hotcom_url,{
					userId:userId,
					id:id
					//forShare:forShare
				});
			allcom_start.ajax1(morecom_url,{
					userId:userId,
					postsId:id,
					pageNo:pageNo,
					maxResults:5,
					createTime:createTime
				});
				
			allcom_start.zan();
			allcom_start.del_tie();
			
			$("#cancel,.close").click(function(){
				$(this).parents(".openbox").hide();
				$(".mack").hide();
			});
			
			allcom_start.tiebox.on("touchend",".lzanswer",function(e){
				if(online==1){
					$(".write_box").show().find("input[type=text]").val("回复楼主").attr("parentId","");
					$("body").css("padding-bottom","44px");
					
					e.stopPropagation();
					answer_floor=$(".write_box").find("input[type=text]").val()
				}else if(online==2){
					alert("活动已结束，不能评论！");
				}
				e.stopPropagation();
			});
			$("body").on("touchend",".comanswer",function(e){
				if(online==1){
					var parentId=$(this).parents(".dynamic_con").attr("id");
					hfp=$(this).parents(".comment").find(".fullname").text();
					anstext=hfp;
					$(".write_box").show().find("input[type=text]").val("回复"+hfp).attr("parentId",parentId);
					$("body").css("padding-bottom","44px");
					
					e.stopPropagation();
					hfp=$(".write_box").find("input[type=text]").val()
				}else if(online==2){
					alert("活动已结束，不能评论！");
				}
				e.stopPropagation();
			});
			
			$(".write_box").find("input[type=text]").focus(function(e){
				if($(this).val()!=""&&$(this).val()!="回复"+anstext&&$(this).val()!="回复楼主"){
					$(this).css("color","#63615c");
				}else{
					$(this).val("").css("color","#63615c");
				}
				e.stopPropagation();
			});
			$("body").on("touchend","#sendcom",function(){
				var parentId=$(this).parent(".sendbtn").prev(".writeinput").find("input[type=text]").attr("parentId");
				var content=$(this).parent(".sendbtn").prev(".writeinput").find("input[type=text]").val();
				if(content!=""&&content!="回复楼主"&&content!="回复"+anstext){
					allcom_start.ajax2(send_url,userId,id,content,parentId);
					//$(this).parents(".write_box").hide().find("input[type=text]").val("");
					$(this).parents(".write_box").find("input[type=text]").val("回复楼主").attr("parentId","");
				}else{
					alert("没有评论内容！");
				}
				//$(this).parent(".sendbtn").prev(".writeinput").find("input[type=text]")
			})
			$("body").on("click",".write_box",function(e){
				e.stopPropagation();
			});
			$("body").on("click",function(e){
				//$(".write_box").hide().find("input[type=text]").css("color","#b1b1b1");
				$("body").css("padding-bottom","0");
			});
			
			
			if(allcom_start.versions.ios){
			//只作用于输入框获得焦点时 
			 $('.write_box input').focus(function(){ 
				var _this = this; 
			  
				//无键盘时输入框到浏览器窗口顶部距离 
				var noInputViewHeight = $(window).height() - $(".write_box").height(); 
			  
				//网页正文内容高度 
				var contentHeight = $(document).height() - $(".write_box").height(); 
			  
				//控制正文内容高度大于一屏，保证输入框固定底部 
				contentHeight = contentHeight > noInputViewHeight ? contentHeight : noInputViewHeight; 
			  
				//因为弹出输入法需要时间，需延时处理 
				setTimeout(function(){ 
			  
					//弹出输入法时滚动条的起始滚动距离 
					var startScrollY = $(window).scrollTop(); 
			  
					//弹出输入法时输入框到窗口顶部的距离，即到软键盘顶部的起始距离 
					var inputTopHeight = $(".write_box").offset().top - startScrollY; 
			  
					//弹出输入法时输入框预期位置，即紧贴软键盘时的位置。因输入框此时处于居中状态，所以其到窗口顶部距离即为需往下移动的距离。 
					var inputTopPos = $(".write_box").offset().top + inputTopHeight; 
			  
					//控制div不超出正文范围 
					inputTopPos = inputTopPos > contentHeight ? contentHeight : inputTopPos; 
			  
					//设置输入框位置使其紧贴输入框 
					$(".write_box").css({'position':'absolute', 'top':inputTopPos }); 
			  
					//给窗口对象绑定滚动事件，保证页面滚动时div能吸附软键盘 
					$(window).bind('scroll', function(){ 
			  
						//表示此时有软键盘存在，输入框浮在页面上了 
						if (inputTopHeight != noInputViewHeight) { 
			  
							//页面滑动后，输入框需跟随移动的距离 
							var offset = $(this).scrollTop() - startScrollY; 
			 
							//输入框移动后位置 
							afterScrollTopPos = inputTopPos + offset; 
			  
							//设置输入框位置使其紧贴输入框 
							$(".write_box").css({'position':'absolute', 'top':afterScrollTopPos }); 
						} 
					}); 
				}, 100); 
			 }).blur(function(){//输入框失焦后还原初始状态
				$(".write_box").removeAttr('style'); 
				$(window).unbind('scroll'); 
				 
			 	if($(this).val()==""&&"回复"+anstext=="回复"){
					$(this).val("回复楼主").css("color","#b1b1b1");
				}else if($(this).val()==""&&"回复"+anstext!="回复"){
					$(this).val("回复"+anstext).css("color","#b1b1b1");
					anstext="";
				}
			 }); 
			}
			$("body").on("click","#share_btn",function(){
//				alert($(".dyn_photo ul li img").attr("src"));
				if (allcom_start.versions.ios || allcom_start.versions.iPhone || allcom_start.versions.iPad) {
					window.location.href = "objc://shareActivity?content#" + encodeURIComponent($(".dyn_articl").text()) + "&imgUrl#" + $(".dyn_photo ul li a img").attr("src") + "&url#" + static_url+'/events_ad.html?id='+id;
				} else if (allcom_start.versions.android) {
					window.android.share($(".dyn_articl").text(), $(".dyn_photo ul li a img").attr("src"), static_url+'/events_ad.html?id='+id);
				}
			})
			//photo.photoshow();
		}
	}
	allcom_start.init();
	var isloading = false;
	$(window).scroll(function () {
		
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if (scrollTop + windowHeight == scrollHeight) {
        	if(isloading == false){
	        	isloading = true;
				allcom_start.ajax1(morecom_url,{
					userId:userId,
					postsId:id,
					pageNo:pageNo,
					maxResults:5,
					createTime:createTime
				});
        	}
        }
		
	
		/*scroll(function(direction) {
			if($(".write_box").length=1){
				if(direction=="down"){
					$(".write_box").hide();
					$("body").css("padding-bottom","0");
				}else{
					$(".write_box").show();
				}
			}
		}); */
    });
	
	/*function scroll( fn ) {
		var beforeScrollTop = document.body.scrollTop,
			fn = fn || function() {};
		window.addEventListener("scroll", function() {
			var afterScrollTop = document.body.scrollTop,
				delta = afterScrollTop - beforeScrollTop;
			if( delta === 0 ) return false;
			fn( delta > 0 ? "down" : "up" );
			beforeScrollTop = afterScrollTop;
		}, false);
	}*/

});
function video(thiss){
	var videosrc=$(thiss).attr("videosrc");
	window.location.href='video.html?videosrc='+videosrc;
}
function myrefresh(){
   window.location.reload();
}
