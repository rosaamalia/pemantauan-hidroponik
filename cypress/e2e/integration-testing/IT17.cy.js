describe("Dasbor kebun", () => {
  it("Cek edit nama kebun dan deskripsi kebun dengan data valid", () => {
    cy.intercept("PUT", "http://35.219.21.45/api/kebun/*").as("kebunRequest");
    cy.login("nazhwa", "password");

    cy.get("div").contains("Semua Kebun").click();
    cy.get("div").contains("Kebun Tomat").click();

    cy.get("div").contains("Tentang Kebun").click();
    cy.get("button").contains("Edit Informasi Kebun").click();

    cy.contains("Nama Kebun").next().next().type(" Buah");
    cy.contains("Deskripsi")
      .next()
      .next()
      .type(
        "{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}organik"
      );

    cy.get("button").contains("Simpan Informasi Kebun").click();

    cy.wait("@kebunRequest").then((interception) => {
      const response = interception.response;
      expect(response.statusCode).to.equal(200);
      cy.get("div").should("contain", response.body.message);
      cy.get("button").contains("Kembali").click();
      cy.get("p").should("contain", response.body.data.nama_kebun);
    });
  });
});
