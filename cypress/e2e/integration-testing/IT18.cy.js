describe("Kebun disematkan", () => {
  it("Memeriksa dapat menyematkan kebun yang ada", () => {
    cy.login("nazhwa", "password");

    cy.get("button").contains("Sematkan Kebun").click();
    cy.get("div").contains("Kebun Tomat Buah").click();
    cy.get("button").contains("Simpan Sematan").click();

    cy.get("div").should("contain", "Kebun Tomat Buah");
  });
});
