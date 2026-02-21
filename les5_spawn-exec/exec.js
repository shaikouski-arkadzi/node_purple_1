// exec для выполнения команд и получения полного буфера вывода.
const { exec } = require("child_process");

const childProcess = exec("dir", (err, stdout, stderr) => {
  if (err) console.error(err.message);

  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

childProcess.on("exit", (code) => {
  console.log(`Код выхода: ${code}`);
});
