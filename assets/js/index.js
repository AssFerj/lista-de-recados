//LOGIN NO SISTEMA
document.getElementById('login-form').addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById('email-ipt').value;
    const senha = document.getElementById('senha-ipt').value;

    const account = JSON.parse(getAccount(email));

    if(!account){
        alert("Verifique o usuário ou a senha.");
        return;
    }else if(account){
        if(account.password !== senha){
            alert("Verifique o usuário ou a senha.");
            return;
        }else if(account.login !== email){
            alert("Verifique o usuário ou a senha.");
            return;
        }
        window.location.href = "dashboard.html";
    }
    console.log(account)
});

//CRIA CONTA
document.getElementById('signUp-form').addEventListener("submit", function(e){
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
    newUser({
        login: email,
        password: senha,
        recados: []
    })

    alert(`Olá ${nome} ${sobrenome}, sua conta foi criada com sucesso!`)
})

function newUser(data){
    localStorage.setItem(data.login, JSON.stringify(data));
    localStorage.setItem(data.senha, JSON.stringify(data));
}

function getAccount(key){
    const account = localStorage.getItem(key)

    if(account){
        return JSON.parse(key);
    }
    return "";
}

