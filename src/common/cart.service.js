import fb from "@/common/firebase.config";

const uid = fb.auth().currentUser.uid;
const cartURL = `cart/${uid}/products`;

export const addToCart = product => {
  if (this.cart.length > 0) {
    let productExists = this.cart.find(
      productInCart => productInCart.name === product.name
    );
    if (productExists) {
      updateProduct(product, productExists);
    } else {
      callAddToCart(product);
    }
  } else {
    callAddToCart(product);
  }
};

const callAddToCart = product => {
  let productToAdd = {
    name: product.name,
    price: product.price,
    img: product.img,
    id: product[".key"],
    quantity: 1
  };
  fb.db
    .ref(cartURL)
    .push(productToAdd)
    .then(response => {
      productToAdd.key = response.key;
      this.cart.push(productToAdd);
      this.$toastr.success(`Product ${product.name} added to Cart`, "Awesome!");
    });
};

const updateProduct = (product, prevProduct) => {
  let productToUpdate = {
    quantity: prevProduct.quantity + 1
  };
  const updateCartURL = `cart/${uid}/products/${prevProduct.key}`;
  fb.db
    .ref(updateCartURL)
    .update(productToUpdate)
    .then(response => {
      let indexToUpdate = this.cart.findIndex(
        product => product.name === prevProduct.name
      );
      this.cart[indexToUpdate].quantity += 1;
      this.$toastr.info(
        `Product ${product.name} is updated in cart`,
        "Awesome!"
      );
    });
};

export default { addToCart };
