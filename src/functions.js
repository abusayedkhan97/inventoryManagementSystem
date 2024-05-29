// alert

const alert = (msg, type = "danger") => {
  return `<p class="alert alert-${type} d-flex justify-content-between">${msg}<button class="btn-close" data-bs-dismiss="alert"></button></p>`;
};

// email validation
const isEmail = (email) => {
  const pattern = /^[a-z0-9\._]{2,}@[a-z0-9]{2,}\.[a-z]{2,5}$/;
  return pattern.test(email);
};

const isMobile = (mobile) => {
  const pattern = /^(\+8801|8801|01)[0-9]{9}$/;

  return pattern.test(mobile);
};
// Data send LocalStorage
const sendDataLS = (key, sendData) => {
  const data = localStorage.getItem(key);
  let lsData;
  if (data) {
    lsData = JSON.parse(data);
  } else {
    lsData = [];
  }

  lsData.push(sendData);

  localStorage.setItem(key, JSON.stringify(lsData));
};

// Data Get LocalStorage

const getDataLS = (key) => {
  const data = localStorage.getItem(key);

  if (data) {
    return JSON.parse(data);
  } else {
    false;
  }
};

// add result id pass

function dataPass(id) {
  // local storage data
  const getProduct = getDataLS("productData");

  document.querySelector('#updateProduct input[name="id"]').value = id;

  const form = document.getElementById("updateProduct");
  getProduct.forEach((item) => {
    if (item.id == id) {
      form.querySelector('input[name="productPhoto"]').value =
        item.productPhoto;
      form.querySelector('input[name="productName"]').value = item.productName;
      form.querySelector('input[name="price"]').value = item.price;
      form.querySelector('textarea[name="productdescription"]').value =
        item.productdescription;
      form.querySelector('input[name="stock"]').value = item.stock;
    }
  });
}

// Word fixt
function truncateWord(word) {
  if (word.length > 17) {
    return word.slice(0, 17) + "...";
  } else {
    return word;
  }
}

// generateUniqueNumber
function generateUniqueNumber() {
  let numbers = []; // Array to store generated numbers
  let randomNumber;

  do {
    randomNumber = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit number
  } while (numbers.includes(randomNumber)); // Check if the number is already generated

  numbers.push(randomNumber); // Add the number to the array

  return randomNumber;
}

// buyNowidPass

function buyNowidPass(id) {
  const buyNowForm = document.getElementById("buyNow");
  buyNowForm.querySelector('input[name="id"]').value = id;
}

// idPass updateStock
function idPass(id) {
  updateStock.querySelector('input[name="id"]').value = id;
}


// Dashbord order show
function order(id) {
  const orderData = getDataLS("orderData");
  if (orderData) {
    let cont = 0;
  orderData.forEach((item) => {
    if (item.id == id && item.conformOrder == false) {
      cont++;
    }
  });
  return cont;
  }
}

function confirmOrder(id) {
  const orderData = getDataLS("orderData");
  if (orderData) {
    let cont = 0;
  orderData.forEach((item) => {
    if (item.id == id && item.conformOrder == true) {
      cont++;
    }
  });
  return cont;
  }
}

function orderComplited(id) {
  const orderData = getDataLS("orderData");
  let newOrderManageID;
  if (orderData) {
    const updateData = orderData.map((item) => {
      if (item.id2 == id) {
        newOrderManageID = item.id;
        return {
          ...item,
          conformOrder: true,
        };
      } else {
        return item;
      }
    });
    
    localStorage.setItem("orderData", JSON.stringify(updateData));
  }
  
  newOrderManage(newOrderManageID);
  countOrderFunction();
  allProduct();
}

// formatPostTime
function formatPostTime(postDate) {
  const currentDate = new Date();
  // Convert the string to a Date object
  const parsedPostDate = new Date(postDate);
  const diff = currentDate - parsedPostDate;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 7) {
    return parsedPostDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } else if (days > 1) {
    return `${days} days ago`;
  } else if (days === 1) {
    return "Yesterday";
  } else if (hours >= 1) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes >= 1) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
}