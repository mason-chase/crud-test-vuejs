import { it, describe, beforeEach, expect, expectTypeOf } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCustomerStore } from '~/infrastructure/store/customer'
import { Customer } from '~/domain/customer'

describe('Counter Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('getters: all', () => {

    // Arrange
    const customerStore = useCustomerStore()
    const customer = new Customer()
    customerStore.customers = [customer]

    // Act
    const result = customerStore.all
    
    // Assert
    expectTypeOf(result).toBeArray()
    expect(result).toHaveLength(1)

  })

  it('getters: getById returning customer when found', () => {

    // Arrange
    const customerStore = useCustomerStore()
    const customer = new Customer()
    customerStore.customers = [customer]

    // Act
    const result = customerStore.getById(customer.id)
    
    // Assert
    expect(result).toBeInstanceOf(Customer)
    expect(result?.id).toEqual(customer.id)

  })

  it('getters: getById returning null on not found', () => {

    // Arrange
    const customerStore = useCustomerStore()
    const customer = new Customer()
    customerStore.customers = [customer]

    // Act
    const result = customerStore.getById('1')
    
    // Assert
    expect(result).to.be.null

  })

  it('store clear action', () => {
    
    // Arrange
    const customerStore = useCustomerStore()
    const customer = new Customer()
    customerStore.customers = [customer]

    // Act
    customerStore.clear()

    // Assert
    expectTypeOf(customerStore.customers).toBeArray()
    expect(customerStore.customers).toHaveLength(0)
  })

})