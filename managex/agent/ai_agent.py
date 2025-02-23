import json
import logging
from typing import List, Tuple, Any

from langchain_ollama import ChatOllama, OllamaLLM
from tools import QueryDatabaseTool, QueryVectorStoreTool
from utils.prompt_templates import decision_making_instructions, summarizer_instructions, reflection_instructions

# TODO: 
# Add state management to the agent. 
# add reflection step to the agent. 
# actually write tools 
# RAG pipeline
# integrate into django app.


# Configure logging
logging.basicConfig(level=logging.WARNING)
logger = logging.getLogger(__name__)

class Agent:
    def __init__(self, local_llm: str, tools: List[Any]):
        """
        Initialize the Agent with a local language model and a list of tools.
        """
        self.llm = ChatOllama(model=local_llm)
        self.tools = tools

    def invoke(self, prompt: str) -> str:
        """
        Handle the input prompt by deciding the tool, executing it, and summarizing the result.
        """
        try:
            tool_name, args = self._decision_making(prompt)
            query_result = self._execute_tool(tool_name, args)
            answer = self._summarize(prompt, query_result)
            return answer
        except Exception as e:
            logger.error(f"Error in handling input: {e}")
            return "An error occurred while processing your request."

    def _decision_making(self, prompt: str) -> Tuple[str, str]:
        """
        Use the LLM to decide which tool to use based on the prompt.
        """
        decision_making_prompt = decision_making_instructions.format(question=prompt)
        try:
            result = self.llm.invoke(decision_making_prompt)
            json_result = json.loads(result.content)
            return json_result["tool"], json_result["query_parameter"]
        except Exception as e:
            logger.error(f"Error in decision making: {e}")
            raise e

    def _execute_tool(self, tool_name: str, *args) -> str:
        """
        Execute the specified tool with the given arguments.
        """
        tool = next((tool for tool in self.tools if tool.name == tool_name), None)
        if tool:
            return tool.execute(*args)
        else:
            logger.error(f"Tool '{tool_name}' not found.")
            return f"Tool '{tool_name}' not found."


    def _summarize(self, prompt: str, context: str) -> str:
        """
        Use the LLM to summarize the result based on the prompt and context.
        """
        summarizer_prompt = summarizer_instructions.format(question=prompt, context=context)
        try:
            summarizer_result = self.llm.invoke(summarizer_prompt)
            return summarizer_result.content.strip()
        except Exception as e:
            logger.error(f"Error in summarizing: {e}")
            raise



    def __call__(self, prompt: str) -> str:
        """
        Make the Agent callable.
        """
        return self.invoke(prompt)

# Example usage
if __name__ == "__main__":

    import os
    import django

    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'managex.settings')
    django.setup()

    local_llm = "llama3.2"
    tools = [QueryDatabaseTool(), QueryVectorStoreTool()]
    agent = Agent(local_llm, tools)

    questions = [
        "What is the status of project B25-00?",
        "What are the risks associated with project B25-01?",
        "What is the budget of project B25-01?",
        "What is the timeline for project B24-00?",
        "When is project B25-00 finished?"
    ]

    expected_answers = [
        "The status of project B25-00 is 'In Progress'.",
        "No answer found.",
        "The budget of project B25-01 is $50,000.",
        "Project doesn't exist.",
        "Project B25-00 is expected to be finished by 2023-01-01."
    ]

    for question, expected in zip(questions, expected_answers):
        print(f"Question: {question}")
        print(f"Agent's Answer: {agent(question)}")
        print(f"Expected Answer: {expected}\n")