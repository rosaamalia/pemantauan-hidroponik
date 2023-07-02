describe("Formulir pendaftaran akun", () => {
  it("Cek validasi form pendaftaran pada konfirmasi kata sandi tidak cocok", () => {
    cy.visit("/daftar");

    // Memasukkan input ke formulir pendaftaran
    cy.contains("Nama").next().type("Rosa");
    cy.contains("Username").next().type("rosa");
    cy.contains("Nomor WhatsApp").next().type("85830991826");
    cy.contains("Kata Sandi").next().type("password");
    cy.contains("Konfirmasi Kata Sandi").next().type("pass");

    cy.get("div").should(
      "contain",
      "Kata sandi dan konfirmasi kata sandi tidak sama."
    );
  });
});
