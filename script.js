const typographer = () => {
  const input = document.getElementById('input');
  const typographyButton = document.getElementById('typographyButton');
  const output = document.getElementById('output');
  output.setAttribute('readonly', 'readonly');

  // Создаем регулярные выражения для замены
  // /((?!(?:\w))\s(?:в|без|до|для|за|через|над|по|
  // из|у|около|под|о|про|на|к|перед|при|с|между))\s/gi;
  // .replace(reg1, '$1&nbsp;');

  const reg1 = new RegExp(`(\\S\\s+|^)(в|во|без|до|для|за|через|над|по|из|у|
    около|под|о|про|на|к|перед|при|с|между|и|а)(\\s)`, 'gi');
  const reg2 = new RegExp('©\\s', 'g');
  const reg3 = new RegExp('[№#]', 'g');
  const reg4 = new RegExp('\\s?—\\s?', 'g');
  const reg5 = new RegExp('«|"\\B', 'g');
  const reg6 = new RegExp('»|\\b"', 'g');

  // Проверяем ввод пользователя на наличие латиницы
  input.addEventListener('input', () => {
    if (/[a-zA-Z]+/.test(input.value)) {
      input.value = input.value.replace(/[a-zA-Z]+/g, '');
      input.setCustomValidity('Латиница не поддерживается!');
    } else {
      input.setCustomValidity('');
    }
  });

  // Обработчик клика по кнопке типографирования
  typographyButton.addEventListener('click', () => {
    let transformedText = input.value;

    // Заменяем соответствующие символы и последовательности
    transformedText = transformedText.replace(reg1, '$1$2&nbsp;');
    transformedText = transformedText.replace(reg2, '&copy;&nbsp;');
    transformedText = transformedText.replace(reg3, '№');
    transformedText = transformedText.replace(reg4, '—');
    transformedText = transformedText.replace(reg5, '&laquo;');
    transformedText = transformedText.replace(reg6, '&raquo;');

    // Выводим результат в элемент output
    output.textContent = transformedText;
  });

  // Кнопка скопировать
  const copyButton = document.getElementById('copyButton');
  const copyButtonText = document.getElementById('copyButton__text');
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(output.textContent);
      copyButtonText.textContent = 'Скопировано!';
      setTimeout(() => {
        copyButtonText.textContent = 'Копировать';
      }, 2000);
    } catch (error) {
      console.error('Ошибка при копировании текста:', error);
    }
  });
};

// Вызываем функцию typographer при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  typographer();
  console.info('### Правила:', `
    > 1. После предлогов ставится неразрывной пробел &nbsp;
    > (в, без, до, для, за, через, над, по, из, у, около, под,
    > о, про, на, к, перед, при, с, между)
    > 2. Заменятеся © знак охраны авторского права (copyright) на &copy;&nbsp;
    > 3. Знаки # и № номера заменются на №
    > 4. Если вокруг тире пробелы то заменятся на — 
    > Не важно длинное тире или короткое
    > 5. Если встречается текст в кавычках, то кавычки заменяются на ёлочки
    > « &laquo; левая кавычка (левая елочка)
    > » &raquo; правая кавычка (правая елочка)`);
});
