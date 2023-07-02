describe("Dasbor kebun", () => {
  it("Cek data kebun ditampilkan secara real-time", () => {
    cy.login("nazhwa", "password");

    cy.get("div").contains("Semua Kebun").click();
    cy.get("div").contains("Kebun Tomat").click();

    cy.wait(30000);

    let data = {
      ph: 8.02,
      temperatur: 20,
      kelembapan: 73,
      tds: 1289,
      intensitas_cahaya: 578,
    };

    cy.window().then((window) => {
      const localStorage = JSON.parse(window.localStorage.getItem("token"));
      console.log(localStorage);

      cy.location().then((location) => {
        const idKebun = location.pathname.split("/").slice(-1)[0];

        cy.request({
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.access}`,
          },
          url: `http://35.219.21.45/api/kebun/${idKebun}/data`,
          body: data,
        }).then((response) => {
          cy.get("div").should("contain", response.body.data.ph);
          cy.get("div").should("contain", response.body.data.temperatur);
          cy.get("div").should("contain", response.body.data.kelembapan);
          cy.get("div").should("contain", response.body.data.tds);
          cy.get("div").should("contain", response.body.data.intensitas_cahaya);
        });
      });
    });
  });
});
