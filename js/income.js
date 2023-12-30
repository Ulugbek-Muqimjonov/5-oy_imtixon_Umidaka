const incomesForm = document.querySelector(".js-incomes-form");
const POST_INCOME_URL = "http://localhost:9090/add-income";
const GET_INCOME_URL = "http://localhost:9090/get-incomes";
const DELETE_INCOME_URL = "http://localhost:9090/delete-income/";
const incomesList = document.querySelector(".incomes__list");
const incomHistory = document.querySelector(".history__list-income")

incomesForm?.addEventListener("submit",evt =>{
    evt.preventDefault();
    const income = {};
    income.title = incomesForm.children[1].value.trim();
    income.amount = incomesForm.children[2].value.trim();
    income.category = incomesForm.children[3].value.trim();
    income.description = incomesForm.children[4].value.trim();
    income.date = incomesForm.children[5].value.trim().split("-").reverse().join("-");
    incomesForm.children[1].value = ''
    incomesForm.children[2].value = ''
    incomesForm.children[3].value = ''
    incomesForm.children[4].value = ''
    incomesForm.children[5].value = ''
    Addincomes(POST_INCOME_URL,income);
    
})

// incomes POST
async function Addincomes(url,obj) {
    try {
        const res = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                token:token
            },
            body:JSON.stringify(obj)
        })
        const data = await res.json();
        console.log(data)
        getIcomes() 
    } catch (error) {
        console.log(error);
    }
}

// incomes GET
async function getIcomes() {
    try {
        const res = await fetch(GET_INCOME_URL,{
            headers:{
                token:token
            }
        });
        const data = await res.json();
        const sortedata = data.reverse();
        render(sortedata,incomesList);
        render(sortedata,incomHistory);
        totalfunc(data,"inc")
    } catch (error) {
        console.log(error);
    }
}
getIcomes();

incomesList? incomesList.addEventListener("click",evt =>{
    if (evt.target.matches(".delete-btn")) {
        deleted(DELETE_INCOME_URL,evt.target.dataset.id)
        getIcomes()
    }
}):"";


