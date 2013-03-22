JavaScript:
	var debug = true;

	function loadScript(url) {
		var scriptID = url.match(/.*\/(.*)\./)[1];
		if (document.getElementById(scriptID) == null) {
			var script = document.createElement("script");
			script.setAttribute("id", scriptID);
			script.setAttribute("type", "text/javascript");
			script.setAttribute("src", url + "?" + Math.pow(new Date().getMonth(), 2) + Math.pow(new Date().getDate(), 3));
			document.getElementsByTagName("head")[0].appendChild(script);
			setTimeout("loadScript('" + url + "')", 200);
		} else if (typeof(init_script) != 'undefined') {
			try {
				init_script();
			} catch (e) {
				if (debug) {
					alert(e);
				}
			}
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
	/* loadScript("https://raw.github.com/fluffy88/Basket-Parser/master/hwvs_price_reducer.js"); */
	/* loadScript("http://fluffy88.com/scripts/basket_parser.js"); */
	void(0);
