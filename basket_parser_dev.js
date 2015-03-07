/**
 *	This will act as a very simple description of this script and how the tagging works.
 *
 *	Tags available,
 *	- {itm_url}
 *	- {itm_name}
 *	- {itm_price}
 *	- {itm_quantity}
 *
 *	{itm_url}		-	This will get replaced by the full url of the item. Example: http://www.scan.co.uk/products/corsair-600t-graphite-series-black-mid-tower-gaming-case-w-o-psu
 *	{itm_name}		-	This will get replaced by the full name of the item that is displayed in the basket. Example: Intel Core i5-2500K Box, LGA1155
 *	{itm_price}		-	This will get replaced by the price of the item that is displayed in the basket. Example: €44.09, £172.94
 *	{itm_quantity}	-	This will get replaced by the quantity of the item that is displayed in the basket if it is greater than 1. Example: 2 x , 5 x 
 *						It might be helpful to note, {itm_quantity} gets replaced with a trailing space, "2 x "
 *
 */
var item = new Object();
var costs = new Object();

if (typeof (format) == "undefined") {
	var format = '{itm_quantity}[URL="{itm_url}"]{itm_name}[/URL]|{itm_price}';
}

if (typeof (before) == "undefined") {
	var before = "[TABLE][B]Item[/B]|[B]Price[/B]";
}

if (typeof (after) == "undefined") {
	var after = "Shipping|{shipping}\n[B]Total[/B]|[B]{total}[/B][/TABLE]";
}

/**
 *	This function is used to replace 'tags' in a format string with the corresponding values for those tags.
 *	It takes an object, which has one variable for each tag. The tag must have the same name as the variable. Tags are wrapped with curly braces {tag_name}.
 *
 *	@param 	elems An object with variables containing the values to swap with the tags.
 *	@return	string A string which is a copy of the format but with the tags swapped with the values.
 */
function replaceVars(elems, string) {
	for (key in elems) {
		string = string.replace("{" + key + "}", elems[key]);
	}
	return string;
}

function hwvs() {
	var basketTable = document.getElementsByTagName("table")[0];
	if (typeof (basketTable) != "undefined") {
		var tableBody = basketTable.getElementsByTagName("tbody")[0];
		var tableRows = tableBody.rows;
		var basket = new Array();

		var total = $(basketTable.getElementsByTagName("p")[0]).text();
		costs.shipping = 18.99;
		costs.total = "€" + (parseFloat(hwvsFixPrice(total), 10) + costs.shipping).toFixed(2);
		costs.shipping = "€" + costs.shipping;
		basket.push(replaceVars(costs, before));

		for (var i = 1; i < tableRows.length; i++) {
			var itemInfo = tableRows[i].cells[0];
			if ($(itemInfo).attr("colspan")) {
				continue;
			}
			item.itm_name = $("a", itemInfo).text().trim();
			item.itm_url = "http://" + window.location.hostname + "/" + $("a", itemInfo).attr("href");
			item.itm_price = $(tableRows[i].cells[4]).text().trim();
			item.itm_quantity = formatQuantity($("input:eq(0)", tableRows[i].cells[3]).val());
			item.itm_price = "€" + hwvsFixPrice(item.itm_price.substring(0, item.itm_price.length - 2));
			basket.push(replaceVars(item, format));
		}

		basket.push(replaceVars(costs, after));
	} else {
		alert("You must place an item in your basket first.");
	}
	return basket;
}

function hwvsFixPrice(price) {
	return price.replace(".", "").replace(",", ".");
}

function scan() {
	var basket = new Array();

	costs.total = $('div.btRight').text();
	costs.shipping = "£" + $('#ctl00_ContentPlaceHolder2_labelTotalCarriage').text();
	basket.push(replaceVars(costs, before));

	$('.btRow').each(function (index) {
		item.itm_url = $('.btDesc a', this).attr('href');
		item.itm_name = $('.btDesc a', this).text().trim();
		item.itm_price = $('.btInc', this).text().trim();
		item.itm_quantity = formatQuantity($('.btQty input', this).val());
		basket.push(replaceVars(item, format));
	});

	basket.push(replaceVars(costs, after));
	return basket;
}

