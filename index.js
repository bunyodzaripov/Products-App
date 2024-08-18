const result = document.getElementById("result");
const count = document.getElementById("count");
const mainUrl = "https://fakestoreapi.com/products";
let currentPage = 1;
let items_per_page = 5;

document.addEventListener("DOMContentLoaded", function () {
   getProducts();
});

async function getProducts() {
   try {
      const res = await fetch(`${mainUrl}`);
      const products = await res.json();
      displayProducts(products);
   } catch (error) {
      console.log(error);
   }
}

function displayProducts(products) {
   result.innerHTML = "";
   let start_index = (currentPage - 1) * items_per_page;
   let end_index = start_index + items_per_page;
   let pagination_products = products.slice(start_index, end_index);

   pagination_products.forEach((product) => {
      const div = document.createElement("div");
      div.className = "col-lg-4 col-md-6 col-sm-12 p-3 ";
      div.innerHTML = `
          <div class="card h-100 w-100 rounded shadow-sm">
            <img src="${
               product.image
            }" class="card-img-top p-3 w-100"  height="500px" alt="${
         product.title
      }">
            <div class="card-body">
              <div class="py-2"><h2 class="card-title fw-bold">${product.title.substring(
                 0,
                 20
              )}</h2></div>
              <div class="py-2"><p class="card-text">${product.description.substring(
                 0,
                 100
              )}</p></div>
              <div class="py-2 "><span class="card-text"><strong>Category:</strong> ${
                 product.category
              }</span></div>
              <div class="py-2">
                <p class="card-text"><strong>Price: $${
                   product.price
                }</strong></p>
                <p class="card-text"><strong>Rating:</strong> ${
                   product.rating.rate
                } (${product.rating.count} reviews)</p>
              </div>
              <button class="btn btn-success mt-3" onclick="addToCart()">Add to cart</button>
              <a href="./single-product.html?id=${
                 product.id
              }" class="btn btn-primary mt-3">View Details</a>
            </div>
          </div>
    `;
      result.appendChild(div);
   });

   paginationProducts(products);
}

function paginationProducts(products) {
   pagination.innerHTML = "";
   let page_count = Math.ceil(products.length / items_per_page);
   for (let i = 1; i <= page_count; i++) {
      if (i >= currentPage - 1 && i <= currentPage + 1) {
         let btn = document.createElement("button");
         btn.innerText = i;
         btn.className =
            currentPage === i ? "btn btn-primary" : "btn btn-outline-primary";
         btn.addEventListener("click", () => {
            currentPage = i;
            displayProducts(products);
         });
         pagination.appendChild(btn);
      }
   }
}

function addToCart() {
   alert("Product added to cart");
   count.innerText = parseInt(count.innerText) + 1;
}
