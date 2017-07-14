window.onload = function(){
	var language=sessionStorage.getItem('lang');
	console.log(language);
	if (language==="rus"){
		$("#game2").html("Выбор ништяков");
		$("#dance").html("Выбрать танец");
		$("#gost").html("Выбрать гостинец");
	 	$("#exit").html("В главное меню");
	 	document.getElementById("dance1").src = "images/tenor.gif";
	 	document.getElementById("dance2").src = "images/elcin.gif";
	 	document.getElementById("dance3").src = "images/azaz.gif";
	 	document.getElementById("dance11").innerHTML="Уличный танец";
	 	document.getElementById("dance22").innerHTML="Танец Ельцина";
	 	document.getElementById("dance33").innerHTML="Царский танец";
	 	document.getElementById("gost1").src = "images/samogon.jpg";
	 	document.getElementById("gost2").src = "images/pirog.jpg";
	 	document.getElementById("gost3").src = "images/lech.jpg";
	 	document.getElementById("gost11").innerHTML="Барский напиток";
	 	document.getElementById("gost22").innerHTML="Румяный пирожок";
	 	document.getElementById("gost33").innerHTML="Лечо";
	 	document.getElementById("send").innerHTML="Сделать выбор";
	 	
	 	
	} else {
		$("#game2").html("Вибір ніштяк");
		$("#dance").html("Вибір танцю");
		$("#gost").html("Вибір готелю");
	 	$("#exit").html("В головне меню");
	 	document.getElementById("dance1").src = "images/drug.gif";
	 	document.getElementById("dance2").src = "images/podruga.gif";
	 	document.getElementById("dance3").src = "images/naparnik.gif";
	 	document.getElementById("dance11").innerHTML="З другом";
	 	document.getElementById("dance22").innerHTML="З подругою";
	 	document.getElementById("dance33").innerHTML="З колегою";
	 	document.getElementById("gost1").src = "images/svin.jpg";
	 	document.getElementById("gost2").src = "images/krim.jpg";
	 	document.getElementById("gost3").src = "images/semki.jpg";
	 	document.getElementById("gost11").innerHTML="Свиня";
	 	document.getElementById("gost22").innerHTML="Крим";
	 	document.getElementById("gost33").innerHTML="Насіння";
	 	document.getElementById("send").innerHTML="Зробити вибір";
	};
};
var dance = "";
var gost = "";
function dancer1() {dance = document.getElementById("dance1").src ;
if (gost!=="") {
	document.getElementById("send").style.visibility = "visible";
	};
	onDance();}
function dancer2() {dance = document.getElementById("dance2").src;
if (gost!=="") {
	document.getElementById("send").style.visibility = "visible";
	};
	onDance();}
function dancer3() {dance = document.getElementById("dance3").src;
if (gost!=="") {
	document.getElementById("send").style.visibility = "visible";
	};
	onDance();}
function gosten1() {gost = document.getElementById("gost1").src;
if (dance!=="") {
	document.getElementById("send").style.visibility = "visible";
	};
	onGost();}
function gosten2() {gost = document.getElementById("gost2").src;
if (dance!=="") {
	document.getElementById("send").style.visibility = "visible";
	};
	onGost();}
function gosten3() {gost = document.getElementById("gost3").src;
if (dance!=="") {
	document.getElementById("send").style.visibility = "visible";
	};
	onGost();}





function onDance(){
	if (document.getElementById("dance1").style.visibility === "hidden") {
		document.getElementById("dance1").style.visibility = "visible";
		document.getElementById("dance2").style.visibility = "visible";
		document.getElementById("dance3").style.visibility = "visible";
		document.getElementById("dance11").style.visibility = "visible";
		document.getElementById("dance22").style.visibility = "visible";
		document.getElementById("dance33").style.visibility = "visible";
	} else {
		document.getElementById("dance1").style.visibility = "hidden";
		document.getElementById("dance2").style.visibility = "hidden";
		document.getElementById("dance3").style.visibility = "hidden";
		document.getElementById("dance11").style.visibility = "hidden";
		document.getElementById("dance22").style.visibility = "hidden";
		document.getElementById("dance33").style.visibility = "hidden";
	}
	if (document.getElementById("gost1").style.visibility === "visible") {
		document.getElementById("gost1").style.visibility = "hidden";
		document.getElementById("gost2").style.visibility = "hidden";
		document.getElementById("gost3").style.visibility = "hidden";
		document.getElementById("gost11").style.visibility = "hidden";
		document.getElementById("gost22").style.visibility = "hidden";
		document.getElementById("gost33").style.visibility = "hidden";
	}
}
function onGost() {
	if (document.getElementById("gost1").style.visibility === "hidden") {
		document.getElementById("gost1").style.visibility = "visible";
		document.getElementById("gost2").style.visibility = "visible";
		document.getElementById("gost3").style.visibility = "visible";
		document.getElementById("gost11").style.visibility = "visible";
		document.getElementById("gost22").style.visibility = "visible";
		document.getElementById("gost33").style.visibility = "visible";
	} else {
		document.getElementById("gost1").style.visibility = "hidden";
		document.getElementById("gost2").style.visibility = "hidden";
		document.getElementById("gost3").style.visibility = "hidden";
		document.getElementById("gost11").style.visibility = "hidden";
		document.getElementById("gost22").style.visibility = "hidden";
		document.getElementById("gost33").style.visibility = "hidden";
	}
	if (document.getElementById("dance1").style.visibility === "visible") {
		document.getElementById("dance1").style.visibility = "hidden";
		document.getElementById("dance2").style.visibility = "hidden";
		document.getElementById("dance3").style.visibility = "hidden";
		document.getElementById("dance11").style.visibility = "hidden";
		document.getElementById("dance22").style.visibility = "hidden";
		document.getElementById("dance33").style.visibility = "hidden";
	}
}

function send(){
	sessionStorage.setItem('dance', dance);
	sessionStorage.setItem('gost', gost);
	window.location.href='game3.html';
}
