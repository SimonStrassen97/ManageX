export interface sampleProject {
  project_id: number
  project_info: {
    project_name: string
    project_number: string
    project_lead: string
    project_status: string
  }
}

export const sampleStatus = [
  { status_id: 1, status_label: "Planned" },
  { status_id: 2, status_label: "Started" },
  { status_id: 3, status_label: "Finished" },
  { status_id: 4, status_label: "Review" },
  { status_id: 5, status_label: "Hold" },
]

export const sampleProjects = [
  {
    project_id: 1,
    project_info: {
      project_number: "P-001",
      project_name: "Upgrade Server Infrastructure",
      project_lead: "Alice Johnson",
      project_status: "Planned",
    },
  },
  {
    project_id: 2,
    project_info: {
      project_number: "P-002",
      project_name: "Develop Mobile App",
      project_lead: "Bob Smith",
      project_status: "Started",
    },
  },
  {
    project_id: 3,
    project_info: {
      project_number: "P-003",
      project_name: "Office Renovation",
      project_lead: "Charlie Davis",
      project_status: "Finished",
    },
  },
  {
    project_id: 4,
    project_info: {
      project_number: "P-004",
      project_name: "Cloud Migration",
      project_lead: "Diana Evans",
      project_status: "Planned",
    },
  },
  {
    project_id: 5,
    project_info: {
      project_number: "P-005",
      project_name: "Website Redesign",
      project_lead: "Ethan Brown",
      project_status: "Started",
    },
  },
  {
    project_id: 6,
    project_info: {
      project_number: "P-006",
      project_name: "Data Center Expansion",
      project_lead: "Fiona Green",
      project_status: "Finished",
    },
  },
  {
    project_id: 7,
    project_info: {
      project_number: "P-007",
      project_name: "Cybersecurity Upgrade",
      project_lead: "George White",
      project_status: "Planned",
    },
  },
  {
    project_id: 8,
    project_info: {
      project_number: "P-008",
      project_name: "AI Research Initiative",
      project_lead: "Hannah Black",
      project_status: "Started",
    },
  },
  {
    project_id: 9,
    project_info: {
      project_number: "P-009",
      project_name: "Marketing Campaign",
      project_lead: "Ian Gray",
      project_status: "Planned",
    },
  },
  {
    project_id: 10,
    project_info: {
      project_number: "P-010",
      project_name: "New Product Launch",
      project_lead: "Jack Wilson",
      project_status: "Planned",
    },
  },
  {
    project_id: 11,
    project_info: {
      project_number: "P-011",
      project_name: "Customer Portal Development",
      project_lead: "Karen Taylor",
      project_status: "Started",
    },
  },
  {
    project_id: 12,
    project_info: {
      project_number: "P-012",
      project_name: "Supply Chain Optimization",
      project_lead: "Liam Harris",
      project_status: "Planned",
    },
  },
  {
    project_id: 13,
    project_info: {
      project_number: "P-013",
      project_name: "Employee Training Program",
      project_lead: "Mia Clark",
      project_status: "Planned",
    },
  },
  {
    project_id: 14,
    project_info: {
      project_number: "P-014",
      project_name: "Blockchain Integration",
      project_lead: "Noah Lewis",
      project_status: "Started",
    },
  },
  {
    project_id: 15,
    project_info: {
      project_number: "P-015",
      project_name: "Sustainability Initiative",
      project_lead: "Olivia Walker",
      project_status: "Planned",
    },
  },
]
