/*
 * 
 * 活动列表信息
 */

var init = {
  container: "#jq",
  down: {
    callback: pullfresh
  },
  up: {
    callback: pullloading
  }
};

var info = {
  "#jq": {
    id: "jq",
    total: 0,
    count: 0
  }
}
var PageNum = 1;
function pull(load, type, id) {
 
  var my = info[id];
  var html = "";
  var userId = sessionStorage.getItem("useid");
  var MaxResluts = sessionStorage.getItem("maxResluts");
  var actlist_Url = game_http_url + '/activity/activity/list';
  var nul = $("#thelist");
  /*----获取活动列表信息地址-----*/
  $.ajax({
  	type:"post",
  	url:actlist_Url,
  	contentType: contenttype,
    dataType: "json",
    data: JSON.stringify({
      userId: userId,
      maxResluts: MaxResluts,
      pageNo:PageNum
    }),
    timeout: 10000,
    success:function(data){
      $(".loading").hide();
      $(".main").show();
      //console.log(data);
      var dataresults = data.data.results;
      var MaxResults = data.data.maxResults;
      var PageNext = data.data.next;
      var pageNo =data.data.pageNo;
      var myTotal = data.data.totalCount;
      //actcon(data,dataresults,MaxResults);
    // console.log(data)
     //console.log(PageNum);
    // console.log(PageNext);
      if(type =="down"){
      	nul.html('');
      	actcon(data,dataresults,MaxResults);
      	mui('#jq').pullRefresh().endPulldownToRefresh();
      }else{
      	 actcon(data,dataresults,MaxResults);
      	 if(PageNext == PageNum){
      	 	load.endPullupToRefresh(true);
      	 }else{
      	 	PageNum++
      	 	load.endPullupToRefresh(false);
      	 }
      }
    },
    error:function(data){
      $(".mack").show();
      $(".dialog").show();
    }
  });
  
    function actcon(data,dataresults,MaxResults,pageNo,PageNext){
    	console.log(data);
      		  for(var n = 0; n < dataresults.length; n++){   		  	
      		  	 // console.log(dataresults[n])
      		  	 //console.log(dataresults[n].id,1)
		      	 var start_html = '<li class ="act-page" id= "' + dataresults[n].id + '" isonline ="'+dataresults[n].isonline+'" type="'+dataresults[n].type+'">' 
		                       + '<div class="content-act content clearfix">' 
		                       + '<div class="headertitle">' 
		                       + '<h1 class="start">' + dataresults[n].title + '</h1>' 
		                       + '<span class="time">' + dataresults[n].startDate + '</span>' 
		                       + '</div>' 
		                       + '<div class="con">' 
		                       + '<p>' + dataresults[n].description + '</p>' 
		                       + '</div>' 
		                       + '<div class="imgbox">' 
		                       + '<img src="'+dataresults[n].pic+'" alt="">' 
		                       + '</div>' 
		                       + '<div class="line"></div>' 
		                       + '<div class="clear"></div>' 
		                       + '<div class="headpic"></div>' 
		                       + '</div>' 
		                       + '</li>' ;
		        var end_html = '<li class ="act-page_end" id= "' +dataresults[n].id + '" isonline ="'+dataresults[n].isonline+'" type="'+dataresults[n].type+'">' 
		                       + '<div class="content-act content clearfix">' 
		                       + '<div class="headertitle">' 
		                       + '<h1 class="start">' + dataresults[n].title + '<i class="badge">已结束</i></h1>' 
		                       + '<span class="time">' +dataresults[n].startDate + '</span>' 
		                       + '</div>' 
		                       + '<div class="con">' 
		                       + '<p>' + dataresults[n].description + '</p>' 
		                       + '</div>' 
		                       + '<div class="imgbox">' 
		                       + '<img src="'+dataresults[n].pic+'" alt="">' 
		                       + '</div>' 
		                       + '<div class="line"></div>' 
		                       + '<div class="clear"></div>' 
		                       + '<div class="headpic"></div>' 
		                       + '</div>' 
		                       + '</li>'
		          //console.log(dataresults[n].isonline)
		          console.log(dataresults[n].type)
					if (dataresults[n].isonline == 1) {
						nul.append(start_html);
						$(".act-page").click(function() {
							var Actid = $(this).attr("id");
							var isonline = $(this).attr("isonline");
							var type = $(this).attr("type");
							if (isonline == 1 && type == 0) {
								location.href = 'activity.html?user_id=' + userId + '&id=' + Actid + '&isRanking=1';
							} else if (isonline == 1 && type == 1) {
								location.href = 'game-page.html?user_id=' + userId + '&id=' + Actid + '&isRanking=1';
							}
						})
					} else if (dataresults[n].isonline == 2) {
						nul.append(end_html);
						$(".act-page_end").click(function() {
							var Actid = $(this).attr("id");
							var isonline = $(this).attr("isonline");
							var type = $(this).attr("type");
							if (isonline == 2 && type == 0) {
								location.href = 'prize.html?user_id=' + userId + '&id=' + Actid + '&isRanking=1';
							} else if (isonline == 2 && type == 1) {
								location.href = 'game-page-end.html?user_id=' + userId + '&id=' + Actid + '&isRanking=1';
							}
						})
					}
//		          }else if(dataresults[n].isonline==2){
//		          	  nul.append(end_html);
//		          	  if(dataresults[n].type==1){
//		          	  	 $(".act-page").click(function(){
//			       	        var Actid = $(this).attr("id");
//			       	       // console.log(Actid);
//			       	    	location.href='game-page-end.html?user_id='+userId + '&id='+Actid +'&isRanking=1';
//			       	    })	
//		          	  }else if(dataresults[n].type==0){
//		          	  	 $(".act-page_end").click(function(){
//			           	    var Actid = $(this).attr("id");
//			       	    	location.href='prize.html?user_id='+userId + '&id='+Actid +'&isRanking=0'; 
//			       	    })
//		          	  }
//		          }	          
//		          if(dataresults[n].isonline==1){
//			       	    nul.append(start_html);
//			       	    $(".act-page").click(function(){
//			       	        var Actid = $(this).attr("id");
//			       	       // console.log(Actid);
//			       	    	location.href='activity.html?user_id='+userId + '&id='+Actid +'&isRanking=1';
//			       	    })
//			       }else if(dataresults[n].isonline==2){
//			           nul.append(end_html);
//			           $(".act-page_end").click(function(){
//			           	    var Actid = $(this).attr("id");
//			       	    	location.href='prize.html?user_id='+userId + '&id='+Actid +'&isRanking=0'; 
//			       	    })
//			       } 
//			       console.log(dataresults[n].users.length)
			       	if( dataresults[n].users.length == 0){
					      $('#'+dataresults[n].id+' .headpic').hide();
					      $('#'+dataresults[n].id+' .line').hide();
					}
                   for (var i = 0; i < dataresults[n].users.length; i++) {
						　　$('#'+dataresults[n].id+' .headpic').html("");
					}
			        for (var i = 0; i < dataresults[n].users.length; i++) {
							var con = '<span><img src="' +dataresults[n].users[i].avatar + '"></span>';
							var condom = $(con);
					 if (dataresults[n].users[i].avatar == '') {
						 condom.find("img").attr('src', 'images/avatar.png');
							}
					  $('#'+dataresults[n].id+' .headpic').append(condom);
				}
			        $('#'+dataresults[n].id).find(".time").text(dataresults[n].startDate.substring(0,16));

           }
      }
}
 
 
function pullfresh() {
  PageNum =1;
  pull(this, "down", "#jq");
}

function pullloading() {
  pull(this, "up", "#jq");
}

mui.ready(function() {
  mui('#jq').pullRefresh(init).pullupLoading();
});	
	
	
	
	
	
