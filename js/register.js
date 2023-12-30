const REGISTER_URL = "http://localhost:9090/register"
const elForm = document.querySelector(".register__form--js");

elForm.addEventListener("submit",evt =>{
    evt.preventDefault();
    const user = {};
    user.last_name = elForm.children[1].value.trim();
    user.frist_name = elForm.children[2].value.trim()
    user.email = elForm.children[3].value.trim()
    user.password = elForm.children[4].value.trim()
    user.age = elForm.children[5].value.trim()
    register(user,REGISTER_URL)
})

async function register(obj,url) {
    try {
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(obj)
        });
        const data = await response.json();
        console.log(data);
        if (data.message == "Validation error") {
            alert("bu foydalanuvchi avval ro'yxatdan o'tgan");
            window.location.pathname = "login.html"
        }
        if (data.token) {
            window.localStorage.setItem("token",data.token)
            window.location.pathname = `./index.html`
        }
    } catch (error) {
        console.log(error);
    }
}