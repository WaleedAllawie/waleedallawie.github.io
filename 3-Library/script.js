const myLibrary = [];

function Book(title,author,pagesNum,isread,id) {
    this.author=author;
    this.title=title;
    this.pagesNum=pagesNum;
    this.isread=Boolean(isread)?"Read":"Not read";
    this.id=id;
};
function viewLibrary(){
    let libraryEl = document.querySelector("#libraryDiv");
    libraryEl.innerHTML="";
    for (i=0;i<=myLibrary.length;i++){
        let book=myLibrary[i];
        let bookEl=document.createElement("div");
        bookEl.innerHTML=`
        <h3>${book.title}</h3>
        <p>by ${book.author}</p>
        <p>${book.pagesNum} pages</p>
        <p>${book.isread}</p>`
        libraryEl.appendChild(bookEl);
    }
}

function addBookToLibrary() {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pagesNum").value;
    let read = document.querySelector("#read").checked;
    let newBook = new Book(title,author,pages,read);
    myLibrary.push(newBook);
    viewLibrary();
};

let Addbutton = document.querySelector("#add-book-btn");
Addbutton.addEventListener("click",function(){
    let Bookform = document.querySelector("#new-book-form");
    Bookform.style.display="block";
        
});
document.querySelector("#new-book-form").addEventListener("submit",function(event){
    event.preventDefault()
    addBookToLibrary();
})