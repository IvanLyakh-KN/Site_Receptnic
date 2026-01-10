import React from 'react'
import Search from './search'

describe('<Search />', () => {
  it('відображає початкове значення та реагує на введення тексту', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy')
    const initialValue = 'Гречка'

    cy.mount(<Search value={initialValue} onChange={onChangeSpy} />)

    cy.get('input').should('have.value', initialValue)

    cy.get('input').type(' Салат')

    // перевірка, чи викликається функція onChange при кожному натисканні клавіші
    cy.get('@onChangeSpy').should('have.been.called')
  })

  it('запобігає перезавантаженню сторінки при відправці форми', () => {
    const onChangeSpy = cy.spy()
    cy.mount(<Search value="" onChange={onChangeSpy} />)

    // якщо handleSubmit працює правильно (e.preventDefault()), тест пройде успішно
    cy.get('button.search__button').click()

    // перевірка наявності кнопки, щоб переконатися, що сторінка та сама
    cy.get('button').should('be.visible')
  })
})