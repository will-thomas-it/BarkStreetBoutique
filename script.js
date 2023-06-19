function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validatePhoneNumber(phone) {
  const re = /^\d{10}$/;
  return re.test(phone);
}

function submitForm(event) {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');

  const productName = event.target.dataset.productName; 
  const product = products.find(p => p.name === productName); 

  const cartItem = document.createElement("li");
  cartItem.textContent = productName;

  const cartList = document.querySelector(".cart-items");
  cartList.appendChild(cartItem);

  const cartTotal = document.querySelector(".cart-total");
  const currentTotal = parseFloat(cartTotal.textContent);
  cartTotal.textContent = (currentTotal + product.price).toFixed(2);
}

const products = [
  {
    name: "Pawsome Delights - 30lbs",
    category: "dog",
    description: "The dog food that not only nourishes your furry friend, but also leaves you feeling good about what you're feeding them. Pawsome Delights is a premium line of dog food carefully crafted to provide optimal nutrition and support your dog's overall well-being. What sets Pawsome Delights apart is its commitment to using only the finest, high-quality ingredients sourced from trusted suppliers. Each ingredient is selected with utmost care to ensure it meets the highest standards of nutrition and taste. From farm-fresh meats to wholesome grains and nutrient-rich fruits and vegetables, every element in Pawsome Delights is chosen to provide a balanced and complete diet for your beloved companion. ",
    price: 59.99,
    image: "./images/PawsomeDelights.png"
  },
  {
    name: "WhiskerWise Delicacies - 25lbs",
    category: "cat",
    description: "The cat food that brings both delight to your feline friend and peace of mind to you. WhiskerWise Delicacies is a premium cat food brand meticulously designed to provide optimal nutrition and ensure your cat's overall well-being. What sets WhiskerWise Delicacies apart is its unwavering commitment to using only the finest, carefully selected ingredients. Every recipe is thoughtfully crafted with high-quality proteins, essential vitamins, and minerals that cats need for a balanced and thriving life. From succulent poultry and fish to wholesome grains and garden-fresh vegetables, each ingredient in WhiskerWise Delicacies is chosen to deliver a delicious and nutritious meal that your cat will love.",
    price: 61.99,
    image: "./images/WhiskerWiseDelicacies.png"
  },
  {
  name: " FeatherFeast Naturals - 5lbs",
  category: "bird",
  description: "The bird food that will make your feathered companions chirp with joy while giving you peace of mind. FeatherFeast Naturals is a premium line of bird food meticulously formulated to provide optimal nutrition and support the health and happiness of your avian friends. FeatherFeast Naturals stands out by using only the finest, natural ingredients that cater to the unique dietary needs of birds. Each recipe is crafted with a variety of wholesome seeds, nuts, fruits, and vegetables carefully selected to offer a diverse and well-rounded diet. These ingredients are rich in essential nutrients, vitamins, and minerals that promote vibrant feathers, strong beaks, and overall vitality in birds.",
  price: 20.99,
  image: "./images/FeatherFeastNaturals.png"
  },
  {
    name: " Fins & Flavors - 32oz",
    category: "fish",
    description: "The fish food that brings a delightful feast to your underwater companions while ensuring their health and happiness. Fins & Flavors is a premium line of fish food meticulously crafted to meet the nutritional needs of various aquatic species and enhance their overall well-being. Fins & Flavors stands out by offering a delectable selection of ingredients that not only nourish your fish but also excite their taste buds. Each recipe is thoughtfully formulated with a blend of high-quality proteins, essential vitamins, and minerals that support optimal growth and vibrant colors in your aquatic friends. From carefully sourced seafood to nutrient-rich algae and plant-based ingredients, Fins & Flavors provides a diverse and satisfying diet for your underwater companions.",
    price: 20.99,
    image: "./images/Fins&Flavors.png"
  },
  {
    name: " WhiskerWholesome Rodent Delights - 2lbs",
    category: "rodent",
    description: "The rodent food that brings wholesome nourishment and joy to your small furry friends. WhiskerWholesome Rodent Delights is a premium line of food specially formulated to meet the nutritional needs of rodents while ensuring their overall well-being. WhiskerWholesome Rodent Delights stands out by using only the finest, carefully selected ingredients that promote the health and vitality of your furry companions. Each recipe is thoughtfully crafted with a blend of high-quality grains, seeds, vegetables, and fruits to provide a balanced and nutritious diet. These ingredients are rich in essential nutrients, vitamins, and minerals that support strong teeth, optimal digestion, and overall well-being in rodents.",
    price: 15.99,
    image: "./images/WhiskerWholesomeRodentDelights.png"
  },
  {
    name: "ScaleSavor Reptile Cuisine - 2lbs",
    category: "reptile",
    description: "The reptile food that satisfies the appetite and supports the health of your scaly companions. ScaleSavor Reptile Cuisine is a premium line of food meticulously designed to meet the specific nutritional needs of reptiles while ensuring their overall well-being. ScaleSavor Reptile Cuisine stands out by utilizing a carefully curated selection of high-quality ingredients that provide a well-rounded and balanced diet for reptiles. Each recipe is formulated with a blend of protein-rich insects, vegetables, fruits, and fortified nutrients to mimic the natural diet of reptiles in the wild. These ingredients are packed with essential vitamins, minerals, and amino acids to support proper growth, vibrant skin, and overall vitality in your reptilian friends.",
    price: 29.99,
    image: "./images/ScaleSavorReptileCuisine.png"
  },
];

const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');

function setActiveFilterButton() {
  const filterButtons = document.querySelectorAll(".filter");
  filterButtons.forEach(button => {
    const buttonCategory = button.getAttribute("data-category");
    if (buttonCategory === category) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

function addFilterEventListeners() {
  const filterButtons = document.querySelectorAll(".filter");
  filterButtons.forEach(button => {
    button.addEventListener("click", function() {
      const category = button.getAttribute("data-category");
      history.pushState(null, '', `services.html?category=${category}`);
      renderProducts(category);
      setActiveFilterButton();
    });
  });
}

function renderFilterButtons() {
  const filterContainer = document.querySelector(".filters");
  filterContainer.innerHTML = "";

  const categories = ["all", "dog", "cat", "bird", "fish", "rodent", "reptile"];

  categories.forEach(category => {
    const button = document.createElement("button");
    button.classList.add("filter");
    button.setAttribute("data-category", category);
    button.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    filterContainer.appendChild(button);
  });

  addFilterEventListeners();
}


function renderProducts(category) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  let filteredProducts;
  if (category === null || category === "all") {
    filteredProducts = products;
  } else {
    filteredProducts = products.filter(product => product.category === category);
  }

  filteredProducts.forEach(product => {
    const productItem = document.createElement("div");
    productItem.classList.add("product");

    const productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = product.name;
    productImage.classList.add("product-image");
    productItem.appendChild(productImage);

    const productName = document.createElement("h3");
    productName.textContent = product.name;
    productItem.appendChild(productName);

    const productDescription = document.createElement("p");
    productDescription.textContent = product.description;
    productItem.appendChild(productDescription);

    const productPrice = document.createElement("p");
    productPrice.textContent = "Price: $" + product.price;
    productItem.appendChild(productPrice);

    const addToCartBtn = document.createElement("button");
    addToCartBtn.classList.add("add-to-cart");
    addToCartBtn.textContent = "Add to Cart";
    addToCartBtn.dataset.productName = product.name;
    addToCartBtn.addEventListener("click", submitForm); 
    productItem.appendChild(addToCartBtn);

    productList.appendChild(productItem);
  });
}

renderFilterButtons();
renderProducts(category);
setActiveFilterButton();

