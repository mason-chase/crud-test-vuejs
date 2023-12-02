import { it, describe, expect, expectTypeOf } from 'vitest'
import { customer } from '../../mock'
import { cloneDeep } from '~/infrastructure/plugins/general'

describe('cloneDeep', () => {

  it('works on objects', () => {

    // Arrange

    // Act
    const result = cloneDeep(customer)

    // Assert
    expect(result).not.to.equal(customer)

  })

  it('works on arrays', () => {

    // Arrange

    // Act
    const result = cloneDeep([customer])

    // Assert
    expect(result).not.to.equal([customer])

  })
})