describe("the clearing of stored token from storage", () => {
  it("should allow a valid user to log out and clear the token", () => {
    cy.visit("https://statuesque-swan-d1d5d8.netlify.app/");
    cy.wait(500);
    cy.get("#landingLoginBtn").contains("Login").click();
    cy.wait(500);
    cy.get("#loginForm").should("be.visible");
    cy.get("#emailInput").type(Cypress.env("correctEmail"));
    cy.get("#passwordInput").type(Cypress.env("correctPassword"));
    cy.get("button[type=submit]").contains("Login").click();
    cy.wait(2000);
    cy.get("#signOut").contains("Sign out").click();
    cy.window().then((window) => {
      const tokenInLocalStorage = window.localStorage.getItem("accessToken");
      const tokenInSessionStorage =
        window.sessionStorage.getItem("accessToken");
      expect(tokenInLocalStorage).to.be.null;
      expect(tokenInSessionStorage).to.be.null;
    });
  });
});
