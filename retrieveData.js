/*
* @Author: Pop Alexandru
* @Date:   2017-09-25 12:39:39
* @Last Modified by:   alexandru pop
* @Last Modified time: 2017-09-26 12:30:55
*/

$(document).ready(function() {
	$.ajax({ 
		url: "test-ajax-update.php",
        success:function(e){
        	var myTr = undefined;
    		var myTd = undefined;
        	var myTh = undefined;
        	var clickEvent = document.createEvent('MouseEvents');
	        clickEvent.initEvent('dblclick',true,true);	
        	var myThead = document.getElementById("domHead");//tr
        	var myDomRes = document.getElementById("domBody");	
        	var myJsonData = JSON.parse(e);
          	for (var i = 0; i < myJsonData["cols"].length; i++) {
          		myTh = document.createElement("th");
				myTh.textContent = myJsonData["cols"][i];
				myThead.appendChild(myTh);
        	}
        	for (var i = 0; i < myJsonData["results"].length; i++) {
        		myTr = document.createElement("tr");
	      		for (var a = 0 ; a < myJsonData["results"][i].length; a++) {
	     			myTd = document.createElement("td");
	        		myTd.textContent = myJsonData["results"][i][a];
	        		myTd.className = "modifyContent el_" + i + "-" + a;
	        		myTd.id = "el-id_" + i + "-" + a;
	        		myTd.addEventListener('dblclick',dblclickFunction);
	        		myTr.appendChild(myTd);
	        	}
	        	myDomRes.appendChild(myTr);
        	}
        }
	});
});
	

function dblclickFunction(e){
		window.oldValue = this.textContent; 
		this.setAttribute('contenteditable', true);
		window.idEdit = this.id;
		this.addEventListener('keydown',keyDownFunction);

}
function keyDownFunction(e){
	var newValue = undefined;
	var className = e.target.className;
	if(e.keyCode ===  13){
		newValue = e.target.innerText;
		if(newValue === ""){
			e.target.innerText = window.oldValue || e.target.innerText;
		}
		$.ajax({
			type: "POST",
			url:"test-ajax-update.php",
			data: {
			'callBack': 'updateValue',
			'updated' : newValue,
			'old' : window.oldValue,
			'id' : className
			}
		});
	}
}
