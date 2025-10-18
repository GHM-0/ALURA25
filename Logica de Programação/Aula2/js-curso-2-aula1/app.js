/* Melhorias de Design, re orientadas por IA Deepseek */

/* Complexidade é Burrice ! */

// Que saudade do hoisting
function sair() { }
function jogar() { }
function destruirTerra() { }
function jogarNumeroSecreto() { }
function chutar() { }

// Variáveis do Jogo
// Intervalo
let seed = 10;
let limiteInferior = 1;
// TODO segregar e aglutinar funções, mover logica da exibição para marcadores HTML e operadores js
let chances = 3;
let palpite = '';
let numeroSecreto = '';

// // txtSecundario Apenas em JogarNumeroSecreto
// let dica = `Um número entre ${limiteInferior} e ${seed}`;


/* TODO - HUMOR DO ROBO   normal, raiva,feliz e tilt   funções()                        */
/* Dica da IA, Objetos Literal Para Controle De Estados Centralizado */
/* Configurações dos Cenários, Baseadas no Roteiro */
const CENAS = {
    none: {                   // Estado Inicial pre-interação do Jogador com a Página
        quadro:{visivel:true},
        lua:{visivel:true, deriva:false },
        terra:{visivel:false,destruida:false },
        textos: {
            principal: { visivel: false, conteudo: '' },
            secundario: {visivel: true, conteudo: 'Click para Começar!' }
        },
        robo: {
            visivel: false,
            humor: false
        },
        opcoes: {
            botoes: [
                { texto: 'Jogar', funcao: null, visivel: false, hoverAudio: false },
                { texto: 'Sair', funcao: null, visivel: false, hoverAudio: false }
            ],
            hoverAudio: false
        },
        interacao: false,
        audio: false
    },
    /* Como o Audio de Abertura é Grande, possivelmente estende-lo da pre-abertura*/
    preAbertura: {          
        quadro:{visivel:true},
        lua:{visivel:true, deriva:false },
        terra: { visivel: false, destruida: false },
        textos: {
            principal: { visivel: true, conteudo: 'Bem vindo ao NumeroSecretoBet!' },
            secundario: { visivel: false, conteudo: '' }
        },
        robo: { visivel: true, humor: 'normal' },
        opcoes: {
            botoes: [
                { texto: 'Jogar', funcao: jogar, visivel: true, hoverAudio: false },
                { texto: 'Sair', funcao: sair, visivel: true, hoverAudio: false }
            ],
            audio: false
        },
        interacao: false,
        audio:'Abertura'
    },

    Abertura: {
        quadro:{visivel:true},
        lua:{visivel:true, deriva:false }, 
        terra: { visivel: true, destruida: false },
        textos: {
            principal: { visivel: true, conteudo: 'Acerte o Número Secreto ' },
            secundario: {
                visivel: true,
                conteudo: `Em <span class="chances unnh" data-num="${chances}"></span> tentativas ou bye bye Terra!`
            }
        },
        robo: { visivel: true, humor: 'pensativo' }, /* Transição composta por mudanças de humor -> normal */
        opcoes: {
            botoes: [
                { texto: 'JOGAR', funcao: jogarNumeroSecreto, visivel: true, hoverAudio: false },
                { texto: 'DESTRUIR', funcao: destruirTerra, visivel: true, hoverAudio: true, perigoso: true }
            ],
            audio: 'Tensao'
        },
        interacao: false,
        audio:'Abertura'        // Se já estiver tocando continue, senão toque "Jogar novamente"
    },

    Jogo: {
        quadro:{visivel:true},
        lua:{visivel:true, deriva:false },    
        terra: { visivel: true, destruida: false },
        textos: {
            principal: { visivel: true, conteudo: `Acerte o Número Secreto` },
            secundario: { visivel: true, conteudo: `entre ${limiteInferior} e ${seed}` }
        },
        robo: { visivel: true, humor: 'normal' },
        opcoes: {
            botoes: [
                { texto: 'Chutar', funcao: chutar, visivel: true, hoverAudio: true },
                { texto: 'DESTRUIR', funcao: destruirTerra, visivel: true, hoverAudio: true, perigoso: true }
            ],
            audio: 'Tensao'
        },
        interacao: true,
        audio:'Jogo'
    },

    FinalBom: {
        quadro:{visivel:true},
        lua:{visivel:true, deriva:false },
        terra: { visivel: true, destruida: false },
        textos: {
            principal: { visivel: true, conteudo: 'Parabéns, Você é o Grande Vencedor!' },
            secundario: { visivel: false, conteudo: '' }
        },
        robo: { visivel: true, humor: 'Raivoso' }, /* Transição de Raiva para Normal*/
        opcoes: {
            botoes: [
                { texto: 'Jogar', funcao: jogarNumeroSecreto, visivel: true, hoverAudio: false },
                { texto: 'Sair', funcao: sair, visivel: true, hoverAudio: false }
            ],
            audio: false
        },
        interacao: false,
        audio:'FF'
    },

    /* Programar Humor, divertido e Sarcástico  */
    Intermediario: {
        quadro:{visivel:true},
        lua:{visivel:true, deriva:false },
        terra: { visivel: true, destruida: false },
        textos: {
            principal: { visivel: true, conteudo: 'Pena ...' },
            secundario: {
                visivel: true,
                conteudo: 'Frase De Humor acido Aleatória'
            }
        },
        robo: { visivel: true, humor: 'normal' },
        opcoes: {
            botoes: [
                { texto: '', funcao: null, visivel: false, hoverAudio: false },
                { texto: '', funcao: null, visivel: false, hoverAudio: false }
            ],
            audio: false
        },
        interacao: false,
        audio:'Jogo'
    },

    FinalRuim: {
        quadro:{visivel:true},
        lua:{visivel:true, deriva:false },
        terra: { visivel: false, destruida: true },
        textos: {
            principal: { visivel: true, conteudo: 'Melhor sorte da próxima vez!' },
            secundario: {
                visivel: true,
                conteudo: 'A Terra foi reduzida a escombros...'  /* Podem ser Substituída por Frase Aleatória*/
            }
        },
        robo: { visivel: true, humor: 'normal' },
        opcoes: {
            botoes: [
                { texto: 'Jogar', funcao: jogarNumeroSecreto, visivel: true, hoverAudio: false },
                { texto: 'Sair', funcao: sair, visivel: true, hoverAudio: false }
            ],
            audio: false
        },
        interacao: false,
        audio:'FR'
    }
};

