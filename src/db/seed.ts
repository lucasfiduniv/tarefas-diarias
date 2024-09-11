import { db } from '.'
import { goalCompletations, goals } from './schema'

async function seed() {
  await db.delete(goalCompletations)
  await db.delete(goals)

  await db.insert(goals).values([
    {
      title: 'Teste 1',
      desiredWeeklyFrequency: 2,
    },
    {
      title: 'Teste 2',
      desiredWeeklyFrequency: 3,
    },
    {
      title: 'Teste 3',
      desiredWeeklyFrequency: 4,
    },
  ])
}
seed()
