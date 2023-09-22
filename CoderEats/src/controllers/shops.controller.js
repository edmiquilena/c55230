import ShopDAO from "../daos/shops.dao.js";
const ShopService = new ShopDAO();
export const GETShops = async (req, res) => {
  try {
    const shops = await ShopService.getShops();
    res.send({ shops });
  } catch (e) {
    res.status(500).send({ error: true, msg: e.message });
  }
};

export const GETShopById = async (req, res) => {
  try {
    const { shopId } = req.params;
    const shop = await ShopService.getShopById(shopId);
    res.send({ shop });
  } catch (e) {
    res.status(500).send({ error: true, msg: e.message });
  }
};

export const POSTNewShop = async (req, res) => {
  try {
    const { body: newShop } = req;
    const createdShop = await ShopService.createShop(newShop);
    res.send({ shop: createdShop });
  } catch (e) {
    res.status(500).send({ error: true, msg: e.message });
  }
};
export const PUTNewProduct = async (req, res) => {
  try {
    const { shopId } = req.params;
    const { body: newProduct } = req;
    const updatedShop = await ShopService.createProduct(shopId, newProduct);
    res.send({ shop: updatedShop });
  } catch (e) {
    res.status(500).send({ error: true, msg: e.message });
  }
};
