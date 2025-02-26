
# Orchestrator Prompt Templates

decision_making_instructions = """Your goal is to decide what tool should be used to answer a question.

The tools and their functions at your disposal are:
1. "Query Database": Fetch information about projects from the database given the question.
-> The database contains information about name, status, budget, project leader and timeline.

2. "Query Vector Store": Perform RAG analysis on the project files given the question.
-> The project files contain additional information about the project's scope, rationale, risks, and goals.

Question:
{question}

Based on the question, decide which tool to use and provide the necessary data in the desired format:

The output is ONLY a json object with the relevant fields. DON'T write anything else.


{{
    'tool': string,  # The name of the tool to use (e.g., "Query Database" or "RAG Analysis")
    'tool_args': string,  # The required arguments for the tool 
    'rationale': string,  # Your reasoning for choosing the tool (optional)
}}
"""

summarizer_instructions="""Your goal is to generate a short but high-quality answer from the query results to answer provided question.

When EXTENDING an existing summary:
1. Seamlessly integrate new information without repeating what's already covered
2. Maintain consistency with the existing content's style and depth
3. Only add new, non-redundant information
4. Ensure smooth transitions between existing and new content

When creating a NEW summary:
1. Highlight the most relevant information that directly addresses the question
2. Provide a concise overview of the key points
3. Emphasize significant findings or insights
4. Ensure a coherent flow of information

In both cases:
- Only use the information provided in the query results
- Focus on factual, objective information
- Avoid redundancy and repetition
- DO NOT add a preamble like "Here is an extended summary ..." Just directly output the answer.

The question is: {question}

the query results are: {context}
"""

reflection_instructions = """You are analyzing if the answer: {answer} to the question: {question} is complete

Your tasks:
1. Identify gaps in the answer provided
2. Generate a concise follow-up question that would help answer the question more effectively

Ensure the follow-up question is self-contained.

Return your analysis as a JSON object:
{{ 
    "knowledge_gap": "string",
    "follow_up_query": "string"
}}"""



# SQL Prompt Templates

sql_generation_instructions = """
You are an AI specialized in generating SQL commands.

Your goal is to answers the input question by generating an appropriate SQL command given the database schema:

The question is:
{question}

The database schema is:
{schema}

Generate the appropriate SQL command to answer the question.
"""