import json
import os


def main() -> None:
    import frida
    from frida_tools.application import ConsoleApplication

    class AppInfoApplication(ConsoleApplication):

        def _usage(self) -> str:
            return "%(prog)s [options] target"
        
        def _needs_target(self) -> bool:
            return True
        
        def _start(self) -> None:
            self._print("app info")
            if not (session := self._session):
                raise Exception("No session")
            script = session.create_script(self.read_script())
            script.on("message", self.on_message)
            script.load()
            self._exit(0)

        def read_script(self) -> str:
            script_path = os.path.join(os.path.dirname(__file__), "app_info.js")
            with open(script_path, "r") as f:
                return f.read()
            
        def on_message(self, message, data):
            self._print(f"payload:{message['payload']}")

        
    app = AppInfoApplication()
    app.run()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        pass