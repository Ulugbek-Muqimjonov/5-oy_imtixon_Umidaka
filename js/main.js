const token = window.localStorage.getItem("token");
if (!token) {
    window.location.pathname = 'login.html'
}
const logoutbtn = document.querySelector(".log-out-btn");
logoutbtn.addEventListener("click",()=>{
    window.localStorage.removeItem("token");
    window.location.reload();
})

const fragment =  document.createDocumentFragment();
const totalIncome = document.querySelector(".income-total")
const totalExpenses = document.querySelector(".expenses-total");
const total = document.querySelector(".balance");
const incomeHistoryList = document.querySelector(".history__list-income")
const expensesHistoryList = document.querySelector(".history__list-expenses")


// render funciton
function render(arr,node) {
    if (node) {
        if (arr.length == 0) {
            // node.classList.add("empty-list")
            node.innerHTML = `<h2 class = "null-text">Hali yo'q</h2>`;
            return 
        }
        node.innerHTML  = '';
        arr.forEach(item => {
            const liElement = document.createElement("li");
            const titleElement = document.createElement("strong");
            const btnElement = document.createElement("button");
            const priceELement = document.createElement("span");
            const dateElement = document.createElement("span");
            const createAt = document.createElement("span");
            const dateWrapElement = document.createElement("div")
            const wrapElement = document.createElement("div");
            const typeElement = document.createElement("span")
            
            titleElement.textContent = item.title;
            btnElement.textContent  = "delete";
            priceELement.innerHTML =`${item.amount} so'm`;
            dateElement.textContent = item.date.slice(0,10);
            createAt.textContent = item.createdAt.slice(11,19)
            btnElement.dataset.id = item.id;
            typeElement.innerHTML = item.type
            
            liElement.classList.add("item","shadow");
            wrapElement.classList.add("item__innrediv");
            dateWrapElement.classList.add("item__date-wrap");
            btnElement.classList.add("delete-btn","btn","btn-danger")
            
            dateWrapElement.append(dateElement,createAt)
            liElement.append(titleElement,typeElement,priceELement,dateWrapElement,btnElement)
            fragment.appendChild(liElement)
        });
        node.appendChild(fragment)
    }
}

// delete function

async function deleted(url,id) {
    try {
        const res = await fetch(url+id,{
            method:"DELETE",
            headers:{
                token:token
            }
        })
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
function totalfunc(arr,node) {
    arr.forEach(item =>{
        // acc += Number(item.amount)
        if (item.type =="expense") {
            totalExpenses?totalExpenses.textContent = +totalExpenses.textContent + item.amount:""
        }else {
            totalIncome?totalIncome.textContent = +totalIncome.textContent + item.amount:""
        }
    })
    total?total.textContent = +totalIncome.textContent - totalExpenses.textContent:0 
}