var fruitShelf = {
	
	apples: {
		
		frString: "des Pommes",
		enString: "Apples",
		availQty: 5,
		inBasket: 0,
		price: 3.00,
		tax: .1
	}, 
	
	oranges: {
		
		frString: "des Oranges",
		enString: "Oranges",
		availQty: 5,
		inBasket: 0,
		price: 1.50,
		tax: .2
	}, 
	
	peaches: {
		
		frString: "les Pêches",
		enString: "Peaches",
		availQty: 5,
		inBasket: 0,
		price: 2.00,
		tax: .13
	}
};

function customerInit() {
	
	document.getElementById("customerShelf").classList.remove("hidden");
	document.getElementById("customerShelf").classList.add("visible");
	document.getElementById("managerShelf").classList.remove("visible");
	document.getElementById("managerShelf").classList.add("hidden");
	document.getElementById("login").classList.remove("hidden");
	document.getElementById("login").classList.add("visible");
	document.getElementById("loggedIn").classList.remove("visible");
	document.getElementById("loggedIn").classList.add("hidden");
	
	for (fruits in fruitShelf) {
		
		document.getElementById(fruits + "Price").innerHTML = "Price: " + fruitShelf[fruits].price.toFixed(2);
		document.getElementById(fruits + "Tax").innerHTML = "Tax: " + fruitShelf[fruits].tax.toFixed(2);
		document.getElementById(fruits + "Qty").innerHTML = "Qty Available: " + fruitShelf[fruits].availQty;
		document.getElementById(fruits + "Basket").innerHTML = "Currently in Basket: " + fruitShelf[fruits].inBasket;
	}
}

function managerInit() {
	
	for (fruits in fruitShelf) {
		
		document.getElementById(fruits + "CurrentPrice").firstChild.nodeValue = "Current Price: " + fruitShelf[fruits].price.toFixed(2);
		document.getElementById(fruits + "CurrentTax").firstChild.nodeValue = "Current Tax: " + fruitShelf[fruits].tax.toFixed(2);
		document.getElementById(fruits + "CurrentInventory").firstChild.nodeValue = "Current Inventory: " + fruitShelf[fruits].availQty.toFixed(2);
	}
}

function changeLanguage() {
	
	if (document.getElementById("languageCheck").checked) {
		
		for (fruits in fruitShelf) {
			
			document.getElementById(fruits + "String").innerHTML = fruitShelf[fruits].frString;
			
		}
		
	} else {
		
		
		for (fruits in fruitShelf) {
			
			document.getElementById(fruits + "String").innerHTML = fruitShelf[fruits].enString;
			
		}
	}
}

function addFruit(fruitID) {
	
	//console.log(this.event.target.id);
	if (document.getElementById(fruitID + "Input").value == "") {
		
		if (fruitShelf[fruitID].availQty > 0) {
		
			fruitShelf[fruitID].availQty = fruitShelf[fruitID].availQty - 1;
			fruitShelf[fruitID].inBasket = fruitShelf[fruitID].inBasket + 1;

			updateQty(fruitID);
			updateBasket(fruitID);
			
		} else {
		
			alert("Cannot add any more " + fruitID + "!");
		
		}
		
	} else if (document.getElementById(fruitID + "Input").value != "") {
		
		var fruitInput = parseInt(document.getElementById(fruitID + "Input").value);
		
		if (fruitInput > fruitShelf[fruitID].availQty) {
			
			alert("Cannot add specified amount of " + fruitID);
			
		} else if (fruitInput <= fruitShelf[fruitID].availQty && fruitInput > 0) {
			
			fruitShelf[fruitID].availQty = fruitShelf[fruitID].availQty - fruitInput;
			fruitShelf[fruitID].inBasket = fruitShelf[fruitID].inBasket + fruitInput;

			updateQty(fruitID);
			updateBasket(fruitID);
			
		}
	}
}

function subtractFruit(fruitID) {
	
	if (fruitShelf[fruitID].inBasket > 0) {
		
		fruitShelf[fruitID].availQty = fruitShelf[fruitID].availQty + 1;
		fruitShelf[fruitID].inBasket = fruitShelf[fruitID].inBasket - 1;
		updateQty(fruitID);
		updateBasket(fruitID);
		
	} else {
		
		alert("Cannot return any more " + fruitID + "!");
		
	}
}


function updateQty(fruitID) {
	
	document.getElementById(fruitID + "Qty").innerHTML = "Qty Available: " + fruitShelf[fruitID].availQty;
	document.getElementById(fruitID + "Basket").innerHTML = "Currently in Basket: " + fruitShelf[fruitID].inBasket;
	
}


