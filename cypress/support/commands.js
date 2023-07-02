Cypress.Commands.add("login", (username, password) => {
  cy.visit("/masuk");
  cy.contains("Username").next().type(username);
  cy.contains("Kata Sandi").next().type(password);
  cy.get("button").contains("Masuk").click();
});
