from .BaseTool import BaseTool
import psycopg2 as pg
from django.conf import settings

class QueryDatabaseTool(BaseTool):
    def __init__(self):
        super().__init__(
            name="Query Database",
            description="Fetch project information from the database using the project number.",
            func=self._query_database
        )
    
    def execute(self, sql_query):
        result = super().execute(sql_query)
        return self.output_parser(result)
    
    @staticmethod
    def _query_database(sql_query):
        db_settings = settings.DATABASES['default']
        conn = pg.connect(
            dbname=db_settings['managex_db'],
            user=db_settings['managex_user'],
            password=db_settings['password'],
            host=db_settings['localhost'],
            port=db_settings['5432']
        )
        cursor = conn.cursor()
        cursor.execute(sql_query)
        rows = cursor.fetchall()
        conn.close()
        return rows

    @staticmethod
    def _query_database_dummy(project_number):
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

    def output_parser(self, output):
        return output