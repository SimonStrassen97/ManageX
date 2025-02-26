import json
import logging
from typing import List, Tuple, Any

from langchain_ollama import ChatOllama, OllamaLLM
from .utils.prompt_templates import decision_making_instructions, summarizer_instructions, reflection_instructions

# TODO: 
# tool names, descriptions and function info as input to orchestrator prompt template --> need to assure correct input to tool
# also return sql query
# handle multiple questions in one prompt.
#      - state management 
#      - reflection step  -> answered questions? more questions?
# RAG pipeline
# integrate into django app.


# Configure logging
logging.basicConfig(level=logging.WARNING)
logger = logging.getLogger(__name__)

class Agent:
    def __init__(self, orchestrator_llm: str):
        """
        Initialize the Agent with a local language model and a list of tools.
        """
        self.llm = ChatOllama(model=orchestrator_llm)
        self.tools = {}
    

    def register_tool(self, tool_cls, *args, **kwargs):
        """Decorator to register a tool."""
        instance = tool_cls(*args, **kwargs)  # Instantiate the tool with arguments
        self.tools[instance.name] = instance  # Store in dictionary
        return tool_cls  # Return the class unchanged

    def invoke(self, prompt: str) -> str:
        """
        Handle the input prompt by deciding the tool, executing it, and summarizing the result.
        """
        try:
            tool_name, args = self._make_decision(prompt)
            query_result = self._execute_tool(tool_name, args)
            answer = self._summarize(prompt, query_result)
            return answer
        except Exception as e:
            logger.error(f"Error in handling input: {e}")
            return "An error occurred while processing your request."

    def _make_decision(self, prompt: str) -> Tuple[str, str]:
        """
        Use the LLM to decide which tool to use based on the prompt.
        """
        decision_making_prompt = decision_making_instructions.format(question=prompt)
        try:
            result = self.llm.invoke(decision_making_prompt)
            json_result = json.loads(result.content)
            return json_result["tool"], json_result["tool_args"]
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