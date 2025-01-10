from .BaseTool import BaseTool

def query_database(project_number):
    dummy_data = {
        "B25-00": {
            "number": "B25-00",
            "name": "Project X",
            "status": "In Progress",
            "budget": "$100,000",
            "project_leader": "John Doe",
            "timeline": {
                "start_date": "2022-01-01",
                "end_date": "2023-01-01"
            }
        },
        "B25-01": {
            "number": "B25-01",
            "name": "Project Y",
            "status": "Completed",
            "budget": "$50,000",
            "project_leader": "Jane Smith",
            "timeline": {
                "start_date": "2021-01-01",
                "end_date": "2022-01-01"
            }
        }
    }

    return dummy_data.get(project_number, "Project not found")

class QueryDatabaseTool(BaseTool):
    def __init__(self):
        super().__init__(
            name="Query Database",
            description="Fetch project information from the database using the project number.",
            func=query_database
        )
    
    def execute(self, project_number):
        result = super().execute(project_number)
        return self.output_parser(result)

    def output_parser(self, output):
        return output