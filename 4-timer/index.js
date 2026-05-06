#!/usr/bin/env node

const input = process.argv.slice(2).join(" ");

if (!input) {
  console.error('Укажите время, например: "1h 5m 10s"');
  process.exit(1);
}

function parseTime(str) {
  let totalMs = 0;
  let currentNumber = "";

  const multipliers = {
    h: 3600000,
    m: 60000,
    s: 1000,
  };

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];

    if (ch >= "0" && ch <= "9") {
      currentNumber += ch;
      continue;
    }

    if (ch === " ") continue;

    const unit = ch.toLowerCase();

    if (!multipliers[unit]) {
      throw new Error(`Неизвестный символ: ${ch}`);
    }

    if (currentNumber === "") {
      throw new Error(`Нет числа перед "${unit}"`);
    }

    const value = parseInt(currentNumber, 10);
    totalMs += value * multipliers[unit];

    currentNumber = "";
  }

  if (currentNumber !== "") {
    throw new Error(`Число без единицы измерения: ${currentNumber}`);
  }

  return totalMs;
}

let duration;

try {
  duration = parseTime(input);
} catch (err) {
  console.error("Ошибка парсинга:", err.message);
  process.exit(1);
}

if (duration <= 0) {
  console.error("Время должно быть больше нуля");
  process.exit(1);
}

console.log(`Таймер запущен на ${duration} мс...`);

setTimeout(() => {
  console.log("⏰ Время вышло!");
  process.stdout.write("\x07");
}, duration);
