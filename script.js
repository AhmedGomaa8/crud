//inputs

let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');
let searchInput = document.getElementById('search');

let mood = 'create';

let num;



function getTotal() {
	if (price.value !== '') {
		let reslt = (+price.value + +taxes.value + +ads.value) - +discount.value;
		total.innerHTML = reslt;
		total.style.backgroundColor = '#006a04'
	}else {
		total.innerHTML = ''
		total.style.backgroundColor = '#9b0000'
		
	}
	
}

let prodData = [];

if (localStorage.getItem('product')) {
	prodData = JSON.parse(localStorage.getItem('product'))
}else {
	prodData = [];
}



create.onclick = function () {
	if (title.value !== '' && price.value !== '' && taxes.value !== '' && ads.value !== '' && category.value !== '') {
		let newProd = {
			title: title.value.toLowerCase(),
			price: price.value,
			taxes: taxes.value,
			ads: ads.value,
			discount: discount.value,
			total: total.innerHTML,
			count: count.value,
			category: category.value.toLowerCase(),
		}
		if (mood === 'create') {
			if (newProd.count > 1) {
				if (newProd.count < 100) {
					for (let i = 0; i < newProd.count; i++) {
						prodData.push(newProd)
					}
					count.style.border = 'none'
				}else {
					count.style.border = '2px solid red'
					return;
				}
				
			}else {
				if (newProd.count <= 0) {
					return;
				}else  {
					prodData.push(newProd)
				}
				
			}
		}else {
			prodData[num] = newProd;
			mood = 'create';
			count.style.display = 'block'
			create.style.backgroundColor = '#076c6f'
			create.textContent = 'Create'
		}
		
		
		localStorage.setItem("product", JSON.stringify(prodData))
		clearData()
	}
	
	getTotal()
	showDataInTable()
}

function clearData() {
	title.value = '';
	price.value = '';
	taxes.value = '';
	ads.value = '';
	discount.value = '';
	category.value = '';
	count.value = '';
	total.innerHTML = ''
}

function showDataInTable() {
	let table = '';
	for (let i = 0; i < prodData.length; i++) {
		table += ` 
		<tr>
            <td>${i + 1}</td>
            <td>${prodData[i].title}</td>
            <td>${prodData[i].price}</td>
            <td>${prodData[i].taxes}</td>
            <td>${prodData[i].ads}</td>
            <td>${prodData[i].discount}</td>
            <td>${prodData[i].total}</td>
            <td>${prodData[i].category}</td>
            <td><button onclick="updateData(${i})" class="update">Update</button></td>
            <td><button onclick="deleteData(${i})" class="delete">Delete</button></td>
    	</tr>
		`
		
	}
	document.getElementById('tbody').innerHTML = table;
	let deleteAll = document.querySelector('.delete-all')
	if (prodData.length > 0 ) {
		deleteAll.innerHTML = `<button onclick="deleteAllData()">Delete All (${prodData.length})</button>`
	}else {
		deleteAll.innerHTML = ''
	}
}

showDataInTable()

function deleteData(index) {
	prodData.splice(index,1);
	localStorage.product = JSON.stringify(prodData);
	showDataInTable()
}

function deleteAllData() {
	localStorage.clear()
	prodData.splice(0)
	showDataInTable()
}

function updateData(i) {
	title.value = prodData[i].title;
	price.value = prodData[i].price;
	taxes.value = prodData[i].taxes;
	ads.value = prodData[i].ads;
	discount.value = prodData[i].discount;
	category.value = prodData[i].category;
	getTotal()
	count.style.display = 'none'
	create.style.backgroundColor = '#286445'
	create.textContent = 'update'
	mood = 'update'
	num = i;
	scroll({
		top: 0,
		behavior: 'smooth'
	})
}

let searchMood = 'title';

function getSearchMood(id) {
	if (id === 'search-title') {
		searchMood = 'title';
	}else {
		searchMood = 'category';
	}
	searchInput.placeholder = `Search By ${searchMood}`
	searchInput.focus()
	searchInput.value = '';
	showDataInTable()
}


function dataSearch(value) {
	let table = '';
	for (let i = 0; i < prodData.length; i++) {
		if (searchMood === 'title') {
			if (prodData[i].title.includes(value.toLowerCase())) {
				table += ` 
				<tr>
					<td>${i + 1}</td>
					<td>${prodData[i].title}</td>
					<td>${prodData[i].price}</td>
					<td>${prodData[i].taxes}</td>
					<td>${prodData[i].ads}</td>
					<td>${prodData[i].discount}</td>
					<td>${prodData[i].total}</td>
					<td>${prodData[i].category}</td>
					<td><button onclick="updateData(${i})" class="update">Update</button></td>
					<td><button onclick="deleteData(${i})" class="delete">Delete</button></td>
				</tr>
				`				
			}
		}else {
			if (prodData[i].category.includes(value.toLowerCase())) {
				table += ` 
				<tr>
					<td>${i + 1}</td>
					<td>${prodData[i].title}</td>
					<td>${prodData[i].price}</td>
					<td>${prodData[i].taxes}</td>
					<td>${prodData[i].ads}</td>
					<td>${prodData[i].discount}</td>
					<td>${prodData[i].total}</td>
					<td>${prodData[i].category}</td>
					<td><button onclick="updateData(${i})" class="update">Update</button></td>
					<td><button onclick="deleteData(${i})" class="delete">Delete</button></td>
				</tr>
				`				
			}
		}
		
	}
	document.getElementById('tbody').innerHTML = table;
}