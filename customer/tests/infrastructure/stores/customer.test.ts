import { it, describe, beforeEach, expect, expectTypeOf } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCustomerStore } from '~/infrastructure/store/customer'
import { Customer } from '~/domain/customer'

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
    const customer = new Customer()
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
    const customer = new Customer()
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
    const customer = new Customer()
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
    const customer = new Customer()
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
    const customer = new Customer()

    // Act
    customerStore.create(customer)

    // Assert
    expectTypeOf(customerStore.customers).toBeArray()
    expect(customerStore.customers).toHaveLength(1)
  })

  it('delete: not found', () => {

    // Arrange
    const customerStore = useCustomerStore()
    const customer = new Customer()
    customerStore.customers = [customer]

    // Act
    const result = customerStore.delete('1')

    // Assert
    expect(result).toEqual(false)
  })

  it('delete: found', () => {

    // Arrange
    const customerStore = useCustomerStore()
    const customer = new Customer()
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
    const customer = new Customer()
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

  it('validate: customer firstName is not unique', () => {

    // Arrange
    const customerStore = useCustomerStore()
    const customer = new Customer()
    const firstName = 'John'
    customer.firstName = firstName

    customerStore.customers = [customer]
    const newCustomer = new Customer()
    newCustomer.firstName = firstName

    // Act
    const result = customerStore.validate(newCustomer)

    // Assert
    expect(result).toEqual(false)
  })

  it('validate: customer lastName is not unique', () => {

    // Arrange
    const customerStore = useCustomerStore()
    const customer = new Customer()
    const lastName = 'Doe'
    customer.lastName = lastName

    customerStore.customers = [customer]
    const newCustomer = new Customer()
    newCustomer.lastName = lastName

    // Act
    const result = customerStore.validate(newCustomer)

    // Assert
    expect(result).toEqual(false)
  })

  it('validate: customer dateOfBirth is not unique', () => {

    // Arrange
    const customerStore = useCustomerStore()
    const customer = new Customer()
    const date = new Date().toISOString()
    customer.dateOfBirth = date

    customerStore.customers = [customer]
    const newCustomer = new Customer()
    newCustomer.dateOfBirth = date

    // Act
    const result = customerStore.validate(newCustomer)

    // Assert
    expect(result).toEqual(false)
  })

  it('validate: customer email is not unique', () => {

    // Arrange
    const customerStore = useCustomerStore()
    const customer = new Customer()
    const email = 'johndoe@gmail.com'
    customer.email = email

    customerStore.customers = [customer]
    const newCustomer = new Customer()
    newCustomer.email = email

    // Act
    const result = customerStore.validate(newCustomer)

    // Assert
    expect(result).toEqual(false)
  })

  it('validate: customer email is correct format', () => {

    // Arrange
    const customerStore = useCustomerStore()
    const customer = new Customer()
    customer.email = 'johndoe@gmail.com'

    // Act
    const result = customerStore.validate(customer)

    // Assert
    expect(result).toEqual(true)
  })

  it('validate: customer email is not correct format', () => {

    // Arrange
    const customerStore = useCustomerStore()
    const customer = new Customer()
    const email = 'johndoe@gmailcom'
    customer.email = email

    // Act
    const result = customerStore.validate(customer)

    // Assert
    expect(result).toEqual(false)
  })

  it('validate: customer bankAccountNumber is in correct format', () => {

    // Arrange
    const customerStore = useCustomerStore()
    const customer = new Customer()
    const bankAccountNumber = '4155279860457'
    customer.bankAccountNumber = bankAccountNumber

    // Act
    const result = customerStore.validate(customer)

    // Assert
    expect(result).toEqual(true)
  })

  it('validate: customer bankAccountNumber is not in correct format', () => {

    // Arrange
    const customerStore = useCustomerStore()
    const customer = new Customer()
    const bankAccountNumber = '112233'
    customer.bankAccountNumber = bankAccountNumber

    // Act
    const result = customerStore.validate(customer)

    // Assert
    expect(result).toEqual(false)
  })


})