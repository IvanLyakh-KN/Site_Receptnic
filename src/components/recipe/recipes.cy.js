import React from 'react';
import Recipes from './recipe';
import { BrowserRouter } from 'react-router-dom';

describe('<Recipes />', () => {
    const mockRecipes = [
        {
            imgSrc: 'test.jpg',
            name: 'Голубці',
            cookingTime: '60',
            key: 1
        }
    ];

    it('відображає список рецептів з коректними даними', () => {
        cy.mount(
            <BrowserRouter>
                <Recipes recipes={mockRecipes} />
            </BrowserRouter>
        );

        cy.get('.recipe').should('have.length', 1);
        cy.contains('Голубці').should('be.visible');

        cy.contains('~ 60 хв').should('exist');
    });

    it('кожен рецепт має коректне посилання на детальну сторінку', () => {
        cy.mount(
            <BrowserRouter>
                <Recipes recipes={mockRecipes} />
            </BrowserRouter>
        );

        cy.get('a').first().should('have.attr', 'href', '/recipe/0');
    });
});