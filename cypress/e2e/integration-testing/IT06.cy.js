describe("Formulir verifikasi kode registrasi", () => {
  it("Cek validasi kode verifikasi dengan kode yang benar", () => {
    cy.intercept(
      "POST",
      "http://35.219.21.45/api/verifikasi/verifikasi-kode-registrasi"
    ).as("kodeVerifikasiRequest");
    cy.visit("/daftar");

    // Memasukkan input ke formulir pendaftaran
    cy.contains("Nama").next().type("Nazhwa");
    cy.contains("Username").next().type("nazhwa");
    cy.contains("Nomor WhatsApp").next().type("85830991826");
    cy.contains("Kata Sandi").next().type("password");
    cy.contains("Konfirmasi Kata Sandi").next().type("password");

    cy.get("button").contains("Daftar").click();

    cy.pause(); // Untuk menambahkan kode sendiri

    cy.get("button").contains("Verifikasi").click();

    cy.wait("@kodeVerifikasiRequest").then((interception) => {
      const response = interception.response;
      expect(response.statusCode).to.equal(200);
      cy.url().should("include", "/beranda");
    });
  });
});
