import { it, describe, beforeEach, expect, expectTypeOf } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCustomerStore } from '~/infrastructure/store/customer'
import { Customer } from '~/domain/customer'
import { customer } from '../../mock'

describe('Getters', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('all', () => {

    // Arrange
    const customerStore = useCustomerStore()
    customerStore.customers = [customer]

    // Act
    const result = customerStore.all

    // Assert
    expectTypeOf(result).toBeArray()
    expect(result).toHaveLength(1)

  })

  it('getById: returning customer when found', () => {

    // Arrange
    const customerStore = useCustomerStore()
    customerStore.customers = [customer]

    // Act
    const result = customerStore.getById(customer.id)

    // Assert
    expect(result).toBeInstanceOf(Customer)
    expect(result?.id).toEqual(customer.id)

  })

  it('getById returning null on not found', () => {

    // Arrange
    const customerStore = useCustomerStore()
    customerStore.customers = [customer]

    // Act
    const result = customerStore.getById('1')

    // Assert
    expect(result).to.be.null

  })

})

describe('Actions', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('clear', () => {

    // Arrange
    const customerStore = useCustomerStore()
    customerStore.customers = [customer]

    // Act
    customerStore.clear()

    // Assert
    expectTypeOf(customerStore.customers).toBeArray()
    expect(customerStore.customers).toHaveLength(0)
  })

  it('create', () => {

    // Arrange
    const customerStore = useCustomerStore()

    // Act
    customerStore.create(customer)

    // Assert
    expectTypeOf(customerStore.customers).toBeArray()
    expect(customerStore.customers).toHaveLength(1)
  })

  it('delete: not found', () => {

    // Arrange
    const customerStore = useCustomerStore()
    customerStore.customers = [customer]

    // Act
    const result = customerStore.delete('1')

    // Assert
    expect(result).toEqual(false)
  })

  it('delete: found', () => {

    // Arrange
    const customerStore = useCustomerStore()
    customerStore.customers = [customer]

    // Act
    const result = customerStore.delete(customer.id)

    // Assert
    expect(result).toEqual(true)
    expectTypeOf(customerStore.customers).toBeArray()
    expect(customerStore.customers).toHaveLength(0)
  })

  it('update', () => {

    // Arrange
    const customerStore = useCustomerStore()
    customerStore.customers = [customer]
    const updatedFirstName = 'updated'
    const oldFirstName = customer.firstName

    // Act
    customer.firstName = updatedFirstName
    const result = customerStore.update(customer)

    // Assert
    expect(result).toBeInstanceOf(Customer)
    expect(result.firstName).toEqual(updatedFirstName)
    expect(result.firstName).not.to.equal(oldFirstName)
  })

  it('validate', () => {

    // Arrange
    const customerStore = useCustomerStore()

    // Act
    const result = customerStore.validate(customer)

    // Assert
    expect(result.result).toEqual(true)
    expectTypeOf(result.errors).toBeArray()
    expect(result.errors).toHaveLength(0)
  })

})