import {describe, it, expect} from '@jest/globals'
import {
  removeConfiguration,
  defaultFileKeyDerivationStrategy,
} from '../src/key-derivation'

describe('removeConfiguration', () => {
  it('removes Config/Configuration prefixes', () => {
    expect(removeConfiguration('EnvSetup')).toEqual('EnvSetup')
    expect(removeConfiguration('BestConfig')).toEqual('Best')
    expect(removeConfiguration('Bestconfig')).toEqual('Bestconfig')
    expect(removeConfiguration('LamentConfiguration')).toEqual('Lament')
    expect(removeConfiguration('Lamentconfiguration')).toEqual(
      'Lamentconfiguration',
    )
  })
})

describe('defaultFileKeyDerivationStrategy', () => {
  it('removes config from name and converts first char to lower case', () => {
    expect(defaultFileKeyDerivationStrategy('EnvSetup')).toEqual('envSetup')
    expect(defaultFileKeyDerivationStrategy('BestConfig')).toEqual('best')
    expect(defaultFileKeyDerivationStrategy('Bestconfig')).toEqual('bestconfig')
    expect(defaultFileKeyDerivationStrategy('LamentConfiguration')).toEqual(
      'lament',
    )
    expect(defaultFileKeyDerivationStrategy('Lamentconfiguration')).toEqual(
      'lamentconfiguration',
    )
  })
})
