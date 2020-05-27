const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');

let state = {};


///Efeitos sonoros dos jogos
var buttonClickFx = new Audio('sounds/fx/button_click.wav');



//Função que inicia tudo
function startGame() {
    state = {};
    showTextNode(1);
}

function imageContainer(path){
    let img = document.createElement('img');
    img.src = path;
    let element = document.getElementById('imageContainer');
    element.appendChild(img);
}

//Mostra o novo texto de acordo com o id/opcao selecionada
function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)

    textElement.innerText = textNode.text;
    buttonClickFx.play();
    buttonClickFx.volume = 0.2;
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }
    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button');
            button.innerText = option.text;
            
            if(option.type === 'good'){
                button.classList.add('btn-good');
            }
            else if(option.type === 'neutral'){
                button.classList.add('btn-neutral');
            }
            else if(option.type === 'evil'){
                button.classList.add('btn-evil');
            }
            button.addEventListener('click', () => selectOption(option));
            optionButtonsElement.append(button);
        }
    });
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)

}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId);
}


const textNodes = [

    {
        id: 1,
        text: 'No ano de 1939, tu é o detetive Eden Nohopy que após solucionar uma série de assasinatos pela cidade de Buquim, sua notoriedade chegou aos ouvidos de poderosos empresários que buscavam respostas para sequestros de membros de suas famílias, roubos de informações secretas de seus negócios e ameaças anônimas. Numa noite mundana, um cliente entra em teu escritório para lhe oferecer um serviço que te levaria à uma pequena ilha asiática em busca de sua família.',
        options: [
            {
                type:'good',
                text: 'Pedir detalhes sobre o serviço',
                setState: {},
                nextText: 3
            },
            {
                type:'neutral',
                text: 'Perguntar o valor que o cliente está disposto a pagar.',
                setState: {},
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'Serviços internacionais normalmente custam mais caro, por este motivo tu achou que seria uma boa oportunidade para pedir uma boa quantia como recompensa. Contudo, o cliente com um olhar de coitado disse que nâo tinha o dinheiro mas que conseguiria assim que possível.',
        options: [
            {
                type:'evil',
                text: 'Reclamar e expulsar o cliente do escritório.',
                //requiredState: (currentState) => currentState.details,
                setState: {},
                nextText: 9
            },
            {
                type:'good',
                text: 'Acender um cigarro e dizer que pensará se aceitará a proposta.',
                //requiredState: (currentState) => currentState.details,
                setState: {},
                nextText: 5
            },
            {   
                type:'neutral',
                text: 'Ficar em silêncio',
                nextText: 21
            }
        ]
    },
    {
        id: 3,
        text: 'O cliente disse que sua família embarcou em direção à uma nova vida numa ilha no sul da Ásia. Após algumas semanas ele parou de receber notícias. Ele ficou sabendo que tu atendia a serviços internacionais e por este motivo decidiu procurá-lo.',
        options: [
            {
                type:'good',
                text: 'Aceitar o serviço',
                //requiredState: (currentState) => currentState.details,
                setState: {},
                nextText: 51
            },
            {
                type:'evil',
                text: 'Negar serviço',
                //requiredState: (currentState) => currentState.details,
                setState: {},
                nextText: 9
            },
            {
                type:'neutral',
                text: 'Ficar em  silêncio.',
                nextText: 8
            },
            {
                type:'neutral',
                text: 'Falar de valores.',
                nextText: 2
            }

        ]
    },
    {
        id: 5,
        text: 'A sala é tomada pelo barulho da chuva que parece perfurar o telhado aonde seu escritório é localizado. O cigarro aquece seu rosto e seus pensamentos decolam num céu de possibilidades. "Devo aceitar este serviço? Não estou com um bom pressentimento".',
        options: [
            {
                type:'good',
                text: 'Respirar fundo e aceitar',
                //requiredState: (currentState) => currentState.details,
                setState: {},
                nextText: 51
            },
            {
                type:'evil',
                text: 'Negar serviço e pedir para que o cliente saia.',
                //requiredState: (currentState) => currentState.details,
                setState: {},
                nextText: 9
            },
            {
                type:'neutral',
                text: 'Ficar em  silêncio.',
                nextText: 21
            }
        ]
    },
    {
        id: 9,
        text: 'Tristeza e melancolia tomaram conta do escritório enquanto o cliente balançava a cabeça freneticamente como forma de desaprovação. Ele correu em sua direção com uma raiva palpável e segurou com tanta força que tu começou a desmaiar, antes disso alguns homens vestidos e encapuzados adentraram o escritório.',
        options: [
            {
                type:'neutral',
                text: 'Desmaiar',
                //requiredState: (currentState) => currentState.details,
                setState: {},
                nextText: 10
            }
        ]
    },
    {
      id:10,
      text: 'Tu acorda com o som da água batendo no casco do navio. O lugar escuro, fedorendo e cheio de teias criam um ambiente extremamente aconchegante.',
        options: [
            {
                type:'neutral',
                text: 'Olhar ao redor',
                //requiredState: (currentState) => currentState.details,
                setState: {},
                nextText: 11
            }
        ]
    },
    {
      id:11,
      text: 'Aparentemente é um navio e tu está no porão deste. É possível ouvir fortes pisadas que parecem circular o deque acima do teu. Vozes em tons estridentes e crescentes como se fosse um oração numa língua distorcida, a qual é pronunciada com angustia e tristeza.',
        /*options: [
            {
                text: 'Levantar',
                //requiredState: (currentState) => currentState.details,
                setState: {},
                nextText: 11
            }

        ]*/
    },
    {
      id:21,
      text: 'Conforme os segundos iam passando, a postura do cliente tornava-se cada vez mais agressiva, seus olhos vermelhos indicavam uma leve alteração de consciência.',
        options: [
            {
                type:'neutral',
                text: 'Ficar em silêncio.',
                //requiredState: (currentState) => currentState.details,
                setState: {},
                nextText: 9
            },
            {
                type:'good',
                text: 'Aceitar o serviço',
                //requiredState: (currentState) => currentState.details,
                setState: {},
                nextText: 10
            }
            ,
            {
                type:'evil',
                text: 'Negar o serviço',
                //requiredState: (currentState) => currentState.details,
                setState: {},
                nextText: 9
            }
        ]
    },
    {
      id:51,
      text: 'Tudo seria preparado o quanto antes para que tu partisse para a ilha em busca da família do cliente. A recompensa seria paga no fim do serviço e como tu precisava do dinheiro para pagar um temido agiota de tua cidade, tu decidiu aceitar por necessidade.',
        options: [
            {
                type:'neutral',
                text: 'Se preparar para a viagem. Ir ao porto.',
                //requiredState: (currentState) => currentState.details,
                setState: {},
                nextText: 9
            }
        ]
    },
    {
        id:52,
        text:'',
        options:[
            {

            }
        ]
    }
];


startGame();