function newegg() {
	var basket = new Array();

	costs.total = jQuery("tr.cartSubtotal td:eq(1)").text();
	costs.shipping = "- ? -";
	basket.push(replaceVars(costs, before));

	jQuery("tr.cartItem").each(function (index) {
		item.itm_price = jQuery('td.cartPrice dd[class!="cartOrig"]', this).text();
		item.itm_url = jQuery('a[name="CART_ITEM"]', this).attr('href');
		item.itm_name = jQuery('a[name="CART_ITEM"]', this).text().trim();
		item.itm_quantity = formatQuantity(jQuery("td.cartQty input:eq(0)", this).attr("value"));
		basket.push(replaceVars(item, format));
	});

	basket.push(replaceVars(costs, after));
	return basket;
}

function amazon() {
	var basket = new Array();

	costs.total = jQuery('#sc-active-cart .sc-subtotal .sc-price').text().trim();
	costs.shipping = "- ? -";
	basket.push(replaceVars(costs, before));

	jQuery('#sc-active-cart .sc-list-item-content').each(function (index) {
		item.itm_price = jQuery('.sc-price', this).text();
		item.itm_url = window.location.hostname + jQuery('.sc-item-product-image .sc-product-link', this).attr('href');
		item.itm_name = jQuery('.sc-product-title', this).text();
		item.itm_quantity = jQuery('.a-dropdown-prompt', this).text();
		if (item.itm_quantity != "1") {
			item.itm_price = item.itm_price.substring(0, 1) + (parseFloat(item.itm_price.substring(1), 10) * item.itm_quantity).toFixed(2);
		}
		item.itm_quantity = formatQuantity(item.itm_quantity)
		basket.push(replaceVars(item, format));
	});

	basket.push(replaceVars(costs, after));
	return basket;
}

function dabs() {
	var basket = new Array();

	costs.total = $('#baskettotal').text().trim();
	costs.shipping = $('#delivery').text().trim();
	basket.push(replaceVars(costs, before));

	$('.basket-item').each(function (index) {
		item.itm_url = "http://www.dabs.ie" + $('.title', this).attr('href');
		item.itm_name = $('.title', this).text().trim();
		item.itm_price = $('.price:eq(0)', this).text();
		item.itm_quantity = formatQuantity($('.item-qty-box', this).val());
		basket.push(replaceVars(item, format));
	});
	
	/*
	costs.total = $('td[class="total-bg lprice"]').text().trim();
	costs.shipping = $('#delivery').text().trim();
	basket.push(replaceVars(costs, before));

	$('table.basktbl tr:contains("Quicklinx")').each(function (index) {
		item.itm_url = "http://www.dabs.ie" + $('td.la p a', this).attr('href');
		item.itm_name = $('td.la p a', this).text().trim();
		item.itm_price = $('td.lprice:eq(1) span', this).text();
		item.itm_quantity = formatQuantity($('td:eq(2) input', this).val());
		basket.push(replaceVars(item, format));
	});
	*/

	basket.push(replaceVars(costs, after));
	return basket;
}

function memoryc() {
	var basket = new Array();

	costs.total = jQuery('#bctotal_price').text();
	costs.shipping = "Free!";
	basket.push(replaceVars(costs, before));

	jQuery('.blue_border_tr:eq(0) tr:contains("Item Number")').each(function (index) {
		item.itm_url = jQuery('.prod_desc', this).attr('href');
		item.itm_name = jQuery('.title_green_font', this).text();
		item.itm_price = jQuery('span[id^="cart_vat"]', this).text().match(/VAT(.\s[^\s]+)/i)[1];
		item.itm_quantity = formatQuantity(jQuery('input[name^="quantity"]', this).val());
		basket.push(replaceVars(item, format));
	});

	basket.push(replaceVars(costs, after));
	return basket;
}

function overclockers() {
	var basket = new Array();

	costs.total = document.getElementById("orderTotal").cells[2].innerHTML;
	costs.shipping = document.getElementsByClassName("totalRow")[1].getElementsByTagName("td")[2].innerHTML;
	basket.push(replaceVars(costs, before));

	var basketTable = document.getElementById("shoppingBkt");
	var tableRows = basketTable.rows;

	for (var i = 1; i < tableRows.length - 4; i++) {
		item.itm_url = tableRows[i].cells[1].getElementsByTagName("a")[0].href;
		item.itm_name = tableRows[i].cells[1].getElementsByTagName("a")[0].innerHTML;
		item.itm_price = tableRows[i].cells[4].getElementsByTagName("span")[0].innerHTML;
		item.itm_quantity = formatQuantity(tableRows[i].cells[2].getElementsByTagName("input")[0].value);
		basket.push(replaceVars(item, format));
	};

	basket.push(replaceVars(costs, after));
	return basket;
}

