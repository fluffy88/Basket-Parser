var item=new Object();var costs=new Object();if(typeof(format)=="undefined"){var format='{itm_quantity}[URL="{itm_url}"]{itm_name}[/URL]|{itm_price}'}if(typeof(before)=="undefined"){var before="[TABLE][B]Item[/B]|[B]Price[/B]"}if(typeof(after)=="undefined"){var after="Shipping|{shipping}\n[B]Total[/B]|[B]{total}[/B][/TABLE]"}function replaceVars(b,a){for(key in b){a=a.replace("{"+key+"}",b[key])}return a}function hwvs(){var a=document.getElementsByTagName("table")[0];if(typeof(a)!="undefined"){var e=a.getElementsByTagName("tbody")[0];var f=e.rows;var d=new Array();var c=$(a.getElementsByTagName("p")[0]).text();costs.shipping=18.99;costs.total="€"+(parseFloat(hwvsFixPrice(c),10)+costs.shipping).toFixed(2);costs.shipping="€"+costs.shipping;d.push(replaceVars(costs,before));for(var b=1;b<f.length;b++){var g=f[b].cells[0];if($(g).attr("colspan")){continue}item.itm_name=$("a",g).text().trim();item.itm_url="http://"+window.location.hostname+"/"+$("a",g).attr("href");item.itm_price=$(f[b].cells[4]).text().trim();item.itm_quantity=formatQuantity($("input:eq(0)",f[b].cells[3]).val());item.itm_price="€"+hwvsFixPrice(item.itm_price.substring(0,item.itm_price.length-2));d.push(replaceVars(item,format))}d.push(replaceVars(costs,after))}else{alert("You must place an item in your basket first.")}return d}function hwvsFixPrice(a){return a.replace(".","").replace(",",".")}function scan(){var a=new Array();costs.total=$("div.btRight").text();costs.shipping="£"+$("#ctl00_ContentPlaceHolder2_labelTotalCarriage").text();a.push(replaceVars(costs,before));$(".btRow").each(function(b){item.itm_url=$(".btDesc a",this).attr("href");item.itm_name=$(".btDesc a",this).text().trim();item.itm_price=$(".btInc",this).text().trim();item.itm_quantity=formatQuantity($(".btQty input",this).val());a.push(replaceVars(item,format))});a.push(replaceVars(costs,after));return a}function newegg(){var a=new Array();costs.total=jQuery("tr.cartSubtotal td:eq(1)").text();costs.shipping="- ? -";a.push(replaceVars(costs,before));jQuery("tr.cartItem").each(function(b){item.itm_price=jQuery('td.cartPrice dd[class!="cartOrig"]',this).text();item.itm_url=jQuery('a[name="CART_ITEM"]',this).attr("href");item.itm_name=jQuery('a[name="CART_ITEM"]',this).text().trim();item.itm_quantity=formatQuantity(jQuery("td.cartQty input:eq(0)",this).attr("value"));a.push(replaceVars(item,format))});a.push(replaceVars(costs,after));return a}function amazon(){var a=new Array();costs.total=jQuery("#sc-active-cart .sc-subtotal .sc-price").text().trim();costs.shipping="- ? -";a.push(replaceVars(costs,before));jQuery("#sc-active-cart .sc-list-item-content").each(function(b){item.itm_price=jQuery(".sc-price",this).text();item.itm_url=window.location.hostname+jQuery(".sc-item-product-image .sc-product-link",this).attr("href");item.itm_name=jQuery(".sc-product-title",this).text();item.itm_quantity=jQuery(".a-dropdown-prompt",this).text();if(item.itm_quantity!="1"){item.itm_price=item.itm_price.substring(0,1)+(parseFloat(item.itm_price.substring(1),10)*item.itm_quantity).toFixed(2)}item.itm_quantity=formatQuantity(item.itm_quantity);a.push(replaceVars(item,format))});a.push(replaceVars(costs,after));return a}function dabs(){var a=new Array();costs.total=$("#baskettotal").text().trim();costs.shipping=$("#delivery").text().trim();a.push(replaceVars(costs,before));$(".basket-item").each(function(b){item.itm_url="http://www.dabs.ie"+$(".title",this).attr("href");item.itm_name=$(".title",this).text().trim();item.itm_price=$(".price:eq(0)",this).text();item.itm_quantity=formatQuantity($(".item-qty-box",this).val());a.push(replaceVars(item,format))});a.push(replaceVars(costs,after));return a}function memoryc(){var a=new Array();costs.total=jQuery("#bctotal_price").text();costs.shipping="Free!";a.push(replaceVars(costs,before));jQuery('.blue_border_tr:eq(0) tr:contains("Item Number")').each(function(b){item.itm_url=jQuery(".prod_desc",this).attr("href");item.itm_name=jQuery(".title_green_font",this).text();item.itm_price=jQuery('span[id^="cart_vat"]',this).text().match(/VAT(.\s[^\s]+)/i)[1];item.itm_quantity=formatQuantity(jQuery('input[name^="quantity"]',this).val());a.push(replaceVars(item,format))});a.push(replaceVars(costs,after));return a}function overclockers(){var b=new Array();costs.total=document.getElementById("orderTotal").cells[2].innerHTML;costs.shipping=document.getElementsByClassName("totalRow")[1].getElementsByTagName("td")[2].innerHTML;b.push(replaceVars(costs,before));var c=document.getElementById("shoppingBkt");var d=c.rows;for(var a=1;a<d.length-4;a++){item.itm_url=d[a].cells[1].getElementsByTagName("a")[0].href;item.itm_name=d[a].cells[1].getElementsByTagName("a")[0].innerHTML;item.itm_price=d[a].cells[4].getElementsByTagName("span")[0].innerHTML;item.itm_quantity=formatQuantity(d[a].cells[2].getElementsByTagName("input")[0].value);b.push(replaceVars(item,format))}b.push(replaceVars(costs,after));return b}function aria(){var b=new Array();var c=document.getElementsByName("operation")[0].nextSibling.nextSibling;var d=c.rows;costs.total=d[d.length-2].cells[1].innerHTML.trim();costs.shipping=d[d.length-4].cells[1].innerHTML.trim();b.push(replaceVars(costs,before));for(var a=2;a<d.length-9;a++){item.itm_url=d[a].cells[3].getElementsByTagName("a")[0].href;item.itm_name=d[a].cells[3].getElementsByTagName("a")[0].innerHTML.trim();item.itm_price=d[a].cells[6].innerHTML.trim();item.itm_quantity=formatQuantity(d[a].cells[1].getElementsByTagName("input")[0].value);b.push(replaceVars(item,format))}b.push(replaceVars(costs,after));return b}function specialtech(){var e=new Array();var f=document.forms.cartform.getElementsByTagName("table");var h=f[0].rows;var g=f[f.length-2];costs.shipping=g.rows[3].cells[2].getElementsByTagName("font")[0].innerHTML;var d=5;if(costs.shipping!="£ 0.00"){var b=parseFloat(g.rows[4].cells[2].getElementsByTagName("font")[0].innerHTML.substring(2),10);costs.shipping="£"+(parseFloat(costs.shipping.substring(2),10)+b).toFixed(2);d=6}costs.total=g.rows[d].cells[2].getElementsByTagName("font")[0].innerHTML;e.push(replaceVars(costs,before));for(var a=0;a<h.length;a+=2){item.itm_url=h[a].cells[0].getElementsByTagName("a")[0].href;item.itm_name=h[a].cells[1].getElementsByTagName("font")[0].innerHTML.trim();item.itm_price=h[a].cells[1].getElementsByTagName("font")[2].innerHTML.trim();var c=h[a].cells[1].getElementsByTagName("div")[0].innerHTML.match(/exc VAT (\d+)%/i)[1];item.itm_price="£"+addVAT(item.itm_price.substring(2),c);item.itm_quantity=formatQuantity(h[a].cells[1].getElementsByTagName("input")[0].value);e.push(replaceVars(item,format))}e.push(replaceVars(costs,after));return e}function komplett(){var a=new Array();costs.shipping=document.getElementById("ctl00_siteContentPlaceHolder_shoppingCart_dlgShoppingCart_shipmentSelect_Dialog1_repShipment_ctl00_lblPrice").innerHTML;costs.total=document.getElementById("ctl00_siteContentPlaceHolder_shoppingCart_dlgShoppingCart_lblTotalValue").innerHTML;a.push(replaceVars(costs,before));$(".shoppingcart-item").each(function(){item.itm_url=this.getElementsByTagName("a")[0].href;item.itm_name=$(".shoppingcart-item-description h4",this).text().trim();item.itm_price=$(".shoppingcart-item-subtotal",this).text().trim();item.itm_quantity=formatQuantity($(".shoppingcart-item-quantity input:eq(0)",this).val());a.push(replaceVars(item,format))});a.push(replaceVars(costs,after));return a}function computeruniverse(){var b=new Array();var c=parseFloat(hwvsFixPrice(jQuery(".pricecart:eq(0)").text().substring(1)),10);var a=parseFloat(hwvsFixPrice(jQuery(".pricecart:eq(1)").text().substring(1)),10);costs.shipping="€"+(a-c).toFixed(2);costs.total="€"+a;b.push(replaceVars(costs,before));jQuery('.text2[name!="add"]').parent().parent().each(function(d){item.itm_url=window.location.protocol+"//"+window.location.hostname+jQuery("a:eq(2)",this).attr("href");item.itm_name=jQuery("a:eq(2)",this).text();item.itm_price=jQuery(".lightgray_border",this).text().trim();item.itm_quantity=formatQuantity(jQuery(".text2",this).val());b.push(replaceVars(item,format))});b.push(replaceVars(costs,after));return b}function mindfactory(){var a=new Array();costs.shipping=29.99;costs.price=hwvsFixPrice(jQuery(".colorblue.size12.bold").text().trim().substring(2));costs.vat=hwvsFixPrice(jQuery(".colorblue.size12.bold").closest(".floatRight").find(".colorgrey.size9").text().trim().substring(2));costs.total="€"+(costs.shipping+parseInt(costs.vat)+parseInt(costs.price));costs.shipping="€"+costs.shipping;a.push(replaceVars(costs,before));jQuery(".floatLeft.width760.bordergreybottom.patb10.cart_art").each(function(b){item.itm_url=jQuery("a:eq(0)",this).attr("href");item.itm_name=jQuery("a:eq(0)",this).attr("title");item.itm_price="€"+hwvsFixPrice(jQuery(".size12.bold.pab15",this).text().replace(/\*/,"").substring(2));item.itm_quantity=formatQuantity(jQuery(".size12.inputborder",this).val());a.push(replaceVars(item,format))});a.push(replaceVars(costs,after));return a}function addVAT(b,a){return(b*(1+(parseInt(a,10)/100))).toFixed(2)}function formatQuantity(a){a=parseInt(a,10);a=(a>1?a+" x ":"");return a}function hideBuildBox(){document.getElementById("darkDiv").style.display="none";document.getElementById("build_info").style.display="none";return false}function getPageWidth(){var a=document.body;var b=document.documentElement;return Math.max(a.scrollWidth,a.offsetWidth,b.clientWidth,b.scrollWidth,b.offsetWidth)}function getPageHeight(){var a=document.body;var b=document.documentElement;return Math.max(a.scrollHeight,a.offsetHeight,b.clientHeight,b.scrollHeight,b.offsetHeight)}function popoutTextarea(j){window.document.onkeydown=function(m){if(m.keyCode==27){hideBuildBox()}};if(document.getElementById("build_info")!=null){document.getElementById("build_post").innerHTML=j;document.getElementById("darkDiv").style.display="block";document.getElementById("build_info").style.display="block"}else{var k=500;var d=300;var h=document.createElement("div");h.setAttribute("id","darkDiv");h.setAttribute("onclick","hideBuildBox()");h.setAttribute("style","top: 0px; left: 0px; background: #000000; position: absolute; z-index: 2014; width: "+getPageWidth()+"px; height: "+getPageHeight()+"px; opacity: 0.5;");var c=document.createElement("div");c.setAttribute("id","build_info");var i="position: absolute;";i+="z-index: 2015;";i+="top: "+(window.innerHeight/2-d/2)+"px;";i+="left: "+(window.innerWidth/2-k/2)+"px;";i+="height: "+d+"px;";i+="width: "+k+"px;";i+="background: #f4a223;";i+="border: 10px solid #f4a223;";i+="box-shadow: 0px 0px 3px #222;";i+="border-radius: 20px;";i+="-webkit-border-radius: 20px;";i+="-moz-border-radius: 20px;";c.setAttribute("style",i);var e=document.createElement("div");e.setAttribute("style","font-size: 20px; font-weight: 900;");e.appendChild(document.createTextNode("Your build info"));var b=document.createElement("a");b.setAttribute("style","cursor: pointer; float: right; margin: -20px auto;");b.setAttribute("onclick","return hideBuildBox();");b.appendChild(document.createTextNode("Close [x]"));var l=document.createElement("textarea");l.setAttribute("id","build_post");l.setAttribute("onclick","select();");l.setAttribute("cols","1");l.setAttribute("rows","1");l.setAttribute("style","width: "+(k-5)+"px; height: "+(d-50)+"px;");l.appendChild(document.createTextNode(j));var g=document.createElement("div");g.setAttribute("style","height: 5px;");var f=document.createElement("a");f.setAttribute("onclick","emptyBasket(); hideBuildBox(); return;");f.setAttribute("style","cursor: pointer;");var a=document.createElement("img");a.setAttribute("src","http://www.findicons.com/icon/download/459008/basket_empty/32/png");a.setAttribute("align","middle");a.setAttribute("style","-moz-transform: scaleY(-1); -webkit-transform: scaleY(-1); -o-transform: scaleY(-1); transform: scaleY(-1); filter: flipv;");f.appendChild(a);f.appendChild(document.createTextNode("Empty Bastet"));c.appendChild(e);c.appendChild(b);c.appendChild(l);c.appendChild(g);c.appendChild(f);c.appendChild(g);document.body.appendChild(c);document.body.appendChild(h)}window.location.hash="#"}function init_script(){var b=window.location.hostname;var c=window.location.pathname;var a=window.location.search;if(b.match(/scan\.co\.uk/i)){window.emptyBasket=function(){$(".btQtyField").each(function(e){$(this).attr("value",0)});window.location=document.getElementById("ctl00_ContentPlaceHolder2_buttonRecalcBasket2").href};if(c.match(/basket/i)){popoutTextarea(scan().join("\n"))}else{var d=confirm("Would you like to be redirected to your basket?");if(d){window.location.href="https://secure.scan.co.uk/aspnet/shop/basket.aspx"}}}else{if(b.match(/hardwareversand\.de/i)){window.emptyBasket=function(){window.location.search="basket.remAll=1"};if(c.match(/basket\.jsp/i)){popoutTextarea(hwvs().join("\n"))}else{var d=confirm("Would you like to be redirected to your basket?");if(d){window.location.pathname="basket.jsp"}}}else{if(b.match(/dabs/i)){window.emptyBasket=function(){$(".ajax-delete").each(function(e){$(this).click()})};if(c.match(/basket/i)){popoutTextarea(dabs().join("\n"))}else{var d=confirm("Would you like to be redirected to your basket?");if(d){window.location.pathname="basket"}}}else{if(b.match(/memoryc/i)){window.emptyBasket=function(){jQuery('input[name^="quantity"]').each(function(e){jQuery(this).attr("value",0)});document.f.submit()};if(c.match(/checkout/i)){popoutTextarea(memoryc().join("\n"))}else{var d=confirm("Would you like to be redirected to your basket?");if(d){window.location.pathname="buy/checkout.html"}}}else{if(b.match(/overclockers\.co\.uk/i)){window.emptyBasket=function(){var e=document.getElementById("shoppingBkt").rows;for(var f=1;f<e.length-4;f++){e[f].cells[2].getElementsByTagName("input")[0].value=0}document.getElementsByName("update")[0].click()};if(c.match(/viewcart/i)){popoutTextarea(overclockers().join("\n"))}else{var d=confirm("Would you like to be redirected to your basket?");if(d){window.location.pathname="viewcart.php"}}}else{if(b.match(/amazon/i)){window.emptyBasket=function(){jQuery("p.quantity input").attr("value","0");jQuery('input[name="submit.update"]').click()};if(c.match(/cart\/view\.html/i)){popoutTextarea(amazon().join("\n"))}else{var d=confirm("Would you like to be redirected to your basket?");if(d){window.location.pathname="gp/cart/view.html/ref=gno_cart"}}}else{if(b.match(/newegg/i)){window.emptyBasket=function(){document.getElementById("chkItemHeader").click();window.location=document.getElementById("removeFromCart").href};if(c.match(/ShoppingCart/i)){popoutTextarea(newegg().join("\n"))}else{var d=confirm("Would you like to be redirected to your basket?");if(d){window.location.href="http://secure.newegg.com/Shopping/ShoppingCart.aspx"}}}else{if(b.match(/aria\.co\.uk/i)){window.emptyBasket=function(){window.location.search="operation=shoppingBasketClear"};if(c.match(/ShoppingBasket$/i)){popoutTextarea(aria().join("\n"))}else{var d=confirm("Would you like to be redirected to your basket?");if(d){window.location.pathname="myAria/ShoppingBasket"}}}else{if(b.match(/specialtech\.co\.uk/i)){window.emptyBasket=function(){window.location.search="mode=clear_cart"};if(c.match(/cart\.php$/i)){popoutTextarea(specialtech().join("\n"))}else{var d=confirm("Would you like to be redirected to your basket?");if(d){window.location.pathname="spshop/customer/cart.php"}}}else{if(b.match(/komplett\.ie/i)){window.emptyBasket=function(){document.getElementById("ctl00_siteContentPlaceHolder_shoppingCart_dlgShoppingCart_lbFooterRemoveAll").click()};if(c.match(/shoppingcart/i)){popoutTextarea(komplett().join("\n"))}else{var d=confirm("Would you like to be redirected to your basket?");if(d){window.location.pathname="Komplett/site/shoppingcart/default.aspx"}}}else{if(b.match(/computeruniverse/i)){window.emptyBasket=function(){window.location.search="delete=all"};if(c.match(/cart/i)&&a==""){popoutTextarea(computeruniverse().join("\n"))}else{var d=confirm("Would you like to be redirected to your basket?");if(d){window.location.pathname="en/cart.asp"}}}else{if(b.match(/mindfactory/i)){window.emptyBasket=function(){jQuery('input[type="checkbox"]').each(function(){jQuery(this).attr("checked","true")});jQuery(".sprites_general .b_text + input").click()};if(c.match(/shopping_cart/i)){popoutTextarea(mindfactory().join("\n"))}else{var d=confirm("Would you like to be redirected to your basket?");if(d){window.location.pathname="shopping_cart.php"}}}else{alert("Sorry this tool does not work with this website.")}}}}}}}}}}}}};

