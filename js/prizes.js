var allpoints;
var indexedDB 	  = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB,
IDBTransaction  = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction,
baseName 	  = "filesBase8",
storeName 	  = "filesStore8";
var o4ki=sessionStorage.getItem('o4ki');


function connectDB(f){
	var request = indexedDB.open(baseName, 2);
	request.onsuccess = function(){
		f(request.result);
		console.log(request.result);
	};
	request.onupgradeneeded = function(e){
		var objectStore = e.currentTarget.result.createObjectStore(storeName, { autoIncrement: true });
		connectDB(f);
	};
}
function setData(obj){
	console.log("zapisal");
	connectDB(function(db){
		var request = db.transaction([storeName], "readwrite").objectStore(storeName).add(obj);
		request.onsuccess = function(){
			window.location.href='index.html';
			return request.result;	
		};
	});
}

window.onload = function() {
var a = [{n:"Телевайзер", p:300},{n:"Компуктир", p:700}];
var length=a.length;
var i=0;
document.getElementById("points1").innerHTML=o4ki;
for (i=0; i<length; i++)
	{
		$("#prizes").append("<span class='text' id='"+ i + "' onclick='yo1()' >" + a[i].n + 
				"</span><span id='" + i + "p' class='text1'>" + a[i].p +
				"</span> </br> </br>");
	}
allpoints=$("#points1").html();
};

function yo1() {
	var points=parseInt($("#points1").html());
	
	var m=event.target.id;
	var curpoints=parseInt($("#"+m+"p").html());
	
	var n=event.target.innerHTML;
	
	if (points >= curpoints) {
		points = points - curpoints;
		$("#points1").html(points);
		$("#chose1").html($("#chose1").html() + n + " ");
	};
	if (parseInt($("#points1").html())<300){
		console.log("kones")
		$("body").append("<button id='end_chosen' class='btn2' onclick='end()'>Закончить выбирать</button>")
	};
	}

function end() {
	var chosen = $("#chose1").html();
	console.log(chosen);
	var ob = {a:allpoints, b:chosen};
	setData(ob);

}