/* Biblioteca de Audios */
const AUDIO = {
    false:{
        file:'',
        loop:false,
        trilha:false,
        volume: 0.0
    },
    /* Tema de Imersão */
    Abertura: {
        file: './sound/abertura.mp3',
        loop: false,                 
        trilha: true,
        volume: 0.4
    },
    /* Tema Principal */
    Jogo: {
        file: './sound/playSound.mp3',
        loop: true,
        trilha: true,
        volume: 0.4
    },
    /* Evento de Point ou edição de Input durante Jogo Apenas */
    Tensao: {
        file: './sound/mouseOver.mp3',
        loop: false,
        trilha: false,                              
        volume: 0.5
    },
    /* Evento Único, que leva ao Final Ruim */
    Destruicao: {                                   
        file: './sound/FK.mp3',
        loop: false,                               
        trilha: false,                            
        volume: 0.5
    },
    /*                                             
    Deriva:{

    },
    */
    /* Todos Os finais fade vindo do Jogo*/
    FF: {
        file: './sound/finalFeliz.mp3',
        loop: false,
        trilha: true,
        volume: 0.6
    },
    FR: {
        file: './sound/ending.mp3',
        loop: false,
        trilha: true,
        volume: 0.6
    }
};



/* Variáveis Globais */    // Colocar em Um Objeto seria adicionar predicados x.Y.z.atributo  
/* Elementos de Composição Da Tela */
const txtPrincipal = document.querySelector('h1');
const txtSecundario = document.querySelector('.texto__paragrafo');
const input = document.querySelector('.container__input');
const terra = document.querySelector('.terra');

const robo = document.querySelector('.robo');
const botaoPrimario = document.querySelector('#jogar');
const botaoSecudario = document.querySelector('#sair');

/* EsterEggs */
const lua = document.querySelector('.lua');

/* Não Usado */
const quadro = document.querySelector('.container');   // TODO - Desaparece Gradualmente para o Cut Cene, de encerramento no FinalBom;


/* Conferir através criação de um objeto igual a CENA */
const CONFIG = {
    debugMode: true,
    // txtPrincipal:document.querySelector('h1'),
    // txtSecundario:document.querySelector('.texto__paragrafo'),
    // input:document.querySelector('.container__input'),
    // terra:document.querySelector('.terra'),
    // robo:document.querySelector('.robo'),
    // botaoPrimario:document.querySelector('#jogar'),
    // botaoSecudario:document.querySelector('#sair'),
    // lua:document.querySelector('.lua'),
    // quadro:document.querySelector('.container')
}

