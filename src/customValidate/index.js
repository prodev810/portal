export default function (Validator) {
  console.log('setup custom vee-validate rules...')
  Validator.extend('notAllowCharactersAtFirst', {
    getMessage: (field, notAllowCharactersAtFirst) => {
      return `the ${field} does not allow start with [${notAllowCharactersAtFirst}]`
    },
    validate: (value, notAllowCharactersAtFirst) => {
      return notAllowCharactersAtFirst.indexOf(value[0]) === -1
    }
  });

  Validator.extend('notAllowCharactersAtLast', {
    getMessage: (field, notAllowCharacters) => `the ${field} does not allow [${notAllowCharacters}] endings`,
    validate: (value, notAllowCharacters) => {
      return notAllowCharacters.indexOf(value[value.length - 1]) === -1
    }
  });
}