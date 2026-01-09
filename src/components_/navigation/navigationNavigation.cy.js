import React from 'react'
import Navigation from './navigation'
import { BrowserRouter } from 'react-router-dom'
import { AuthContext } from '../../AuthContext'

describe('<Navigation />', () => {
  it('renders for logged in user', () => {
    const mockAuthValue = {
      userlogin: 'SuperChef',
      isLoggedIn: true,
      logout: cy.spy()
    }

    cy.mount(
      <AuthContext.Provider value={mockAuthValue}>
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      </AuthContext.Provider>
    )

    cy.contains('SuperChef').should('be.visible')
    cy.contains('Вийти').should('be.visible')
  })
})