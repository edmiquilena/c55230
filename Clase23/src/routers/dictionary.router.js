import { Router, urlencoded } from "express";

const router = Router();
// * GET dictionary/palabra
// *             space   =>

router.param("word", (req, res, next, paramValue) => {
  console.log(paramValue);
  // *
  // * const def = await dictionaryService.findWord(paramValue)
  if (paramValue !== "palabra") return res.send("Palabra no valida");

  const def =
    paramValue == "palabra"
      ? "Unidad léxica constituida por un sonido o conjunto de sonidos articulados que tienen un significado fijo y una categoría gramatical: buscar palabras en el diccionario; el extranjero no comprendió algunas de las palabras de la conversación."
      : null;

  req.word = def;

  next();
});

router.param("productId", async (req, res, next, productId) => {
  const product = await productManager.findById(productId);
  if (!product) return res.send({ error: true, msg: `Product doesn't exist` });
  req.product = product;
  next();
});

router.param("cartId", async (req, res, next, productId) => {
  const product = await productManager.findById(productId);
  if (!product) return res.send({ error: true, msg: `Invalid Product ID` });
  req.cart = product;
  next();
});

router.get("/products/:productId", async (req, res) => {
  res.send({ result: req.product });
});

router.put("/cart/:cartId/:productId", async (req, res) => {
  cartManager.addProductToCart(req.cart._id, req.product._id);
});

router.delete("/cart/:cartId/:productId", async (req, res) => {});

router.get("/:word([a-zA-Z%20%C3%A1]+)/:lang([a-z]+)", async (req, res) => {
  const { word, lang } = req.params;
  console.log(req.word);
  //const def = await DictionaryService.findWord(word);
  res.send({ word, significado: req.word });
  // => "p" => "palabra"
});
router.get("/all", (req, res) => {
  res.send({ words: [] });
});

// * => GET, POST, PUT, DELETE, PATCH
router.get("*", (req, res) => {
  res.status(404).send({ error: true, msg: "Palabra no encontrada" });
});
router.post("*", (req, res) => {
  res.status(404).send({ error: true, msg: "Metodo no valido!" });
});
export default router;
