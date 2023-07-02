describe("Formulir pendaftaran akun", () => {
  it("Cek validasi form pendaftaran pada kolom nomor WhatsApp dan username", () => {
    cy.intercept("POST", "http://35.219.21.45/api/auth/register").as(
      "registerRequest"
    );
    cy.visit("/daftar");

    // Memasukkan input ke formulir pendaftaran
    cy.contains("Nama").next().type("Rosa");
    cy.contains("Username").next().type("rosa");
    cy.contains("Nomor WhatsApp").next().type("85830991826");
    cy.contains("Kata Sandi").next().type("password");
    cy.contains("Konfirmasi Kata Sandi").next().type("password");

    cy.get("button").contains("Daftar").click();

    cy.wait("@registerRequest").then((interception) => {
      const response = interception.response;
      expect(response.statusCode).to.equal(400);
      cy.get("div").should("contain", response.body.detail.nomor_whatsapp[0]);
      cy.get("div").should("contain", response.body.detail.username[0]);
    });
  });
});
