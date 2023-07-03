describe("Edit profil", () => {
  it("Cek validasi ubah kata sandi jika konfirmasi kata sandi baru tidak sama", () => {
    cy.login("rosa", "password");

    cy.get("div").contains("PROFIL SELENGKAPNYA").click();
    cy.get("button").contains("Edit Profil").click();

    cy.get("button").contains("Ubah Kata Sandi").click();

    cy.contains("Kata Sandi Lama").next().type("password");
    cy.contains("Kata Sandi Baru").next().type("katasandi");
    cy.contains("Konfirmasi Kata Sandi Baru").next().type("aasghd");

    cy.get("div").should(
      "contain",
      "Kata sandi dan konfirmasi kata sandi tidak sama."
    );
  });
});
