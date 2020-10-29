// import books from './books.js';
import { saveToStorage, getFromStorage } from './utills/storage.js';

let listOfBooks = getFromStorage('list');
let root = document.getElementById('root');
let addBook = document.getElementById('addBook');
let bookButton = document.getElementById('addBookBtn');

//could add this to the html file...
addBook.style.outline = 'none';

createBookList(listOfBooks);
bookButton.addEventListener('click', handleSearch);

function addBookToBookList(){
    addBook.addEventListener('change', handleSearch);
};

function handleSearch(){
    if(addBook.value.length >= 3){
            const newItem = {
            isbn: Date.now(),
            title: addBook.value
            };

        listOfBooks.push(newItem);
        createBookList(listOfBooks);
        saveToStorage('list', listOfBooks);
        addBook.value = '';
    };
};

addBookToBookList();


function createBookList(storageList) {
    let output = '';
    console.log(storageList);

	storageList.forEach(
		(book) =>
			(output += `<li><span>${book.title}</span><button class="btn" data-item="${book.isbn}">X</button></li>`)
    );
    
    root.innerHTML = output;
    
    if(listOfBooks.length === 0){
        root.innerHTML = 'There are no books to show';
    }

	addClickEvent();
}

function removeItem() {
	const deleteThisItem = this.dataset.item;

	const newBooks = listOfBooks.filter((book) => parseInt(deleteThisItem) !== parseInt(book.isbn));
    
    listOfBooks = newBooks;
    console.log(listOfBooks)
    saveToStorage('list', listOfBooks);
	createBookList(listOfBooks);
}

function addClickEvent() {
	const removeButton = document.querySelectorAll('.btn');
	callClickEvent(removeButton);
}

function callClickEvent(click) {
	click.forEach((item) => item.addEventListener('click', removeItem));
}
