import Stripe from "stripe";
import env from "../utils/env.util.js";
import dao from "../data/index.factory.js";
import CheckoutDTO from "../dto/checkout.dto.js";

const { orders } = dao;
const stripe = new Stripe(env.SECRET_KEY_STRIPE);

class PaymentsRep {
  constructor() {
    this.model = orders;
  }

  read = async ({ filter, orderAndPaginate }) =>
    await this.model.read(filter, orderAndPaginate);
  checkout = async ({ filter, orderAndPaginate }) => {
    const cart = await orders.read({ filter, orderAndPaginate });
    let productsCart = cart.docs;
    productsCart = productsCart.map((each) => new CheckoutDTO(each));
    const line_items = productsCart;
    const mode = "payment";
    const success_url = ""; //agregar link de agradecimiento
    const intent = await stripe.checkout.sessions.create({
      line_items,
      mode,
      success_url,
    });
    return intent;
  };
}

const repository = new PaymentsRep();
export default repository;
