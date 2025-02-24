import os
import django
from ai_agent import Agent
from tools import QueryDatabaseTool, QueryVectorStoreTool

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'managex.settings')
django.setup()

orchestrator_llm = "llama3.2"
agent = Agent(orchestrator_llm)

agent.register_tool(QueryDatabaseTool())
agent.register_tool(QueryVectorStoreTool())

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