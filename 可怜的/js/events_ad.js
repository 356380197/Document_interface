$(function(){
    var id  = uid(urls).id;
//  var id = "555b011f0cf2326a85393c04"
    var EventUrl = http_url+'/activity/posts/view';
    var headerCon = $(".headermain");
    var hotCon = $(".hotcon");
    var imgmap={};
    headerCon.empty();
    hotCon.empty();
    $.ajax({
    	type:"post",
    	url:EventUrl,
        contentType: contenttype,
        dataType: "json",
    	data: JSON.stringify({
	      id:id
	    }),
    timeout: 10000,
    success:function(data){
      $(".loading").hide();
      $(".main").show();
    	var resultdata = data.data;
        var resultdatapics =resultdata.pics;
        var resultdata_hot = resultdata.hotComment;
    		var HeaderHtml  = '<div class="dynamic_box" id='+resultdata.id+'>'
    	                  +'<div class="person fl">'+'<img src="'+resultdata.user.avatar+'" width="100%" />'+'</div>'
    	                  +'<div class="dynamic_con fr">'
    	                  +'<div class="dyn_tit">'
    	                  +'<h3>'+resultdata.user.fullName+'</h3>'
    	                  +'<div class="dyn_lz fr">楼主</div>'
    	                  +'<div class="clear"></div>'
    	                  +'</div>'
    	                  +'<p class="dyn_time">'+resultdata.createTime+'</p>'
    	                  +'<div class="dyn_articl">'+resultdata.content+'</div>'
    	                  +'<div class="dyn_photo demo-gallery" id="demo-test-gallery">'
    	                  +'<ul>'
    	                  +'</ul>'
    	                  +'<div class="clear"></div>'
    	                  +'</div>'
    	                  +'</div>'
    	                  +'<div class="clear"></div>'
    	       headerCon.append(HeaderHtml);
    	       if(resultdata.id==""){
    	       	  $("#"+resultdata.id).find("img").attr("src","images/avatar.png")
    	       }
    	       //console.log(resultdata.pics[0].length);
    	       for(var i = 0 ; i<resultdatapics.length;i++){
    	       	    var HtmlPics = '<li>'
//  	       	                  +'<img src="'+resultdatapics[i][1]+'" i="' + resultdatapics[i][0] + '" width="100%">'
                                  +'<a href="'+resultdatapics[i][0]+'" data-size="1600x1600" data-med="'+resultdatapics[i][0]+'" data-med-size="1024x1024" data-author="Folkert Gorter" class="demo-gallery__img--main">'
						          +'<img src="'+resultdatapics[i][1]+'" width="100%">'
						          +'</a>'
    	       	                  +'</li>'
    	       	     $(".dyn_photo ul").append(HtmlPics);
    	       	     var img = document.createElement("img");
					img.src =resultdatapics[i][0];
					img.onload=function(){
						imgmap[img.src] ={};
						imgmap[img.src].width =this.width
						imgmap[img.src].height =this.height;
					}
    	       }
             for(var e = 0; e<resultdata_hot.length;e++){
             	console.log(resultdata_hot[e]);
             	console.log(resultdata_hot[e].postsId);
             	//console.log(resultdata_hot[i].content)
             	var hothtml = '<div class="person fl">'
             	             +'<img src="'+resultdata_hot[e].user.avatar+'" width="100%" class="avapic" />'
             	             +'</div>'
             	             +'<div class="dynamic_con fr">'
             	             +'<ul class="comment">'
             	             +'<li>'
             	             +'<div class="com_tit"><span class="fr dyn_lz">'+resultdata_hot[e].floor+'楼</span>'
             	             +'<h3>'+resultdata_hot[e].user.fullName+'</h3><span class="comtime">'+resultdata_hot[e].createTime+'</span>'
             	             +'</div>'
             	             +'<p>'+resultdata_hot[e].content+'</p>'
             	             +'<div class="dyn_cz allcomcz">'
             	             +'<span class="zan"><a><img src="images/icon/icon4.png" width="13" height="12">'+resultdata_hot[e].praiseNum+'</a></span>'
             	             +'<span><a><img src="images/icon/icon5.png" width="13" height="13">回复</a></span>'
             	             +'</div>'
             	             +'</li>'
             	             +'</ul>'
             	             +'</div>'
             	             +'<div class="clear"></div>'
             	     var dom = $(hothtml)
             	     if(resultdata_hot[e].user.avatar ==""){
             	    	dom.find(".avapic").attr("src","images/avatar.png")
             	    }
             	    hotCon.append(dom);
             	    

             }
             initPhotoSwipeFromDOM('.demo-gallery');
    },
    error:function(){
    	alert("网络连接失败，请重试")
    }
    })
    photo.photoshow();
})
