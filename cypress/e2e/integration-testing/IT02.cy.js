describe("Formulir pendaftaran akun", () => {
  it("Cek validasi form pendaftaran dengan data yang valid", () => {
    cy.visit("/daftar");

    // Memasukkan input ke formulir pendaftaran
    cy.contains("Nama").next().type("Rosa");
    cy.contains("Username").next().type("rosa");
    cy.contains("Nomor WhatsApp").next().type("85830991826");
    cy.contains("Kata Sandi").next().type("password");
    cy.contains("Konfirmasi Kata Sandi").next().type("password");

    cy.get("button").contains("Daftar").click();

    // Memeriksa apakah halaman berganti ke halaman verifikasi
    cy.url().should("include", "/verifikasi");
  });
});
