const printError = (error: string): void => {
  console.log(`Error: ${error}`);
};

const printSuccess = (message: string): void => {
  console.log(`Success: ${message}`);
};

const printHelp = (): void => {
  console.log(
    `Help:
    Без параметров - вывод погоды
    -c [CITY] для данных о погоде в данном городе
    `,
  );
};

export { printError, printSuccess, printHelp };
