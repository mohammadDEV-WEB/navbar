
export const addClassToActive=(event)=>{
    const children = document.querySelectorAll(".page-item")
    children.forEach(i=>{
        i.classList.remove("active")
    })
    event.target.classList.add("active")
}