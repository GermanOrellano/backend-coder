import repository from "../repositories/payments.rep.js";

class PaymentsService {
  constructor() {
    this.repository = repository;
  }
  checkout = async ({ filter, orderAndPaginate }) =>
    await this.repository.checkout({ filter, orderAndPaginate });
}
const service = new PaymentsService();
export default service;
