describe("Formulir tambah kebun", () => {
  it("Cek validasi formulir tambah kebun dengan field kosong", () => {
    cy.intercept("POST", "http://35.219.21.45/api/kebun/").as("kebunRequest");
    cy.login("nazhwa", "password");
    cy.get("div").contains("Tambah Kebun").click();

    // Field formulir tambah kebun kosong

    cy.get("button").contains("Tambah Kebun").click();

    cy.wait("@kebunRequest").then((interception) => {
      const response = interception.response;
      expect(response.statusCode).to.equal(400);
      cy.get("div").should("contain", response.body.detail.nama_kebun[0]);
      cy.get("div").should("contain", response.body.detail.deskripsi[0]);
    });
  });
});
