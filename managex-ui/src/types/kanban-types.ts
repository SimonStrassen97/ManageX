export type ID = string | number

export type Column = {
  column_id: ID
  column_title: string
}

export type Card = {
  card_id: ID
  column_id: ID
  task_status: string
  task_name: string
  task_number: string
  task_leader: string
}
