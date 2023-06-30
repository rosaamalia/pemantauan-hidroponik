describe("Formulir pendaftaran akun", () => {
  it("01. Cek validasi form pendaftaran pada data yang benar", () => {
    cy.visit("/daftar");

    // Memasukkan input ke formulir pendaftaran
    cy.contains("Nama").next().type("Nazhwa");
    cy.contains("Username").next().type("nazhwa");
    cy.contains("Nomor WhatsApp").next().type("85830991826");
    cy.contains("Kata Sandi").next().type("password");
    cy.contains("Konfirmasi Kata Sandi").next().type("password");

    cy.get("button").contains("Daftar").click();

    // Memeriksa apakah halaman berganti ke halaman verifikasi
    cy.url().should("include", "/verifikasi");
  });

  it("02. Cek validasi form pendaftaran pada konfirmasi kata sandi tidak cocok", () => {
    cy.visit("/daftar");

    // Memasukkan input ke formulir pendaftaran
    cy.contains("Nama").next().type("Nazhwa");
    cy.contains("Username").next().type("nazhwa");
    cy.contains("Nomor WhatsApp").next().type("85830991826");
    cy.contains("Kata Sandi").next().type("password");
    cy.contains("Konfirmasi Kata Sandi").next().type("pass");

    cy.get("div").should(
      "contain",
      "Kata sandi dan konfirmasi kata sandi tidak sama."
    );
  });

  it("03. Cek validasi form pendaftaran pada kolom nomor WhatsApp hanya menerima nomor yang belum terdaftar", () => {
    cy.intercept("POST", "http://35.219.21.45/api/auth/register").as(
      "registerRequest"
    );
    cy.visit("/daftar");

    // Memasukkan input ke formulir pendaftaran
    cy.contains("Nama").next().type("Nazhwa");
    cy.contains("Username").next().type("nazhwa_2");
    cy.contains("Nomor WhatsApp").next().type("85830991826");
    cy.contains("Kata Sandi").next().type("password");
    cy.contains("Konfirmasi Kata Sandi").next().type("pass");

    cy.get("button").contains("Daftar").click();

    cy.wait("@registerRequest").then((interception) => {
      const response = interception.response;
      expect(response.statusCode).to.equal(400);
      cy.get("div").should("contain", response.body.detail.nomor_whatsapp[0]);
    });
  });
});
