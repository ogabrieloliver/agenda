let contato = [];

function adicionaContato() {
  const nome = document.getElementById("nome").value;
  const celular = document.getElementById("celular").value;

  if (nome === "" || celular === "") {
    alert("Preencha todos os campos 🙄");
    return;
  }

  contato.push({ nome, celular });
  mostrarContatos();
}

function removeContatos(celular) {
  contato = contato.filter((c) => c.celular !== celular);
  mostrarContatos();
}

function mostrarContatos(contatosFiltrados = contato) {
  const listaDeContatos = document.getElementById("listaDeContato");
  listaDeContatos.innerHTML = "";

  contatosFiltrados.forEach((contato) => {
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

  const contatosFiltrados = contato.filter(
    (contato) =>
      contato.nome.toLowerCase().includes(termoDePesquisa) ||
      contato.celular.includes(termoDePesquisa)
  );

  mostrarContatos(contatosFiltrados);
}

document
  .getElementById("procurarBtn")
  .addEventListener("click", pesquisarContatos);


  /// altera funcao para verificar add repetido + alerta contato já existe
