/*
原理：1.把所有的li的高度值放到数组里面
2.第一行的top都为0
3.计算高度值最小的值是哪个li
4.把接下来的li放到那个li的下面
*/
var img_w = $(window).width(); //获取屏幕当前宽度
//var img_w_w = img_w * 0.47; //设置图片宽度
var img_w_w = img_w * 0.30; //设置图片宽度
$(".gallery-item img").width(img_w_w);
var margin = img_w * 0.02; //设置间距
var li = $(".gallery-item"); //区块名称
var li_W = img_w + margin; //取区块的实际宽度
function hzjcd() {
    var h = []; //记录区块高度的数组
    var n = img_w / li_W | 0;
    for (var i = 0; i < li.length; i++) {
        li_H = li[i].offsetHeight; //获取每个li的高度
        if (i < n) {//n是一行最多的li，所以小于n就是第一行了
            max_H = Math.max.apply(null, h);
            h[i] = li_H; //把每个li放到数组里面
            li.eq(i).css("top", 0); //第一行的Li的top值为0
            li.eq(i).css("left", i * li_W); //第i个li的左坐标就是i*li的宽度
        }
        else {
            min_H = Math.min.apply(null, h); //取得数组中的最小值，区块中高度值最小的那个
            minKey = getarraykey(h, min_H); //最小的值对应的指针
            h[minKey] += li_H + margin; //加上新高度后更新高度值
            li.eq(i).css("top", min_H + margin); //先得到高度最小的Li，然后把接下来的li放到它的下面
            li.eq(i).css("left", minKey * li_W);    //第i个li的左坐标就是i*li的宽度
        }
    }
    max = Math.max.apply(null, h);
    $("#Gallery").css("height", max);
}
/* 使用for in运算返回数组中某一值的对应项数(比如算出最小的高度值是数组里面的第几个) */
function getarraykey(s, v) { for (k in s) { if (s[k] == v) { return k; } } }
/*这里一定要用onload，因为图片不加载完就不知道高度值*/
window.onload = function () { hzjcd(); };
window.onresize = function () { hzjcd(); };