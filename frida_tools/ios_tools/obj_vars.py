import argparse
import json
import os
from typing import List


def main() -> None:
    import frida
    from frida_tools.application import ConsoleApplication

    class ObjVarsApplication(ConsoleApplication):

        def _usage(self) -> str:
            return "%(prog)s [options] target"
        
        def _needs_target(self) -> bool:
            return True
        
        def _add_options(self, parser: argparse.ArgumentParser) -> None:
            parser.add_argument("obj_addr", help="object address")

        def _initialize(self, parser: argparse.ArgumentParser, options: argparse.Namespace, args: List[str]) -> None:
            self.obj_addr = options.obj_addr
        
        def _start(self) -> None:
            self._print("show class attributes")
            if not (session := self._session):
                raise Exception("No session")
            script_content = self.read_script() % {
                "obj_addr": self.obj_addr
            }
            script = session.create_script(script_content)
            script.on("message", self.on_message)
            script.load()
            self._exit(0)

        def read_script(self) -> str:
            script_path = os.path.join(os.path.dirname(__file__), "obj_vars.js")
            with open(script_path, "r") as f:
                return f.read()
            
        def on_message(self, message, data):
            payload = message['payload']
            self._print(payload)
        
    app = ObjVarsApplication()
    app.run()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        pass