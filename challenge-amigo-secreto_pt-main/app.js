// Array para armazenar os participantes
let participantes = [];

// Função para adicionar um participante
function adicionarAmigo() {
    const input = document.getElementById("amigo");
    const nome = input.value.trim();

    if (!nome) {
        alert("Por favor, digite um nome válido.");
        return;
    }

    if (participantes.includes(nome)) {
        alert("Esse nome já foi adicionado. Tente outro.");
        input.value = "";
        return;
    }

    participantes.push(nome);
    atualizarLista();
    input.value = "";
}

// Função para atualizar a lista de participantes na interface
function atualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    participantes.forEach((nome) => {
        const item = document.createElement("li");
        item.textContent = nome;
        lista.appendChild(item);
    });
}

// Função para realizar o sorteio
function sortearAmigo() {
    if (participantes.length < 2) {
        alert("Você precisa de pelo menos dois participantes para realizar o sorteio.");
        return;
    }

    let sorteados = [...participantes];
    let pares = {};

    // Embaralha a lista de sorteados
    sorteados.sort(() => Math.random() - 0.5);

    // Garante que ninguém se sorteie
    for (let i = 0; i < participantes.length; i++) {
        if (participantes[i] === sorteados[i]) {
            // Troca o sorteado atual com o próximo (ou o primeiro, se for o último)
            if (i === participantes.length - 1) {
                [sorteados[i], sorteados[0]] = [sorteados[0], sorteados[i]];
            } else {
                [sorteados[i], sorteados[i + 1]] = [sorteados[i + 1], sorteados[i]];
            }
        }
    }

    // Cria pares do sorteio
    for (let i = 0; i < participantes.length; i++) {
        pares[participantes[i]] = sorteados[i];
    }

    exibirResultados(pares);
}

// Função para exibir os resultados na interface
function exibirResultados(pares) {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    for (let [amigo, sorteado] of Object.entries(pares)) {
        const item = document.createElement("li");
        item.textContent = `${amigo} → ${sorteado}`;
        resultado.appendChild(item);
    }
}
