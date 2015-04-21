(function(){
var count=0;
setInterval(function(){
	var displayItem=document.getElementById('scroll-item');
	count=count+1;
	count=count%1200;
	displayItem.style.top="-"+count+"px";
	console.log(displayItem);
	},10);
})();