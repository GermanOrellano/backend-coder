class CheckoutDTO {
  constructor(data) {
    this.priceData = {
      productData: { name: data.pid.title },
      currency: "usd",
      unit_amount: data.pid.price * 100,
    };
    this.quantity = data.quantity;
  }
}

export default CheckoutDTO;
