import { expect, it, describe, expectTypeOf } from 'vitest'
import { Customer } from '~/domain/customer'

describe('Customer Domain', () => {

  it('Check Customer property types', () => {

    const customer = new Customer()

    expectTypeOf(customer.firstName).toBeString()
    expectTypeOf(customer.lastName).toBeString()
    expectTypeOf(customer.phoneNumber).toBeString()
    expectTypeOf(customer.email).toBeString()
    expectTypeOf(customer.bankAccountNumber).toBeString()
    expectTypeOf(customer.dateOfBirth).toEqualTypeOf<Date>()
  })

})