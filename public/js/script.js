document.addEventListener("DOMContentLoaded", () => {
  const isBorrowedSelect = document.getElementById("isBorrowed");
  const adressField = document.querySelector('input#adress').closest(".mb-3");

  function toggleAdressField() {
    if (isBorrowedSelect.value === "0") {
      adressField.style.display = "block";
    } else {
      adressField.style.display = "none";
    }
  }

  // Executa no carregamento da página
  toggleAdressField();

  // Adiciona evento para mudança do select
  isBorrowedSelect.addEventListener("change", toggleAdressField);
});

