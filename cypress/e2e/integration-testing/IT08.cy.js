describe("Formulir tambah kebun", () => {
  it("Cek validasi formulir tambah kebun dengan data nama kebun yang sudah ada", () => {
    cy.intercept("POST", "http://35.219.21.45/api/kebun/").as("kebunRequest");
    cy.login("nazhwa", "password");
    cy.get("div").contains("Tambah Kebun").click();

    // Memasukkan input ke formulir tambah kebun
    cy.contains("Nama Kebun").next().next().type("Kebun Tomat");
    cy.contains("Deskripsi")
      .next()
      .next()
      .type(
        "Kebun tomat jenis tomat buah menggunakan pupuk non organik AB Mix"
      );
    cy.contains("label", "Tomat").click();

    cy.get("button").contains("Tambah Kebun").click();

    cy.wait("@kebunRequest").then((interception) => {
      const response = interception.response;
      expect(response.statusCode).to.equal(400);
      cy.get("div").should("contain", response.body.detail.nama_kebun[0]);
    });
  });
});
