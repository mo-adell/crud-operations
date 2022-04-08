//crud project
let crud = {
  name     :   document.getElementById("productName"),
  price    :   document.getElementById("productPrice"),
  category :   document.getElementById("productCategory"),
  desc     :   document.getElementById("productDescription"),
  mainBtn  :   document.getElementById("mainBtn"),
  search   :   document.getElementById("searchInput"),
  allProducts : [],

  addProduct() {
    const product = {
      name     : this.name.value,
      price    : this.price.value,
      category : this.category.value,
      desc     : this.desc.value
    }

    let nameValid     = this.validate.name();
    let priceValid    = this.validate.price();
    let categoryValid = this.validate.category();
    if (nameValid && priceValid && categoryValid) {
      this.allProducts.push(product);
      this.setIntoLocal();
      this.displayProducts(this.allProducts);
      this.clearForm(); 
      this.removeErrors();
    } else {
      addError();
    }
    
    function addError() {
      if (!nameValid) {
        document.getElementById("name-error").innerHTML = `<span class="text-danger">Name should start with a capital letter</span>`;
      }
      if (!priceValid) {
        document.getElementById("price-error").innerHTML = `<span class="text-danger">Price should be between 1000 & 10000</span>`;
      }
      if (!categoryValid) {
        document.getElementById("category-error").innerHTML = `<span class="text-danger">Category should be tv or mobile or laptop</span>`;
      }
    }
      
  },

  displayProducts(product) {
    let tr = ``;
    for (let i = 0; i < product.length; i++) {
      tr += 
      `<tr>
        <td>${i+1}</td>
        <td>${product[i].name}</td>
        <td>${product[i].price}</td>
        <td>${product[i].category}</td>
        <td>${product[i].desc}</td>
        <td>
          <button class="btn btn-warning" onclick="crud.retrieveProduct(${i})">update</button>
        </td>
        <td>
          <button class="btn btn-danger" onclick="crud.deleteProduct(${i})">delete</button>
        </td>
       </tr>`;
    }
    document.getElementById("rowData").innerHTML = tr;
  },

  clearForm() {
    this.name.value     = "";
    this.price.value    = "";
    this.category.value = "";
    this.desc.value     = "";
  },

  removeErrors() {
    document.getElementById("name-error").innerHTML = ``;
    document.getElementById("price-error").innerHTML = ``;
    document.getElementById("category-error").innerHTML = ``;
  },

  deleteProduct(i) {
      this.allProducts.splice(i,1);   
      this.setIntoLocal();
      this.displayProducts(this.allProducts);
  },

  retrieveProduct(i) {
    this.name.value     = this.allProducts[i].name;
    this.price.value    = this.allProducts[i].price;
    this.category.value = this.allProducts[i].category;
    this.desc.value     = this.allProducts[i].desc;
    this.mainBtn.innerText = "Update";
    this.mainBtn.setAttribute("onclick",`crud.updateProduct(${i})`);
  },

  updateProduct(i) {
    this.allProducts[i].name     = this.name.value; 
    this.allProducts[i].price    = this.price.value; 
    this.allProducts[i].category = this.category.value; 
    this.allProducts[i].desc     = this.desc.value; 
    this.setIntoLocal();
    this.displayProducts(this.allProducts);
    this.clearForm();
    this.mainBtn.innerText = "Add Product";
    this.mainBtn.setAttribute("onclick",`crud.addProduct()`);
    
  },

  storageCheck() {
    let localData = localStorage.getItem("allProducts");
    if (localData) {
      this.allProducts = JSON.parse(localData);
      this.displayProducts(this.allProducts);
    } else {
      this.allProducts = [];
    }
  },

  setIntoLocal() {
    localStorage.setItem("allProducts", JSON.stringify(this.allProducts));
  },

  searchProduct() {
    let searchValue    = this.search.value.toLowerCase();
    let matchedProduct = [];
    for (let i = 0; i < this.allProducts.length; i++) {
      if (this.allProducts[i].name.toLowerCase().includes(searchValue)) {
        matchedProduct.push(this.allProducts[i])
      }
    }
    this.displayProducts(matchedProduct);
  },

  validate : {
    name() {
      let regex = /^[A-Z][a-z]{3,}$/;
      return regex.test(crud.name.value);
    },
    price() {
      return (1000<crud.price.value && crud.price.value<10000);
    },
    category() {
      let regex = /^(tv|mobile|laptop)$/i;
      return regex.test(crud.category.value);
    }
  }
}

crud.storageCheck();
