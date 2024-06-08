from argparse import ArgumentParser, Namespace
from logging import DEBUG, INFO, basicConfig, getLogger
import sys

from knocker.service import KnockerConfig, KnockerService

def parse_arguments(args) -> Namespace:
    parser = ArgumentParser(description="Knocker service for the Tommyknocker control validation service")
    parser.add_argument("-v", "--verbose", action="store_true", help="Enable verbose logging")
    parser.add_argument("-c", "--controller", type=str, help="Hostname or IP address for the Tommyknocker controller API")
    parser.add_argument("-p", "--port", type=int, help="Port for the Tommyknocker controller API", default=443)
    parser.add_argument("-i", "--interval", type=int, help="Interval in seconds between checkins with the Tommyknocker controller API", default=10)
    parser.add_argument("-I", "--identity", type=str, help="Identity token for this knocker from the Tommyknocker controller API")
    return parser.parse_args(args)

if __name__ == "__main__":
    args = parse_arguments(sys.argv[1:])
    basicConfig(level=DEBUG if args.verbose else INFO)
    logger = getLogger("Main")
    logger.info("Starting knocker service")
    logger.debug(f"Config: {args}")
    KnockerService(KnockerConfig(controller=args.controller, port=args.port, interval=args.interval, identity=args.identity)).run()
    