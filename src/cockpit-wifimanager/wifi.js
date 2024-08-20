const address = document.getElementById("address");
const output = document.getElementById("output");
const result = document.getElementById("result");
const button = document.getElementById("wifi-scan");

function wifi_scan_run() {
    /* global cockpit */
    cockpit.spawn(["nmcli", "device", "wifi", "list"])
            .stream(wifi_scan_output)
            .then(wifi_scan_success)
            .catch(wifi_scan_fail);

    result.textContent = "";
    output.textContent = "";
}

function wifi_scan_success() {
    result.style.color = "green";
    result.textContent = "success";
}

function wifi_scan_fail() {
    result.style.color = "red";
    result.textContent = "fail";
}

function wifi_scan_output(data) {
	let out_html = `<hr><b>Available Wi-Fi Networks<b><br>`;
	out_html += `<pre>${data}</pre><hr>`;
	output.innerHTML = out_html;
}

// Connect the button to starting the "ping" process
button.addEventListener("click", wifi_scan_run);

// Send a 'init' message.  This tells integration tests that we are ready to go
cockpit.transport.wait(function() { });
