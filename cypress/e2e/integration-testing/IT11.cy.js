describe("Dasbor kebun", () => {
  it("Cek dasbor kebun ditampilkan dengan benar", () => {
    cy.login("nazhwa", "password");
    cy.get("div").contains("Semua Kebun").click();
    cy.get("div").contains("Kebun Tomat").click();

    cy.get("p").should("contain", "Kebun Tomat");
    cy.get("div").should("contain", "Dasbor Kebun");
    cy.get("div").should("contain", "Tentang Kebun");
    cy.get("div").should("contain", "Notifikasi");
    cy.get("div").should("contain", "Histori");
  });
});
