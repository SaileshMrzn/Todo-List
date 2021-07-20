const input=document.querySelector(".input input");
const addbtn=document.querySelector(".input button");
const list=document.querySelector(".list");
const delall=document.querySelector(".footer button")

tasklist();

input.onkeyup = ()=>{
    let userdata = input.value;
    if(userdata.trim() != 0){ 
      addbtn.classList.add("active"); 
    }else{
      addbtn.classList.remove("active"); 
    }
}

addbtn.onclick=()=>{
    let userdata=input.value;
    let getlocalstorage=localStorage.getItem('New Todo');
    if(getlocalstorage==null){
        listarr=[];//creating blank array
    }else{
        listarr=JSON.parse(getlocalstorage);//transforming string into obj
    }
    listarr.push(userdata);//pushing or adding user data
    localStorage.setItem('New Todo', JSON.stringify(listarr)); //transforming obj into json string
    tasklist();
    addbtn.classList.remove("active");
}


function tasklist(){
    let getlocalstorage=localStorage.getItem('New Todo');
    if(getlocalstorage==null){
        listarr=[];//creating blank array
    }else{
        listarr=JSON.parse(getlocalstorage);//transforming string into obj
    }

    const pending=document.querySelector(".pending");
    pending.textContent=listarr.length;

    if(listarr.length>0){
        delall.classList.add("active");
    }else{
        delall.classList.remove("active");

    }

    let newlist='';
    listarr.forEach((element, index) => {
        newlist +=`<li>${element}<span onclick='deletetask(${index})'><i class="fas fa-trash"></i></span></li>`;
    });
    list.innerHTML=newlist;//adding new list insise ul
    input.value="";//make input field blank after finish adding
}

function deletetask(index){
    let getlocalstorage=localStorage.getItem('New Todo');
    listarr=JSON.parse(getlocalstorage);
    listarr.splice(index,1);//delete or remove the particular indexed li
    //update list after removing
    localStorage.setItem('New Todo', JSON.stringify(listarr)); //transforming obj into json string
    tasklist();
}

delall.onclick=()=>{
    listarr=[];
    localStorage.setItem('New Todo', JSON.stringify(listarr));
    tasklist();
}

