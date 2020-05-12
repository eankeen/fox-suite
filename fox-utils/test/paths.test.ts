import path from 'path'
// @ts-ignore
import * as foxPathUtils from '../src/paths'

/**
 * these have weird paths because toRelativePath resolves
 * relative to the current working directory (`/fox-utils`), but
 * the test file is in `/fox-utils/test/`
 */
describe('toRelativePath()', () => {
  beforeEach(() => {
    const spy = jest.spyOn(process, 'cwd')
    spy.mockReturnValue(__dirname)
  })

  test('relative path two dirs up', () => {
    const absolute = path.resolve(__dirname, '../../file')
    const relativePath = foxPathUtils.toRelativePath(absolute)

    expect(relativePath).toBe('../../file')
  })

  /**
   * toRelativePath uses path.relative internally and by defualt
   * it doesn't add a './' if the file is in the same directory
   * we test to ensure the './' gets prepended
   */
  test('relative path to current directory', () => {
    const absolute = path.resolve(__dirname, './file.json')
    const relativePath = foxPathUtils.toRelativePath(absolute)

    expect(relativePath).toBe('./file.json')
  })
})
