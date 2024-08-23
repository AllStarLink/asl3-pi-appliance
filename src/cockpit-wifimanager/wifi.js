const result = document.getElementById("scan-results");
const button = document.getElementById("wifi-scan");
const setbutton = document.getElementById("set-wifi");
const setresult = document.getElementById("set-wifi-results");

function wifi_scan_run() {
    /* global cockpit */
	result.innerHTML = `<span class="wifi-scan-loader"></span>`;
	cockpit.spawn(["/usr/share/cockpit/wifimanager/wifi-scan.sh"] ,
		{ superuser: "require" } )
            .stream(wifi_scan_output)
            .catch(wifi_scan_fail);
}

function wifi_scan_fail() {
	result.innerHTML += `<span class="wifi-scan-error">WiFi scan failed</scan>`;
}

function wifi_scan_output(data) {
	let out_html = `<b>Available Wi-Fi Networks<b>`;
	out_html += `<pre>${data}</pre>`;
	result.innerHTML = out_html;
}

function set_wifi_run() {
    /* global cockpit */
	result.innerHTML = `<span class="wifi-scan-loader"></span>`;
	const net_name = document.getElementById("wifi-ssid").value;
	const net_key = document.getElementById("wifi-key").value;
	cockpit.spawn(["/usr/share/cockpit/wifimanager/wifi-set.sh", net_name, net_key] ,
		{ superuser: "require" } )
            .stream(set_wifi_output)
            .catch(set_wifi_fail);
}

function set_wifi_fail() {
	setresult.innerHTML += `<span class="wifi-scan-error">WiFi set failed</scan>`;
}

function set_wifi_output(data) {
	setresult.innerHTML = `<pre>${data}</pre>`;
}

button.addEventListener("click", wifi_scan_run);
setbutton.addEventListener("click" , set_wifi_run);


// Send a 'init' message.  This tells integration tests that we are ready to go
cockpit.transport.wait(function() { });
