// Функція для читання даних з файлу Excel
function readExcelFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      resolve(excelData);
    };
    reader.readAsBinaryString(file);
  });
}

// Функція для генерації майбутніх чисел
function generateFutureNumbers(data) {
  const allNumbers = data.flat();
  const uniqueNumbers = Array.from(new Set(allNumbers));
  const futureNumbers = [];

  while (futureNumbers.length < 25) {
    // Вибираємо випадкове число з унікальних чисел
    const randomIndex = Math.floor(Math.random() * uniqueNumbers.length);
    const selectedNumber = uniqueNumbers[randomIndex];

    // Перевіряємо, чи число не входить у майбутні числа або унікальні числа
    if (!futureNumbers.includes(selectedNumber)) {
      futureNumbers.push(selectedNumber);
    }

    // Видаляємо обране число зі списку унікальних чисел, щоб уникнути повторень
    uniqueNumbers.splice(randomIndex, 1);
  }

  return futureNumbers;
}

// Функція для обробки події натискання на кнопку "Генерувати майбутні числа"
function handleGenerateButton() {
  const input = document.getElementById("excelFile");
  const file = input.files[0];

  if (file) {
    readExcelFile(file)
      .then((data) => {
        const futureNumbers = generateFutureNumbers(data);
        displayFutureNumbers(futureNumbers);
      })
      .catch((error) => {
        console.error("Помилка при обробці файлу Excel:", error);
      });
  } else {
    console.error("Файл не був обраний.");
  }
}

// Функція для відображення майбутніх чисел
function displayFutureNumbers(numbers) {
  const futureNumbersDiv = document.getElementById("futureNumbers");
  futureNumbersDiv.innerHTML = numbers.join(", ");
}

// Обробник події натискання на кнопку "Генерувати майбутні числа"
document
  .getElementById("generateButton")
  .addEventListener("click", handleGenerateButton);
