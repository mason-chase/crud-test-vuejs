// import { ref, onMounted, onUnmounted } from 'vue'
import { mainStore } from '@/store/index'
import * as Yup from 'yup'
import { isValidPhoneNumber } from 'libphonenumber-js'

export function useCustomers() {
  const store = mainStore()

  const customersList = function() { return store.getAll }

  const validatePhone = function (value) { return isValidPhoneNumber(value, 'US') }
  const validateAccount = function (value) {
    if (value === '' || value === null) { return false }
    const regex = new RegExp(/^[0-9]{9,18}$/)
    return regex.test(value)
  }
  const validationSchema = Yup.object().shape({
    Firstname: Yup.string().required(),
    Lastname: Yup.string().required(),
    DateOfBirth: Yup.string().required(),
    PhoneNumber: Yup.string().required().test('validatePhone', 'Invalid Phone Format', validatePhone),
    Email: Yup.string().required().email(),
    BankAccountNumber: Yup.string().required().test('validateAccount', 'Invalid Account Number Format', validateAccount)
  })

  const isNewCustomerValid = function(data) {
    if (this.customersList().filter(x => x.Email === data.Email).length !== 0 ) { return 'Duplicate Email' }
    if (this.customersList().filter(x => x.Firstname === data.Firstname).length !== 0 ) { return 'Duplicate Firstname' }
    if (this.customersList().filter(x => x.Lastname === data.Lastname).length !== 0 ) { return 'Duplicate Lastname' }
    if (this.customersList().filter(x => x.DateOfBirth === data.DateOfBirth).length !== 0 ) { return 'Duplicate DateOfBirth' }
    return true
  }

  const isUpdateCustomerValid = function(email, newdata) {
    if (this.customersList().filter(x => x.Email !== email && x.Email === newdata.Email).length !== 0 ) { return 'Duplicate Email' }
    if (this.customersList().filter(x => x.Email !== email && x.Firstname === newdata.Firstname).length !== 0 ) { return 'Duplicate Firstname' }
    if (this.customersList().filter(x => x.Email !== email && x.Lastname === newdata.Lastname).length !== 0 ) { return 'Duplicate Lastname' }
    if (this.customersList().filter(x => x.Email !== email && x.DateOfBirth === newdata.DateOfBirth).length !== 0 ) { return 'Duplicate DateOfBirth' }
    return true
  }

  const add = function(newCustomer) { store.addRecord(newCustomer) }
  const remove = function(email) { store.removeRecord(email)  }
  const update = function(email, newdata) { store.editRecord(email, newdata) }

  return {
    validationSchema, customersList,
    isNewCustomerValid, isUpdateCustomerValid,
    add, remove, update
  }
}