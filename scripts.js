let lista = [];

function listarAlunos()
{
    fetch("https://641b8d989b82ded29d5436ce.mockapi.io/api/v1/alunos")
    .then(res => res.json())
    .then(alunos => {
        lista = alunos;
        if(lista.length > 0){
            let tabela = document.querySelector("#tabela");
    tabela.innerHTML = "";
    for(let i = 0; i < lista.length; i++){
        tabela.innerHTML += `<tr>
                                <td>${lista[i].nome}</td>
                                <td>${lista[i].email}</td>
                                <td>${lista[i].telefone}</td>
                                <td>${lista[i].cidade}</td>
                                <td>
                                    <button 
                                        class="btn btn-warning" 
                                        type="button"
                                        data-bs-toggle="offcanvas"
                                        data-bs-target="#offcanvasRightEditar"
                                        aria-controls="offcanvasRightEditar"
                                        onclick="preencherForm(${lista[i].id})">Editar</button>
                                    <button class="btn btn-danger" onclick="deletarAluno(${lista[i].id})">Deletar</button>
                                </td>
                            </tr>`;
    }
            return;
        }else{
            tabela.innerHTML = "";
            tabela.innerHTML += `<tr><td colspan="5" style="text-align: center;">Nenhun aluno cadastrado</td></tr>`;
        }
    });   
} listarAlunos();

function adicionarAluno()
{
    event.preventDefault();
    let aluno = {
        nome: nome.value,
        email: email.value,
        telefone: telefone.value,
        cidade: cidade.value
    }
    fetch("https://641b8d989b82ded29d5436ce.mockapi.io/api/v1/alunos",{
        method: "POST",
        headers: {
            "Content-type":"application/json"
        },
        body: JSON.stringify(aluno)
    })
    .then(res => res.json())
    .then( resposta =>{
    cadastro.reset();
    document.querySelector(".offcanvas").classList.remove("show");
    document.querySelector(".offcanvas-backdrop").classList.remove("show");
    listarAlunos();
    })
}

function preencherForm(posicao){
    let aluno = lista[posicao];
    e_id.value = posicao;
    e_nome.value = aluno.nome;
    e_email.value = aluno.email;
    e_telefone.value = aluno.telefone;
    e_cidade.value = aluno.cidade;
}

function editarAluno(){
    event.preventDefault();
    let posicao = e_id.value;
    lista[posicao].nome = e_nome.value;
    lista[posicao].email = e_email.value;
    lista[posicao].telefone = e_telefone.value;
    lista[posicao].cidade = e_cidade.value;
    editar.reset();
    document.querySelector(".offcanvas").classList.remove("show");
    document.querySelector(".offcanvas-backdrop").classList.remove("show");
    listarAlunos();
}

function deletarAluno(posicao){
    fetch(`https://641b8d989b82ded29d5436ce.mockapi.io/api/v1/alunos/${posicao}`,{ method: "DELETE"})
    .then(res => res.json())
    .then(resposta => {
        listarAlunos()
        alert (`Aluno de id ${posicao} deletado`)
    })
}