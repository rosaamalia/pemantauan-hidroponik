describe("Dasbor kebun", () => {
  it("Cek notifikasi dapat diedit dengan data yang valid", () => {
    cy.intercept("PUT", "http://35.219.21.45/api/kebun/*/notifikasi").as(
      "notifikasiRequest"
    );
    cy.login("nazhwa", "password");

    cy.get("div").contains("Semua Kebun").click();
    cy.get("div").contains("Kebun Tomat").click();

    cy.get("div").contains("Notifikasi").click();
    cy.wait(10000);

    // pH
    cy.get(
      "div:nth-child(1) > :nth-child(1)> :nth-child(2) > input:nth-child(1)"
    ).type("{backspace}6.5");
    cy.get(
      "div:nth-child(1) > :nth-child(1)> :nth-child(2) > input:nth-child(3)"
    ).type("{backspace}8");

    // temperatur
    cy.get(
      "div:nth-child(2) > :nth-child(1)> :nth-child(2) > input:nth-child(1)"
    ).type("{backspace}26");
    cy.get(
      "div:nth-child(2) > :nth-child(1)> :nth-child(2) > input:nth-child(3)"
    ).type("{backspace}30");

    // tds
    cy.get(
      "div:nth-child(3) > :nth-child(1)> :nth-child(2) > input:nth-child(1)"
    ).type("{backspace}1200");
    cy.get(
      "div:nth-child(3) > :nth-child(1)> :nth-child(2) > input:nth-child(3)"
    ).type("{backspace}1500");

    // intensitas cahaya
    cy.get(
      "div:nth-child(4) > :nth-child(1)> :nth-child(2) > input:nth-child(1)"
    ).type("{backspace}560");
    cy.get(
      "div:nth-child(4) > :nth-child(1)> :nth-child(2) > input:nth-child(3)"
    ).type("{backspace}590");

    // kelembapan
    cy.get(
      "div:nth-child(5) > :nth-child(1)> :nth-child(2) > input:nth-child(1)"
    ).type("{backspace}90");
    cy.get(
      "div:nth-child(5) > :nth-child(1)> :nth-child(2) > input:nth-child(3)"
    ).type("{backspace}120");

    cy.get("button").contains("Simpan").click();

    cy.wait("@notifikasiRequest").then((interception) => {
      const response = interception.response;
      expect(response.statusCode).to.equal(200);
      cy.get("div").should("contain", response.body.message);
    });
  });
});
