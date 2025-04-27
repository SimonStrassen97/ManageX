export type ID = number

export type Column = {
  column_id: ID
  column_title: string
}

export type Card = {
  card_id: ID
  column_id: ID
  task_name: string
  task_number: string
  task_leader: string
}

export type KanbanOrderEntry = {
  project_id: number
  order: number
}

export type KanbanOrder = KanbanOrderEntry[]
