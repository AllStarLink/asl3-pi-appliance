const address = document.getElementById("address");
const output = document.getElementById("output");
const result = document.getElementById("result");

let accumulatedOutput = "";  // Variable to accumulate output

function wifi_scan_run() {
    /* global cockpit */
    cockpit.spawn(["nmcli", "device", "wifi", "list"])
        .stream((data) => {
            accumulatedOutput += data;  // Accumulate the output
        })
        .then(() => {
            wifi_scan_output(accumulatedOutput);  // Display full output
            wifi_scan_success();
        })
        .catch(wifi_scan_fail);

    result.textContent = "";
    output.textContent = "";
    accumulatedOutput = "";  // Reset accumulated output for next scan
}

function wifi_scan_success() {
    result.style.color = "green";
    result.textContent = "WiFi scan successful";
}

function wifi_scan_fail() {
    result.style.color = "red";
    result.textContent = "WiFi scan failed";
}

function wifi_scan_output(data) {
    const ssidSet = new Set();  // Use a Set to store unique SSIDs

    // Split the data by lines and process each line
    const lines = data.split("\n");

    // Ignore the first line if it contains headers
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();

        // Split the line into columns
        const columns = line.split(/\s+/);

        // Assuming SSID is in the 2nd column (index 1)
        const ssid = columns[1];  // Adjust index if necessary based on your output

        if (ssid && ssid !== "--") {  // Ensure SSID is valid and not "--"
            ssidSet.add(ssid);
        }
    }

    // Populate the dropdown with unique SSIDs
    const ssidDropdown = document.getElementById("wifi-ssid");
    ssidDropdown.innerHTML = "";  // Clear existing options

    ssidSet.forEach(ssid => {
        const option = document.createElement("option");
        option.value = ssid;
        option.textContent = ssid;
        ssidDropdown.appendChild(option);
    });

    // Automatically select the first SSID in the list
    if (ssidDropdown.options.length > 0) {
        ssidDropdown.selectedIndex = 0;
    }
}

// Run the Wi-Fi scan when the page loads
document.addEventListener("DOMContentLoaded", wifi_scan_run);

