import {describe, it, expect} from '@jest/globals'

describe('Array.some', () => {
	it('should return false for an empty array.', () => {
		// Given
		const array: boolean[] = []

		// When
		const actual = array.some((x) => x)

		// Then
		expect(actual).toBeFalsy()
	})
})
