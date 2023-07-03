describe("Edit profil", () => {
  it("Cek validasi ubah kata sandi jika kata sandi valid", () => {
    cy.intercept("PUT", "http://35.219.21.45/api/akun/update-kata-sandi").as(
      "akunRequest"
    );
    cy.login("rosa", "password");

    cy.get("div").contains("PROFIL SELENGKAPNYA").click();
    cy.get("button").contains("Edit Profil").click();

    cy.get("button").contains("Ubah Kata Sandi").click();

    cy.contains("Kata Sandi Lama").next().type("password");
    cy.contains("Kata Sandi Baru").next().type("katasandi");
    cy.contains("Konfirmasi Kata Sandi Baru").next().type("katasandi");

    cy.get("button").contains("Simpan Perubahan").click();

    cy.wait("@akunRequest").then((interception) => {
      const response = interception.response;
      expect(response.statusCode).to.equal(200);
      cy.get("div").should("contain", response.body.message);
    });
  });
});
