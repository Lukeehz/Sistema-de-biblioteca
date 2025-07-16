 const searchInput = document.getElementById("searchInput");
  const livrosContainer = document.querySelector(".row.g-4");

  let debounce;

  searchInput.addEventListener("input", () => {
    clearTimeout(debounce);

    debounce = setTimeout(() => {
      const termo = searchInput.value.trim();

      fetch(`/?q=${encodeURIComponent(termo)}`, {
        headers: {
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.length) {
            livrosContainer.innerHTML = `<div class="text-center text-muted">Nenhum livro encontrado.</div>`;
            return;
          }

          const cards = data.map(livro => `
            <div class="col-md-4">
              <div class="card h-100 shadow-sm">
                <img src="${livro.image}" class="card-img-top" alt="${livro.name}" style="object-fit: cover; height: 250px;">
                <div class="card-body">
                  <h6 class="text-muted mb-2">
                    <span class="badge bg-secondary">ID: ${livro.id}</span>
                  </h6>
                  <h5 class="card-title">${livro.name}</h5>
                  <p class="card-text"><strong>Autor:</strong> ${livro.author}</p>
                  <p class="card-text"><strong>Gênero:</strong> ${livro.genre.replace(/[\[\]"]+/g, '')}</p>
                  <p class="card-text"><strong>Avaliação:</strong> ${livro.rating}</p>
                  <p class="card-text"><strong>Formato:</strong> ${livro.format}</p>
                  ${
                    !livro.isBorrowed && livro.adress
                      ? `<p class="card-text"><strong>📍 Endereço:</strong> ${livro.adress}</p>`
                      : ""
                  }
                  <p class="card-text"><strong>Status:</strong> ${
                    livro.isBorrowed
                      ? `Emprestado para ${livro.borrowedBy}`
                      : "Disponível"
                  }</p>
                </div>
              </div>
            </div>
          `).join("");

          livrosContainer.innerHTML = cards;
        });
    }, 300);
  });