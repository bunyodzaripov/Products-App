const single_product = document.getElementById("single");

document.addEventListener("DOMContentLoaded", function () {
   getSingleProduct();
});

function getSingleProduct() {
   const urlParams = new URLSearchParams(window.location.search);
   const id = urlParams.get("id");
   fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => displaySingleProduct(data));

   function displaySingleProduct(product) {
      const div = document.createElement("div");
      div.classList.add("col-md-6", "g-5", "p-3", "mx-auto");
      div.innerHTML = `
         <div class="card h-100 mt-5">
            <img src="${
               product.image
            }" class="card-img-top p-3 w-100"  height="500px" alt="${
         product.title
      }">
          </div>
         <div class="card-body mb-5 p-3">
            <div class="py-2"><h2 class="card-title fw-bold">${product.title.substring()}</h2></div>
            <div class="py-2"><p class="card-text">${product.description.substring()}</p></div>
            <div class="py-2 "><span clas s="card-text"><strong>Category:</strong> ${
               product.category
            }</span></div>
            <div class="py-2 ">
               <p class="card-text"><strong>Price: $${
                  product.price
               }</strong></p>
               <p class="card-text"><strong>Rating:</strong> ${
                  product.rating.rate
               }</p>
            </div>
            <a href="./index.html" class="btn btn-primary">Go Back</a>
            <a href="#" class="btn btn-success" onclick="addToCart()">Add to cart</a>
         </div>
      `;

      single_product.appendChild(div);
   }
}

function addToCart() {
   alert("Product added to cart");
}
