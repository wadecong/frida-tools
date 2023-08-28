function main() {
    if (!ObjC.available) {
        send("Objective-C Runtime is not available!");
        return;
    }
    try {
        const LSApplicationWorkspace = ObjC.classes.LSApplicationWorkspace;
        var workspace = LSApplicationWorkspace.defaultWorkspace();
        var apps = workspace.allInstalledApplications();
        
        // print("App: \(app.localizedName!), Bundle ID: \(app.bundleIdentifier!), Version: \(app.bundleVersion), ShortVersion: \(app.shortVersionString)")
        for (var i = 0; i < apps.count(); i++) {
            var app = apps.objectAtIndex_(i);
            send(`App: ${app.localizedName()}, Bundle ID: ${app.bundleIdentifier()}, Version: ${app.bundleVersion()}, ShortVersion: ${app.shortVersionString()}`);
        }
    } catch (err) {
        send("[!] Exception: " + err.message);
        send("[!] Stack: " + err.stack);
    }
}

main()
