
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