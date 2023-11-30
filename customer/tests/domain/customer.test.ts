import { it, describe, expectTypeOf } from 'vitest'
import { Customer } from '~/domain/customer'

// According to vitest type documentation typechecking is an expiremntal future and it's only available in beta versions
// But I didn't want to switch to a beta version therfore type test only works using typescript compiler
// https://vitest.dev/guide/testing-types#run-typechecking

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