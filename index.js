require('./connection');

const Product = require('./models/Product');
const User = require('./models/User');

// Funció per crear un producte
async function createProduct(name, description, price) {
  const product = new Product({ name, description, price });
  await product.save();
  console.log("Product creat:", product);
}

// Funció per crear un usuari amb productes
async function createUser(username, password, products) {
  try {
    const user = new User({ username, password, products });
    await user.save();
    console.log("User creat:", user);
  } catch (error) {
    if (error.code === 11000) {
      console.error(`Error: El username "${username}" ja existeix.`);
    } else {
      console.error("Error creant l'usuari:", error);
    }
  }
}

// Llistar tots els usuaris
async function listUsers() {
  const users = await User.find();
  console.log("Users:", users);
}

// Veure un sol usuari per ID
async function getUserById(userId) {
  const user = await User.findById(userId);
  console.log("User trobat:", user);
}

// Editar un usuari
async function updateUser(userId, newUsername) {
  await User.findByIdAndUpdate(userId, { username: newUsername });
  console.log("User actualitzat");
}

// Esborrar un usuari
async function deleteUser(userId) {
  await User.findByIdAndDelete(userId);
  console.log("User eliminat");
}

// Aggregation Pipeline: Comptar productes per usuari
async function productsPerUser() {
  const result = await User.aggregate([
    { $unwind: "$products" },
    { $group: { _id: "$username", totalProducts: { $sum: 1 } } }
  ]);
  console.log("Productes per usuari:", result);
}

// Exemple d'ús
async function main() {
  await createProduct('portatil', 'Lenovo', 999.00);
  await createProduct('smartphone', 'Samsung', 799.00);

  const products = await Product.find();
  await createUser('annasabater', '123456789', [products[0]]);
  await createUser('kevingomez', '987654321', [products[1]]);

  await listUsers();
  await productsPerUser();
}

main();