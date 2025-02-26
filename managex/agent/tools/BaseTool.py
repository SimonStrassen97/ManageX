class BaseTool:
    def __init__(self, name, description, func):
        """
        Initialize the base tool with a name, description, and function.

        :param name: The name of the tool.
        :param description: A brief description of what the tool does.
        :param func: The function that the tool will execute.
        """
        self.name = name
        self.description = description
        self.func = func
        self.chained_tools = []

    def execute(self, *args, **kwargs):
        """
        Execute the tool's function with the provided arguments.

        :param args: Positional arguments for the function.
        :param kwargs: Keyword arguments for the function.
        :return: The result of the function execution.
        """
        result = self.func(*args, **kwargs)
        for tool in self.chained_tools:
            result = tool.execute(result)
        return result
    

