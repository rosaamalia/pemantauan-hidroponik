describe("Formulir verifikasi kode registrasi", () => {
  it("Cek validasi kode verifikasi jika menerima kode salah", () => {
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

    cy.get(".chakra-form-control > .chakra-stack > :nth-child(1)").type(12345);

    cy.get("button").contains("Verifikasi").click();

    cy.wait("@kodeVerifikasiRequest").then((interception) => {
      const response = interception.response;
      expect(response.statusCode).to.equal(400);
      cy.get("div").should("contain", response.body.detail);
    });
  });
});
