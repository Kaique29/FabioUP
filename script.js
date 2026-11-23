
const products = [
    {
        name: "GeForce RTX 4060",
        category: "Placas de vídeo",
        price: 1899.90,
        image: "https://placehold.co/600x400/101a2b/00d9ff?text=RTX+4060"
    },
    {
        name: "Ryzen 7 5700X",
        category: "Processadores",
        price: 1099.90,
        image: "https://placehold.co/600x400/101a2b/00d9ff?text=Ryzen+7+5700X"
    },
    {
        name: "Memória RAM 16GB DDR4",
        category: "Memórias",
        price: 299.90,
        image: "https://placehold.co/600x400/101a2b/00d9ff?text=RAM+16GB"
    },
    {
        name: "SSD NVMe 1TB",
        category: "Armazenamento",
        price: 459.90,
        image: "https://placehold.co/600x400/101a2b/00d9ff?text=SSD+1TB"
    }
];

const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
// CARRINHO DE COMPRAS
const cart = [];
const cartCount = document.getElementById("cart-count");
const cartButton = document.getElementById("cart-button");

function renderProducts() {
    const search = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    const filteredProducts = products.filter(product => {
        const matchesName = product.name.toLowerCase().includes(search);
        const matchesCategory = category === "todos" ||
            product.category === category;

        return matchesName && matchesCategory;
    });

    if (filteredProducts.length === 0) {
        productList.innerHTML = "<p>Nenhum produto encontrado.</p>";
        return;
    }

    productList.innerHTML = filteredProducts.map(product => `
        <article class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <span>${product.category}</span>
                <h3>${product.name}</h3>
                <strong>
                    ${product.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}
                </strong>
                <button type="button" class="add-to-cart">
                    Adicionar ao carrinho
                </button>
            </div>
        </article>
    `).join("");
}

searchInput.addEventListener("input", renderProducts);
categoryFilter.addEventListener("change", renderProducts);

renderProducts();

// ADICIONAR PRODUTOS AO CARRINHO
productList.addEventListener("click", function(event) {
    if (event.target.classList.contains("add-to-cart")) {
        const card = event.target.closest(".product-card");
        const productName = card.querySelector("h3").textContent;

        const product = products.find(item => item.name === productName);

        if (product) {
            cart.push(product);
            cartCount.textContent = cart.length;

            event.target.textContent = "Adicionado!";

            setTimeout(() => {
                event.target.textContent = "Adicionar ao carrinho";
            }, 1000);
        }
    }
});

// VISUALIZAR CARRINHO
cartButton.addEventListener("click", function() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const total = cart.reduce((sum, product) => sum + product.price, 0);

    alert(
        "Itens no carrinho: " + cart.length +
        "\nTotal: " + total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
    );
});