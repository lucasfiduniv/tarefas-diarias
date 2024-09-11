import dayjs from 'dayjs'
import { client, db } from '.'
import { goalCompletations, goals } from './schema'

async function seed() {
  await db.delete(goalCompletations)
  await db.delete(goals)

  const result = await db
    .insert(goals)
    .values([
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
    .returning()

  const startOfWeek = dayjs().startOf('week')
  await db.insert(goalCompletations).values([
    {
      goalId: result[0].id,
      completedAt: startOfWeek.toDate(),
    },
    {
      goalId: result[1].id,
      completedAt: startOfWeek.add(1, 'day').toDate(),
    },
    {
      goalId: result[2].id,
      completedAt: startOfWeek.add(2, 'day').toDate(),
    },
  ])
}
seed().finally(() => client.end())
seed()
