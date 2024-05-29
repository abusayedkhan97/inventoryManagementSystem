const getAllStudendData = document.getElementById("getAllStudendData");


const allProduct = () => {
  const getProduct = getDataLS("productData");

  let dataList = "";
  if (getProduct) {
    let x = 0;

    // filtring by Stock
    const filteredProducts = getProduct.filter((item) => item);
    filteredProducts.sort((a, b) => parseInt(a.stock) - parseInt(b.stock));

    filteredProducts.forEach((item, index) => {
      const {
        date,
        productPhoto,
        productName,
        price,
        productdescription,
        stock,
        id,
      } = item;

      x++;
      dataList += `<tr>
            <td>${x < 10 ? "0" + x : "" + x}</td>
            <td><img src="${productPhoto}" alt="" /></td>
            <td>${truncateWord(productName)}</td>
            <td><i class="fa-solid fa-bangladeshi-taka-sign"></i> ${price}</td>
            <td>
              ${order(id) > 0 
                ? `<button class="newOrder text-danger" data-bs-toggle="modal" data-bs-target="#newOrderModal" onclick="newOrderManage(${id})">New Order <span class="text-danger fw-bold fs-5">${order(id)}</span> <i class="fa-solid fa-comment-dots text-danger fs-5"></i></button>` 
                : '<span class="text-danger fw-bold fs-5">0</span>'}
            </td>
            <td>
                ${confirmOrder(id) > 0 
                  ? `<button class="confirmOrder" data-bs-toggle="modal" data-bs-target="#completedModal" onclick="completed(${id})"><i class="fa-solid fa-clipboard-check fs-5"></i> <span class="text-success fw-bold fs-4">${confirmOrder(id)}</span></button>` 
                  : '<span class="text-danger fw-bold fs-5">0</span>'}
            </td>

            <td> ${
              stock > 0
                ? stock
                : `<span><img style="height:auto; width:100px;" src="./img/soldOut.png"></span> <button data-bs-toggle="modal" data-bs-target="#restock" class="btn btn-success" onclick="idPass(${id})"><i class="fa-solid fa-retweet"></i> Restock</button>`
            }</td>
            <td>${formatPostTime(date)}</td>
            <td>
            <button class="bg-info" data-bs-toggle="modal" data-bs-target="#seeProduct" onclick="seeProduct(${id})">
            <i class="fa-solid fa-eye"></i>
            </button>
            <button class="bg-warning" data-bs-toggle="modal" data-bs-target="#edite" onclick="dataPass(${id})">
            <i class="fa-solid fa-edit"></i>
            </button>
            <button class="bg-danger" onclick="deleteStudent(${id})">
            <i class="fa-solid fa-trash"></i>
            </button>
            </td>
            </tr>
            
          `;
    });
  }

  getAllStudendData.innerHTML = dataList;
};

document.addEventListener("DOMContentLoaded", function () {
  allProduct();
});

// Data delete LocalStorage

const deleteStudent = (id) => {
  const data = JSON.parse(localStorage.getItem("productData"));
  const orderData = getDataLS("orderData");

  if (confirm("Are you sure that you want to delete this Item?")) {
    const deleteData = data.filter((item) => item.id != id);
    localStorage.setItem("productData", JSON.stringify(deleteData));

    // order data

    const deleteOrderData = orderData.filter((orderItem) => orderItem.id != id);
    localStorage.setItem("orderData", JSON.stringify(deleteOrderData));

    countOrderFunction();
    allProduct();
  }
};

// quick view from dashbord
const productmodal = document.querySelector(".seeProduct");

const seeProduct = (id) => {
  const data = JSON.parse(localStorage.getItem("productData"));

  data.forEach((item) => {
    const { productPhoto, productName, price, productdescription } = item;
    if (item.id == id) {
      productmodal.innerHTML = `
      <div class="d-flex text-start singleContent">
        <img src="${productPhoto}" alt="" class="mb-3 w-25 me-2">
        <div>
          <span>${productName}</span>
          <h2><i class="fa-solid fa-bangladeshi-taka-sign"></i> ${price}</h2>
        </div>
      </div>

      <div class="singleContent text-white">
      
      <p><span>Description:</span> <br>${productdescription}</p>
      </div>`;
    }
  });
};

// product page
const allProducthtml = document.getElementById("allProduct");

const allProductView = () => {
  const getProduct = getDataLS("productData");
  if (getProduct.length < 1) {
    const dataNotFound = document.getElementById('dataNotFound');
    dataNotFound.innerHTML = "Data Not found! Please go to the dashboard and add at least one product"
  }

  let dataList = "";
  if (getProduct) {
    getProduct.reverse().forEach((item) => {
      const {
        productPhoto,
        productName,
        price,
        productdescription,
        stock,
        id,
      } = item;

      dataList += `
      <div class="col-md-2 mb-2 p-2">
        <div class="card p-2 border-0 position-relative">
          <img data-bs-toggle="modal" data-bs-target="#seeProduct" onclick="seeProduct(${id})" src="${productPhoto}" alt="" class="product-img">
          <h6 class="mt-3">${truncateWord(productName)}</h6>
          <button class="productStock"><span>Stock:</span> ${stock}</button>
          <h4 class="text-danger"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${price}</h4>
          `;

      if (stock > 0) {
        dataList += `<button class="btn btn-warning fw-bold" data-bs-toggle="modal" data-bs-target="#buyNow" onclick="buyNowidPass(${id})">Buy Now</button>`;
      } else {
        dataList += `<img src="./img/soldOut.png" style="position: absolute; width: 100%; 
        pointer-events: none;
            transform: rotate(331deg);
            top: 17%;">`;
      }

      dataList += `
        </div>
      </div>
          `;
    });
  }

  allProducthtml.innerHTML = dataList;
};

document.addEventListener("DOMContentLoaded", function () {
  allProductView();
});
