function main() {
    if (!ObjC.available) {
        console.log("Objective-C Runtime is not available!");
        return;
    }
    try {
        var UIApplication = ObjC.classes.UIApplication;
        var UIWindow = ObjC.classes.UIWindow;

        // Get the 'sharedApplication' instance
        var sharedApplication = UIApplication.sharedApplication();
                
        // Get the windows of the application
        var windows = sharedApplication.windows();

        // Enumerate through the windows
        for (var i = 0; i < windows.count(); i++) {
            var window = windows.objectAtIndex_(i);
            
            // Get the root view controller of the window
            var rootViewController = window.rootViewController();
            
            // Get the view of the root view controller
            var rootView = rootViewController.view();
            
            // Print the view hierarchy
            send(rootView.recursiveDescription().toString());
        }
    } catch (err) {
        send("[!] Exception: " + err.message);
    }
}

main()
