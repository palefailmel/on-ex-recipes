// Author: Michael Sisco
// Description: Open a browser when you connect to a specific network

// SSID Variable - MUST CHANGE
var mMySSID = "SSID GOES HERE";

// run when the phone is connected to a WiFi network
device.network.on("wifiOn", function(signal) {
    
	// funcation that checks for the SSID listed
    var mFindSSIDFunction = function() {
		// Runs when the device scans WiFi networks
        device.network.on("wifiScan", function(result) {
			// Just logging for console
            console.info("Made it to scan results");
            
			// object containing a list of networks found
            var mObject = result.scanResults;
            
			// iterate through and get the SSID of each
            for(var i = 0; i < mObject.size(); i++) {
                if(mObject.get(i).SSID == mMySSID) {
					// launch the browser when SSID is found
                    device.browser.launch("http://www.google.com");
                }
            }
            
            // Just making sure that the alarms are a one time thing
            device.scheduler.removeAlarm("LaunchAlarm");
            device.scheduler.removeAlarm("CheckNetworkAlarm");
        });
    };
    
	// Function to start WiFi Scanning
    var mStartWifiScanFunction = function() {
        console.info("Made it to Start WiFi Scan");
        
        device.network.startWifiScan();
        
		// Start timer to run the mFindSSIDFunction above
        device.scheduler.setTimer({
            name: "LaunchAlarm",
            time: 0},
            mFindSSIDFunction
        );
    };
    
	// Start timer to make device start checking
    device.scheduler.setTimer({
        name: "CheckNetworkAlarm",
        time: 0},
        mStartWifiScanFunction
    );
});