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

  it.skip('allows scrolling in the notification inbox', () => {
    // we open the notification inbox before the notifications are fetched, to
    // test for race conditions between fetching notifications & updating the
    // infinite list and adding scrollbars
    const notificationButton = cy.findByRole('button', { name: 'Notifications' });
    notificationButton.click();

    cy.wait('@config');
    cy.wait('@notifications');

    cy.get('iframe[id="magicbell-frame"]').then((elem) => {
      const body = elem.contents().find('body');

      // verify that the last notification is not visible
      cy.wrap(body)
        .findByText(/a notification with a long text, so we can test scrollbars/i)
        .should('be.visible');
      cy.wrap(body)
        .findByText(/a notification that requires scrolling to be seen/i)
        .should('not.be.visible');

      // scroll down
      const scrollable = body.find('.infinite-scroll-component');
      cy.wrap(scrollable).scrollTo('bottom');

      // verify that the last notification is now visible
      cy.wrap(body)
        .findByText(/a notification that requires scrolling to be seen/i)
        .should('be.visible');
    });
  });
});
