<?php
/**
 * @Author: Pop Alexandru
 * @Date:   2017-09-25 23:28:57
 * @Last Modified by:   alexandru pop
 * @Last Modified time: 2017-09-26 12:25:50
 */

function updateValue(){
	$jasonData = json_decode(file_get_contents('test-ajax.php'));
	$oldValue =$_POST['old'];
	$updateValue = $_POST['updated'];
	$id = $_POST['id'];
	$expl = explode(" ",$id);
	$expl = substr($expl[1], 3,5);
	$expl = explode("-", $expl);
	$firstIndex = $expl[0];
	$secondIndex = $expl[1];
	$jasonData->results[$firstIndex][$secondIndex] = (!empty(trim($updateValue))) ? $updateValue : $jasonData->results[$firstIndex][$secondIndex];
	file_put_contents('test-ajax.php', json_encode($jasonData));
}

if (!isset($_POST['callBack'])){
	echo file_get_contents('test-ajax.php');
}else{
	updateValue();
}