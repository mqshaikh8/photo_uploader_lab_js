const addPicButton = document.querySelector('#addPicButton')
addPicButton.addEventListener('click', openNewPicForm)
let formOpen = false


function openNewPicForm(){
    const newPicFormContainer = document.querySelector('#newPicFormContainer')
    if(formOpen){
        newPicFormContainer.style.height = '0px'
        newPicFormContainer.style.padding = '0px'
    }
    else{
        newPicFormContainer.style.height = '280px'
        newPicFormContainer.style.padding = '20px'
    }
    formOpen = !formOpen
}

//****Start coding below****//

const photoDiv = document.querySelector("#photoContainer")
const form = document.querySelector("#newPicForm")
const nameInput = form.querySelector("#name")
const urlInput = form.querySelector("#photo_image_url")
const ownerInput = form.querySelector("#owner")


fetch("http://localhost:3000/photos")
.then(r => r.json())
.then(obj => {
    obj.forEach(e => {
        makePost(e)

    })
    

})


function makePost(object){
    const newDiv = document.createElement("div")
    newDiv.className = "photo"
    const h3 = document.createElement("h3")
    h3.innerText = object.name
    const pTag = document.createElement("p")
    pTag.innerText = object.owner
    const img = document.createElement("img")
    img.src = object.photo_image_url
    const bttn = document.createElement("button")
    bttn.innerText = "Remove"
    bttn.className = "removeButton"

    const editBttn = document.createElement("button")
    editBttn.className = "removeButton"
    editBttn.innerText = "EDIT"

    newDiv.append(h3,pTag,img,bttn,editBttn)
    photoDiv.append(newDiv)
  

    bttn.addEventListener("click", e => {
    fetch(`http://localhost:3000/photos/${object.id}`,{
        method:"DELETE",  
    })
    .then(r => r.json())
    .then(newDiv.remove())
    })

    editBttn.addEventListener("click",e => {
        nameInput.value = object.name
        urlInput.value = object.photo_image_url
        ownerInput.value = object.owner 
        openNewPicForm()
        window.scrollTo(0, 0);
        
        // fetch(`http://localhost:3000/photos/${object.id}`,{
        //     method: "PATCH",
        //     headers:{
        //         "Content-Type": "application/json",
        //         "Accept": "application/json"
        //     },
        //     body: JSON.stringify({
        //         "name"
        //     })
            

        // })
    })

}

form.addEventListener("submit",e =>{
    e.preventDefault()
    
   const name = e.target["name"].value
   const url = e.target["photo_image_url"].value
   const owner = e.target["owner"].value

   fetch('http://localhost:3000/photos',{
       method: "POST",
       headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
       },
       body: JSON.stringify({
           "name":name,
           "owner":owner,
           "photo_image_url":url    
       })
   })
   .then(j => j.json())
   .then(object => {
    makePost(object)
   })

})