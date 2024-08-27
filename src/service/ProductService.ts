interface Product {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    image?: string;
    price?: number;
    category?: string;
    quantity?: number;
    rating?: number;
    inventoryStatus?: string;
  }
  export const ProductService = {
    getProducts(): Promise<Product[]> {
      return new Promise((resolve) => {
        setTimeout(() => {
                resolve([
                    { id: '0001', code: 'f230fh0g3', name: 'Bamboo Watch', description: 'Product Description', image: 'bamboo-watch.jpg', price: 65, category: 'Accessories', quantity: 24, inventoryStatus: 'INSTOCK', rating: 5 },
                    { id: '0002', code: 'nvklal433', name: 'Black Watch', description: 'Product Description', image: 'black-watch.jpg', price: 72, category: 'Accessories', quantity: 61, inventoryStatus: 'INSTOCK', rating: 4 },
                    { id: '0003', code: 'zz21cz3c1', name: 'Blue Band', description: 'Product Description', image: 'blue-band.jpg', price: 79, category: 'Fitness', quantity: 2, inventoryStatus: 'LOWSTOCK', rating: 3 },
                    { id: '0004', code: '244wgerg2', name: 'Blue T-Shirt', description: 'Product Description', image: 'blue-t-shirt.jpg', price: 29, category: 'Clothing', quantity: 25, inventoryStatus: 'INSTOCK', rating: 5 },
                    { id: '0005', code: 'h456wer53', name: 'Bracelet', description: 'Product Description', image: 'bracelet.jpg', price: 15, category: 'Accessories', quantity: 73, inventoryStatus: 'INSTOCK', rating: 4 },
                    { id: '0006', code: 'av2231fwg', name: 'Brown Purse', description: 'Product Description', image: 'brown-purse.jpg', price: 120, category: 'Accessories', quantity: 0, inventoryStatus: 'OUTOFSTOCK', rating: 4 },
                    { id: '0007', code: 'bib36pfvm', name: 'Chakra Bracelet', description: 'Product Description', image: 'chakra-bracelet.jpg', price: 32, category: 'Accessories', quantity: 5, inventoryStatus: 'LOWSTOCK', rating: 3 },
                    { id: '0008', code: 'mbvjkgip5', name: 'Galaxy Earrings', description: 'Product Description', image: 'galaxy-earrings.jpg', price: 34, category: 'Accessories', quantity: 23, inventoryStatus: 'INSTOCK', rating: 5 },
                    { id: '0009', code: 'vbb124btr', name: 'Game Controller', description: 'Product Description', image: 'game-controller.jpg', price: 99, category: 'Electronics', quantity: 2, inventoryStatus: 'LOWSTOCK', rating: 4 },
                    { id: '0010', code: 'cm230f032', name: 'Gaming Set', description: 'Product Description', image: 'gaming-set.jpg', price: 299, category: 'Electronics', quantity: 63, inventoryStatus: 'INSTOCK', rating: 3 },
                    { id: '0011', code: 'plb34234v', name: 'Gold Phone Case', description: 'Product Description', image: 'gold-phone-case.jpg', price: 24, category: 'Accessories', quantity: 0, inventoryStatus: 'OUTOFSTOCK', rating: 4 },
                    { id: '0012', code: '4920nnc2d', name: 'Green Earbuds', description: 'Product Description', image: 'green-earbuds.jpg', price: 89, category: 'Electronics', quantity: 23, inventoryStatus: 'INSTOCK', rating: 3 },
                    { id: '0013', code: '250vm23cc', name: 'Green T-Shirt', description: 'Product Description', image: 'green-t-shirt.jpg', price: 49, category: 'Clothing', quantity: 74, inventoryStatus: 'INSTOCK', rating: 5 },
                    { id: '0014', code: 'fldsmn31b', name: 'Grey T-Shirt', description: 'Product Description', image: 'grey-t-shirt.jpg', price: 48, category: 'Clothing', quantity: 0, inventoryStatus: 'OUTOFSTOCK', rating: 3 },
                    { id: '0015', code: 'waas1x2as', name: 'Headphones', description: 'Product Description', image: 'headphones.jpg', price: 175, category: 'Electronics', quantity: 8, inventoryStatus: 'LOWSTOCK', rating: 5 },
                    { id: '0016', code: 'vb34btbg5', name: 'Light Green T-Shirt', description: 'Product Description', image: 'light-green-t-shirt.jpg', price: 49, category: 'Clothing', quantity: 34, inventoryStatus: 'INSTOCK', rating: 4 },
                    { id: '0017', code: 'k8l6j58jl', name: 'Lime Band', description: 'Product Description', image: 'lime-band.jpg', price: 79, category: 'Fitness', quantity: 12, inventoryStatus: 'INSTOCK', rating: 3 },
                    { id: '0018', code: 'v435nn85n', name: 'Mini Speakers', description: 'Product Description', image: 'mini-speakers.jpg', price: 85, category: 'Electronics', quantity: 42, inventoryStatus: 'INSTOCK', rating: 4 },
                    { id: '0019', code: '09zx9c0zc', name: 'Painted Phone Case', description: 'Product Description', image: 'painted-phone-case.jpg', price: 56, category: 'Accessories', quantity: 41, inventoryStatus: 'INSTOCK', rating: 5 },
                    { id: '0020', code: 'mnb5mb2m5', name: 'Pink Band', description: 'Product Description', image: 'pink-band.jpg', price: 79, category: 'Fitness', quantity: 63, inventoryStatus: 'INSTOCK', rating: 4 },
                    { id: '0021', code: 'r23fwf2w3', name: 'Pink Purse', description: 'Product Description', image: 'pink-purse.jpg', price: 110, category: 'Accessories', quantity: 0, inventoryStatus: 'OUTOFSTOCK', rating: 4 },
                    { id: '0022', code: 'pxpzczo23', name: 'Purple Band', description: 'Product Description', image: 'purple-band.jpg', price: 79, category: 'Fitness', quantity: 6, inventoryStatus: 'LOWSTOCK', rating: 3 },
                    { id: '0023', code: '2c42cb5cb', name: 'Purple Gemstone Necklace', description: 'Product Description', image: 'purple-gemstone-necklace.jpg', price: 45, category: 'Accessories', quantity: 62, inventoryStatus: 'INSTOCK', rating: 4 },
                    { id: '0024', code: '5k43kkk23', name: 'Purple T-Shirt', description: 'Product Description', image: 'purple-t-shirt.jpg', price: 49, category: 'Clothing', quantity: 2, inventoryStatus: 'LOWSTOCK', rating: 5 },
                    { id: '0025', code: 'lm25cbb34', name: 'Shoes', description: 'Product Description', image: 'shoes.jpg', price: 40, category: 'Clothing', quantity: 0, inventoryStatus: 'OUTOFSTOCK', rating: 4 },
                    { id: '0026', code: 'nbm5vbb22', name: 'Sneakers', description: 'Product Description', image: 'sneakers.jpg', price: 78, category: 'Clothing', quantity: 52, inventoryStatus: 'INSTOCK', rating: 4 },
                    { id: '0027', code: 'zx23zc42c', name: 'Teal T-Shirt', description: 'Product Description', image: 'teal-t-shirt.jpg', price: 49, category: 'Clothing', quantity: 3, inventoryStatus: 'LOWSTOCK', rating: 3 },
                    { id: '0028', code: 'acvx8621e', name: 'Yellow Earbuds', description: 'Product Description', image: 'yellow-earbuds.jpg', price: 89, category: 'Electronics', quantity: 35, inventoryStatus: 'INSTOCK', rating: 3 },
                    { id: '0029', code: 'tx125ck42', name: 'Yoga Mat', description: 'Product Description', image: 'yoga-mat.jpg', price: 20, category: 'Fitness', quantity: 15, inventoryStatus: 'INSTOCK', rating: 5 },
                    { id: '0030', code: 'gwuby345v', name: 'Yoga Set', description: 'Product Description', image: 'yoga-set.jpg', price: 20, category: 'Fitness', quantity: 25, inventoryStatus: 'INSTOCK', rating: 8 }
                   
                ]);
            }, 1000);
        });
    }
};
