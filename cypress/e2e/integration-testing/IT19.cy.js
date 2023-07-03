describe("Kebun disematkan", () => {
  it("Memeriksa dapat mengubah kebun yang disematkan", () => {
    cy.login("nazhwa", "password");

    cy.get("button").contains("Ubah Sematan").click();
    cy.get("input").parent().parent().contains("Kebun Tomat Buah").click();
    cy.get("button").contains("Simpan Sematan").click();

    cy.get("div").should("contain", "Tidak ada kebun yang disematkan!");
  });
});
