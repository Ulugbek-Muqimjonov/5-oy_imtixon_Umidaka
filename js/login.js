const LOGIN_URL = "http://localhost:9090/login"
const elForm = document.querySelector(".login__form--js");
elForm.addEventListener("submit",evt =>{
    evt.preventDefault();
    const user = {};
    user.email = elForm.children[1].value.trim();
    user.password = elForm.children[2].value.trim();
    console.log(user);
    login(LOGIN_URL,user)
})

async function login(url,obj) {
    try {
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(obj)
        });
        const data = await response.json();
        console.log(data.token);
        if (data.token) {
            window.localStorage.setItem("token",data.token);
            window.location.pathname = "./index.html"
        }
        if (data.message == "User is not found") {
            alert(`Foydalanuvchi topilmadi qaytadan urinib koring yoki register qiling`)
        }
    } catch (error) {
        console.log(error);
    }
}