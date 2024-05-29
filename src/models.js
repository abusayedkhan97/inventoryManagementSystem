document.addEventListener("DOMContentLoaded", function () {
  // model
  const model = document.querySelector(".skmodal");
  const btnModal = document.getElementById("btnModal");

  const modalContent = document.querySelector(".skmodal-content");
  const modalClose = document.querySelector(".modal-close");

  const openModal = () => {
    modalContent.style.animation = "fadein .3s ease-out";
    model.style.display = "flex";
  };

  const closeModal = () => {
    modalContent.style.animation = "fadeout .3s ease-out";
    setTimeout(() => {
      model.style.display = "none";
    }, 150);
  };

  btnModal.addEventListener("click", openModal);
  modalClose.addEventListener("click", closeModal);

  window.addEventListener("click", (event) => {
    if (event.target === model) {
      closeModal();
    }
  });

  // Product add
  const createProduct = document.getElementById("createProduct");
  const alertText = document.getElementById("allFildRequired");

  createProduct.onsubmit = (e) => {
    e.preventDefault();
    //get data
    const formData = new FormData(e.target);
    const { productPhoto, productName, price, productdescription, stock } =
      Object.fromEntries(formData);

    if (
      !productPhoto ||
      !productName ||
      !price ||
      !productdescription ||
      !stock
    ) {
      alertText.innerHTML = alert("All fild are requard");
    } else {
      const date = new Date();
      sendDataLS("productData", {
        date,
        id: generateUniqueNumber(),
        productPhoto,
        productName,
        price,
        productdescription,
        stock,
      });

      alertText.innerHTML = alert("Student data create successfully!", "info");
      modalContent.style.animation = "fadeout .3s ease-out";
      setTimeout(() => {
        model.style.display = "none";
      }, 150);
      createProduct.reset();
    }
    allProduct();
  };

  // Update data
  const updateProduct = document.getElementById("updateProduct");
  updateProduct.onsubmit = (e) => {
    const btnClose = document.querySelector(".product-btn-close");
    e.preventDefault();

    const updateProductData = new FormData(e.target);
    const { productPhoto, productName, price, productdescription, stock, id } =
      Object.fromEntries(updateProductData);

    const getDataLS = JSON.parse(localStorage.getItem("productData"));

    // Update data
    const updateData = getDataLS.map((item) => {
      if (item.id == id) {
        return {
          ...item,
          productPhoto,
          productName,
          price,
          productdescription,
          stock,
        };
      } else {
        return item;
      }
    });

    //Update data ls

    localStorage.setItem("productData", JSON.stringify(updateData));
    allProduct();
    btnClose.click();
  };
});

// BILLING DETAILS
document.addEventListener("DOMContentLoaded", function () {
  const buyNow = document.getElementById("buyNow");
  const buyNowbtnclose = document.querySelector(".buyNow-btn-close");
  const orderAlertText = document.getElementById("orderAlertText");

  buyNow.addEventListener("submit", function (e) {
    e.preventDefault();

    //get data
    const formData = new FormData(e.target);
    const { id, name, phone, email, streetAddress, city, postalCode } =
      Object.fromEntries(formData);

    if (!name || !phone || !email || !streetAddress || !city || !postalCode) {
      orderAlertText.innerHTML = alert("All fild are requard");
    } else if (!isEmail(email)) {
      orderAlertText.innerHTML = alert("Invalid Email Address", "warning");
    } else if (!isMobile(phone)) {
      orderAlertText.innerHTML = alert("Invalid Mobile Number", "warning");
    }else {
      const date = new Date();
      sendDataLS("orderData", {
        date,
        id2: generateUniqueNumber(),
        id,
        name,
        phone,
        email,
        streetAddress,
        city,
        postalCode,
        conformOrder: false,
      });
      
      // Show success message with animation
      const successMessage = document.getElementById("successMessage");
      successMessage.classList.remove("hidden");
      successMessage.classList.add("show");

      // Hide the success message after 3 seconds
      setTimeout(() => {
        successMessage.classList.remove("show");
        successMessage.classList.add("hidden");
      }, 3000);

      e.target.reset();
      buyNowbtnclose.click();

      // stock থেকে একটা data কমে যাবে
      const getProduct = getDataLS("productData");

      // Update stuck data
      const updateData = getProduct.map((item) => {
        if (item.id == id) {
          const updateStock = item.stock - 1;
          return {
            ...item,
            stock: updateStock,
          };
        } else {
          return item;
        }
      });

      localStorage.setItem("productData", JSON.stringify(updateData));

      allProductView();
      allProduct();
      
    }
  });
});

