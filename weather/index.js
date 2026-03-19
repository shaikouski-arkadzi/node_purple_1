#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { getWeather } from "./sevices/api.service.js";
import { printHelp } from "./sevices/log.service.js";
import { saveKeyValue } from "./sevices/storage.service.js";

const initCLI = async () => {
  const args = getArgs(process.argv);

  if (args.h) {
    printHelp();
  }

  if (args.c) {
    const weather = await getWeather(args.c);
    console.log(weather);

    console.log(
      `Weather in ${args.c} is:
Temperature: ${Math.floor(weather.main.temp)}°C`,
    );
  }

  if (args.t) {
    saveKeyValue("token", args.t);
  }
};

initCLI();