/*------------------- TODO Apurado de Som ----------------------------*/

// Sons insidentais devem manter-se sobre as trilhas, Tocam uma unica vez acima do som da trilha
// as trilhas devem encerrar a trilha anterior se foram diferentes, tocam em loop se não houver interação do jogador
// ou continuarem sem alteração se forem iguais 


/* Tema Sonoro */
const globalVolume = 0.4;

/* Orquestrador de Sons */
// let trilhaAtual = null;      

// provisorio
function playSound(audioFile, loop = false, volume) {


  audioFile.volume = volume;
  audioFile.loop = loop;



  audioFile.play().catch(error => {
    console.error('Erro ao reproduzir áudio:', error);
  });
}


/*-------------------------------------------------------------------------------------------*/


/* Controle de Interação, Inicial */
// GPT hint para inciar o tema de audio e animações

/**
 * Executa uma ação (ex: iniciar áudio, animações etc.)
 * assim que o Jogador interagir com a página pela primeira vez.
 *
 * @param {Function} callback - Função a executar quando ocorrer a primeira interação
 */
function onFirstUserInteraction(callback) {
    const eventos = ['click', 'keydown', 'touchstart'];

    function handleInteraction() {
        // Remove todos os listeners — queremos só a primeira vez
        eventos.forEach(ev => document.removeEventListener(ev, handleInteraction));

        console.log("FirstInteraction: TRUE");

        // Chama o callback definido
        callback();
    }

    console.log("FirstInteraction: FALSE");
    // Adiciona listeners em nível global
    eventos.forEach(ev => document.addEventListener(ev, handleInteraction, { once: true }));
}
/*--------------------------------------------------------------- */


/* Montadores dos Elementos de Cena */

/* Montador de Botoes */
function mostrarBotoes(opcoes) {

    const botoes = [botaoPrimario, botaoSecudario];

    opcoes.botoes.forEach((botaoConfig, index) => {
        if (index < botoes.length) {
            const botao = botoes[index];
            const visivel = botaoConfig.visivel;                      /* style.visibility */
            const texto = botaoConfig.texto;
            const funcao = botaoConfig.funcao;
            const perigoso = botaoConfig.perigoso || false;           // default false
            const hoverAudio = botaoConfig.hoverAudio;
            const audio = opcoes.audio;

            if (CONFIG.debugMode)
                console.log(`Botão ${index + 1}:`, { visivel, texto, funcao, perigoso, hoverAudio, audio });

            // Agora passe para configuraBotao
            configuraBotao(botao, visivel, texto, funcao, perigoso, hoverAudio, audio);
        }
    });
}

function configuraBotao(botao, visivel, texto, funcao, perigo = false, hoverAudio = false, audio) {
    botao.textContent = texto;
    botao.onclick = funcao;

    if (perigo) {
        botao.classList.add('perigo');
    } else {
        botao.classList.remove('perigo');   /* Os Botões são reutilizados */
    }

    if (hoverAudio) {                       /*  Palysond(Tensao)  */
        //botao.onmouseenter = () => playSound(AUDIO[audio]);
        botao.onmouseenter = () => playSound(audio);
        console.log('SOM Tocando');
    } else {
        botao.onmouseenter = null;
    }

    if (!visivel) {
        botao.style.visibility = 'hidden';
    } else {
        botao.style.visibility = 'visible';
    }

    if (CONFIG.debugMode)
        console.log(`Configurado Botão ${botao}= visivel:${visivel}, perigo:${perigo}, hoverAudio:${hoverAudio} audio:${audio}`);
}

/*  Montador de Textos */
function mostrarTexto(configTexto, elemento) {

    elemento.style.visibility = configTexto.visivel ? 'visible' : 'hidden';
    elemento.innerHTML = configTexto.conteudo;

    if (CONFIG.debugMode) {
        console.log(`Texto:${elemento}='${configTexto.conteudo}', visivel:${configTexto.visivel}`);
    }
}

