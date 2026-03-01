#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { printHelp } from "./sevices/log.service.js";

const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    printHelp();
  }

  if (args.c) {
  }
};

initCLI();
