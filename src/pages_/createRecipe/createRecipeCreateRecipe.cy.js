import React from 'react'
import CreateRecipe from './createRecipe'
import { BrowserRouter } from 'react-router-dom'

describe('<CreateRecipe />', () => {
  it('renders correctly', () => {
    cy.mount(
      <BrowserRouter>
        <CreateRecipe />
      </BrowserRouter>
    )

  })
})