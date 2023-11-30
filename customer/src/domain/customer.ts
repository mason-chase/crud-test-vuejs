import { BaseModel } from './base'

export class Customer extends BaseModel{

	firstName: string
	lastName: string
	phoneNumber: string
	email: string
	bankAccountNumber: string
	dateOfBirth: Date
  
  constructor(firstName: string = '', lastName: string = '', phoneNumber: string = '', email: string = '', bankAccountNumber: string = '', dateOfBirth: Date = new Date(0)) {
    super()

    this.firstName = firstName
    this.lastName = lastName
    this.phoneNumber = phoneNumber
    this.email = email
    this.bankAccountNumber = bankAccountNumber
    this.dateOfBirth = dateOfBirth
  }
}