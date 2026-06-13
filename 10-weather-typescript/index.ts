#!/usr/bin/env node

import { getArgs } from "./helpers/args";
import { getWeather } from "./sevices/api.service";
import { printHelp } from "./sevices/log.service";
import { saveKeyValue } from "./sevices/storage.service";

const initCLI = async (): Promise<void> => {
  const args = getArgs(process.argv);

  if (args.h) {
    printHelp();
  }

  if (args.c && typeof args.c === "string") {
    const weather = await getWeather(args.c);
    console.log(weather);

    console.log(
      `Weather in ${args.c} is:
Temperature: ${Math.floor(weather.main.temp)}°C`,
    );
  }

  if (args.t && typeof args.t === "string") {
    saveKeyValue("token", args.t);
  }
};

initCLI();
