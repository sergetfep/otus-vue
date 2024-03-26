/// <reference types="cypress" />

const url = 'http://localhost:5173/';

describe('Main page', () => {
  it('Should display products', () => {
    cy.visit(url);
    cy.get('.products__list').contains('li', 'Backpack').should('be.visible');
  });

  it('Should go to correct product page', () => {
    cy.visit(url);

    cy.get('.products-item__title')
      .first()
      .invoke('text')
      .then((text) => {
        cy.get('.products-item__title').first().click();
        cy.get('h1').contains(text);
      });
  });
});

describe('Cart work', () => {
  it('Adding product', () => {
    cy.visit(url);
    cy.get('.header__link[href="/cart"]').contains('Cart (0)');

    cy.get('.products-item__title')
      .first()
      .invoke('text')
      .then((text) => {
        cy.get('.products-item__btn').first().click();
        cy.get('.header__link[href="/cart"]').contains('Cart (1)');

        cy.visit(url + 'cart');
        cy.get('.cart-item__title').contains(text);
      });
  });

  it('Removing product', () => {
    cy.visit(url);
    cy.get('.products-item__btn').first().click();

    cy.get('.header__link[href="/cart"]').contains('Cart (1)');

    cy.visit(url + 'cart');
    cy.wait(1500);
    cy.get('.cart-item__btn').last().click();

    cy.get('.header__link[href="/cart"]').contains('Cart (0)');
  });

  it('Clearing cart', () => {
    cy.visit(url);
    cy.get('.products-item__btn').first().click();

    cy.get('.header__link[href="/cart"]').contains('Cart (1)');

    cy.visit(url + 'cart');
    cy.wait(1500);
    cy.get('.cart__clear').last().click();

    cy.get('.header__link[href="/cart"]').contains('Cart (0)');
  });
});
