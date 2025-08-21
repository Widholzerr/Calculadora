const display = document.querySelector('.display');

const buttons = document.querySelectorAll('.botao');

const operador = document.querySelectorAll('.adicao, .subtracao, .multiplicacao, .divisao');

const resultado = document.querySelectorAll('.resultado');

const virgula = document.querySelectorAll('.virgula');

const clear = document.querySelectorAll('.limpar');

const acButton = document.getElementById('ac');

let operacaoAtual = '';
let operacaoAnterior = '';
let operacao = undefined;


//Atualiza o display com o valor da operação, ou limpando, etc. também tem a limitação de caracteres
function atualizarDisplay() {
    let texto = operacaoAtual.toString();
    texto = texto.length > 12 ? texto.slice(0, 12) : texto;
    display.textContent = texto === '' ? '0' : texto;
    estadoAC();
}

function limparDisplay() {
    operacaoAtual = '';
    operacaoAnterior = '';
    operacao = undefined;
    atualizarDisplay();
}

function appendNumber(number) {
    if (number === ',' && operacaoAtual.includes(',')) return;
    operacaoAtual = operacaoAtual.toString() + number.toString();
}

function selecionaOperacao(op) {
    if (operacaoAtual === '') return;
    if (operacaoAnterior !== '') {
        calcular();
    }
    operacao = op;
    operacaoAnterior = operacaoAtual;
    operacaoAtual = '';
}

function calcular() {
    let resultado;
    const prev = parseFloat(operacaoAnterior.replace(',', '.'));
    const current = parseFloat(operacaoAtual.replace(',', '.'));

    if (isNaN(prev) || isNaN(current)) return;
    //proteção contra operações seguidas sem número
    if( operacaoAtual === '' || operacao === undefined)
        return;
    if(operacaoAnterior!==''){

        switch (operacao) {
            case '+':
                resultado = adicao(prev, current);
                break;
            case '-':
                resultado = subtracao(prev, current);
                break;
            case '×':
                resultado = multiplicar(prev, current);
                break;
            case '÷':
                resultado = dividir(prev, current);
                break;
            default:
                return;
        }
    } 
    operacaoAtual = resultado.toString().replace('.', ',');
    operacao = undefined;
    operacaoAnterior = '';
    atualizarDisplay();
}

function adicao(num1, num2){
    return parseFloat(num1) + parseFloat(num2);
}

function subtracao(num1, num2){
    return parseFloat(num1) - parseFloat(num2);
}

function multiplicar(num1, num2){
    return parseFloat(num1) * parseFloat(num2);
}

function dividir(num1, num2){
    if (num2 === 0) {
        display.textContent = 'Divisão por zero.';
        return;
    }
    return (parseFloat(num1) / parseFloat(num2)).toFixed(2);
}

function estadoAC(){
    operacaoAtual === '' || operacaoAtual === '0' ? acButton.textContent = 'AC' : acButton.textContent = 'C';
}

buttons.forEach(button => {
    const valor = button.innerText;
    if (!isNaN(valor)){
        button.addEventListener('click', () => {
        appendNumber(valor);
        atualizarDisplay();
    });
    }
});

operador.forEach(op => {
    op.addEventListener('click', () => {
        selecionaOperacao(op.innerText);
    });
});

resultado.forEach(res=> {
    res.addEventListener('click', () => {
        calcular();
        atualizarDisplay();
});
});

//verifica se há virgula, se não tiver, adiciona, caso não tenha número, começa com 0,....
virgula.forEach(v => {
    v.addEventListener('click', () => {
        if(!operacaoAtual.includes(',')) {
            if(operacaoAtual === '') {
                operacaoAtual = '0,';
            } else {
                operacaoAtual += ',';
            }
            atualizarDisplay();
        }
    });
});

//inverte o sinal de operação do numero atual
document.getElementById('mais-menos').addEventListener('click', () => {
    if (operacaoAtual !== '') {
        if (operacaoAtual.startsWith('-')) {
            operacaoAtual = operacaoAtual.substring(1);
        } else {
            operacaoAtual = '-' + operacaoAtual;
        }
        atualizarDisplay();
    }
});

//aplica porcentagem no número atual
document.getElementById('porcento').addEventListener('click', () => {
    if (operacaoAtual !== '') {
        let valor = parseFloat(operacaoAtual.replace(',', '.'));
        valor = (valor / 100).toFixed(2);
        operacaoAtual = valor.toString().replace('.', ',');
        atualizarDisplay();
    }
});

acButton.addEventListener('click', () => {
    if (acButton.textContent === 'AC') {
        limparDisplay();
    } else {
        operacaoAtual = operacaoAtual.slice(0, -1);
        atualizarDisplay(); 
    }
});

