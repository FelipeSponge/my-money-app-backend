const express = require("express");
const auth = require("./auth");
module.exports = function (server) {
  /*
   * Rotas protegidas por Token JWT
   */
  const protectedApi = express.Router();
  server.use("/api", protectedApi);
  protectedApi.use(auth);
  
  const BillingCycle = require("../api/billingCycle/billingCycleService");
  BillingCycle.register(protectedApi, "/billingCycles");
  /*
   * Rotas abertas
   */
  const openApi = express.Router();
  server.use("/oapi", openApi);

  const AuthService = require("../api/user/authService");
  openApi.post("/login", AuthService.login);
  openApi.post("/signup", AuthService.signup);
  openApi.post("/validateToken", AuthService.validateToken);
};

// module.exports = function (server) {
//   // Definir URL base para todas rotas
//   const router = express.Router();
//   server.use("/api", router);
//   // Rotas de Ciclo de Pagamento
//   const BillingCycle = require("../api/billingCycle/billingCycleService");
//   BillingCycle.register(router, "/billingCycles");
// };
