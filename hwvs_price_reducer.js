/** script to reduce the cost of items in your hwvs basket using http://geizhals.de/ */


	var items = hwvs();
	for (var i=0; i<items.length; i++) {
		alert(items[i].itm_name);
	}


function hwvs() {
	var basketTable = document.getElementsByTagName("table")[0];
	if (typeof (basketTable) != "undefined") {
		var tableBody = basketTable.getElementsByTagName("tbody")[0];
		var tableRows = tableBody.rows;
		var item = new Object();
		var basket = new Array();

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
	} else {
		alert("You must place an item in your basket first.");
	}
	return basket;
}

function replaceVars(elems, string) {
	for (key in elems) {
		string = string.replace("{" + key + "}", elems[key]);
	}
	return string;
}

function hwvsFixPrice(price) {
	return price.replace(".", "").replace(",", ".");
}