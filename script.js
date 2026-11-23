
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
        image: "https://placehold.co/600x400/101a2b/00d9ff?text=Ryzen+7"
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
                <button type="button">Ver produto</button>
            </div>
        </article>
    `).join("");
}

searchInput.addEventListener("input", renderProducts);
categoryFilter.addEventListener("change", renderProducts);

renderProducts();