function updateBasket() {
	
	var basketList = document.getElementById("basket");
	
	while (basketList.hasChildNodes()) {

		basketList.removeChild(basketList.firstChild);

	}
	
	var fruitPrice = 0;
	var fruitTax = 0;
	var subTotal = 0;
	var totalTaxes = 0;
	var grandTotal = 0;
	
	for (fruits in fruitShelf) {
		
		if (fruitShelf[fruits].inBasket != 0) {
			
			fruitPrice = fruitShelf[fruits].inBasket * fruitShelf[fruits].price;
			fruitTax = fruitPrice * fruitShelf[fruits].tax;
			grandTotal += fruitPrice + fruitTax;
			
			subTotal += fruitPrice;
			totalTaxes += fruitTax;
			
			var pElement = document.createElement("p");
			var textNode = document.createTextNode(fruitShelf[fruits].enString + " " + fruitShelf[fruits].inBasket + "pcs. @ $" + fruitPrice);
			pElement.appendChild(textNode);
			
			var basketDiv = document.getElementById("basket");
			basketDiv.appendChild(pElement);
			
		}
	}
	
	if (grandTotal != 0) {
		
		var subTotalElement = document.createElement("p");
		var textNode = document.createTextNode("Subtotal:" + " " + subTotal.toFixed(2));
		subTotalElement.appendChild(textNode);
		
		var totalTaxElement = document.createElement("p");
		var textNode = document.createTextNode("Taxes:" + " " + totalTaxes.toFixed(2));
		totalTaxElement.appendChild(textNode);
		
		var grandTotalElement = document.createElement("p");
		var textNode = document.createTextNode("Grand Total" + " " + grandTotal.toFixed(2));
		grandTotalElement.appendChild(textNode);
		
		var buyButton = document.createElement("button");
		var textNode = document.createTextNode("Checkout Cart");
		buyButton.appendChild(textNode);
		buyButton.setAttribute("onClick","checkoutCart()");
		
		var clearButton = document.createElement("button");
		var textNode = document.createTextNode("Clear Cart");
		clearButton.appendChild(textNode);
		clearButton.setAttribute("onClick","clearCart()");
		
		var basketDiv = document.getElementById("basket");
		basketDiv.appendChild(subTotalElement);
		basketDiv.appendChild(totalTaxElement);
		basketDiv.appendChild(grandTotalElement);
		basketDiv.appendChild(buyButton);
		basketDiv.appendChild(clearButton);
		
	}
}

function checkoutCart() {
	
	var confirmation = confirm("Checkout Cart?");
	
	if (confirmation == true) {
		
		for (fruits in fruitShelf) {
			
			fruitShelf[fruits].inBasket = 0;
			updateQty(fruits);
			updateBasket(fruits);
			
		}
	}
}

function clearCart() {
	
	var confirmation = confirm("Clear Cart?");
	
	if (confirmation == true) {
		
		for (fruits in fruitShelf) {
			
			fruitShelf[fruits].availQty = fruitShelf[fruits].availQty + fruitShelf[fruits].inBasket;
			fruitShelf[fruits].inBasket = 0;
			updateQty(fruits);
			updateBasket(fruits);
			
		}
	}
}

function managerLogin() {
	
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	
	if (username == "" && password == "") {

		document.getElementById("customerShelf").classList.remove("visible");
		document.getElementById("customerShelf").classList.add("hidden");
		document.getElementById("managerShelf").classList.remove("hidden");
		document.getElementById("managerShelf").classList.add("visible");
		document.getElementById("login").classList.remove("visible");
		document.getElementById("login").classList.add("hidden");
		document.getElementById("loggedIn").classList.remove("hidden");
		document.getElementById("loggedIn").classList.add("visible");
		
		managerInit();
	}
	
}

function managerLogout() {
	
		document.getElementById("customerShelf").classList.remove("hidden");
		document.getElementById("customerShelf").classList.add("visible");
		document.getElementById("managerShelf").classList.remove("visible");
		document.getElementById("managerShelf").classList.add("hidden");
		document.getElementById("login").classList.remove("hidden");
		document.getElementById("login").classList.add("visible");
	
		customerInit();
	
}

function changeInventory(fruitID) {
	
	var modifiedFruitPrice = parseFloat(document.getElementById(fruitID + "PriceModify").value);
	var modifiedFruitTax = parseFloat(document.getElementById(fruitID + "TaxModify").value);
	var modifiedFruitInventory = parseFloat(document.getElementById(fruitID + "InventoryModify").value);
	
	if (modifiedFruitPrice != NaN) {
		
		fruitShelf[fruitID].price = modifiedFruitPrice;
		console.log("Price Modified");
		
	}
	
	if (modifiedFruitTax != NaN) {
		
		fruitShelf[fruitID].tax = modifiedFruitTax;
		console.log("Tax Modified");
		
	}
	
	if (modifiedFruitInventory != NaN) {
		
		fruitShelf[fruitID].availQty = modifiedFruitInventory;
		console.log("Inventory Modified");
		
	}
	
	managerInit();
	
}






