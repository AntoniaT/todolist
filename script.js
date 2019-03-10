"use strict"

const parent = document.querySelector("main");
const template = document.querySelector("template").content;


// now I take "myTask" as an argument to make this function reusable, so that "myTask" can be
// filled in by any input
function post (myTask){
  fetch("https://allpets-7f82.restdb.io/rest/todo-list", {
      method: "post",
      body: JSON.stringify(myTask),
      headers:     {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c7cef07cac6621685acbaec",
      "cache-control": "no-cache"
}
  })
  .then(res => res.json())
  .then(data =>{
//        console.log(data);
      showTasks(data);
  });
}

function get(){
fetch("https://allpets-7f82.restdb.io/rest/todo-list", {
method: "get",
headers: {
  "Content-Type": "application/json; charset=utf-8",
  "x-apikey": "5c7cef07cac6621685acbaec",
  "cache-control": "no-cache"
}
})
.then(res => res.json())
.then(data => {
  console.log(data)
  data.forEach(showTasks);
});
}

function showTasks(item){
const clone = template.cloneNode(true);

clone.querySelector("h3").textContent = item.task;
clone.querySelector("article").style.margin = "2em";
clone.querySelector("article").style.marginLeft = "4em";

clone.querySelector("article").dataset.id = item._id;

clone.querySelector("input").addEventListener("click", (e) =>{
    console.log(e);
    setTimeout(removeTask, 1200)
    function removeTask(){

    e.target.parentElement.remove();
    deleteTask(item._id);}
});

parent.appendChild(clone);
}
get();


const form = document.querySelector("form");
form.addEventListener("submit", e =>{
  e.preventDefault();
  console.log("submitted");
  const addedTask = {
      task: form.elements.task.value,
   //   when: form.elements.time.value
  };
  console.log(addedTask);

  post(addedTask);
}); 

function deleteTask(id){
fetch("https://allpets-7f82.restdb.io/rest/todo-list/" + id, {
method: "delete",
headers: {
  "Content-Type": "application/json; charset=utf-8",
  "x-apikey": "5c7cef07cac6621685acbaec",
  "cache-control": "no-cache"
}
})
.then(res => res.json())
.then(data => {
  console.log(data)
});
} 