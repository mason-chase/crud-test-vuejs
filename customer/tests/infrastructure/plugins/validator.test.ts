import { it, describe, expect } from 'vitest'
import { isEmpty } from '~/infrastructure/plugins/validator'

describe('isEmpty', () => {

  it('returns true on empty string', () => {

    // Arrange
    const value = ''

    // Act
    const result = isEmpty(value)

    // Assert
    expect(result).toEqual(true)

  })

  it('returns false on not empty string', () => {

    // Arrange
    const value = 'not empty string'

    // Act
    const result = isEmpty(value)

    // Assert
    expect(result).toEqual(false)

  })

})