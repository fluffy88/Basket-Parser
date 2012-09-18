JavaScript:
	var debug = true;

	function loadScript(url) {
		if (document.getElementById("basket_parser") == null) {
			var script = document.createElement("script");
			script.setAttribute("id", "basket_parser");
			script.setAttribute("type", "text/javascript");
			script.setAttribute("src", url + "?" + Math.pow(new Date().getMonth(), 2) + Math.pow(new Date().getDate(), 3));
			document.getElementsByTagName("head")[0].appendChild(script);
			setTimeout("loadScript('" + url + "')", 200);
		} else if (typeof(init_script) != 'undefined') {
			init_script();
		} else {
			setTimeout("loadScript('" + url + "')", 200);
		}
	}

	function log(string) {
		if (debug) {
			document.body.appendChild(document.createTextNode(string));
			document.body.appendChild(document.createElement("br"));
		}
	}

	loadScript("http://fluffy88.com/scripts/basket_parser_dev.js");
	/* loadScript("http://fluffy88.com/scripts/basket_parser.js"); */
	void(0);