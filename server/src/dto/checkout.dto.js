class CheckoutDTO {
  constructor(data) {
    this.priceData = {
      productData: { name: data.product_id.title },
      currency: "usd",
      unit_amount: data.product_id.price * 100,
    };
    this.quantity = data.quantity;
  }
}

export default CheckoutDTO;
