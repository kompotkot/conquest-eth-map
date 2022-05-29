import argparse
import json
import logging
import os
import sys
import time
from datetime import datetime, timezone

from moonstreamdb.db import yield_db_read_only_session_ctx
from moonstreamdb.models import XDaiLabel

from .providers import event_providers


def generate_handler(args: argparse.Namespace) -> None:
    event = "Transfer"

    with yield_db_read_only_session_ctx() as db_session:
        latest_event_query = (
            db_session.query(XDaiLabel)
            .filter(XDaiLabel.label_data["name"].astext == event)
            .order_by(XDaiLabel.block_timestamp)
        )
        if args.sample:
            latest_event_query = latest_event_query.limit(1)

        latest_event = latest_event_query.all()

        print([i.block_timestamp for i in latest_event])

        # print(
        #     event_providers[event].convert(
        #         latest_event.block_number,
        #         latest_event.block_timestamp,
        #         latest_event.label_data,
        #     )
        # )


def main() -> None:
    parser = argparse.ArgumentParser(description="Conquest-eth map CLI")
    parser.set_defaults(func=lambda _: parser.print_help())
    subcommands = parser.add_subparsers(description="CEH commands")

    time_now = datetime.now(timezone.utc)

    parser_generate = subcommands.add_parser(
        "generate", description="Generate data for conquest-eth map"
    )
    parser_generate.set_defaults(func=lambda _: parser_generate.print_help())

    parser_generate.add_argument(
        "-s", "--sample", action="store_true", help="If provided get 5 sample events of each type"
    )
    parser_generate.set_defaults(func=generate_handler)

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