// Restock
const updateStock = document.getElementById("restock");

updateStock.onsubmit = (e) => {
  const btnClose = document.querySelector(".product-restock-btn-close");
  e.preventDefault();

  const updateStockData = new FormData(e.target);
  const { productRestock, id } = Object.fromEntries(updateStockData);

  const getDataLS = JSON.parse(localStorage.getItem("productData"));

  // Update data
  const updateData = getDataLS.map((item) => {
    if (item.id == id) {
      return {
        ...item,
        stock: productRestock,
      };
    } else {
      return item;
    }
  });

  //Update data ls

  localStorage.setItem("productData", JSON.stringify(updateData));
  allProduct();
  btnClose.click();
};

// Order showing
const countOrderFunction = () => {
  // html class
  const totalOrder = document.querySelector(".total-order");
  const newOrder = document.querySelector(".new-order");
  const completedOrder = document.querySelector(".completed-order");

  // local storage get data
  const orderData = getDataLS("orderData");

  let totalOrderCount = 0;
  let newCount = 0;
  let completedCount = 0;
  if (orderData) {
    orderData.forEach((item, index) => {
      totalOrderCount = index + 1;

      // get new order
      if (item.conformOrder == false) {
        newCount++;
      }

      // get order completed
      if (item.conformOrder == true) {
        completedCount++;
      }
    });
  }else{
    totalOrder.innerHTML = 0;
  }

  totalOrder.innerHTML = totalOrderCount;
  newOrder.innerHTML = newCount;
  completedOrder.innerHTML = completedCount;
};

document.addEventListener("DOMContentLoaded", function () {
  countOrderFunction();
});

// new order manage
function newOrderManage(id) {
  const newOrderModal = document.getElementById("getNewOrderList");

  let allnewOrder = "";
  const orderData = getDataLS("orderData");

  let index = 0;
  orderData.forEach((item) => {
    if (item.id == id && item.conformOrder == false) {
      index ++;
      allnewOrder += `
      <tr>
        <td>${index}</td>
        <td>${item.name}</td>
        <td>${item.phone}</td>
        <td>${item.email}</td>
        <td>${item.streetAddress}</td>
        <td>${item.city}</td>
        <td>${item.postalCode}</td>
        <td><button onclick="orderComplited(${
          item.id2
        })"><i class="fa-solid fa-check fs-2 text-success"></i></button></td>
      </tr>
      `;
    }
  });

  newOrderModal.innerHTML = allnewOrder;
}

// completed manage
function completed(id) {
  const completedModal = document.getElementById("getcompletedList");

  let allcompleted = "";
  const orderData = getDataLS("orderData");
  let index = 0;
  orderData.forEach((item) => {
    
    if (item.id == id && item.conformOrder == true) {
      index++;
      allcompleted += `
      <tr>
      <td>${index}</td>
      <td>${item.name}</td>
      <td>${item.phone}</td>
      <td>${item.email}</td>
      <td>${item.streetAddress}</td>
      <td>${item.city}</td>
      <td>${item.postalCode}</td>
      </tr>
      `;
    }
  });
  
  completedModal.innerHTML = allcompleted;
}
