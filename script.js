const jogador_atual = document.querySelector(".jogador_atual");

let selected;
let jogador = "X";
let positions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];


function init() {
  selected = [];

  jogador_atual.innerHTML = `JOGADOR DA VEZ: ${jogador}`;

  document.querySelectorAll(".game button").forEach((item) => {
    item.innerHTML = "";
    item.addEventListener("click", newMove);
  });
}

init();

function newMove(e) {
  const index = e.target.getAttribute("data-i");
  e.target.innerHTML = jogador;
  e.target.removeEventListener("click", newMove);
  selected[index] = jogador;

  setTimeout(() => {
    check();
  }, [100]);

  jogador = jogador === "X" ? "O" : "X";
  jogador_atual.innerHTML = `JOGADOR DA VEZ: ${jogador}`;
}

function check() {
  let jogadorLastMove = jogador === "X" ? "O" : "X";

  const items = selected
    .map((item, i) => [item, i])
    .filter((item) => item[0] === jogadorLastMove)
    .map((item) => item[1]);

  for (pos of positions) {
    if (pos.every((item) => items.includes(item))) {
      alert(Swal.fire({
        title: 'O JOGADOR "' + jogadorLastMove + '" GANHOU',
        width: 600,
        padding: '10em',
        color: '#716add',
        background: '#fff url(https://sweetalert2.github.io/images/nyan-cat.gif)center top no-repeat',
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `
      }));
      init();
      return;
    }
  }

  if (selected.filter((item) => item).length === 9) {
    alert(Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'DEU EMPATE!',
    })
    );
    
    init();
    return;
  }
}
