/*
            <div class="container__informacoes">
                <img src="./img/trophy.png" alt="ícone de um troféu" />
                 <div class="container__texto">
                    <h1>Você <span class="container__texto-azul">acertou!</span></h1>
                    <h2>Você descobriu o número secreto!</h2>
*/

//  robointo + animação -> robo
//  robo question
//  user  correto
//  user erro

let seed=10;
let chances = 3;
let numeroSecreto = Math.floor(Math.random() * seed) + 1;
let palpite = "";

// Abertura
// "Bem Vindo ao secretNumber Bet, acerte o Número em unnh {numero_tentativas} tentativas, ou Bye bye Terra!"
// Escolha um número entre 1 e seed

// .innerHTML

// palpite == numeroSecreto
// "Você acertou ..., éh! urhhh"

// palpites -1, dica, escolha o numero
// palpites < 1 
// "Melhor sorte da proxima vez, hahhhahha!"
// Efeito cinematic distanciamento do foco , robo no canto da tela, last frase e
// double size, Terra explodindo feixes de luz, e all black screen