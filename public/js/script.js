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


// Função para mostrar/ocultar campo "Para quem emprestou"
function toggleBorrowedBy() {
  const isBorrowed = document.getElementById('isBorrowed').value;
  const borrowedByWrapper = document.getElementById('borrowedByWrapper');
  const borrowedByInput = document.getElementById('borrowedBy');
  
  if (isBorrowed === '1') {
    borrowedByWrapper.style.display = 'block';
    borrowedByInput.focus();
  } else {
    borrowedByWrapper.style.display = 'none';
    borrowedByInput.value = '';
  }
}

// Executar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
  toggleBorrowedBy();
});