/* Mostrar Terra */
function mostrarTerra(estado) {
    // TODO destruida, modifica a imagem para asteroids orbitando onde havia terra

    terra.classList.remove('orbita', 'flash');
    if (estado.visivel) {
        terra.style.display = 'block';
        terra.style.visibility = 'visible';
        terra.classList.add('orbita');
    } else {
        terra.style.visibility = 'hidden';
        terra.style.display = 'none';
    }

    if (CONFIG.debugMode)
        console.log(`Terra = visivel:${estado.visivel}, destruida:${estado.destruida}`);
}

/* Mostrar Campo de Input*/
function mostrarInputJogador(estado) {

    if (estado) {
        input.style.visibility = 'visible';
    } else {
        input.style.visibility = 'hidden';
    }
    setInput();
    if (CONFIG.debugMode)
        console.log(`INPUT = ${estado}`);
}

/* Mostrar Robo e Controlar o Humor base */
function mostrarRobo(estado) {
    if (estado.visivel) {
        robo.style.visibility = 'visible';
    } else {
        robo.style.visibility = 'hidden';
    }

    robo.classList.remove('normal', 'feliz', 'raiva', 'tilte');

    if (estado.humor && estado.humor !== 'false') {
        robo.classList.add(estado.humor);
    }

    if (CONFIG.debugMode)
        console.log(`Robo = visivel:${estado.visivel}, humor:${estado.humor}`);
}

/*------------------------Animações---------------------------*/

// Função Genérica para Transição eficiente de Efeitos
function getPosicao(elemento) {
    const rect = elemento.getBoundingClientRect();

    // Calcula o ponto CENTRAL em porcentagem da tela
    const centroX = rect.left + rect.width / 2;
    const centroY = rect.top + rect.height / 2;

    // Converte para porcentagem da tela inteira
    const leftPerc = (centroX / window.innerWidth) * 100;
    const topPerc = (centroY / window.innerHeight) * 100;

    // Pega a ROTAÇÃO e ESCALA atuais da animação CSS
    const estiloComputado = window.getComputedStyle(elemento);
    const transformacao = estiloComputado.transform;

    let rotacao = 0;
    let escala = 1;

    // Se houver transformação CSS aplicada (rotação, escala, etc.)
    if (transformacao && transformacao !== 'none') {
        // Converte a transformação CSS em números que podemos usar
        const matriz = new DOMMatrix(transformacao);

        // Calcula a ROTAÇÃO atual em graus
        rotacao = Math.atan2(matriz.b, matriz.a) * (180 / Math.PI);

        // Calcula a ESCALA atual
        const escalaX = Math.sqrt(matriz.a * matriz.a + matriz.b * matriz.b);
        const escalaY = Math.sqrt(matriz.c * matriz.c + matriz.d * matriz.d);
        escala = (escalaX + escalaY) / 2;
    }


    if (CONFIG.debugMode)
        // console.log('Animação: Destruíção da Terra ');
        console.log(
            `GETPOSICAO = ${elemento.tagName}  
            Centro: ${leftPerc.toFixed(2)}% x ${topPerc.toFixed(2)}%, 
            Rotação: ${rotacao.toFixed(2)}°, Escala: ${escala.toFixed(2)},
            Classes: ${elemento.className},
            Visível: '${elemento.style.visibility}',
            Display: '${elemento.style.display}'`);

    return {
        leftPerc,
        topPerc,
        rotacao,
        escala,
        transformacao
    };
}

// Animação Destruíção da Tela, e Lua a Deriva */

