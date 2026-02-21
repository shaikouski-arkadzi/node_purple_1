// spawn для работы с процессами, которые возвращают большой объем данных, поскольку позволяет обрабатывать данные по мере их поступления
const { spawn } = require("child_process");

const childProcess = spawn("dir", { shell: true });

childProcess.stdout.on("data", (data) => {
  console.log(`Данные: ${data}`);
});

childProcess.stderr.on("data", (error) => {
  console.log(`Ошибка: ${error}`);
});

childProcess.on("exit", (code) => {
  console.log(`Код выхода: ${code}`);
});
