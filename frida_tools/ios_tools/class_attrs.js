function main() {
    if (!ObjC.available) {
        send("Objective-C Runtime is not available!");
        return;
    }
    try {
        const name = "%(class_name)s";
        var k = ObjC.classes[name];
        send(`class name: ${k.$className}`);

        // print super class
        send("Super Classes:");
        var s = ObjC.classes[name];
        while (s.$superClass != null) {
            send("  - " + s.$superClass.$className);
            s = s.$superClass;
        }

        // print protocols
        send("Protocols:");
        for (var protocol in k.$protocols) {
            send("  - " + protocol);
        }

        // print ownMethods
        send("Own Methods:");
        for (var key in k.$ownMethods) {
            send("  " + k.$ownMethods[key]);
        }

        // objects
        send("objects:");
        ObjC.choose(ObjC.classes[k], {
            onMatch: function (obj) {
              send(`  - ${obj}`);
            },
            onComplete: function () {
              
            }
        });
    } catch (err) {
        send("[!] Exception: " + err.message);
        send("[!] Stack: " + err.stack);
    }
}

main()
