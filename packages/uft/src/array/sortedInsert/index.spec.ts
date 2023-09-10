import { sortedInsert } from '.'

describe('array/sortedInsert', () => {
   test('inserts in ASCENDING order correctly', () => {
      expect(sortedInsert(
         [1, 2, 4, 5],
         3,
         (item, toInsert) => item - toInsert
      )).toEqual([1, 2, 3, 4, 5])

      expect(sortedInsert(
         [1, 2, 3, 4, 5, 6, 7, 8, 9],
         8,
         (item, toInsert) => item - toInsert
      )).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 8, 9])
   })

   test('inserts in DESCENDING order correctly', () => {
      expect(
         sortedInsert(
            [5, 4, 2, 1],
            3,
            (item, toInsert) => toInsert - item
         )
      ).toEqual([5, 4, 3, 2, 1])

      expect(
         sortedInsert(
            [9, 8, 7, 6, 5, 4, 3, 2, 1],
            8,
            (item, toInsert) => toInsert - item
         )
      ).toEqual([9, 8, 8, 7, 6, 5, 4, 3, 2, 1])
   })

   test('inserts AFTER equal items by default', () => {
      expect(
         sortedInsert(
            [{ n: 0, id: 'first' }, { n: 9, id: 'second' }],
            { n: 0, id: 'inserted' },
            (item, toInsert) => item.n - toInsert.n
         )
      ).toEqual([
         { n: 0, id: 'first' },
         { n: 0, id: 'inserted' },
         { n: 9, id: 'second' },
      ])
   })

   test('inserts BEFORE equal items when `insertAfterEqual` is false', () => {
      expect(
         sortedInsert(
            [{ n: 0, id: 'first' }, { n: 9, id: 'second' }],
            { n: 0, id: 'inserted' },
            (item, toInsert) => item.n - toInsert.n,
            false
         )
      ).toEqual([
         { n: 0, id: 'inserted' },
         { n: 0, id: 'first' },
         { n: 9, id: 'second' },
      ])
   })

   test('works on an empty array', () => {
      expect(
         sortedInsert(
            [] as number[],
            1,
            () => {
               throw new Error('should not be called')
            }
         )
      ).toEqual([1])
   })
})
