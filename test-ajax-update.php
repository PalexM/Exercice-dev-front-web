<?php
/**
 * @Author: Pop Alexandru
 * @Date:   2017-09-25 23:28:57
 * @Last Modified by:   Pop Alexandru
 * @Last Modified time: 2017-09-26 00:54:04
 */

function updateValue(){
	$jData = json_decode(file_get_contents('test-ajax.php'));
	$oldValue =$_POST['old'];
	$updateValue = $_POST['updated'];
	$id = $_POST['id'];
	$expl = explode(" ",$id);
	$expl = substr($expl[1], 3,5);
	$expl = explode("-", $expl);
	$firstIndex = $expl[0];
	$secondIndex = $expl[1];
	$jData->results[$firstIndex][$secondIndex] = (!empty(trim($updateValue))) 
		? $updateValue 
		: $jData->results[$firstIndex][$secondIndex];
	file_put_contents('test-ajax.php', json_encode($jData));
}

if (!isset($_POST['callBack'])){
	echo file_get_contents('test-ajax.php');
}else{
	updateValue();
}