function destruirTerra() {
    // Repensar a logica, para animação 2.0 mais rebuscada

    const flashTime = 5000;        //ms
    const delayLua = 100 + flashTime;
    const orfaTime = 1000;


    const posicaoTerra = getPosicao(terra);
    // Aplica destruição na Terra
    terra.classList.remove('orbita');
    terra.style.setProperty('--pos-left', `${posicaoTerra.leftPerc}%`);
    terra.style.setProperty('--pos-top', `${posicaoTerra.topPerc}%`);
    terra.style.setProperty('--current-rotation', `${posicaoTerra.rotacao}deg`);
    terra.style.setProperty('--current-scale', posicaoTerra.escala);

    terra.style.setProperty('--actionTime', `${flashTime}ms`);
    terra.classList.add('flash');


    //TODO DEVE Espera a Terra estar em posição fortuita para a destruíção

    if (CONFIG.debugMode)
        // console.log('Animação: Destruíção da Terra ');
        console.log(
            `ANIMAÇÃO: Destruíção da Terra - 
            Centro: ${posicaoTerra.leftPerc.toFixed(2)}% x ${posicaoTerra.topPerc.toFixed(2)}%, 
            Rotação: ${posicaoTerra.rotacao.toFixed(2)}°, Escala: ${posicaoTerra.escala.toFixed(2)},
            Classes: ${terra.className},
            Visível: '${terra.style.visibility}',
            Display: '${terra.style.display}'`
        );



    setTimeout(() => {
        const posicaoLua = getPosicao(lua);

        // Aplicão pos na lua
        lua.classList.remove('orbita');
        lua.style.setProperty('--pos-left', `${posicaoLua.leftPerc}%`);
        lua.style.setProperty('--pos-top', `${posicaoLua.topPerc}%`);
        lua.style.setProperty('--current-rotation', `${posicaoLua.rotacao}deg`);
        lua.style.setProperty('--current-scale', posicaoLua.escala);

        lua.style.setProperty('--actionTime', `${orfaTime}ms`)
        lua.classList.add('pos');


        if (CONFIG.debugMode)
            // console.log('Animação: Destruíção da Terra ');
            console.log(
                ` ANIMÇÃO: Lua a Deriva - 
            Centro: ${posicaoLua.leftPerc.toFixed(2)}% x ${posicaoLua.topPerc.toFixed(2)}%, 
            Rotação: ${posicaoLua.rotacao.toFixed(2)}°, Escala: ${posicaoLua.escala.toFixed(2)},
            Classes: ${lua.className},
            Visível: '${lua.style.visibility}',
            Display: '${lua.style.display}'`);

    }, delayLua);

    // Toca o som da explosão
   // playSound(AUDIO.Destruicao, globalVolume);
      playSound(new Audio(AUDIO['Destruicao'].file), loop = false, globalVolume);

    setTimeout(() => {
        montarCena(CENAS.FinalRuim);
    }, flashTime);
}

/* Predifir estados de transição */
function animarRobo() { }

/* Sincronizar homor do robo com as cenas */

/* Funções de Fluxo de Jogo */
function sair() {
    if (CONFIG.debugMode)
        console.log('Click em SAIR');
    window.location.reload();
}

/* O Jogo em Si */
/* Mover para configuração */
// Mecânica
function gerarNumeroSecreto(seed = 10, limiteInferior = 1) {
    return Math.floor(Math.random() * seed) + limiteInferior;
}

function nemeroChaces(numero = 3) {
    chances = numero;
}

// Interação com JOGADOR
function setInput() {
    input.setAttribute('min', String(limiteInferior));
    input.setAttribute('max', String(seed));
    limparInput();
}

function limparInput() {
    input.value = '';
}

/* Qualquer Texto em Tela */
function criarTexto(conteudo, seletor) {
    if (CONFIG.debugMode) {
        console.log(`TEXTO= ${seletor}: ${conteudo}`);
    }

    // Mover par configuração Global
    const elementos = {
        'principal': txtPrincipal,
        'secundario': txtSecundario
    };

    const elemento = elementos[seletor];
    if (!elemento) {
        console.error(`TEXTOERROR Seletor de CAMPO Inválido: ${seletor}`);
        return;
    }

    mostrarTexto({ visivel: true, conteudo: conteudo }, elemento);
}

/* Pegar Input Do Jogador */
function chutar() {
    palpite = Number(input.value.trim());
    input.value = '';
    verificar(palpite);
}
/* Dica par o Jogo */
function darDica(diferenca) {
    if (diferenca >= 0) {
        dica = `O número secreto é MAIOR! que ${palpite}`;
    } else {
        dica = `O número secreto é MENOR! que ${palpite}`;
    }

    if (CONFIG.debugMode) {
        console.log(
            `Dica = ${dica}`
        );
    }
    if (CONFIG.debugMode) {
        console.log(`
        DICA PARA = ${diferenca},  ${dica}
    `);

    }
    criarTexto(dica, 'secundario');
}

/* Verificar Plapite */
function verificar(palpite = 0) {
    chances--;

    if (CONFIG.debugMode) {
        console.log(`
        Chances+:, ${chances});
        Palpite:, ${palpite}, Tipo:, ${typeof palpite});
        NúmeroSecreto:, ${numeroSecreto}, Tipo:, ${typeof numeroSecreto}`
        );
    }

    if (palpite === numeroSecreto) {
        console.log(`O Jogador Acertou! o Numero Secreto ${numeroSecreto} em Palpites ${chances}`);
        finalBom();
    } else {
        // Ações de resultado
        if (chances == 0) {
            destruirTerra();
        } else {
            console.log(`O Jogador Errou! e tem ${chances} chances!`);
        }

        // Dar dica
        darDica(numeroSecreto - palpite);
    }
}

