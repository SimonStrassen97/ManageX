from .BaseTool import BaseTool
import psycopg2 as pg
import json
from django.conf import settings
from langchain_ollama import ChatOllama
from ..utils.db_schema_queries import fetch_tables, fetch_columns, fetch_primary_keys, fetch_foreign_keys
from ..utils.prompt_templates import sql_generation_instructions


class QueryDatabaseTool(BaseTool):
    def __init__(self, sql_llm=None, db_settings=None):
        super().__init__(
            name="Query Database",
            description="Fetch project information from the database given the database schema",
            func=self.tool_function
        )

        self.sql_llm = ChatOllama(model=sql_llm)
        self.db_settings = db_settings

    def execute(self, question):
        result = super().execute(question)
        return self.output_parser(result)

    def _connect_to_db(self):

        self.connection = pg.connect(
            dbname=self.db_settings['NAME'],
            user=self.db_settings['USER'],
            password=self.db_settings['PASSWORD'],
            host=self.db_settings['HOST'],
            port=self.db_settings['PORT']
        )
        self.cursor = self.connection.cursor()
    
    def _disconnect_from_db(self):
        self.connection.close()
    
    def _get_db_schema(self):
            # Fetch table names
        self.cursor.execute(fetch_tables)
        tables = self.cursor.fetchall()

        # Fetch columns, primary keys, and foreign keys for each table
        schema_info = {}
        for table in tables:
            table_name = table[0]
            
            # Fetch columns
            self.cursor.execute(fetch_columns, (table_name,))
            columns = self.cursor.fetchall()
            
            # Fetch primary keys
            self.cursor.execute(fetch_primary_keys, (table_name,))
            primary_keys = self.cursor.fetchall()
            
            # Fetch foreign keys
            self.cursor.execute(fetch_foreign_keys, (table_name,))
            foreign_keys = self.cursor.fetchall()
            
            schema_info[table_name] = {
                'columns': columns,
                'primary_keys': primary_keys,
                'foreign_keys': foreign_keys
            }
        
        schema_str = ""
        for table, info in schema_info.items():
            schema_str += f"Table: {table}\n"
            schema_str += "Columns:\n"
            for column in info['columns']:
                schema_str += f"  - {column[0]} ({column[1]})\n"
            schema_str += "Primary Keys:\n"
            for pk in info['primary_keys']:
                schema_str += f"  - {pk[0]}\n"
            schema_str += "Foreign Keys:\n"
            for fk in info['foreign_keys']:
                schema_str += f"  - {fk[0]} references {fk[1]}({fk[2]})\n"
            schema_str += "\n"

        return schema_str
    

    def tool_function(self, question):

        self._connect_to_db()

        # get the database schema
        db_schema = self._get_db_schema()

        # generate the SQL query
        sql_generation_prompt = sql_generation_instructions.format(question=question, schema=db_schema)
        result = self.sql_llm.invoke(sql_generation_prompt)
        print(result.content)
        json_content = result.content.strip().strip('```json').strip('```')
        json_result = json.loads(json_content)

        sql_query = json_result["SQL"]

        # query the database
        self.cursor.execute(sql_query)
        rows = self.cursor.fetchall()

        self._disconnect_from_db()
        return rows

    def output_parser(self, output):
        return output