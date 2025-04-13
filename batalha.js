
let jogador = JSON.parse(localStorage.getItem("personagemSelecionado")) || {};
let inimigo = { nome: "Goblin", vida: 40, ataque: 8 };

function atualizarStatus() {
  const el = document.getElementById("personagem");
  el.innerHTML = `<h2>${jogador.nome}</h2>
    <p><strong>Classe:</strong> ${jogador.classe}</p>
    <p><strong>Nível:</strong> ${jogador.nivel}</p>
    <p><strong>XP:</strong> ${jogador.xp}</p>
    <p><strong>Vida:</strong> ${jogador.vida}</p>
    <p><strong>Ouro:</strong> ${jogador.ouro}</p>
    <p><strong>Fama:</strong> ${jogador.fama}</p>`;
}

function log(texto) {
  const logEl = document.getElementById("log");
  logEl.innerHTML += texto + "<br>";
  logEl.scrollTop = logEl.scrollHeight;
}

function atacarInimigo() {
  let dano = jogador.ataque + Math.floor(Math.random() * 6);
  inimigo.vida -= dano;
  jogador.vida -= Math.max(0, inimigo.ataque - Math.floor(jogador.defesa / 2));
  log(`Você causou ${dano} de dano ao ${inimigo.nome}.`);

  if (inimigo.vida <= 0) {
    log(`Você derrotou o ${inimigo.nome}! +30 XP +10 ouro`);
    jogador.xp += 30;
    jogador.ouro += 10;
    inimigo.vida = 40;
    evoluirClasse();
  }

  localStorage.setItem("personagemSelecionado", JSON.stringify(jogador));
  atualizarStatus();
}

function evoluirClasse() {
  let niv = jogador.nivel;
  if (jogador.xp >= niv * 100) {
    jogador.nivel++;
    jogador.vida += 30;
    jogador.ataque += 5;
    jogador.defesa += 3;
    jogador.xp = 0;
    log(`<b>Você subiu para o nível ${jogador.nivel}!</b>`);
  }

  let cls = jogador.classe;
  let lvl = jogador.nivel;

  if (cls === "Juvenil" && lvl >= 10) jogador.classe = "Classe C";
  else if (cls === "Classe C" && lvl >= 30) jogador.classe = "Classe B";
  else if (cls === "Classe B" && lvl >= 60) jogador.classe = "Classe A";
  else if (cls === "Classe A" && lvl >= 100) jogador.classe = "Classe S";
  else if (cls === "Classe S" && lvl >= 150) jogador.classe = "Classe SS";
  else if (cls === "Classe SS" && lvl >= 200) jogador.classe = "Classe Nacional";
}

function realizarMissao() {
  let recompensa = 20 + Math.floor(Math.random() * 20);
  jogador.ouro += recompensa;
  jogador.fama += 5;
  log(`Missão realizada! +${recompensa} ouro, +5 fama.`);
  localStorage.setItem("personagemSelecionado", JSON.stringify(jogador));
  atualizarStatus();
}

function acessarLoja() {
  alert("Loja: Em breve você poderá comprar armaduras, pets e habilidades!");
}

window.onload = atualizarStatus;
