$(function(){
	$(".activity_dyn:last").css("margin-bottom","0");
	var EssRe_Url = Ehttp_url + '/digestposts/posts/list';
	var praise_Url = Ehttp_url + '/digestposts/praise/save';
	var del_zan_url = Ehttp_url+"/digestposts/praise/remove";
	var userid= sessionStorage.getItem("useid");
	var PageNo = sessionStorage.getItem("pageNo");
    var MaxResluts = sessionStorage.getItem("maxResluts");
    var con=$(".mainContact");
    var isloading = false;
    con.empty();
   function EsAjax(){
   	$.ajax({
    	type:"post",
    	url:EssRe_Url,
        contentType: contenttype,
        dataType: "json",
    	data: JSON.stringify({
	      userId: userid,
	      pageNo: PageNo,
	      maxResluts: MaxResluts
	    }),
    timeout: 10000,
    success:function(data){
       isloading = false;
       $(".loading").hide();
       $(".main").show();
       $(".onloading").show();
    	PageNo++;
    	var ResultsData =data.data.results;       
        //console.log(data);
        console.log(ResultsData);
        var PostID
        if(ResultsData ==''){
        	$(".onloading").text("没有更多了");
        }else{
        for(i = 0;i<ResultsData.length;i++){
        	if(ResultsData.length<5){
        		$(".onloading").text("没有更多了");
        	}
//         console.log(ResultsData[i].user)
           if(ResultsData[i].user == null){
           	 continue;
           }
           var html = '<div class="dynamic_box activity_dyn" id="'+ResultsData[i].id+'">'
                      +'<div class="person fl"><img src="'+ResultsData[i].user.avatar+'" width="100%"/></div>'
                      +'<div class="dynamic_con fr" id="'+ResultsData[i].id+'">'
                      +'<div class="topheader">'
                      +'<div class="dyn_tit">'
                      +'<h3>'+ResultsData[i].user.fullName+'</h3>'
                      +'<span class="dyn_time">'+ResultsData[i].createTime+'</span>'
                      +'</div>'
                      +'</div>'
                      +'<div class="clear"></div>'
                      +'<div class="dyn_articl" id="'+ResultsData[i].id+'">'+ResultsData[i].content+'</div>'
                      +'<div class="dyn_cz allcomcz">'
                      +'<span class="zan"><a praiseid ="' + ResultsData[i].praiseId + '"><img src="images/icon/icon4_2.png" width="13" height="12"><i tartype="0">'+ResultsData[i].praiseNum+'</i></a></span>'
                      +'<span class="comment_n" id="'+ResultsData[i].id+'"><a><img src="images/icon/icon5.png" width="13" height="13"><i class="comment_t">'+ResultsData[i].commentNum+'</i></a></span>'
                      +'</div>'
                      +'</div>'
                      +'<div class="clear"></div>';
               var doms = $(html)
               con.append(doms); 
               var dyn_photohtml ='<div class="dyn_photo demo-gallery" id="demo-test-gallery">'+'<ul>'+'</ul>'+'<div class="clear"></div>'+'</div>'
               var hot_hfhtml = '<div class="hot_hf">'
                                +'<div class="comment_box" id="'+ResultsData[i].id+'">'
                                +'<h2 class="hot_answer"><span></span>热门回复</h2>' 
                                + '<ul class="comment combg">' 
                                +'</ul>' 
                                +'</div>'
                                +'<div class="more_com"><a href="essence_details.html?id=' + ResultsData[i].id +'&user_id='+ userid +'" class="more">更多评论 <span>》</span></a></div>'
                                +'</div>'
             var cr_time = ResultsData[i].createTime;
             $("#"+ResultsData[i].id).find(".dyn_time").text(cr_time.substring(0,16));
             if(ResultsData[i].praiseNum == 0){
             	$("#"+ResultsData[i].id).find(".zan i").hide();
             }
             if(ResultsData[i].commentNum == 0){
             	$("#"+ResultsData[i].id).find(".comment_t").hide();
             }
             //点赞
             var nowzan = doms.find(".zan a").attr("praiseid")
//           console.log(nowzan);
             if(nowzan != null && nowzan != "null"){
             	doms.find(".zan a img").attr("src","images/icon/icon4_3.png");
             }else{
             	doms.find(".zan a img").attr("src", "images/icon/icon4.png");
             }
             doms.find(".zan").on("click",function(){           
             	var a = $(this).find("i");
                var num = parseInt(a.text());
             	var zan = $(this).find("a"); 
             	var zanid = $(this).find("a").attr("praiseid");
             	if (zan.attr("praiseid")!="null") {
					 delzan($(this),zanid,zan);
				} else {
					var tartype = zan.find("i").attr("tartype");
//					alert(tartype);
					//console.log(tartype);
//					if (tartype == 0) {
//						tartype = 0
//					} else {
//						tartype = 1
//					}
					var targetid = $(this).parents(".dynamic_con").attr("id");
					like_zan(a,num,zan,userid,targetid,tartype);
				}
             })
//           if(ResultsData[i].praiseNum != 0){
//            	$("#"+ResultsData[i].id).find(".zan a img").attr("src","images/icon/icon4_3.png");
//            	$("#"+ResultsData[i].id).find(".zan").on("click",function(){
//           		alert("你已点过赞")
//           	})
//            }

            if(ResultsData[i].user.avatar == ''){
           	  $("#"+ResultsData[i].id).find(".person img").attr('src','images/avatar.png')
           }
              if(ResultsData[i].pics.length>0){
              	    $("#"+ResultsData[i].id).find(".allcomcz").before(dyn_photohtml);
              	for(n = 0 ;n<ResultsData[i].pics.length;n++){
                 	$("#"+ResultsData[i].id).find($(".dyn_photo ul")).append('<li>'
//               	+'<img src="'+ResultsData[i].pics[n][1]+'" i="'+ResultsData[i].pics[n][0]+'" width="100%">'
                    +'<a href="'+ResultsData[i].pics[n][0]+'" data-size="1600x1600" data-med="'+ResultsData[i].pics[n][0]+'" data-med-size="1024x1024" data-author="Folkert Gorter" class="demo-gallery__img--main">'
					+'<img src="'+ResultsData[i].pics[n][1]+'" width="100%">'
//					+'<img src="'+ResultsData[i].pics[n][0]+'" width="100%" style="display:none;">'
					+'</a>'
                 	+'</li>'
                 	)
                 	var img = document.createElement("img");
					img.src =ResultsData[i].pics[n][0];
					img.onload=function(){
						imgmap[this.src+""]={};
						imgmap[this.src+""].width=this.width;
						imgmap[this.src+""].height=this.height;
//						console.log(imgmap[this.src+""]);
//						console.log(this.src);
					}
                 } 
              }else if(ResultsData[i].videoName !=""){
              	video=ResultsData[i].bucket+'.'+ResultsData[i].domain+ResultsData[i].videoName;
              	videolen=video.length-3;
              	videohttp=video.substr(0,videolen);
              	photobox='<div class="videobox" videosrc="http://'+video+'""><img src="images/icon/shipin_icon.png" width="40" height="40" class="shipinicon"><img src="http://'+videohttp+'jpg" width="100%"></div>';
              	$("#"+ResultsData[i].id).find(".dyn_articl").after(photobox);
              	$(".videobox").on("click",function(){
              	var videosrc=$(".videobox").attr("videosrc");
	            window.location.href='video.html?videosrc='+videosrc;
              	})
              }
         
               var hotlist = ResultsData[i].hotComment.length;
                  if(hotlist >0){
                  	$("#"+ResultsData[i].id).find(".dynamic_con").append(hot_hfhtml);
                  }

					for (e = 0; e < ResultsData[i].hotComment.length; e++) {
						var nul = $(".comment")
						var con_html = '<li>' 
						               + '<div class="com_tit"><h3>' + ResultsData[i].hotComment[e].user.fullName + '</h3><span class="comtime">' + ResultsData[i].hotComment[e].createTime + '</span></div>'
						               + ' <p>' + ResultsData[i].hotComment[e].content + '</p>' 
						               + '</li>'
						$("#"+ResultsData[i].id).find(nul).append(con_html);
						//console.log(ResultsData[i].hotComment[e].postsId)
//						PostID = ResultsData[i].hotComment[e].postsId
//						window.sessionStorage.PostID = PostID
                      var hotcr_time = ResultsData[i].hotComment[e].createTime;
                      $("#"+ResultsData[i].id).find(".comtime").text(hotcr_time.substring(0,16))
				  }        
              } 
                 initPhotoSwipeFromDOM('.demo-gallery');
//            $('body').on("click",'.dyn_articl',function(){
//               var list_id = $(this).attr('id');
//             	 location.href='essence_details.html?id='+ list_id  +'&user_id='+ userid +'';
//             })
              $('body').on("click",'.comment_n',function(){
              	 var list_id = $(this).attr('id');
              	 location.href='essence_details.html?id='+ list_id  +'&user_id='+ userid +'';
              })
               $('body').on("click",'.comment_box',function(){
              	 var list_id = $(this).attr('id');
              	 location.href='essence_details.html?id='+ list_id  +'&user_id='+ userid +'';
              })
        }
    },
    error:function(){
    	alert("网络连接失败，请重新连接");
    }
    });  	
   } 
   EsAjax();
   //点赞
   function like_zan(a,num,zan,userid,targetid,tartype){
   	 EsAjax();
	   	$.ajax({
			url: praise_Url,
			contentType: contenttype,
			type: "POST",
			dataType: "Json",
			data: JSON.stringify({
				userId: userid,
				targetId: targetid,
				targetType: tartype
			}),
			success: function(data) {				
				console.log(data)
				a.text(num+1);
				zan.find("img").attr("src","images/icon/icon4_3.png")
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
			userId:userid,
			id:zanid
		}),
		success: function(data){
			var delzan = parseInt(zthis.find("i").text())-1;
		    zthis.find("img").attr("src","images/icon/icon4.png");
		    zthis.find("i").text(delzan);
		    zan.attr("praiseid","null");

			console.log(data)
			
		},
		error:function(){
			alert("您点赞失败");
			return;
		}
	})
  }
   $(window).scroll(function () { 	
	    var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if (scrollTop + windowHeight == scrollHeight) {
        	if(isloading == false){
        		isloading == true;
        		EsAjax();
        	}
        }
		
		scroll(function(direction) {
			if(direction=="down"){
				$(".write_box").hide();
				$("body").css("padding-bottom","0");
			}else{
				$(".write_box").show();
			}
		});  
    });
	 
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
//		photo.photoshow();
})
