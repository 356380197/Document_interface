$(function() {
	var urls = window.location.search;  //读取当前页面完整的URL
	function uid(string) {
		if(string.indexOf('=') < 0) {
			return {};
		}			
		string = string.substr(string.indexOf('?') + 1, string.length);
		if(string.indexOf('#') > 0){
			string = string.substr(0, string.indexOf("#"));			
		}
		var obj = {},
			pairs = string.split('&'),
			d = decodeURIComponent,
			name,
			value;
		//console.log(string);
		$.each(pairs, function(i, pair) {
			pair = pair.split('=');
			name = d(pair[0]);
			value = d(pair[1]);
			obj[name] = value;
		});
		return obj;
	}
	$(".close").on("click",function(){
		$(".del_ts").hide();
		$(".delcom_ts").hide();
		$(".mack").hide();
	})
	$("#cancel").on("click",function(){
		$(".del_ts").hide();
		$(".mack").hide();
		
	})
	$(".delcom_ts #cancel").on("click",function(){
		$(".delcom_ts").hide();
		$(".mack").hide();
	})
	$(".allcombox").find(".comment:last li:last").css("border", "none");
	var view_Url = Ehttp_url + '/digestposts/posts/view';
	var list_Url = Ehttp_url + '/digestposts/comment/list';
	var save_Url = Ehttp_url + '/digestposts/comment/save';
	var praise_Url = Ehttp_url + '/digestposts/praise/save';
	var post_remove_Url = Ehttp_url+'/digestposts/posts/remove';
	var list_remove_Url = Ehttp_url+'/digestposts/comment/remove';
	var del_zan_url = Ehttp_url+"/digestposts/praise/remove";
	var userId = sessionStorage.getItem("useid");
	var forShare = sessionStorage.getItem('forShare');
	var PageNo = sessionStorage.getItem("pageNo");
	var id = uid(urls).id;
	var maxResluts = sessionStorage.getItem("maxResluts");
	var desc = sessionStorage.getItem("desc");
	var commentUserId = sessionStorage.getItem("commentUserId");
	var content, answer_floor,parentsId,a,num,zan,tartype,targetid,hfp;
	var anstext = '';
	var createTimelist;
	var isloading = false;
	var con = $(".headermain");
	var Hotcon = $(".hotcon");
	var tiebox = $(".tiebox");
	var hotcombox = $(".hotcombox");
	var more_answerbox = $(".more_answerbox");
	var More_con = $(".more-main");
	var del_ok = $("#del_ok");
	var delcom_ok = $("#delcom_ok");
	var goback_ok =$("#goback_ok");
	con.empty();
	Hotcon.empty();
	More_con.empty();
	var sharelink = {
		versions: function() {
			var u = navigator.userAgent,
			app = navigator.appVersion;
			return { //移动终端浏览器版本信息 
				trident: u.indexOf('Trident') > -1,
				//IE内核
				presto: u.indexOf('Presto') > -1,
				//opera内核
				webKit: u.indexOf('AppleWebKit') > -1,
				//苹果、谷歌内核
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
				//火狐内核
				mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/),
				//是否为移动终端
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
				//ios终端
				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
				//android终端或者uc浏览器
				iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
				//是否为iPhone或者QQHD浏览器
				iPad: u.indexOf('iPad') > -1,
				//是否iPad
				webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
			};
		} (),
		language: (navigator.browserLanguage || navigator.language).toLowerCase(),
	}
/*
 * 版主
 */
	$.ajax({
		type: "post",
		url: view_Url,
		contentType: contenttype,
		dataType: "json",
		data: JSON.stringify({
			userId: userId,
			forShare: forShare,
			id:id
		}),
		timeout: 10000,
		success: function(data) {
			$(".loading").hide();
			$(".main").show();
			var Datalist = data.data;
			var Piclist = data.data.pics
			var Userlist = data.data.user;
			var HotComment = Datalist.hotComment			
//			console.log(data);
			var tzUserId  =Userlist.userId;
//			console.log(tzUserId);
            html =''
			var html = '<div class="dynamic_box tiebox">' 
			           + '<div class="person fl"><img src="' + Userlist.avatar + '" width="100%" class="avatarpic"/></div>' 
			           + '<div class="dynamic_con fr" id="' + Datalist.id + '">' + '<div class="dyn_tit">' 
			           + '<h3>' + Userlist.fullName + '</h3>' 
			           + '<div class="dyn_lz fr">楼主</div>' 
			           + '<div class="clear"></div>' + '</div>' 
			           + '<p class="dyn_time">' + Datalist.createTime + '</p>' 
			           + '<div class="dyn_articl">' + Datalist.content + '</div>' 
			           + '<div class="dyn_photo demo-gallery" id="demo-test-gallery">' 
			           + '<ul>' 
			           + '</ul>' 
			           + '<div class="clear"></div>' 
			           + '</div>' 
			           + ' <div class="dyn_cz allcomcz">' 
			           + '<span class="zan zanlist"><a praiseid ="' + Datalist.praiseId + '"><img src="images/icon/icon4.png" width="13" height="12"><i tartype="0" num="'+Datalist.praiseNum+'">' + Datalist.praiseNum + '</i></a></span>' 
			           + '<span class="zan lzanswer"><a><img src="images/icon/icon5.png" width="13" height="13"><i class="comment_t">' + Datalist.commentNum + '</i></a></span>' 
//			           + '<span><a id="share_btn"><img src="images/icon/icon6.png" width="11" height="11">分享</a></span>' 
//                     + '<span><a id="remvoe_btn"><img src="images/icon/icon7.png" width="13" height="13">删除</a></span>' 
			           + '</div>' 
			           + '</div>' 
			           + '<div class="clear"></div>' 
			           + '</div>'
			var sharehtml='<span class="zan"><a id="share_btn"><img src="images/icon/icon6.png" width="11" height="11">分享</a></span>';
			var removhtml = '<span><a id="remvoe_btn"><img src="images/icon/icon7.png" width="13" height="13">删除</a></span>'
			var doms = $(html);
			if(Datalist.praiseNum == 0){
				doms.find(".zanlist i").hide();
			}
			/*--------赞-----*/
			doms.find(".dyn_time").text(Datalist.createTime.substring(0,16))
			if(Datalist.commentNum == 0){
				doms.find(".comment_t").hide();
			}
			var nowzan = doms.find(".zanlist a").attr("praiseid")
			if (nowzan != "null") {
				doms.find(".zanlist a img").attr("src", "images/icon/icon4_3.png");
				doms.find(".zanlist a i").text("已赞");
			} else {
				doms.find(".zanlist a img").attr("src", "images/icon/icon4.png");
			}
			if(Userlist.avatar == ''){
				doms.find(".avatarpic").attr("src","images/avatar.png");
			}
			doms.find(".zanlist").on("click",function() {
				var a = $(this).find("i");
				var num = parseInt(a.text());
				var zan = $(this).find("a");
				var zanid = $(this).find("a").attr("praiseid");
				if ($(this).find("a").attr("praiseid")!="null") {
					delzan($(this),zanid,zan)
				} else {
					var tartype = zan.find("i").attr("tartype");
////					alert(tartype);
//					//console.log(tartype);
//					if (tartype == 0) {
//						tartype = 0
//					} else {
//						tartype = 1
//					}
					var targetid = $(this).parents(".dynamic_con").attr("id");
					like_zan(a,num,zan,userId,targetid,tartype);
				}
				
			});
			/*----------回复绑定 楼主 ---------*/
			doms.find(".lzanswer").on("click",function() {
			 $(".write_box").show().find("input[type=text]").val("回复楼主").attr("parentId", "");
				answer_floor = $(".write_box").find("input[type=text]").val()
			});
		/*--------分享-----*/
		if(tzUserId == userId){
				doms.find(".allcomcz").append(sharehtml);
				doms.find("#share_btn").on("click",function() {
					if (sharelink.versions.ios || sharelink.versions.iPhone || sharelink.versions.iPad) {
						window.location.href = "objc://shareActivity?content#" + encodeURIComponent($(".dyn_articl").text()) + "&imgUrl#" + $(".dyn_photo ul li img").attr("src") + "&url#" + static_url+'/events_ad.html?id='+id;
					} else if (sharelink.versions.android) {
						window.android.share($(".dyn_articl").text(), $(".dyn_photo ul li img").attr("src"), static_url+'/events_ad.html?id='+id);
					}
			  });			
			}else{
				doms.find(".allcomcz span:last").css("border","none");
			}
		/*--------删除贴子-----*/
			if (tzUserId == userId) {
			doms.find(".allcomcz").append(removhtml)
				doms.find("#remvoe_btn").on("click", function() {	
				$(".del_ts,.mack").show();
				del_ok.on("click",function(){
					postremove(userId,id,this);
				})
			})
		} else {
				doms.find(".allcomcz span:last").css("border", "none");
			}

			con.append(doms);

			var pic = $(".dyn_photo ul");
			if(Piclist.length>0){
					for (var i = 0; i < Piclist.length; i++) {
					pic_html = '<li>' 
//					           + '<img src="' + Piclist[i][1] + '" i="' + Piclist[i][0] + '" width="100%">' 
                               +'<a href="'+Piclist[i][0]+'" data-size="1600x1600" data-med="'+Piclist[i][0]+'" data-med-size="1024x1024" data-author="Folkert Gorter" class="demo-gallery__img--main">'
                               +'<img src="'+Piclist[i][1]+'" width="100%">'
//                             +'<img src="'+Piclist[i][0]+'" width="100%" style="display:none;">'
                               +'</a>'
					           + '</li>';
					pic.append(pic_html);
					var img = document.createElement("img");
					img.src =Piclist[i][0];
					img.onload=function(){
						imgmap[this.src+""]={};
						imgmap[this.src+""].width=this.width;
						imgmap[this.src+""].height=this.height;
//						console.log(imgmap[this.src+""]);
//						console.log(this.src);
					}
				}
			}else if(Datalist.videoName != ""){
				video=Datalist.bucket+'.'+Datalist.domain+Datalist.videoName;
              	videolen=video.length-3;
              	videohttp=video.substr(0,videolen);
              	photobox='<div class="videobox" videosrc="http://'+video+'""><img src="images/icon/shipin_icon.png" width="40" height="40" class="shipinicon"><img src="http://'+videohttp+'jpg" width="100%"></div>';
              	$(".dyn_articl").after(photobox);
                doms.find(".videobox").on("click",function(){
				var videosrc=$(".videobox").attr("videosrc");
	            window.location.href='video.html?videosrc='+videosrc;
			})
			}
			initPhotoSwipeFromDOM('.demo-gallery');
//			console.log(HotComment);
			if(HotComment ==''){
				$(".allcombox").hide();
				$(".allcomment").css("border-top","none")
				$("html").css("background","#FFFFFF");
			}
			for (var n = 0; n < HotComment.length; n++) {
				var H_html = '<div class="person fl"><img src="' + HotComment[n].user.avatar + '" width="100%" class="avatarpic"/></div>' 
				+ '<div class="dynamic_con fr" id="' + HotComment[n].id + '">' 
				+ '<ul class="comment">' 
				+ '<li>' 
				+ '<div class="com_tit"><span class="fr dyn_lz">' + HotComment[n].floor + '楼</span><h3 class="fullname">' 
				+ HotComment[n].user.fullName + '</h3><span class="comtime">' + HotComment[n].createTime + '</span></div>' 
				+ ' <p>' + HotComment[n].content + '</p>' 
				+ '<div class="dyn_cz allcomcz">' 
				+ '<span class="zan tiezan"><a praiseid="' + HotComment[n].praiseId + '"><img src="images/icon/icon4.png" width="13" height="12"><i num ="'+ HotComment[n].praiseNum +'">' + HotComment[n].praiseNum + '</i></a></span>' 
				+ '<span class="zan lzanswer"><a class="comanswer"><img src="images/icon/icon5.png" width="13" height="13">回复</a></span>'
				+ '</div>' 
				+ '</li>' 
				+ '</ul>' 
				+ '</div>' 
				+ '<div class="clear"></div>'
				var dom = $(H_html);
				dom.find(".comtime").text(HotComment[n].createTime.substring(0,16))
				if(HotComment[n].praiseNum == 0){
					dom.find(".tiezan i").hide();
				}
				hotlist_removhtml = '<span><a class="hotremove"><img src="images/icon/icon7.png" width="13" height="13">删除</a></span>'
				var nowzan_hot = dom.find(".tiezan a").attr("praiseid")
				if (nowzan_hot != null && nowzan_hot != "null") {
					dom.find(".tiezan a img").attr("src", "images/icon/icon4_3.png");
					dom.find(".tiezan a i").text("已赞");
				} else {
					dom.find(".tiezan a img").attr("src", "images/icon/icon4.png");
				}
				if (HotComment[n].user.avatar == "") {
					dom.find(".avatarpic").attr("src", "images/avatar.png");
				}
				Hotcon.append(dom);
				dom.find(".tiezan").on("click",function() {
					var a = $(this).find("i");
					var num = parseInt(a.text());
					var zan = $(this).find("a");
					var zanid = $(this).find("a").attr("praiseid");
				if ($(this).find("a").attr("praiseid") != null && $(this).find("a").attr("praiseid") != "null") {
					delzan($(this),zanid,zan);
				} else {
					var tartype = $(this).find("i").attr("tartype");
					if (tartype == 0) {
						tartype = 0
					} else {
						tartype = 1
						delzan($(this),zanid,zan);
					}
					var targetid = $(this).parents(".dynamic_con").attr("id");
					like_zan(a,num,zan,userId,targetid,tartype);
				}
					
				});
		   /*----------回复绑定 热门回复---------*/
			dom.find(".comanswer").on("touchend",acquire);
				/*----删除评论---*/
				if (userId == tzUserId) {
				dom.find(".allcomcz").append(hotlist_removhtml)
				dom.find(".hotremove").on("click", function() {
				$(".delcom_ts,.mack").show();
				var id=$(this).$(".dynamic_con").attr("id");
				var thiss=$(this);
				delcom_ok.off("click");
				delcom_ok.on("click",function(){
					listremove(id,thiss);
				})
			})
			} else {
				dom.find(".allcomcz span:last").css("border", "none");
				}

	
			}
		},
		error: function(data) {
			alert("网络连接失败，请重新连接");
		}
	});
/*
 * 更多回复
 */
function morecom() {
		$.ajax({
			type: "post",
			url: list_Url,
			contentType: contenttype,
			dataType: "json",
			data: JSON.stringify({
				userId: userId,
				postsId: id,
				desc: desc,
				maxResluts: maxResluts,
				pageNo: PageNo,
				createTime:createTimelist
			}),
			timeout: 10000,
			success: function(data) {
				isloading = false;
				$(".onloading").show();
				PageNo++;
				var moredata = data.data.results;
			    if(moredata.length < 5){
			    	$(".onloading").text("没有更多了");
			    }
				if (moredata != "") {
					for (var e = 0; e < moredata.length; e++) {
						var userid = moredata[e].user.userId
						var M_html = '<div class="person fl"><img src="' + moredata[e].user.avatar + '" width="100%" class="avatarpic" /></div>' 
						             + '<div class="dynamic_con fr" id = "' + moredata[e].id + '">' 
						             + '<ul class="comment">' 
						             + '<li>' 
						             + '<div class="com_tit"><span class="fr dyn_lz">' + moredata[e].floor + '楼</span><h3 class="fullname">' + moredata[e].user.fullName + '</h3><span class="comtime">' + moredata[e].createTime + '</span></div>' 
						             + '<div class="com_about">'
						             + '</div>' 
						             + '<p class="nowcon">' + moredata[e].content + '</p>' 
						             + '<div class="dyn_cz allcomcz">' 
						             + '<span class="zan tiezan"><a praiseid="' + moredata[e].praiseId + '"><img src="images/icon/icon4.png" width="13" height="12"><i num="'+moredata[e].praiseNum+'">' + moredata[e].praiseNum + '</i></a></span>' 
						             + '<span class="zan lzanswer"><a class="comanswer"><img src="images/icon/icon5.png" width="13" height="13">回复</a></span>'
						             + '</div>' 
						             + '</li>' 
						             + '</ul>' 
						             + '</div>' 
						             + '<div class="clear"></div>'
						console.log(moredata[e].praiseNum);
						var domes = $(M_html);
						domes.find(".comtime").text(moredata[e].createTime.substring(0,16))
						createTimelist = moredata[e].createTime;
						morelist_removhtml = '<span><a class="moreremove"><img src="images/icon/icon7.png" width="13" height="13">删除</a></span>'
						if(moredata[e].praiseNum ==0){
							domes.find(".tiezan i").hide();
						}
						if(moredata[e].user.avatar == ""){
							domes.find(".avatarpic").attr("src","images/avatar.png");
						}
						var nowzan_more = domes.find(".tiezan a").attr("praiseid")
						if (nowzan_more != null && nowzan_more != "null") {
							domes.find(".tiezan a img").attr("src", "images/icon/icon4_3.png");
							domes.find(".tiezan a i").text("已赞");
						} else {
							domes.find(".tiezan a img").attr("src", "images/icon/icon4.png");
						}
						for (var m = 0; m < data.data.results[e].parents.length; m++) {
							var mr_html = '<div class="dynamic_con fr" id="'+data.data.results[e].parents[m].id+'">' + '<ul class="comment combg">' + '<li>' + '<div class="com_tit"><h3>' + data.data.results[e].parents[m].user.fullName + '</h3><span class="comtime">' + data.data.results[e].parents[m].createTime + '</span></div>' + '<p>' + data.data.results[e].parents[m].content + '</p>' + '</li>' + '</ul>' + '</div>' + '<div class="clear"></div>';
							$("#" + moredata[e].id).find($(".com_about")).append(mr_html);
							//console.log(data.data.results[e].parents[m].id);
							$("#" + moredata[e].id).find($(".comtime")).text(data.data.results[e].parents[m].createTime.substring(0,16));
							parentId = $("#"+data.data.results[e].parents[m].id);
						}
					 domes.find(".tiezan").on("click",function() {
								var a = $(this).find("i");
								var num = parseInt(a.text());
								var zan = $(this).find("a");
								var zanid = $(this).find("a").attr("praiseid");
							if ($(this).find("a").attr("praiseid") != null && $(this).find("a").attr("praiseid") != "null") {
							   delzan($(this),zanid,zan);
							} else {
								var tartype = $(this).find("i").attr("tartype");
							if (tartype == 0) {
								tartype = 0
							} else {
								tartype = 1
//								delzan($(this),zanid,zan);
							}
							var targetid = $(this).parents(".dynamic_con").attr("id");
							like_zan(a,num,zan,userId,targetid,tartype);
							}
							
						});
				/*----------回复绑定 更多回复---------*/
				 domes.find(".comanswer").on("click",acquire)
		        /*----删除评论---*/
					  if (userId == userid) {
						domes.find(".allcomcz").append(morelist_removhtml);
						domes.find(".moreremove").on("click", function() {
							$(".delcom_ts,.mack").show();
							var thiss=$(this);
							var id=$(this).parents(".dynamic_con").attr("id");
							delcom_ok.off("click");
							delcom_ok.on("click", function() {
								listremove(id,thiss);
							})
						})
					} else {
						domes.find(".allcomcz span:last").css("border", "none");
					}
					
				//显示盖楼
					more_answerbox.find(".morecomadd").prepend(domes)
//					console.log(moredata[e].parents.length);
					if(moredata[e].parents.length>0){
						more_answerbox.find("#" + moredata[e].id).children(".comment").children("li").children(".com_tit").after('<div class="parentfloor"></div>');
						for (var x = 0; x < moredata[e].parents.length; x++) {
					    var floorcon = '<div class="com_about"><div class="dynamic_con fr"><ul class="comment combg"><li><div class="com_tit"><h3>' + moredata[e].parents[x].user.fullName + '</h3><span class="comtime">' + moredata[e].parents[x].createTime + '</span></div><p>' + moredata[e].parents[x].content + '</p></li></ul></div><div class="clear"></div></div>';
					    more_answerbox.find("#" + moredata[e].id).find(".parentfloor").append(floorcon);
					    $("#" + moredata[e].id).find(".comtime").text(moredata[e].parents[x].createTime.substring(0,16))
						}
					}
				More_con.append(domes);
				}
				} else {
					$(".onloading").text("没有更多了");
				}
			},
			error: function(data) {
				alert("网络连接失败，请重新连接");
			}
		});
	}
morecom();
/*
 * 发表评论
 */
function save(a,num,zan,tartype,targetid,userId,id,content,parentId){
	$.ajax({
		type: "post",
		url: save_Url,
		contentType: contenttype,
		dataType: "json",
		data: JSON.stringify({
			userId: userId,
			postsId:id,
			content: content,
			parentId: parentId
		}),
		timeout: 10000,
		success: function(data) {
			$(".comanswer").on("touchend",acquire);
			console.log(data.data.user.userId);
			var copycom = '<div class="person fl">' 
			              + '<img src="' + data.data.user.avatar + '" width="100%" class="avatarpic" />' 
			              + '</div>' 
			              + '<div class="dynamic_con fr" id="' + data.data.id + '">' 
			              + '<ul class="comment">' 
			              + '<li>' 
			              + '<div class="com_tit">' 
			              + '<span class="fr dyn_lz">' + data.data.floor + '楼</span>' + '<h3 class="fullname">' + data.data.user.fullName + '</h3>' 
			              + '<span class="comtime">' + data.data.createTime + '</span>' 
			              + '</div>' 
			              + '<p class="nowcon">' + data.data.content + '</p>'
			              + '<div class="dyn_cz allcomcz">' 
			              + '<span class="zan tiezan">' 
			              + '<a praiseid="' + data.data.praiseId + '">' 
			              + '<img src="images/icon/icon4.png" width="13" height="12"><i num="'+data.data.praiseNum+'">' + data.data.praiseNum + '</i>' 
			              + '</a></span><span  class="zan lzanswer"><a class="comanswer"><img src="images/icon/icon5.png" width="13" height="13">回复</a></span>' 
			              + '</div>' 
			              + '</li>' 
			              + '</ul>' 
			              + '</div>' 
			              + '<div class="clear"></div>';
			demos = $(copycom);
			demos.find(".comtime").text(data.data.createTime.substring(0,16))
			save_removhtml = '<span><a class="hotremove"><img src="images/icon/icon7.png" width="13" height="13">删除</a></span>'
			if(data.data.praiseNum == 0){
				demos.find(".tiezan i").hide();
			}
			/*----赞---*/
			var nowzan_save = demos.find(".tiezan a").attr("praiseid")
						if (nowzan_save != null && nowzan_save != "null") {
							demos.find(".tiezan a img").attr("src", "images/icon/icon4_3.png");
							demos.find(".tiezan a i").text("已赞");
						} else {
							demos.find(".tiezan a img").attr("src", "images/icon/icon4.png");
						}
			demos.find(".tiezan").on("click", function() {
				var a = $(this).find("i");
				var num = parseInt(a.text());
				var zan = $(this).find("a");
				var zanid = $(this).find("a").attr("praiseid");
				if ($(this).find("a").attr("praiseid") != null && $(this).find("a").attr("praiseid") != "null") {
					 delzan($(this),zanid,zan);
				} else {
					var tartype = $(this).find("i").attr("tartype");
					if (tartype == 0) {
						tartype = 0
					} else {
						tartype = 1
					}
					var targetid = $(this).parents(".dynamic_con").attr("id");
					like_zan(a, num, zan, userId, targetid, tartype);
				}
	
			});
			/*----删除评论---*/
			if (data.data.user.userId == userId) {
				demos.find(".allcomcz").append(save_removhtml)
				demos.find(".hotremove").on("click", function() {
					$(".delcom_ts,.mack").show();
					var id=$(this).parents(".dynamic_con").attr("id");
					var thiss=$(this);
					delcom_ok.off("click");
                    delcom_ok.on("click",function(){
                    	listremove(id,thiss);
                    })
				})
			} else {
				demos.find(".allcomcz span:last").css("border", "none");
			}
			/*----------发送评论回复绑定---------*/
			demos.find(".comanswer").on("click",acquire)

			more_answerbox.find(".morecomadd").prepend(demos)
			if( data.data.user.avatar == ""){
				demos.find(".avatarpic").attr("src",'images/avatar.png');
			}
			if (data.data.parents.length > 0) {
				more_answerbox.find("#" + data.data.id).children(".comment").children("li").children(".com_tit").after('<div class="parentfloor"></div>');
				for (var x = 0; x < data.data.parents.length; x++) {
					var floorcon = '<div class="com_about"><div class="dynamic_con fr"><ul class="comment combg"><li><div class="com_tit"><h3>' + data.data.parents[x].user.fullName + '</h3><span class="comtime">' + data.data.parents[x].createTime + '</span></div><p>' + data.data.parents[x].content + '</p></li></ul></div><div class="clear"></div></div>';
					more_answerbox.find("#" + data.data.id).find(".parentfloor").append(floorcon);
					$("#" + data.data.id).find(".comtime").text(data.data.parents[x].createTime.substring(0,16))
				}
			}
//			myrefresh();
		},
		error: function() {
			alert("回复失败 ，请重新输入内容");
		}
	});
}
// 获取文本框 内容
function acquire(e) {
	var parentId = $(this).parents(".dynamic_con").attr("id");
	hfp = $(this).parents(".comment").find(".fullname").text();
	anstext=hfp;
    e.stopPropagation();
	$(".write_box").show().find("input[type=text]").val("回复" + hfp).attr("parentId", parentId);
	$("body").css("padding-bottom", "44px");
	 e.stopPropagation();
	hfp = $(".write_box").find("input[type=text]").val()
}
//光标清除
$(".write_box").find("input[type=text]").focus(function(e){
	if($(this).val()!="" &&$(this).val()!="回复"+anstext&&$(this).val()!="回复楼主"){
		$(this).css("color","#63615c");
	}else{
		$(this).val("").css("color","#63615c");
	}
	e.stopPropagation();
});
//评论点击按钮触发事件
  var BtnSend = $("#send");BtnSend.on("click",function() { 
		 parentId = $(this).parent(".sendbtn").prev(".writeinput").find("input[type=text]").attr("parentId");
		//console.log(parentId);
		 content = $(this).parent(".sendbtn").prev(".writeinput").find("input[type=text]").val();
		if (content!=""&&content!="回复楼主"&&content!="回复"+anstext) {
			$(".comanswer").off("touchend");
			save(a,num,zan,tartype,targetid,userId,id,content,parentId);
//			$(this).parents(".write_box").hide();
            $(this).parents(".write_box").find("input[type=text]").val("回复楼主").attr("parentId","");
		} else {
			alert("没有评论内容！");
		}
	});

/*
 * 删除评论
 */

function listremove(id,thiss){
	$.ajax({
 	type:"post",
 	contentType: contenttype,
 	url:list_remove_Url,
    dataType: "Json",
    data: JSON.stringify({
			userId: userId,
			id:id,
		}),
		success:function(data){
			console.log(data);
			$(".delcom_ts,.mack").hide();
			thiss.parents(".dynamic_con").find(".comment .nowcon").text("该评论已删除");		
		},
		error:function(data){
				alert("删除失败");
		}
 });	
}
/*
 * 删除帖子
 */

function postremove(userId,id,thiss){
 $.ajax({
 	type:"post",
 	url:post_remove_Url,
 	contentType: contenttype,
    dataType: "Json",
    data: JSON.stringify({
			userId: userId,
			id:id,
		}),
	success:function(data){
		$(".del_ts").hide();
		$(".allcomspe,.allcomment,.write_box,.onloading").remove();
		$(".back_ts").show();
        goback_ok.on("click",function(){
           location.href = 'essence_recommend.html?user_id='+userId ;
         })
	},
	error:function(data){
		  alert("删除失败");
		}
 });
}
/*
 * 赞
 */

function like_zan(a,num,zan,userId,targetid,tartype){
//	console.log(tartype);
	$.ajax({
		url: praise_Url,
		contentType: contenttype,
		type: "POST",
		dataType: "Json",
		data: JSON.stringify({
			userId: userId,
			targetId: targetid,
			targetType: tartype
		}),
		success: function(data) {
			
			//console.log(data)
	        
			a.text("已赞");
			zan.find("img").attr("src","images/icon/icon4_3.png")
			zan.find("i").show();
			zan.attr("praiseid", 1);
	
		},
		error: function(data) {
			alert("您没有赞成功");
			return;
		}
	})
}
//取消点赞
  function delzan(zthis,zanid,zan){
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
			 zthis.find("i").text(delzan-1);
			 zan.attr("praiseid","null");

			console.log(data)
			
		},
		error:function(){
			alert("您点赞失败");
			return;
		}
	})
  }
