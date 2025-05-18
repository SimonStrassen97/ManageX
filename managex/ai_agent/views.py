from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .src.ai_agent import Agent
from .src.config import Config as cfg
from .src.tools import QueryDatabaseTool, QueryVectorStoreTool

# Instantiate your agent (consider singleton pattern if needed)
agent = Agent(cfg.ORCHESTRATOR_LLM)
agent.register_tool(QueryDatabaseTool, cfg.SQL_LLM, cfg.DB_SETTINGS)
agent.register_tool(QueryVectorStoreTool)

class AIAgentView(APIView):
    def post(self, request):
        prompt = request.data.get("prompt")
        if not prompt:
            return Response({"error": "Prompt is required."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            answer = agent(prompt)
            return Response({"answer": answer})
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)