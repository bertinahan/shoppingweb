products = {
	'Box1' : {
		'price' : 10,
		'quantity' : 10
	},
	'Box2' : {
		'price' : 5,
		'quantity' : 10
	},
	'Clothes1' : {
		'price' : 20,
		'quantity' : 10
	},
	'Clothes2' : {
		'price' : 30,
		'quantity' : 10
	},
	'Jeans' : {
		'price' : 50,
		'quantity' : 10
	},
	'Keyboard' : {
		'price' : 20,
		'quantity' : 10
	},
	'KeyboardCombo' : {
		'price' : 40,
		'quantity' : 10
	},
	'Mice' : {
		'price' : 20,
		'quantity' : 10
	},
	'PC1' : {
		'price' : 350,
		'quantity' : 10
	},
	'PC2' : {
		'price' : 400,
		'quantity' : 10
	},
	'PC3' : {
		'price' : 300,
		'quantity' : 10
	},
	'Tent' : {
		'price' : 100,
		'quantity' : 10
	},
};	
 cart = {
	'Box1' : 0,
	'Box2' : 0,
	'Clothes1' : 0,
	'Clothes2' : 0,
	'Jeans' : 0,
	'Keyboard' : 0,
	'KeyboardCombo' : 0,
	'Mice' : 0,
	'PC1' : 0,
	'PC2' : 0,
	'PC3' : 0,
	'Tent' : 0,
};

var inactiveTime = 3000000;
var interval; 
var t0 = performance.now();
var total = 0;
var toShowReomveButton = false;


document.addEventListener('keydown', function(event) {
    if(event.keyCode == 27) {
        overlay();
    }
});	

interval = setInterval(function(){ intervalHandler() }, inactiveTime);
function intervalHandler() {
	alert( "Hey there! Are you still planning to buy something? ");
};



function addToCart(productName) {
	//alert("oh " + productName + " added...");
	clearInterval(interval);
	inactiveTime = 3000000;
	t0 = performance.now();
	interval = setInterval(function(){ intervalHandler() }, inactiveTime);
	
	if(cart[productName] == undefined){
		cart[productName] = 1;
		console.log( "heheheheh");
	}else{
		cart[productName] = cart[productName] + 1;
	}
	products[productName]['quantity'] = products[productName]['quantity']  - 1;
/* 	console.log( "cart[" + productName + "]" );
	console.log( cart[productName] );
	console.log( "products[" + productName + "]" );
	console.log( products[productName]['quantity']  ); */

	total = total + products[productName]['price'];
	document.getElementById('topButton').textContent = "Cart($" + total + ")";
	
	var table = document.getElementById("modalTable");
	var rowAlreadyExist = false;
	for (var c = 0, m = table.rows.length; c < m; c++) {
		if(table.rows[c].cells[0].innerHTML == productName){
			table.rows[c].cells[1].innerHTML = cart[productName];
			table.rows[c].cells[2].innerHTML = cart[productName] * products[productName]['price'];
			rowAlreadyExist = true;
		}
	}
	
	if(!rowAlreadyExist){
			var row = table.insertRow(1);
			var cellProduct    = row.insertCell(0);
			var cellQuantity   = row.insertCell(1);
			var cellTotalPrice = row.insertCell(2);
			var cellAddButton  = row.insertCell(3);
			var cellRemvButton = row.insertCell(4);
			cellProduct.innerHTML    = productName;
			cellQuantity.innerHTML   = 1;
			cellTotalPrice.innerHTML = products[productName]['price'];
/* 			var addbutton = document.createElement("input");
			addbutton.type   = "button";
			addbutton.value  = "+";
			addbutton.onclick   = addToCart(key); 
			row.appendChild(addbutton);  */
			//<button class="addButton" onclick="addToCart('PC3')" >
			//cellAddButton.innerHTML = '<input type = \x22button\x22 value = \x22+\x22 onClick = \x22addToCart(\x27Box1\x27)\x22>';
			//style="width:100%;font-size:100px"
			var style = 'style=\x27font-size:100px\x27';
			cellAddButton.innerHTML  = '<input type = \x22button\x22 ' + style + ' value = \x22+\x22 onClick = \x22addToCart(\x27' + productName + '\x27)\x22>';
			cellRemvButton.innerHTML = '<input type = \x22button\x22 ' + style + ' value = \x22-\x22 onClick = \x22removeFromCart(\x27' + productName + '\x27)\x22>';
	}

}

function removeFromCart(productName) {
	//alert("oh " + productName + " removed...");
	clearInterval(interval);
	inactiveTime = 3000000;
	t0 = performance.now();
	interval = setInterval(function(){ intervalHandler() }, inactiveTime);

	cart[productName] = cart[productName] - 1;
	products[productName]['quantity']  = products[productName]['quantity']  + 1;
	total = total - products[productName]['price'];
	document.getElementById('topButton').textContent = "Cart($" + total + ")";
	var lop = document.getElementsByClassName('product');	

	for	(var i=0; i<lop.length;	i++){	
		if(lop[i].children[5].innerHTML == productName){
			console.log(lop[i].children[5].innerHTML + ": " + productName);
			showOrHideRemoveButtoon(lop[i]);
		}
	}	

/* 	console.log( "cart[" + productName + "]" );
	console.log( cart[productName] );
	console.log( "products[" + productName + "]" );
	console.log( products[productName]['quantity']  ); */
	
	var table = document.getElementById("modalTable");
	var rowAlreadyExist = false;
	for (var c = 0, m = table.rows.length; c < m; c++) {
		if(table.rows[c].cells[0].innerHTML == productName){
			if(cart[productName] == 0){
				table.deleteRow(c);
			}else{
				table.rows[c].cells[1].innerHTML = cart[productName];
				table.rows[c].cells[2].innerHTML = cart[productName] * products[productName]['price'];
			}
		}
	}
}


function showOrHideRemoveButtoon(x){
	console.log( "mouse move here..." );
	var productOnMouse = x.children[5].innerHTML
	console.log(x.children[3]);
	console.log(productOnMouse);
	var numOfProductN = cart[productOnMouse];
	if(numOfProductN == 0){
		x.children[3].setAttribute("style", "display: none;");
	}
	else{
		x.children[3].removeAttribute("style", "display: none;");
	}
	console.log(numOfProductN);
	console.log(" ");
}

function showCart(){
	console.log("hehe show cart");
	var length = 0;
	var interv;
	var copyKey = [];
	for (var key in cart) {
		copyKey[length] = key;
		length++;	
	}
	console.log("length: " + length);
	console.log("copyKey: " + copyKey);
	

	var count = 0;
	var product_name;
	var amount;
	
	//display the first item
	if(copyKey[count]!=undefined){
		product_name = copyKey[count];
		amount = cart[product_name];
		alert( product_name + " " + amount);
	}
	
	count = count + 1;
	
	var intervalHandler = function() {
		if (count == length) {
			clearInterval(interv);
		}else{
			product_name = copyKey[count];
			amount = cart[product_name];
			alert( product_name + " " + amount);
			count = count + 1;
		}
	};
	interv = setInterval(intervalHandler, 3000000);
}


var activeTimeIntervalHandler = function() {

	var t1 = performance.now();
	console.log(inactiveTime);
	//parseInt(num, 10)
	document.getElementById('footer').textContent = "time user has been inactive: " + 
													parseInt((t1 - t0) / 1000, 10);
};
activeTimeInterv = setInterval(activeTimeIntervalHandler, 1000);

function overlay() {
	el = document.getElementById("overlay");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	var table = document.getElementById("modalTable");
	console.log("table... hmm...");
}



