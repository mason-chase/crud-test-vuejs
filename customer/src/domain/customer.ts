export class Customer {
	firstName: string
	lastName: string
	phoneNumber: string
	email: string
	bankAccountNumber: string
	dateOfBirth: Date
  
  constructor(firstName: string = '', lastName: string = '', phoneNumber: string = '', email: string = '', bankAccountNumber: string = '', dateOfBirth: Date = new Date(0)) {
    this.firstName = firstName
    this.lastName = lastName
    this.phoneNumber = phoneNumber
    this.email = email
    this.bankAccountNumber = bankAccountNumber
    this.dateOfBirth = dateOfBirth
  }
}