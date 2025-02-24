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

        self.sql_llm = "qwen2.5-coder:3b"
    
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

    def output_parser(self, output):
        return output