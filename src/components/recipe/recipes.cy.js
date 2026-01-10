import React from 'react';
import Recipes from './recipe';
import { BrowserRouter } from 'react-router-dom';

describe('<Recipes />', () => {
    const mockRecipes = [
        {
            imgSrc: 'https://img.tsn.ua/cached/147/tsn-0b4bc102/thumbs/1200x630/40/aa/f8daa1c730d551b3e66175c93b17aa40.jpg',
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