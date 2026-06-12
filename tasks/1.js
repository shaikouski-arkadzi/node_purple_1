// **Описание**: Реализуйте функцию для парсинга аргументов командной строки, которая принимает массив строк и возвращает объект с разобранными флагами и их значениями.
//
// **Входные данные**: Массив строк args (аналог process.argv.slice(2))
//
// **Выходные данные**: Объект с ключами-флагами и их значениями
//
// **Ограничения**:
// - Флаги начинаются с одного или двух дефисов (- или --)
// - Если после флага идет значение (не начинается с -), то флаг получает это значение
// - Если после флага нет значения или следующий элемент тоже флаг, то флаг получает значение true
// - Удаляйте дефисы из названий флагов
//
// **Примеры**:
// Input: ['-h']
// Output: {h: true}
//
// Input: ['--city', 'Moscow', '-v']
// Output: {city: 'Moscow', v: true}
//
// Input: ['-t', '25', '--debug', '-s', 'metric']
// Output: {t: '25', debug: true, s: 'metric'}

function parseArgs(args) {
  const res = {};
  for (let i = 0; i < args.length; i++) {
    const el = args[i];
    if (el.indexOf("-") === 0) {
      if (args[i + 1]?.indexOf("-") === 0) {
        res[el.replaceAll("-", "")] = true;
      }
      if (args[i + 1]?.indexOf("-") !== 0) {
        res[el.replaceAll("-", "")] = args[i + 1];
        i++;
      }
    }
  }
  console.log(res);
  return res;
}

function parseArgs2(args) {
  const res = {};
  for (let i = 0; i < args.length; i++) {
    const el = args[i];

    if (typeof el === "string" && el.startsWith("-")) {
      const key = el.replaceAll("-", "");

      const next = args[i + 1];

      if (!next || (typeof next === "string" && next.startsWith("-"))) {
        res[key] = true;
      } else {
        res[key] = next;
        i++;
      }
    }
  }
  console.log(res);
  return res;
}

const testArgs3 = ["-t", "25", "--debug", "-s", "metric"];

parseArgs(testArgs3);
