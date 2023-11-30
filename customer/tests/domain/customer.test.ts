import { it, describe, expectTypeOf } from 'vitest'
import { Customer } from '~/domain/customer'
import { BaseModel } from '~/domain/base'

// According to vitest type documentation typechecking is an expiremntal future and it's only available in beta versions
// But I didn't want to switch to a beta version therfore type test only works using typescript compiler
// https://vitest.dev/guide/testing-types#run-typechecking

describe('Base Model', () => {

  it('Check Customer property types', () => {

    const baseModel = new BaseModel()

    expectTypeOf(baseModel.id).toBeString()
    expectTypeOf(baseModel.createdDate).toEqualTypeOf<Date>()
  })

})

describe('Customer Model', () => {

  it('Check Customer property types', () => {

    const customer = new Customer()

    expectTypeOf(customer.id).toBeString()
    expectTypeOf(customer.createdDate).toEqualTypeOf<Date>()

    expectTypeOf(customer.lastName).toBeString()
    expectTypeOf(customer.phoneNumber).toBeString()
    expectTypeOf(customer.email).toBeString()
    expectTypeOf(customer.bankAccountNumber).toBeString()
    expectTypeOf(customer.dateOfBirth).toEqualTypeOf<Date>()
  })

})