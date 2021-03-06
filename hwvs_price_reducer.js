/** script to reduce the cost of items in your hwvs basket using http://geizhals.de/ */

function init_script() {
	var items = hwvs();
	for (var i=0; i<items.length; i++) {
		window.open("http://geizhals.de/?fs=" + encodeURIComponent(items[i].itm_name));
	}
}

function hwvs() {
	var basketTable = document.getElementsByTagName("table")[0];
	if (typeof (basketTable) != "undefined") {
		var tableBody = basketTable.getElementsByTagName("tbody")[0];
		var tableRows = tableBody.rows;
		var basket = new Array();

		for (var i = 1; i < tableRows.length; i++) {
			var itemInfo = tableRows[i].cells[0];
			if ($(itemInfo).attr("colspan")) {
				continue;
			}
			var item = new Object();
			item.itm_name = $("a", itemInfo).text().trim();
			item.itm_url = "http://" + window.location.hostname + "/" + $("a", itemInfo).attr("href");
			basket.push(item);
		}
	} else {
		alert("You must place an item in your basket first.");
	}
	return basket;
}

function hwvsFixPrice(price) {
	return price.replace(".", "").replace(",", ".");
}
