const POST_EXPENSES_URL = "http://localhost:9090/add-expense";
const GET_EXPENSES_URL = "http://localhost:9090/get-expenses";
const DELETE_EXPENSES_URL = "http://localhost:9090/delete-expense/"
const expensesForm = document.querySelector(".js-expenses-form");
const expensesList = document.querySelector(".expenses__list");
const expensesHstory = document.querySelector(".history__list-expenses");

expensesForm?.addEventListener("submit",evt =>{
    evt.preventDefault();
    const expense = {};
    expense.title = expensesForm.children[1].value.trim();
    expense.amount = expensesForm.children[2].value.trim();
    expense.category = expensesForm.children[3].value.trim();
    expense.description = expensesForm.children[4].value.trim();
    expense.date = expensesForm.children[5].value.trim().split("-").reverse().join("-");
    expensesForm.children[1].value = ''
    expensesForm.children[2].value = ''
    expensesForm.children[3].value = ''
    expensesForm.children[4].value = ''
    expensesForm.children[5].value = ''
    Addexpenses(POST_EXPENSES_URL,expense)
    getExpenses()
})

// Expenses POST
async function Addexpenses(url,obj) {
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
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

// Expenses GET
async function getExpenses() {
    try {
        const res = await fetch(GET_EXPENSES_URL,{
            headers:{
                token:token
            }
        });
        const data = await res.json();
        const sortedata = data.reverse()
        render(sortedata,expensesList);
        render(sortedata,expensesHstory);
        totalfunc(data,"exp")
    } catch (error) {
        console.log(error);
    }
}
getExpenses()

expensesList? expensesList.addEventListener("click",evt =>{
    if (evt.target.matches(".delete-btn")) {
        deleted(DELETE_EXPENSES_URL,evt.target.dataset.id)
        getExpenses()
    }
}):""