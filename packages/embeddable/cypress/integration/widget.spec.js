/// <reference types="cypress" />

context('Widget', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.magicbell.com/config**', { fixture: 'config.json', delay: 100 }).as('config');
    cy.intercept('GET', 'https://api.magicbell.com/notifications**', { fixture: 'notifications.json', delay: 100 }).as(
      'notifications',
    );
    cy.intercept('POST', 'https://api.magicbell.com/notifications/**/read', { fixture: 'read.json', delay: 100 });

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
      .should('contain', 'NOTIFICATIONS')
      .should('contain', 'Mark All Read');
  });

  context('unseen badge', () => {
    it('shows the badge by default', () => {
      cy.wait('@config');
      cy.wait('@notifications');

      const notificationButton = cy.findByRole('button', { name: 'Notifications' });
      notificationButton.should('contain.text', '1');
    });

    it('hides the badge on click', () => {
      const notificationButton = cy.findByRole('button', { name: 'Notifications' });
      notificationButton.click();
      notificationButton.should('not.contain.text', '1');
    });
  });

  context('click outside', () => {
    it('closes the notification inbox', () => {
      const notificationButton = cy.findByRole('button', { name: 'Notifications' });
      notificationButton.click();

      cy.get('iframe[id="magicbell-frame"]').should('be.visible');
      cy.contains('Quick Start').click();
      cy.get('iframe[id="magicbell-frame"]').should('not.exist');
    });
  });

  context('click a notification', () => {
    it.skip('opens the notification url ', () => {
      const notificationButton = cy.findByRole('button', { name: 'Notifications' });
      notificationButton.click();

      cy.get('iframe[id="magicbell-frame"]')
        .its('0.contentDocument.body')
        .should('not.be.empty')
        .should('contain', 'Board View')
        .click();

      cy.url().should('eq', 'http://localhost:10001/#developers');
    });
  });
});
