import os
from agent.ai_agent import Agent
from agent.tools import QueryDatabaseTool, QueryVectorStoreTool

from agent.config import Config as cfg


agent = Agent(cfg.ORCHESTRATOR_LLM)

agent.register_tool(QueryDatabaseTool, cfg.SQL_LLM, cfg.DB_SETTINGS)
agent.register_tool(QueryVectorStoreTool)

questions = [
    "What is the status of project B25-00?",
    "What are the risks associated with project B25-01?",
    "Give me a list of all projects with a budget over $100,000.",
    "Give me a list of all projects that have not started yet.",
    "What ongoing projects does Simon have",
    "When is project B25-01 finished?"
]

expected_answers = [
    "The status of project B25-00 is 'Planned'.",
    "RAG completed but no answer found",
    "The budget of project B25-01 is 33CHF.",
    "Project doesn't exist.",
    "Project B25-01 is expected to be finished by 2025-01-17."
]

for question, expected in zip(questions, expected_answers):
    print(f"Question: {question}")
    print(f"Agent's Answer: {agent(question)}")
    print(f"Expected Answer: {expected}\n")