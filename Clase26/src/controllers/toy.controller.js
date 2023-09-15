/**
 * ?  TOY CONTROLLER
 */
import * as ToyServices from "../services/toy.service.js";

export const GETAllToys = async (req, res) => {
  try {
    const Toys = await ToyServices.GetAllToys(req.query);
    res.send({ results: Toys });
  } catch (e) {}
};

export const GETToyById = async (req, res) => {
  try {
    const toy = await ToyServices.GetOneToyById(req.params.id);
    res.send({ toy });
  } catch (e) {}
};

export const POSTNewToy = async (req, res) => {
  try {
    const { name, price } = req.body;

    const createToy = await ToyServices.CreateToy(req.body);

    res.send({ results: createToy });
  } catch (e) {}
};
