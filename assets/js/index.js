// Global Variables
let user = {
    id: null,
    nome: null,
    sobrenome: null,
    login: null,
    password: null,
    recados: null
}
let updateUser = () => localStorage.setItem('list-users', JSON.stringify(users));
let users = JSON.parse(localStorage.getItem('list-users')) || [];

let task = {
            id: null,
            description: null,
            detail: null
}
let updateTask = () => localStorage.setItem('list-tasks', JSON.stringify(tasks));
let tasks = JSON.parse(localStorage.getItem('list-tasks')) || [];

const tBody = document.getElementById('tbody');

//CRIA CONTA
const signUpForm = document.getElementById('signUp-form');

if(signUpForm){
    signUpForm.addEventListener("submit", function(e){
        e.preventDefault();
    
        const nome = document.getElementById('nome').value;
        const sobrenome = document.getElementById('sobrenome').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const confSenha = document.getElementById('conf-senha').value;
        
        if(email.length < 5){
            alert('Preencha o campo com um e-mail válido!');
            return;
        }else if(senha.length < 5){
            alert('Sua senha deve ter no mínimo 6 digitos!');
            return;
        }else if(confSenha != senha || confSenha == ""){
            alert('Os campos de Senha e Confirmar Senha não são iguais!');
            return;
        }
        user = {
            id: Math.floor(Date.now() / 1000),
            nome: nome,
            sobrenome: sobrenome,
            login: email,
            password: senha,
            recados: []
        };

        users.push(user);
        updateUser(user);

        alert(`Olá ${nome} ${sobrenome}, sua conta foi criada com sucesso!`)
        window.location.href = "dashboard.html";

    })
}

function getAccount(key){
    const account = users.find(user => user.login == key);
    return account;
}

//LOGIN NO SISTEMA
const loginForm = document.getElementById('login-form');

if(loginForm){
    loginForm.addEventListener("submit", function(e){
        e.preventDefault();
    
        const email = document.getElementById('email-ipt').value;
        const senha = document.getElementById('senha-ipt').value;

        const account = getAccount(email);
        console.log(account)

        if(!account){
            alert("Usuário não cadastrado!");
            return;
        }else if(account){
            if(account.password !== senha || account.login !== email){
                alert("Verifique o usuário ou a senha.");
                return;
            }
            localStorage.setItem('currentUser', JSON.stringify(account));
            window.location.href = "dashboard.html";
        }
    });
}

//CREATE TAREFAS
const launchTaskForm = document.getElementById('launch-task-form');

if(launchTaskForm){
    launchTaskForm.addEventListener("submit", function (e){
        e.preventDefault();

        const descIpt = document.getElementById('desc-ipt').value;
        const detIpt = document.getElementById('det-ipt').value;
        const divErro = document.getElementById('msg-erro');
        const erros = [];
        const id = tasks.length+1;
        
        task = {
            id: id,
            description: descIpt,
            detail: detIpt
        }
        
        if (!descIpt || descIpt.length == "") {
            erros.push("<p>Descrição inválida</p>");
        }else if (!detIpt || detIpt == "") {
            erros.push("<p>Detalhamento inválido</p>");
        }else if (erros.length > 0) {
            divErro.innerHTML = erros.join(" ");
            return;
        }
 
        tasks.push(task);
        updateTask(task);

        alert('Recado salvo com sucesso!')
        
        launchTaskForm.reset();
        showTasks();
    });
    
}

//READ TAREFAS
function showTasks(){

    tBody.innerHTML = '';
    
    for(item of tasks){
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
        <td>${item.id}</td>
        <td>${item.description}</td>
        <td>${item.detail}</td>
        <td>
            <button class="mx-2 btn btn-warning" onclick="editTask(${item.id})"><i class="bi bi-pencil-square"></i></button>
            <button class="mx-2 btn btn-danger" onclick="deleteTask(${item.id})"><i class="bi bi-trash3"></i></button>
        </td>
        `
        tBody.appendChild(tr);
    }
}
showTasks();

//EDIT TAREFAS
function editTask(id){
    const edTask = confirm('Você realmente quer editar esse recado?');
    if(!edTask){
        return;
    };

    const iTask = tasks.findIndex((task) => task.id === id);
    if(iTask < 0){
        return;
    };

    let description = prompt(`Edite a descrição do recado:`, `${tasks[iTask].description}`);
    if(!description || description.length<3){
        alert('Nova descrição inválida!');
        return;
    };
    tasks[iTask].description = description;

    let detail = prompt(`Edite o detalhamento do recado:`, `${tasks[iTask].detail}`);
    if(!detail || detail.length<3){
        alert('Novo detalhamento inválido!');
        return;
    };
    tasks[iTask].detail = detail;

    updateTask(tasks);
    showTasks();
}

//DELETE TAREFAS
function deleteTask(id){
    const delTask = confirm('Você realmente quer deletar esse recado?');
    if(!delTask){
        return;
    };

    const iTask = tasks.findIndex((task) => task.id === id);
    if(iTask < 0){
        return;
    };

    tasks.splice(task, 1);
    updateTask(tasks);
    showTasks();
}

// LOGOUT DO SISTEMA
document.getElementById('logout').addEventListener('click', logout);
function logout(){
    localStorage.removeItem('currentUser');
    window.location.href = "index.html";
}