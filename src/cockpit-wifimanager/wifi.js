const address = document.getElementById("address");
const output = document.getElementById("output");
const result = document.getElementById("result");
const ssidDropdown = document.getElementById("wifi-ssid");
const passwordInput = document.getElementById("wifi-key");
const saveButton = document.getElementById("set-wifi");

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
    result.textContent = "WiFi Scan successful";
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

        // Determine SSID location based on whether the first column is empty
        let ssid;
        if (columns[0] === '*' || columns[0] === '') {
            ssid = columns[2];  // SSID is in the 3rd column (index 2)
        } else {
            ssid = columns[1];  // SSID is in the 2nd column (index 1)
        }

        if (ssid && ssid !== "--") {  // Ensure SSID is valid and not "--"
            ssidSet.add(ssid);
        }
    }

    // Populate the dropdown with unique SSIDs
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

function save_network() {
    const ssid = ssidDropdown.value;
    const password = passwordInput.value;

    if (!ssid || !password) {
        result.style.color = "red";
        result.textContent = "Please select a network and enter a password.";
        return;
    }

    // Disable the Save button while processing
    saveButton.disabled = true;
    saveButton.textContent = "Saving...";

    // Create or modify the connection using nmcli
    /* global cockpit */
    cockpit.spawn([
        "sudo", "nmcli", "dev", "wifi", "connect", ssid, "password", password
    ])
    .then(() => {
        result.style.color = "green";
        result.textContent = `Network ${ssid} saved successfully.`;
    })
    .catch((error) => {
        result.style.color = "red";
        result.textContent = `Failed to save network: ${error.message}`;
    })
    .finally(() => {
        // Re-enable the Save button and restore its text
        saveButton.disabled = false;
        saveButton.textContent = "Save Network";
    });
}

// Run the Wi-Fi scan when the page loads
document.addEventListener("DOMContentLoaded", wifi_scan_run);

// Connect the Save button to the save_network function
saveButton.addEventListener("click", save_network);

