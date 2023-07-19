import json
import os


def main() -> None:
    import frida
    from frida_tools.application import ConsoleApplication

    class LSLibsApplication(ConsoleApplication):

        def _usage(self) -> str:
            return "%(prog)s [options] target"
        
        def _needs_target(self) -> bool:
            return True
        
        def _start(self) -> None:
            self._print("ls libs")
            if not (session := self._session):
                raise Exception("No session")
            script = session.create_script(self.read_script())
            script.on("message", self.on_message)
            script.load()
            self._exit(0)

        def read_script(self) -> str:
            script_path = os.path.join(os.path.dirname(__file__), "ls_libs.js")
            with open(script_path, "r") as f:
                return f.read()
            
        def on_message(self, message, data):
            modules = message['payload']
            for module in modules:
                self._print(f"name:{module['name']}, path:{module['path']}")

        
    app = LSLibsApplication()
    app.run()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        pass