function aria() {
	var basket = new Array();

	var basketTable = document.getElementsByName("operation")[0].nextSibling.nextSibling;
	var tableRows = basketTable.rows;

	costs.total = tableRows[tableRows.length - 2].cells[1].innerHTML.trim();
	costs.shipping = tableRows[tableRows.length - 4].cells[1].innerHTML.trim();
	basket.push(replaceVars(costs, before));

	for (var i = 2; i < tableRows.length - 9; i++) {
		item.itm_url = tableRows[i].cells[3].getElementsByTagName("a")[0].href;
		item.itm_name = tableRows[i].cells[3].getElementsByTagName("a")[0].innerHTML.trim();
		item.itm_price = tableRows[i].cells[6].innerHTML.trim();
		item.itm_quantity = formatQuantity(tableRows[i].cells[1].getElementsByTagName("input")[0].value);
		basket.push(replaceVars(item, format));
	};

	basket.push(replaceVars(costs, after));
	return basket;
}

function specialtech() {
	var basket = new Array();

	var formTables = document.forms["cartform"].getElementsByTagName("table");
	var tableRows = formTables[0].rows;

	var totalTable = formTables[formTables.length - 2];
	costs.shipping = totalTable.rows[3].cells[2].getElementsByTagName("font")[0].innerHTML;
	var totalRow = 5;
	if (costs.shipping != "£ 0.00") { // on large orders where shipping is not 0 an extra table row is created for the shipping VAT
		var shippingVAT = parseFloat(totalTable.rows[4].cells[2].getElementsByTagName("font")[0].innerHTML.substring(2), 10);
		costs.shipping = "£" + (parseFloat(costs.shipping.substring(2), 10) + shippingVAT).toFixed(2);
		totalRow = 6;
	}
	costs.total = totalTable.rows[totalRow].cells[2].getElementsByTagName("font")[0].innerHTML;
	basket.push(replaceVars(costs, before));

	for (var i=0; i<tableRows.length; i+=2) {
		item.itm_url = tableRows[i].cells[0].getElementsByTagName("a")[0].href;
		item.itm_name = tableRows[i].cells[1].getElementsByTagName("font")[0].innerHTML.trim();
		item.itm_price = tableRows[i].cells[1].getElementsByTagName("font")[2].innerHTML.trim();
		var vat = tableRows[i].cells[1].getElementsByTagName("div")[0].innerHTML.match(/exc VAT (\d+)%/i)[1];
		item.itm_price = "£" + addVAT(item.itm_price.substring(2), vat);
		item.itm_quantity = formatQuantity(tableRows[i].cells[1].getElementsByTagName("input")[0].value);
		basket.push(replaceVars(item, format));
	};

	basket.push(replaceVars(costs, after));
	return basket;
}

function komplett() {
	var basket = new Array();

	costs.shipping = document.getElementById("ctl00_siteContentPlaceHolder_shoppingCart_dlgShoppingCart_shipmentSelect_Dialog1_repShipment_ctl00_lblPrice").innerHTML;
	costs.total = document.getElementById("ctl00_siteContentPlaceHolder_shoppingCart_dlgShoppingCart_lblTotalValue").innerHTML;
	basket.push(replaceVars(costs, before));

	$(".shoppingcart-item").each(function() {
		item.itm_url = this.getElementsByTagName("a")[0].href;
		item.itm_name = $('.shoppingcart-item-description h4', this).text().trim();
		item.itm_price = $('.shoppingcart-item-subtotal', this).text().trim();
		item.itm_quantity = formatQuantity($('.shoppingcart-item-quantity input:eq(0)', this).val());
		basket.push(replaceVars(item, format));
	});

	basket.push(replaceVars(costs, after));
	return basket;
}

