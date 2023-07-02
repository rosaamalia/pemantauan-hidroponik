describe("Dasbor kebun", () => {
  it("Dapat melakukan filter rentang tanggal saat melihat data dalam bentuk tabel", () => {
    cy.login("nazhwa", "password");

    cy.get("div").contains("Semua Kebun").click();
    cy.get("div").contains("Kebun Tomat").click();

    cy.get("div").contains("Histori").click();

    cy.get("input:nth-child(1)").type("2023-06-23");
    cy.get("input:nth-child(3)").type("2023-07-02");
    cy.get("button").contains("Cari").click();

    cy.get("td:nth-child(1)").should("contain", "Minggu, 02 Juli 2023");
  });
});
