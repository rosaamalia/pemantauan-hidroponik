describe("Semua kebun", () => {
  it("Cek field pencarian pada halaman 'Semua Kebun'", () => {
    cy.login("nazhwa", "password");
    cy.get("div").contains("Semua Kebun").click();

    // Mengisi field pencarian
    cy.get("input[placeholder='Cari kebun']").type("tomat{enter}");

    cy.url().should("include", "/cari?query=tomat");
  });
});