function computeruniverse() {
	var basket = new Array();
	
	var priceExShipping = parseFloat(hwvsFixPrice(jQuery('.pricecart:eq(0)').text().substring(1)), 10);
	var priceIncShipping = parseFloat(hwvsFixPrice(jQuery('.pricecart:eq(1)').text().substring(1)), 10);

 	costs.shipping = "€" + (priceIncShipping - priceExShipping).toFixed(2);
	costs.total = "€" + priceIncShipping;
	basket.push(replaceVars(costs, before));

	jQuery('.text2[name!="add"]').parent().parent().each(function(index) {
		item.itm_url = window.location.protocol + "//" + window.location.hostname + jQuery('a:eq(2)', this).attr('href');
		item.itm_name = jQuery('a:eq(2)', this).text();
		item.itm_price = jQuery('.lightgray_border', this).text().trim();
		item.itm_quantity = formatQuantity(jQuery('.text2', this).val());
		basket.push(replaceVars(item, format));
	});

	basket.push(replaceVars(costs, after));
	return basket;
}

function mindfactory() {
	var basket = new Array();
	
 	costs.shipping = 29.99;
	costs.price = hwvsFixPrice(jQuery('.colorblue.size12.bold').text().trim().substring(2));
	costs.vat = hwvsFixPrice(jQuery('.colorblue.size12.bold').closest('.floatRight').find('.colorgrey.size9').text().trim().substring(2));
	costs.total = "€" + (costs.shipping + parseInt(costs.vat) + parseInt(costs.price));
 	costs.shipping = "€" + costs.shipping;
	basket.push(replaceVars(costs, before));

 	jQuery('.floatLeft.width760.bordergreybottom.patb10.cart_art').each(function(index) {
		item.itm_url = jQuery('a:eq(0)', this).attr('href');
		item.itm_name = jQuery('a:eq(0)', this).attr('title');
		item.itm_price = "€" + hwvsFixPrice(jQuery('.size12.bold.pab15', this).text().replace(/\*/, "").substring(2));
		item.itm_quantity = formatQuantity(jQuery('.size12.inputborder', this).val());
		basket.push(replaceVars(item, format));
	});

	basket.push(replaceVars(costs, after));
	return basket;
}

/**
 *
 * @param price Assumes it is a number, should not contain any currency symbols.
 * @param vatRate The Rate of VAT, should be an int between 1 and 100.
 * @return Returns a Float that includes the amount of VAT passed.
 */
function addVAT(price, vatRate) {
	return (price * (1 + (parseInt(vatRate, 10) / 100))).toFixed(2);
}

/**
 * This function takes a quantity and returns back a formatted version.
 *
 * @param quantity An int or parsable string representing the quantity.
 * @return A blank string is quantity is 1 or else a properly formatted quantity, e.g. "4 x "
 */
function formatQuantity(quantity) {
	quantity = parseInt(quantity, 10);
	quantity = (quantity > 1 ? quantity + ' x ' : '');
	return quantity;
}

function hideBuildBox() {
	document.getElementById("darkDiv").style.display = "none";
	document.getElementById("build_info").style.display = "none";
	return false;
}

function getPageWidth() {
	var body = document.body;
	var html = document.documentElement;

	return Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
}

function getPageHeight() {
	var body = document.body;
	var html = document.documentElement;

	return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
}

