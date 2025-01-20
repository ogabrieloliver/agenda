let contato = [];

function adicionaContato() {
  const nome = document.getElementById("nome").value;
  const celular = document.getElementById("celular").value;

  if (nome === "" || celular === "") {
    alert("Preencha todos os campos 🙄");
    return;
  }

  // Recupera os contatos do localStorage
  let contatos = JSON.parse(localStorage.getItem("contatos")) || [];

  if (contatos.some((c) => c.celular === celular)) {
    alert("Esse telefone já existe");
    return;
  }

  contatos.push({ nome, celular });
  localStorage.setItem("contatos", JSON.stringify(contatos)); // Salva no localStorage
  mostrarContatos();
}

function removeContatos(celular) {
  let contatos = JSON.parse(localStorage.getItem("contatos")) || [];
  contatos = contatos.filter((c) => c.celular !== celular);
  localStorage.setItem("contatos", JSON.stringify(contatos));
  mostrarContatos();
}

function mostrarContatos(contatosFiltrados = []) {
  const listaDeContatos = document.getElementById("listaDeContato");
  listaDeContatos.innerHTML = "";

  (contatosFiltrados.length > 0 ? contatosFiltrados : JSON.parse(localStorage.getItem("contatos")) || []).forEach((contato) => {
    const elementoContato = document.createElement("div");
    elementoContato.className = "contato";

    const infoContato = document.createElement("p");
    infoContato.textContent = contato.nome + " - " + contato.celular;

    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Remover";
    botaoRemover.onclick = () => removeContatos(contato.celular);

    elementoContato.appendChild(infoContato);
    elementoContato.appendChild(botaoRemover);

    listaDeContatos.appendChild(elementoContato);
  });
}

function pesquisarContatos() {
  const termoDePesquisa = document.getElementById("procurar").value.toLowerCase();

  const contatosFiltrados = JSON.parse(localStorage.getItem("contatos"))?.filter(
    (contato) =>
      contato.nome.toLowerCase().includes(termoDePesquisa) ||
      contato.celular.includes(termoDePesquisa)
  );

  mostrarContatos(contatosFiltrados);
}

document
  .getElementById("procurarBtn")
  .addEventListener("click", pesquisarContatos);
