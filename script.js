// MINHA LISTA
function carregarMinhaLista() {
  try {
    return JSON.parse(localStorage.getItem("minhaLista")) || [];
  } catch (erro) {
    return [];
  }
}

function salvarMinhaLista(lista) {
  localStorage.setItem("minhaLista", JSON.stringify(lista));
}

function atualizarBotoesMinhaLista() {
  const lista = carregarMinhaLista();
  const botoes = document.querySelectorAll(".botao-lista");

  botoes.forEach((botao) => {
    const filme = botao.dataset.filme;

    if (lista.includes(filme)) {
      botao.textContent = "✓ Na Minha Lista";
      botao.classList.add("adicionado");
    } else {
      botao.textContent = "+ Minha Lista";
      botao.classList.remove("adicionado");
    }
  });
}

function configurarMinhaLista() {
  const botoes = document.querySelectorAll(".botao-lista");

  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      const filme = botao.dataset.filme;
      let lista = carregarMinhaLista();

      if (lista.includes(filme)) {
        lista = lista.filter((item) => item !== filme);
      } else {
        lista.push(filme);
      }

      salvarMinhaLista(lista);
      atualizarBotoesMinhaLista();
    });
  });

  atualizarBotoesMinhaLista();
}


// PESQUISA DO CATÁLOGO
function configurarPesquisa() {
  const campoBusca = document.getElementById("campo-busca");
  const cards = document.querySelectorAll(".card-filme");
  const mensagemVazia = document.getElementById("mensagem-vazia");

  if (!campoBusca) {
    return;
  }

  campoBusca.addEventListener("input", () => {
    const pesquisa = campoBusca.value
      .toLowerCase()
      .trim();

    let encontrados = 0;

    cards.forEach((card) => {
      const titulo = card.dataset.titulo || "";
      const nome = card.querySelector(".titulo-filme")?.textContent || "";

      const corresponde =
        titulo.includes(pesquisa) ||
        nome.toLowerCase().includes(pesquisa);

      card.hidden = !corresponde;

      if (corresponde) {
        encontrados++;
      }
    });

    if (mensagemVazia) {
      mensagemVazia.hidden = encontrados !== 0;
    }
  });
}


// ENVIO PELO WHATSAPP
function enviarWhatsApp() {
  const campoNome = document.getElementById("nome");
  const campoPlano = document.getElementById("plano");
  const campoMensagem = document.getElementById("mensagem");

  if (!campoNome || !campoPlano || !campoMensagem) {
    return;
  }

  const nome = campoNome.value.trim();
  const plano = campoPlano.value;
  const mensagem = campoMensagem.value.trim();

  if (nome === "") {
    alert("Por favor, digite seu nome antes de enviar.");
    campoNome.focus();
    return;
  }

  const telefone = "5581989188011";

  const textoFinal =
    `Olá! Meu nome é ${nome}. ` +
    `Interesse: ${plano}. ` +
    `Mensagem: ${mensagem}`;

  const textoCodificado = encodeURIComponent(textoFinal);
  const urlWhatsApp =
    `https://wa.me/${telefone}?text=${textoCodificado}`;

  window.open(urlWhatsApp, "_blank");
}


// INICIALIZAÇÃO
document.addEventListener("DOMContentLoaded", () => {
  configurarMinhaLista();
  configurarPesquisa();
});