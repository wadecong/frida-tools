function main() {
    if (!ObjC.available) {
        send("Objective-C Runtime is not available!");
        return;
    }
    try {
        const obj = ObjC.Object(ptr("%(obj_addr)s"));
        if (!obj) {
            send("Object is null");
            return;
        }

        send(`[+] Object: ${obj}`);
        
        const keys = Object.keys(obj.$ivars);
        for(var i = 0; i < keys.length; i++) {
            const key = keys[i];
            send(`\t ${key}:`);
            const value = obj.$ivars[key];
            send(`\t \t (${ value ? value.$kind : (value ? typeof value : '_')}) = ${value}`);
        }

        // .forEach(function(v) {
        //     if (typeof v == 'undefined') {return;}
        //     if (!v) {return;}
        //     const value = obj.$ivars[v];
        //     // console.log(`\t ${v}:`)
        //     // try {
        //     //     send(`\t ${v}: (${ value && value.hasOwnProperty('$kind') ? value.$kind : (value ? typeof value : '_')}) = ${value}`);
        //     // } catch (error) {
        //     //     send(`\t ${v}: [!] Exception: ${err.message}`);
        //     // }
        // });
    } catch (err) {
        send("[!] Exception: " + err.message);
        send("[!] Stack: " + err.stack);
    }
}

main()
