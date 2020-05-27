const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');

let state = {};



//Função que inicia tudo
function startGame() {
    state = {};
    showTextNode(1);
}


//Mostra o novo texto de acordo com o id/opcao selecionada
function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)

    textElement.innerText = textNode.text;

    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }
    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.classList.add('btn');
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


const textNodes = [{
        id: 1,
        text: 'No ano de 19xx, tu é o detetive Eden Nohopy que após solucionar uma série de assasinatos pela cidade de Buquim, sua notoriedade chegou aos ouvidos de poderosos empresários que buscavam respostas para sequestros de membros de suas famílias, roubos de informações secretas de seus negócios e ameaças anônimas. Numa noite mundana, um cliente entra em teu escritório para lhe oferecer um serviço que te levaria à uma pequena ilha asiática em busca de sua família.',
        options: [
        {
                text: 'Perguntar o valor que o cliente está disposto a pagar.',
                setState: {},
                nextText: 2
            },
            {
                text: 'Pedir detalhes sobre o serviço',
                setState: {},
                nextText: 3
            }
        ]
    },
    {
        id: 2,
        text: 'Serviços internacionais normalmente custam mais caro, por este motivo tu achou que seria uma boa oportunidade para pedir uma boa quantia como recompensa. Contudo, o cliente com um olhar de coitado disse que nâo tinha o dinheiro mas que conseguiria assim que possível.',
        options: [
            {
                text: 'Reclamar e expulsar o cliente do escritório.',
                //requiredState: (currentState) => currentState.details,
                setState: {},
                nextText: 9
            },
            {
                text: 'Acender um cigarro, olhar seriamente para o cliente e dizer que pensará se aceitará a proposta.',
                //requiredState: (currentState) => currentState.details,
                setState: {},
                nextText: 5
            },
            {
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
                text: 'Aceitar o serviço',
                //requiredState: (currentState) => currentState.details,
                setState: {},
                nextText: 7
            },
            {
                text: 'Negar serviço',
                //requiredState: (currentState) => currentState.details,
                setState: {},
                nextText: 9
            },
            {
                text: 'Ficar em  silêncio.',
                nextText: 8
            },
            {
                text: 'Falar de valores.',
                nextText: 2
            }

        ]
    },
    {
        id: 4,
        text: 'O cliente disse que sua família embarcou em direção à uma nova vida numa ilha no sul da Ásia. Após algumas semanas, as cartas que ele costumava receber pararam de serem recebidas.',
        options: [
            {
                text: 'Aceitar o serviço',
                //requiredState: (currentState) => currentState.details,
                setState: {},
                nextText: 3
            },
            {
                text: 'Negar serviço',
                //requiredState: (currentState) => currentState.details,
                setState: {},
                nextText: 9
            },
            {
                text: 'Ficar em  silêncio.',
                nextText: 3
            }
        ]
    },
    {
        id: 5,
        text: 'A sala é tomada pelo barulho da chuva que parece perfurar o telhado aonde seu escritório é localizado. O cigarro aquece seu rosto e seus pensamentos decolam num céu de possibilidades. "Devo aceitar este serviço? Não estou com um bom pressentimento".',
        options: [
            {
                text: 'Respirar fundo e aceitar',
                //requiredState: (currentState) => currentState.details,
                setState: {},
                nextText: 51
            },
            {
                text: 'Negar serviço e pedir para que o cliente saia.',
                //requiredState: (currentState) => currentState.details,
                setState: {},
                nextText: 9
            },
            {
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
                text: 'Ficar em silêncio.',
                //requiredState: (currentState) => currentState.details,
                setState: {},
                nextText: 9
            },
            {
                text: 'Aceitar o serviço',
                //requiredState: (currentState) => currentState.details,
                setState: {},
                nextText: 10
            }
            ,
            {
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