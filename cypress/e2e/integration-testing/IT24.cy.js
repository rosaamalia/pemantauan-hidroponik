describe("Informasi Tanaman", () => {
  it("Cek field pencarian pada halaman 'Informasi Tanaman'", () => {
    cy.intercept(
      "GET",
      "http://35.219.21.45/api/jenis-tanaman/cari?q=tomat&page=*"
    ).as("tanamanRequest");
    cy.login("rosa", "katasandi");
    cy.get("div").contains("Informasi Tanaman").click();

    // Mengisi field pencarian
    cy.get("input[placeholder='Cari tanaman']").type("tomat{enter}");

    cy.url().should("include", "/cari?query=tomat");
    cy.wait("@tanamanRequest", { timeout: 30000 }).then((interception) => {
      const response = interception.response;
      expect(response.statusCode).to.equal(200);
      cy.get("div").should("contain", response.body.results[0].nama_tanaman);
    });
  });
});
