describe("Edit profil", () => {
  it("Cek edit foto profil, nama, dan username pengguna", () => {
    cy.intercept("PUT", "http://35.219.21.45/api/akun").as("akunRequest");
    cy.login("nazhwa", "password");

    cy.get("div").contains("PROFIL SELENGKAPNYA").click();
    cy.get("button").contains("Edit Profil").click();

    cy.get("button").contains("Ubah Foto Profil").click();

    cy.pause(); // Pilih file foto profil

    cy.contains("Nama").next().type("{selectall}{backspace}Rosa Amalia");
    cy.contains("Username").next().type("{selectall}{backspace}rosa");

    cy.get("button").contains("Simpan").click();

    cy.wait("@akunRequest").then((interception) => {
      const response = interception.response;
      expect(response.statusCode).to.equal(200);
      cy.get("div").should("contain", response.body.message);
      cy.get("button").contains("Batal").click();
      cy.get("p").should("contain", response.body.data.nama_pengguna);
      cy.get("p").should("contain", response.body.data.username);
      cy.get(`img[src="${response.body.data.foto_profil}"]`).should("exist");
    });
  });
});
