import React from 'react'
import Button from './button'

describe('<Button />', () => {
    it('відображає правильний текст та застосовує клас', () => {
        const btnText = 'Кнопка'
        const btnClass = 'primary-button'

        cy.mount(<Button text={btnText} clazz={btnClass} />)

        // Перевірка тексту
        cy.get('button').should('have.text', btnText)
        // Перевірка наявності CSS класу
        cy.get('button').should('have.class', btnClass)
    })

    it('викликає функцію onClick при натисканні', () => {
        const onClickSpy = cy.spy().as('clickSpy')

        cy.mount(<Button text="Click" onClick={onClickSpy} />)

        cy.get('button').click()
        // Перевірка, чи був викликаний spy
        cy.get('@clickSpy').should('have.been.calledOnce')
    })
})