function popoutTextarea(text) {
	window.document.onkeydown = function (e) {
		if (e.keyCode == 27) {
			hideBuildBox();
		}
	};

	if (document.getElementById("build_info") != null) {
		document.getElementById("build_post").innerHTML = text;
		document.getElementById("darkDiv").style.display = "block";
		document.getElementById("build_info").style.display = "block";
	} else {
		var divWidth = 500;
		var divHeight = 300;

		var darkDiv = document.createElement("div");
		darkDiv.setAttribute("id", "darkDiv");
		darkDiv.setAttribute("onclick", "hideBuildBox()");
		darkDiv.setAttribute("style", "top: 0px; left: 0px; background: #000000; position: absolute; z-index: 2014; width: " + getPageWidth() + "px; height: " + getPageHeight() + "px; opacity: 0.5;");

		var build_info_div = document.createElement("div");
		build_info_div.setAttribute("id", "build_info");
		var div_style = "position: absolute;";
		div_style += "z-index: 2015;";
		div_style += "top: " + (window.innerHeight / 2 - divHeight / 2) + "px;";
		div_style += "left: " + (window.innerWidth / 2 - divWidth / 2) + "px;";
		div_style += "height: " + divHeight + "px;";
		div_style += "width: " + divWidth + "px;";
		div_style += "background: #f4a223;";
		div_style += "border: 10px solid #f4a223;";
		div_style += "box-shadow: 0px 0px 3px #222;";
		div_style += "border-radius: 20px;";
		div_style += "-webkit-border-radius: 20px;";
		div_style += "-moz-border-radius: 20px;";
		build_info_div.setAttribute("style", div_style);

		var build_info_header = document.createElement("div");
		build_info_header.setAttribute("style", "font-size: 20px; font-weight: 900;");
		build_info_header.appendChild(document.createTextNode("Your build info"));

		var build_info_close = document.createElement("a");
		build_info_close.setAttribute("style", "cursor: pointer; float: right; margin: -20px auto;");
		build_info_close.setAttribute("onclick", "return hideBuildBox();");
		build_info_close.appendChild(document.createTextNode("Close [x]"));

		var build_info_textarea = document.createElement("textarea");
		build_info_textarea.setAttribute("id", "build_post");
		build_info_textarea.setAttribute("onclick", "select();");
		build_info_textarea.setAttribute("cols", "1");
		build_info_textarea.setAttribute("rows", "1");
		build_info_textarea.setAttribute("style", "width: " + (divWidth - 5) + "px; height: " + (divHeight - 50) + "px;");
		build_info_textarea.appendChild(document.createTextNode(text));
		
		var line_break = document.createElement("div");
		line_break.setAttribute("style", "height: 5px;");
		
		var empty_basket = document.createElement("a");
		empty_basket.setAttribute("onclick", "emptyBasket(); hideBuildBox(); return;");
		empty_basket.setAttribute("style", "cursor: pointer;");
		var empty_basker_icon = document.createElement("img");
		empty_basker_icon.setAttribute("src", "http://www.findicons.com/icon/download/459008/basket_empty/32/png");
		empty_basker_icon.setAttribute("align", "middle");
		empty_basker_icon.setAttribute("style", "-moz-transform: scaleY(-1); -webkit-transform: scaleY(-1); -o-transform: scaleY(-1); transform: scaleY(-1); filter: flipv;");
		empty_basket.appendChild(empty_basker_icon);
		empty_basket.appendChild(document.createTextNode("Empty Bastet"));

		build_info_div.appendChild(build_info_header);
		build_info_div.appendChild(build_info_close);
		build_info_div.appendChild(build_info_textarea);
		build_info_div.appendChild(line_break);
		build_info_div.appendChild(empty_basket);
		build_info_div.appendChild(line_break);

		document.body.appendChild(build_info_div);
		document.body.appendChild(darkDiv);
	}

	window.location.hash = "#";
}

