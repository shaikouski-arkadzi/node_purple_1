const printError = (error) => {
  console.log(`Error: ${error}`);
};

const printSuccess = (message) => {
  console.log(`Success: ${message}`);
};

const printHelp = () => {
  console.log(
    `Help:
    Без параметров - вывод погоды
    -c [CITY] для данных о погоде в данном городе
    `,
  );
};

export { printError, printSuccess, printHelp };
