(() => {
  const time = document.querySelector(".time");
  const date = document.querySelector(".date");

  const currentTimeAndDate = new Date();
  const hours = currentTimeAndDate.getHours();
  const minutes = currentTimeAndDate.getMinutes();
  const day = currentTimeAndDate.getDate();
  const month = currentTimeAndDate.getMonth() + 1;
  const year = currentTimeAndDate.getFullYear();

  time.textContent = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`;
  date.textContent = `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month}.${year}`;
})();