/*
 * 出现滚动
 */
$(window).scroll(function() {
		var scrollTop = $(this).scrollTop();
		var scrollHeight = $(document).height();
		var windowHeight = $(this).height();
		if (scrollTop + windowHeight == scrollHeight) {
			if(isloading == false){
				isloading = true;
				 morecom();
			}
		}
//		scroll(function(direction) {
//			if($(".write_box").length=1){
//				if(direction=="down"){
//					$(".write_box").hide();
//					$("body").css("padding-bottom","0");
//				}else{
//					$(".write_box").show();
//				}
//			}
//		});
	});
	/*
 * 滚动加载
 */
//	function scroll(fn) {
//		var beforeScrollTop = document.body.scrollTop,
//		fn = fn ||
//		function() {};
//		window.addEventListener("scroll",
//		function() {
//			var afterScrollTop = document.body.scrollTop,
//			delta = afterScrollTop - beforeScrollTop;
//			if (delta === 0) return false;
//			fn(delta > 0 ? "down": "up");
//			beforeScrollTop = afterScrollTop;
//		},
//		false);
//	}
var browser={
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
         language:(navigator.browserLanguage || navigator.language).toLowerCase()
}

if(browser.versions.ios){
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
 }); 
}

//function myrefresh(){
// window.location.reload();
//}
//	photo.photoshow();
})