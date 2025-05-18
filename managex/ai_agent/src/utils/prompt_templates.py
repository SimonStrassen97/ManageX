
# Orchestrator Prompt Templates

DECISION_TEMPLATE = """Your goal is to decide what tool should be used to answer a question.

The tools and their functions at your disposal are:
{tools}

Question:
{question}

Based on the question, decide which tool to use and provide your reasoning.

The output HAS to be a VALID json object with the relevant fields and DON'T write anything else.


{{
    'tool_number': int,  # The number of the tool to use
    'tool_name': string,  # The name of the tool to use 
    'rationale': string,  # Your reasoning for choosing the tool
}}
"""

SUMMARIZE_TEMPLATE="""Your goal is to generate a short but high-quality answer from the query results to answer provided question.

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

REFLECTION_TEMPLATE = """You are analyzing if the answer: {answer} to the question: {question} is complete

Your tasks:
1. Identify gaps in the answer provided
2. Generate a concise follow-up question that would help answer the question more effectively

Ensure the follow-up question is self-contained.

Return your analysis as a VALID json object and DON'T wirte anything else.:
{{ 
    "knowledge_gap": "string",
    "follow_up_query": "string"
}}"""



# SQL Prompt Templates

sql_generation_instructions = """
You are an AI specialized in generating SQL commands.

Your goal is to generate an SQL command that can retrieve the information to answer the input question given the database schema:

The question is:
{question}

The database schema is:
{schema}


Generate the appropriate SQL command to answer the question. Make sure you always include the project number and project name in the SELECT when retrieving info about projects.
Provide ONLY the SQL query in the JSON format:
{{
    "SQL": "Your SQL command here"
}}
"""