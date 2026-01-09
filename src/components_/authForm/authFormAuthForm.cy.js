import React from 'react'
import AuthForm from './authForm'
import { BrowserRouter } from 'react-router-dom'
import { AuthContext } from '../../AuthContext'
describe('<AuthForm />', () => {
  it('renders correctly', () => {
    const mockAuthValue = {
      login: cy.spy().as('loginSpy'),
      logout: cy.spy(),
      isLoggedIn: false,
      userlogin: null
    }

    cy.mount(
      <AuthContext.Provider value={mockAuthValue}>
        <BrowserRouter>
          <AuthForm isLoginMode={true} setIsLoginMode={() => { }} />
        </BrowserRouter>
      </AuthContext.Provider>
    )

    cy.contains('Увійти').should('be.visible')
  })
})