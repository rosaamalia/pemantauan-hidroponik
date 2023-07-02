describe("Dasbor kebun", () => {
  it("Dapat melihat histori dalam bentuk tabel", () => {
    cy.intercept("Get", "http://35.219.21.45/api/kebun/*/data?page=1").as(
      "dataKebunRequest"
    );
    cy.login("nazhwa", "password");

    cy.get("div").contains("Semua Kebun").click();
    cy.get("div").contains("Kebun Tomat").click();

    cy.get("div").contains("Histori").click();

    cy.wait("@dataKebunRequest", { timeout: 20000 }).then((interception) => {
      const response = interception.response;
      expect(response.statusCode).to.equal(200);
    });
  });
});
