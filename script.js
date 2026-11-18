function avisoAssistir() {
  alert("Faça login ou assine o plano para assistir a este episódio!");
}

function enviarWhatsApp() {
  let nome = document.getElementById("nome").value;
  let plano = document.getElementById("plano").value;
  let mensagem = document.getElementById("mensagem").value;

  if (nome === "") {
    alert("Por favor, digite seu nome antes de enviar.");
    return;
  }

  let telefone = "5581989188011";

  let textoFinal = "Olá! Meu nome é " + nome + ". Interesse: " + plano + ". Mensagem: " + mensagem;

  let textoCodificado = encodeURIComponent(textoFinal);

  let urlWhatsApp = "https://wa.me/" + telefone + "?text=" + textoCodificado;

  window.open(urlWhatsApp, "_blank");
}
