describe("login entry flow", () => {
  it("should deny empty input submit", () => {
    cy.visit("https://hma-sp2-onlypineapples.netlify.app/");
    cy.wait(500);
    cy.get("#landingLoginBtn").contains("Login").click();
    cy.wait(500);
    cy.get("#loginForm").should("be.visible");
    cy.get("button[type=submit]").contains("Login").click();
    cy.get("#emailInput:invalid")
      .should("exist")
      .then(($input) => {
        const message = $input[0].validationMessage;
        cy.task("log", `Validation Message: ${message}`);
      });
  });

  it("should deny empty password input", () => {
    cy.visit("https://hma-sp2-onlypineapples.netlify.app/");
    cy.wait(500);
    cy.get("#landingLoginBtn").contains("Login").click();
    cy.wait(500);
    cy.get("#loginForm").should("be.visible");
    cy.get("#emailInput").type(Cypress.env("correctEmail"));
    cy.get("button[type=submit]").contains("Login").click();
    cy.get("#passwordInput:invalid")
      .should("exist")
      .then(($input) => {
        const message = $input[0].validationMessage;
        cy.task("log", `Validation Message: ${message}`);
      });
  });

  it("should deny invalid email", () => {
    cy.intercept("POST", "https://api.noroff.dev/api/v1/auction/auth/login").as(
      "loginRequest",
    );

    cy.visit("https://hma-sp2-onlypineapples.netlify.app/");
    cy.wait(500);
    cy.get("#landingLoginBtn").contains("Login").click();
    cy.wait(500);
    cy.get("#loginForm").should("be.visible");
    cy.get("#emailInput").type(Cypress.env("wrongEmail"));
    cy.get("#passwordInput").type(Cypress.env("correctPassword"));
    cy.get("button[type=submit]").contains("Login").click();
    cy.wait("@loginRequest").then((interception) => {
      expect(interception.response.statusCode).to.be.oneOf([400, 401]); // Assuming either a 400 Bad Request or 401 Unauthorized for invalid credentials

      if (interception.response.body.message) {
        cy.task("log", `Login Error: ${interception.response.body.message}`);
      }
    });
  });

  it("should deny wrong password", () => {
    cy.visit("https://hma-sp2-onlypineapples.netlify.app/");
    cy.wait(500);
    cy.get("#landingLoginBtn").contains("Login").click();
    cy.wait(500);
    cy.get("#loginForm").should("be.visible");
    cy.get("#emailInput").type(Cypress.env("correctEmail"));
    cy.get("#passwordInput").type(Cypress.env("wrongPassword"));
    cy.wait(500);
    cy.get("button[type=submit]").contains("Login").click();
    cy.on("window:alert", (text) => {
      expect(text).to.contains(
        "Either your username was not found or your password is incorrect",
      );
    });
  });

  it("should allow a valid user to log in", () => {
    cy.intercept("POST", "https://api.noroff.dev/api/v1/auction/auth/login").as(
      "loginRequest",
    );
    cy.visit("https://hma-sp2-onlypineapples.netlify.app/");
    cy.wait(500);
    cy.get("#landingLoginBtn").contains("Login").click();
    cy.wait(500);
    cy.get("#loginForm").should("be.visible");
    cy.get("#emailInput").type(Cypress.env("correctEmail"));
    cy.get("#passwordInput").type(Cypress.env("correctPassword"));
    cy.get("button[type=submit]").contains("Login").click();
    cy.wait("@loginRequest").then((interception) => {
      expect(interception.response.statusCode).to.eq(200); // Assuming a successful login returns a 200 status code
      expect(interception.response.body).to.have.property("accessToken"); // Check if the response contains an accessToken
      const accessToken = interception.response.body.accessToken;
      if (accessToken) {
        cy.task("log", `Access Token: ${accessToken}`);
      }
    });
    cy.end();
  });
});
