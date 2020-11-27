/// <reference types="cypress" />

context('Widget', () => {
  beforeEach(() => {
    cy.server();
    cy.route('GET', 'https://api.magicbell.io/notifications**', 'fx:notifications.json').as('getNotifications');

    cy.visit('/');
  });

  it('parses the script', () => {
    cy.window().its('magicbell').should('be.a', 'function');
  });

  it('opens the notification inbox when the container is clicked', () => {
    cy.get('#notifications').click();

    cy.get('iframe[id="magicbell-frame"]').should('be.visible');
    cy.get('iframe[id="magicbell-frame"]')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .should('contain', 'Notifications')
      .should('contain', 'Mark All Read');
  });

  context('unseen badge', () => {
    it('shows the badge by default', () => {
      cy.get('[data-testid="bell"]').should('contain.text', '1');
    });

    it('hides the badge on click', () => {
      cy.get('[data-testid="bell"]').click();
      cy.get('[data-testid="bell"]').should('not.contain.text', '1');
    });
  });

  context('click outside', () => {
    it('closes the notification inbox', () => {
      cy.get('[data-testid="bell"]').click();

      cy.get('iframe[id="magicbell-frame"]').should('be.visible');
      cy.contains('Quick Start').click();
      cy.get('iframe[id="magicbell-frame"]').should('not.be.visible');
    });
  });

  context('click a notification', () => {
    it('opens the notification url ', () => {
      cy.get('[data-testid="bell"]').click();
      cy.get('iframe[id="magicbell-frame"]')
        .its('0.contentDocument.body')
        .should('not.be.empty')
        .contains('Board View')
        .click();

      cy.url().should('eq', 'http://localhost:10001/#developers');
    });
  });
});