function jogar() {
    //   // Qualquer input -> Toca UMA vez o tema de 2001 uma Odisseia no Espaço   
    //   console.log('Jogar -> Sequestrando Terra');
    //   // nomeJogo.style.height='';

    //   // Não há input
    //   input.style.visibility = 'hidden';


    //   mostrarTerra(true);
    //   // textoNoQuadro.innerHTML = `Bem Vindo ao secretNumber Bet <br>
    //   // Acerte o Número em <span class="unnh chances" data-num="${chances}"></span> tentativas <br>
    //   // Ou Bye bye Terra!`;
    //   mostrarQuestao(`Acerte o Número em <span class="unnh chances" data-num="${chances}"></span> tentativas <br> Ou Bye bye Terra!`);

    //   console.log(" Botões Configurados -> Sem Escolha");
    //   ConfigurarBotao('#jogar', 'Jogar', jogarNumeroSecreto);
    //   ConfigurarBotao('#sair', 'DESTRUIR!', destruirTerra);      //jogarNumeroSecreto
    //   document.querySelector('#sair').style.backgroundColor = "red";

    // Vazer a Circunvenção Desta Limitação
    montarCena(CENAS.Abertura);
}

/* Jogo Do Numero Secreto */
function jogarNumeroSecreto() {
    let dica = `Um número entre ${limiteInferior} e ${seed}`;
    //   console.log('Jogando NumeroSecreto');
    //   numeroSecreto = gerarNumeroSecreto();
    //   console.log(`NS= ${numeroSecreto}, CH= ${chances}, PPT=${palpite}`);

    //   mostrarNomeJogo(`Acerte o Número <br> entre ${limiteInferior} e ${seed}`);
    //   mostrarQuestao(dica);
    //   input.style.visibility = 'visible';

    //   ConfigurarBotao('#jogar', 'Chutar', chutar)
    //   ConfigurarBotao('#sair', 'Bye bye Terra!', sair)

    // Jogar novamente Não esta resetando os estados
    numeroSecreto = gerarNumeroSecreto(seed, limiteInferior);


    montarCena(CENAS.Jogo);
}

/* Finais */
function finalRuim() {
    //   // Fazer Transição suave
    //   //mostrarQuestao("Pena, hum");
    //   nomeJogo.style.display = 'none';
    //   mostrarQuestao('Melhor Sorte da Próxima Vez !!!! ');

    //   ConfigurarBotao('#jogar', 'Sair', sair);
    //   document.querySelector('#sair').style.visibility = 'hidden';
    //   mostrarUserInput(false);

    montarCena(CENAS.FinalRuim);
}

function finalBom() {
    //   mostrarNomeJogo('Parabéns, Você é o Grande Vencedor!');

    //   if (chances < 2) {
    //     frase = `Em apenas ${3 - chances} palpites`
    //   } else {
    //     frase = `Em apenas ${3 - chances} palpite`
    //   }

    //   mostrarQuestao(frase);


    //   ConfigurarBotao('#jogar', 'Sair', sair);
    //   ConfigurarBotao('#sair', 'Jogar', jogarNumeroSecreto);
    //   document.querySelector('#sair').style.backgroundColor = "";
    //   mostrarUserInput(false);
    montarCena(CENAS.FinalBom);
}


function montarCena(CENA) {

    /*Utiliza subfunções secundárias */
    /* Textos no Quadro*/
   // playSound(CENA.audio);            // Não Esta Funcionando

    // playSound(new Audio(AUDIO[CENA.audio].file), loop = false, globalVolume);

    mostrarTexto(CENA.textos.principal, txtPrincipal);
    mostrarTexto(CENA.textos.secundario, txtSecundario);

    mostrarInputJogador(CENA.interacao);

    /* Configurações dos Botoes */
    mostrarBotoes(CENA.opcoes);

    mostrarTerra(CENA.terra);

    mostrarRobo(CENA.robo);

    if (CONFIG.debugMode)
        console.log(`CENA:${CENA}`);
}

montarCena(CENAS.none);

// Aqui deveria tocar o Audio
onFirstUserInteraction(() => montarCena(CENAS.preAbertura));