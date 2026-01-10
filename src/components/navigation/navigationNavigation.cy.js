import React from 'react';
import Navigation from './navigation';
import { AuthContext } from '../../AuthContext';
import { BrowserRouter } from 'react-router-dom';

describe('<Navigation />', () => {
  // Сценарій 1: Авторизований користувач
  it('renders correctly for logged in user', () => {
    const mockAuthValue = {
      userlogin: 'SuperChef',
      isLoggedIn: true,
      logout: cy.spy().as('logoutSpy')
    }

    cy.mount(
      <AuthContext.Provider value={mockAuthValue}>
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      </AuthContext.Provider>
    )

    cy.contains('SuperChef').should('be.visible')
    cy.contains('Мої рецепти').should('exist')
    cy.contains('Вийти').should('be.visible')
  })

  it('renders correctly for guest user', () => {
    const mockAuthValue = {
      userlogin: null,
      isLoggedIn: false,
      logout: cy.spy()
    }

    cy.mount(
      <AuthContext.Provider value={mockAuthValue}>
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      </AuthContext.Provider>
    )

    cy.contains('Гість').should('be.visible')
    cy.contains('Увійти').should('be.visible')
    cy.contains('Мої рецепти').should('not.exist')
    cy.contains('Вийти').should('not.exist')
  })
})