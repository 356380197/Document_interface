var imgmap={};
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
$(function(){
	
/*
 *** 公共请求地址*
 */	
	var pageNo = 1;
 	//var useid = 17453;
	var useid = uid(urls).user_id;
	//var useid = uid(urls).user_id;
	var maxResluts= 5;
	var forShare = false;
	var desc = false
	var commentUserId = 1;
	var activityId = 191;
	var isRanking=uid(urls).isRanking;
	var tietid=uid(urls).tietid;
	var id  =uid(urls).id;
	var videohttp=uid(urls).videohttp;
	//var postsId = uid(urls).postsId;
	window.sessionStorage.useid = useid;
	window.sessionStorage.activityId = activityId;
	window.sessionStorage.forShare = forShare;
	window.sessionStorage.isRanking = isRanking;
	window.sessionStorage.tietid = tietid;
	window.sessionStorage.pageNo = pageNo;
	window.sessionStorage.maxResluts = maxResluts;
	window.sessionStorage.id = id;
	window.sessionStorage.desc = desc;
	window.sessionStorage.commentUserId = commentUserId;
	window.sessionStorage.videohttp=videohttp;
	//window.sessionStorage.postsId =postsId;
	/*
	 * 蒙版关闭状态
	 */
	$(".close").on("click",function(){
		$(".mack").hide();
		$(".dialog").hide();
	})
	$("#define").on("click",function(){
		$(".mack").hide();
		$(".dialog").hide();
	})
	
})