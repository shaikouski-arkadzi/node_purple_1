const notifier = require("node-notifier");

function startTimer(seconds) {
  console.log(`Таймер запущен на ${seconds} секунд`);

  setTimeout(() => {
    notifier.notify({
      title: "Таймер",
      message: "Время истекло!",
      sound: true,
      wait: true,
    });

    console.log("Таймер завершён");
  }, seconds * 1000);
}

startTimer(60);
