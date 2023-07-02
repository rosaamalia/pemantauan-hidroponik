describe("Kebun disematkan", () => {
  it("Memeriksa dapat mengubah kebun yang disematkan", () => {
    cy.login("nazhwa", "password");

    cy.get("button").contains("Ubah Sematan").click();
    cy.get("div").contains("Kebun Tomat Buah").parent().find("input").click();
    cy.get("button").contains("Simpan Sematan").click();

    cy.get("div").should().not("contain", "Kebun Tomat Buah");
  });
});
