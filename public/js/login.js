const form = document.getElementById("loginForm");
async function getNextPage(event){
event.preventDefault();

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;
const data = {username, password};

try{
    const response = await fetch("/api/login", {
        "method":"POST",
        "headers" : {
            "Content-Type" :"application/json"
        },
        "body":JSON.stringify(data)
    });
    if(response.ok) {
        document.location.href = "/category";
    } else {
            if(document.getElementById("loginErrorMes")){
                document.getElementById("loginErrorMes").remove();
            }
            const errorMes = document.createElement("p");
            errorMes.setAttribute('id','loginErrorMes');
            errorMes.textContent = "Username or Password is incorrect"
            const registerDiv = document.getElementById("loginForm");
            registerDiv.append(errorMes); 
    }
} catch (err) {
    console.error(err);
}
}
form.addEventListener("submit", getNextPage);