function init_script() {
	var host = window.location.hostname;
	var path = window.location.pathname;
	var query = window.location.search;

	if (host.match(/scan\.co\.uk/i)) {
		window.emptyBasket = function () {
			$('.btQtyField').each(function (index) {
				$(this).attr('value', 0);
			});
			window.location = document.getElementById("ctl00_ContentPlaceHolder2_buttonRecalcBasket2").href;
		};
		if (path.match(/basket/i)) {
			popoutTextarea(scan().join("\n"));
		} else {
			var redirect = confirm("Would you like to be redirected to your basket?");
			if (redirect) {
				window.location.href = 'https://secure.scan.co.uk/aspnet/shop/basket.aspx';
			}
		}
	} else if (host.match(/hardwareversand\.de/i)) {
		window.emptyBasket = function () {
			window.location.search = "basket.remAll=1";
		};
		if (path.match(/basket\.jsp/i)) {
			popoutTextarea(hwvs().join("\n"));
		} else {
			var redirect = confirm("Would you like to be redirected to your basket?");
			if (redirect) {
				window.location.pathname = "basket.jsp";
			}
		}
	} else if (host.match(/dabs/i)) {
		window.emptyBasket = function () {
			$('.ajax-delete').each(function (index) {
				$(this).click();
			});
		};
		if (path.match(/basket/i)) {
			popoutTextarea(dabs().join("\n"));
		} else {
			var redirect = confirm("Would you like to be redirected to your basket?");
			if (redirect) {
				window.location.pathname = "basket";
			}
		}
	} else if (host.match(/memoryc/i)) {
		window.emptyBasket = function () {
			jQuery('input[name^="quantity"]').each(function (index) {
				jQuery(this).attr('value', 0);
			});
			document.f.submit();
		};
		if (path.match(/checkout/i)) {
			popoutTextarea(memoryc().join("\n"));
		} else {
			var redirect = confirm("Would you like to be redirected to your basket?");
			if (redirect) {
				window.location.pathname = "buy/checkout.html";
			}
		}
	} else if (host.match(/overclockers\.co\.uk/i)) {
		window.emptyBasket = function () {
			var tableRows = document.getElementById("shoppingBkt").rows;
			for (var i = 1; i < tableRows.length - 4; i++) {
				tableRows[i].cells[2].getElementsByTagName("input")[0].value = 0;
			}
			document.getElementsByName("update")[0].click();
		};
		if (path.match(/viewcart/i)) {
			popoutTextarea(overclockers().join("\n"));
		} else {
			var redirect = confirm("Would you like to be redirected to your basket?");
			if (redirect) {
				window.location.pathname = "viewcart.php";
			}
		}
	} else if (host.match(/amazon/i)) {
		window.emptyBasket = function () {
			jQuery("p.quantity input").attr("value", "0");
			jQuery('input[name="submit.update"]').click();
		};
		if (path.match(/cart\/view\.html/i)) {
			popoutTextarea(amazon().join("\n"));
		} else {
			var redirect = confirm("Would you like to be redirected to your basket?");
			if (redirect) {
				window.location.pathname = "gp/cart/view.html/ref=gno_cart";
			}
		}
	} else if (host.match(/newegg/i)) {
		window.emptyBasket = function () {
			document.getElementById("chkItemHeader").click();
			window.location = document.getElementById("removeFromCart").href;
		};
		if (path.match(/ShoppingCart/i)) {
			popoutTextarea(newegg().join("\n"));
		} else {
			var redirect = confirm("Would you like to be redirected to your basket?");
			if (redirect) {
				window.location.href = "http://secure.newegg.com/Shopping/ShoppingCart.aspx";
			}
		}
	} else if (host.match(/aria\.co\.uk/i)) {
		window.emptyBasket = function () {
			window.location.search = "operation=shoppingBasketClear";
		};
		if (path.match(/ShoppingBasket$/i)) {
			popoutTextarea(aria().join("\n"));
		} else {
			var redirect = confirm("Would you like to be redirected to your basket?");
			if (redirect) {
				window.location.pathname = "myAria/ShoppingBasket";
			}
		}
	} else if (host.match(/specialtech\.co\.uk/i)) {
		window.emptyBasket = function () {
			window.location.search = "mode=clear_cart";
		};
		if (path.match(/cart\.php$/i)) {
			popoutTextarea(specialtech().join("\n"));
		} else {
			var redirect = confirm("Would you like to be redirected to your basket?");
			if (redirect) {
				window.location.pathname = "spshop/customer/cart.php";
			}
		}
	} else if (host.match(/komplett\.ie/i)) {
		window.emptyBasket = function () {
			document.getElementById("ctl00_siteContentPlaceHolder_shoppingCart_dlgShoppingCart_lbFooterRemoveAll").click();
		};
		if (path.match(/shoppingcart/i)) {
			popoutTextarea(komplett().join("\n"));
		} else {
			var redirect = confirm("Would you like to be redirected to your basket?");
			if (redirect) {
				window.location.pathname = "Komplett/site/shoppingcart/default.aspx";
			}
		}
	} else if (host.match(/computeruniverse/i)) {
		window.emptyBasket = function () {
			window.location.search = "delete=all";
		};
		if (path.match(/cart/i) && query == "") {
			popoutTextarea(computeruniverse().join("\n"));
		} else {
			var redirect = confirm("Would you like to be redirected to your basket?");
			if (redirect) {
				window.location.pathname = "en/cart.asp";
			}
		}
	} else if (host.match(/mindfactory/i)) {
		window.emptyBasket = function () {
			jQuery('input[type="checkbox"]').each(function() {
				jQuery(this).attr("checked", "true");
			});
			jQuery('.sprites_general .b_text + input').click();
		};
		if (path.match(/shopping_cart/i)) {
			popoutTextarea(mindfactory().join("\n"));
		} else {
			var redirect = confirm("Would you like to be redirected to your basket?");
			if (redirect) {
				window.location.pathname = "shopping_cart.php";
			}
		}
	} else {
		alert("Sorry this tool does not work with this website.");
	}
}

