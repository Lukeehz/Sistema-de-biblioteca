const isBorrowedSelect = document.getElementById('isBorrowed');
  const borrowedByWrapper = document.getElementById('borrowedByWrapper');
  const borrowedByInput = document.getElementById('borrowedBy');

  function toggleBorrowedBy() {
    if (isBorrowedSelect.value === '1') {
      borrowedByWrapper.style.display = 'flex';
    } else {
      borrowedByWrapper.style.display = 'none';
      borrowedByInput.required = false; 
      borrowedByInput.value = '';
    }
  }

  isBorrowedSelect.addEventListener('change', toggleBorrowedBy);
  toggleBorrowedBy();

  const genresContainer = document.getElementById('genres-container');
  const addGenreBtn = document.getElementById('add-genre');

  addGenreBtn.addEventListener('click', () => {
    const selectedGenres = Array.from(document.querySelectorAll('.genre'))
      .map(select => select.value)
      .filter(v => v);

    const firstSelect = document.querySelector('.genre');
    const newSelectDiv = document.createElement('div');
    newSelectDiv.className = 'input-group flex-nowrap genre-select mt-2';

    const newSelect = document.createElement('select');
    newSelect.name = 'genres[]';
    newSelect.className = 'form-select genre';
    newSelect.required = true;

    const defaultOption = document.createElement('option');
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.value = '';
    defaultOption.textContent = 'Selecione um gênero';
    newSelect.appendChild(defaultOption);

    const options = Array.from(firstSelect.options).slice(1)
      .filter(option => !selectedGenres.includes(option.value));

    options.forEach(option => {
      const clone = option.cloneNode(true);
      newSelect.appendChild(clone);
    });

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'btn btn-outline-danger ms-2';
    removeBtn.textContent = 'Remover';

    removeBtn.addEventListener('click', () => {
      genresContainer.removeChild(newSelectDiv);
    });

    newSelectDiv.appendChild(newSelect);
    newSelectDiv.appendChild(removeBtn);
    genresContainer.appendChild(newSelectDiv);
  });