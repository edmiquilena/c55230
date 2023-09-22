import ShopModel from "../models/shop.model.js";

export default class ShopDAO {
  getShops = async () => {
    try {
      const shops = await ShopModel.find({});
      return shops;
    } catch (e) {
      throw new Error("Error obteniendo todas las tiendas: ", e.message);
    }
  };

  getShopById = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("UUID Invalid");
    try {
      const shop = await ShopModel.findOne({ _id: id });
      return shop;
    } catch (e) {
      throw new Error("Error obteniendo una tienda: ", e.message);
    }
  };
  createShop = async (shop) => {
    try {
      // shop.code = ""
      const newShop = await ShopModel.create(shop);
      return newShop;
    } catch (e) {
      throw new Error("Error creando la tienda: ", e.message);
    }

    const carrito = [];
    const compra = [];
    product = ProductModel.findById(productId);
    if (product.stock > order.product.qty) {
      compra.push(product);
    } else {
      return carrito;
    }
  };

  createProduct = async (shopId, product) => {
    try {
      const shop = await this.getShopById(shopId);

      const existingId = shop.products.findIndex(
        (Eproduct) => Eproduct.code == product.code
      );
      if (existingId === -1) {
        shop.products.push(product);
      } else {
        shop.products[existingId].qty += product.qty;
      }
      const updatedShop = await shop.save();
      return updatedShop;
    } catch (e) {
      throw new Error(`Error creando un producto en la tienda ${shopId}`);
    }
  };
}
