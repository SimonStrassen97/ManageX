from .BaseTool import BaseTool

class QueryVectorStoreTool(BaseTool):
    def __init__(self):
        super().__init__(
            name="Query Vector Store",
            description="RAG: Perform RAG analysis on the project files which contain additional information about the project's scope, rationale, risks, and goals.",
            func=self._query_vectorstore
        )

    def execute(self, project_number):
        result = super().execute(project_number)
        return self.output_parser(result)


    @staticmethod
    def _query_vectorstore(project_number):
        return "RAG completed but no answer found"


    def output_parser(self, output):
        return output