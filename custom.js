#import "UIAutoMonkey.js"
#import "buttonHandler.js"
#import "tuneup/tuneup.js"

// Configure the monkey: use the default configuration but a bit tweaked
monkey = new UIAutoMonkey();
monkey.config.numberOfEvents = 1999; // turn off to make clear that we want minutes
monkey.config.delayBetweenEvents = 0.05;

monkey.config.touchProbability = {
			multipleTaps: 0.05,
			multipleTouches: 0.05,
			longPress: 0.05
		};


//UI Holes handlers
var handlers = [];
handlers.push(new ButtonHandler("Back", 10, true));
// handlers.push(new WBScrollViewButtonHandler("weatherLeftBack", 5, false, 1));
handlers.push(new ButtonHandler("取消", 3, true));
// handlers.push(new ButtonHandler("CloseX", 3, true));
// handlers.push(new ButtonHandler("XXX", 3, false));

monkey.config.conditionHandlers = handlers;

//ANR settings
var aFingerprintFunction = function() {
    var mainWindow = UIATarget.localTarget().frontMostApp().mainWindow();
    //if an error occurs log it and make it the fingerprint
    try {
        var aString = mainWindow.elementAccessorDump("tree", true);
        // var aString = mainWindow.logElementTree();
        // var aString = mainWindow.logElementJSON(["name"])
        if (monkey.config.anrSettings.debug) {
            UIALogger.logDebug("fingerprintFunction tree=" + aString);
        }
    }
    catch (e) {
        aString = "fingerprintFunction error:" + e;
        UIALogger.logWarning(aString);
    }
    return aString;
};
monkey.config.anrSettings.fingerprintFunction = false;//false | aFingerprintFunction
monkey.config.anrSettings.eventsBeforeANRDeclared = 18; //throw exception if the fingerprint hasn't changed within this number of events
monkey.config.anrSettings.eventsBetweenSnapshots = 8; //how often (in events) to take a snapshot using the fingerprintFunction 
monkey.config.anrSettings.debug = false;  //log extra info on ANR state changes


// target.frontMostApp().mainWindow().buttons()["MainTab.MessageButton"].tap();
// Release the monkey!
UIALogger.logDebug("Start Monkey By Cunstom.js!!!");
monkey.RELEASE_THE_MONKEY();
UIALogger.logPass("monkey test success");
