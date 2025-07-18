const isbnInput = document.getElementById("isbn");
isbnInput.addEventListener("input", function () {
  let value = isbnInput.value.toUpperCase().replace(/[^0-9X]/g, "");
  if (value.length <= 10) {
    value = value
      .replace(/^(\d{2})(\d)/, "$1-$2")
      .replace(/^(\d{2}-\d{3})(\d)/, "$1-$2")
      .replace(/^(\d{2}-\d{3}-\d{4})([\dX])/, "$1-$2");
  } else {
    value = value
      .replace(/^(\d{3})(\d)/, "$1-$2")
      .replace(/^(\d{3}-\d{2})(\d)/, "$1-$2")
      .replace(/^(\d{3}-\d{2}-\d{3})(\d)/, "$1-$2")
      .replace(/^(\d{3}-\d{2}-\d{3}-\d{4})(\d)/, "$1-$2");
  }
  isbnInput.value = value;
});
