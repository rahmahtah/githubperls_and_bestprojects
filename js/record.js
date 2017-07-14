var indexedDB 	  = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB,
IDBTransaction  = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction,
baseName 	  = "filesBase8",
storeName 	  = "filesStore8";

function clearStorage(){
	connectDB(function(db){
		var request = db.transaction([storeName], "readwrite").objectStore(storeName).clear();;
		request.onsuccess = function(){
			console.log("Clear");
		}
	});
}

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
function getStorage(f){
	connectDB(function(db){
		var rows = [],
			store = db.transaction([storeName], "readonly").objectStore(storeName);

		if(store.mozGetAll)
			store.mozGetAll().onsuccess = function(e){
				f(e.target.result);
			};
		else
			store.openCursor().onsuccess = function(e) {
				var cursor = e.target.result;
				if(cursor){
					rows.push(cursor.value);
					cursor.continue();
				}
				else {
					f(rows);
				}
			};function clearStorage(){
				connectDB(function(db){
					var request = db.transaction([storeName], "readwrite").objectStore(storeName).clear();;
					request.onsuccess = function(){
						console.log("Clear");
					}
				});
			}
	});
}
var max_result_p=0,max_result_n='',k=0;

function show() {
	document.getElementById("show").style.visibility = "hidden";
	document.getElementById("delres").style.visibility = "visible";
	$("#tabl").append("<textarea id='comment' class='strem' readOnly=True cols='39" +
			"' rows='15'></textarea>");
	getStorage(function(res){
		for(var field in res) {
			for ( fieldValue in (value = res[ field ]) ){
			
				switch (fieldValue) {
				  case 'a':
					  var a = value[fieldValue];
	
				  case 'b':
					  var b = value[fieldValue];
					  document.getElementById("comment").value = document.getElementById("comment").value + b + "\n";
				}
			}
		}
	});
}

function delres(){
	clearStorage();
	$("#points0").html(""); $("#chose0").html("");
	document.getElementById("comment").value = "";
	
}

window.onload=function() {
getStorage(function(res){
	for(var field in res) {
		for ( fieldValue in (value = res[ field ]) ){
		
			switch (fieldValue) {
			  case 'a':
				  var a = parseInt(value[fieldValue]);
				  if (a>max_result_p) {max_result_p = a; k=1} else {k=0;}
			  case 'b':
				  var b = value[fieldValue];
				  if (k===1) {max_result_n=b; $("#points0").html(a); $("#chose0").html(b);};
				  

			}
		}
		}
		});
};