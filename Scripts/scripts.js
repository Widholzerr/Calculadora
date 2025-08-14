const display = document.querySelector('.display');

const buttons = document.querySelectorAll('.botao');

const operador = document.querySelectorAll('.adicao, .subtracao, .multiplicacao, .divisao');

const resultado = document.querySelectorAll('.resultado');

const virgula = document.querySelectorAll('.virgula');

const clear = document.querySelectorAll('.limpar');

let operacaoAtual = '';
let operacaoAnterior = '';
let operacao = undefined;


function atualizarDisplay() {
    display.textContent = operacaoAtual;
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
        alert("Divisão por zero não é permitida.");
        return;
    }
    return parseFloat(num1) / parseFloat(num2);
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

document.getElementById('porcento').addEventListener('click', () => {
    if (operacaoAtual !== '') {
        let valor = parseFloat(operacaoAtual.replace(',', '.'));
        valor = valor / 100;
        operacaoAtual = valor.toString().replace('.', ',');
        atualizarDisplay();
    }
});

document.getElementById('ac').addEventListener('click', () => {
    limparDisplay();
});

