'use strict';

function formCache (formName, options) {
	
	// check local storage availability
	if(checkStorage()){
		alert("has")
	} else {
		alert("no");
	}

	const _localStorage = window.localStorage;
	const btn = document.querySelector("input[type='submit']");
	const inputs = document.getElementsByTagName('input');
	const selects = document.getElementsByTagName('select');
	let form_data = JSON.parse(_localStorage.getItem("form_cache_store")) || {};

	// restore form if exist
	if (_localStorage.getItem('form_cache_store')) {
		let exist_form_data = JSON.parse(_localStorage.getItem('form_cache_store'));
		for(let key in exist_form_data) {
			classify(key, exist_form_data[key]);
		}

	}

	// clear form after submit
	btn.addEventListener('click', function (){
		clearStorage(_localStorage);
	})


	for(let i = 0; i < selects.length; i++){	
		selects[i].addEventListener('change', selectHandler);
	}

	for(let i = 0; i < inputs.length; i++){
		inputs[i].addEventListener('change', inputHandler)
	}

	function selectHandler () {
		let _temp = {};

		_temp.type = this.type;
		_temp.value = this.value;

		form_data[this.id] = _temp;
		saveToStorage(form_data, _localStorage);
		//console.log(form_data);
	}

	function inputHandler(){
		let _temp = {};

		_temp.type = this.type;
		_temp.value = this.value;

		form_data[this.name] = _temp;
		saveToStorage(form_data, _localStorage);
		//console.log(form_data);
	}
	
}

function checkStorage (){
	try {
		let _storage = window.localStorage;
		let _test = "_test";

		_storage.setItem(_test, _test);
		_storage.removeItem(_test);
		
		return true;
	}	catch(e) {
		return false;
	}
}

function saveToStorage (data, _localStorage){
	console.log(data);
	let s_key = "form_cache_store";
	let s_val = JSON.stringify(data);

	_localStorage.setItem(s_key, s_val);
}


function clearStorage(_localStorage){
	_localStorage.clear();
}

function classify (key, props) {
	switch(props.type) {
		case "radio":
			document.querySelector("input[value=" + props.value + "]").checked = true;
			break;
		case "select-one":
			document.querySelector("select[id=" + key + "]").value = props.value;
			break;
		default:
			document.querySelector("input[name=" + key + "]").value = props.value;
			break;

	}
}






