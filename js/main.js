
window.onload = function ()
{
go1();
};


function go1()
{
var k = 1;
var timer = setTimeout(function yoyo()
{
document.getElementById("b" + k).style.visibility = "visible";
k++;
if (k<5)
{
timer = setTimeout(yoyo,600);
}
},10);
}