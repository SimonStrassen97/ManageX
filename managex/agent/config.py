import os
import django
from django.conf import settings

# Ensure Django settings are configured
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'managex.settings')
django.setup()

class Config:
    # Orchestrator LLM
    ORCHESTRATOR_LLM = 'llama3.2:3b'

    # SQL LLM
    SQL_LLM = 'qwen2.5-coder:3b'

    # Database settings
    DB_SETTINGS = {
        'ENGINE': settings.DATABASES['default']['ENGINE'],
        'NAME': settings.DATABASES['default']['NAME'],
        'USER': settings.DATABASES['default']['USER'],
        'PASSWORD': settings.DATABASES['default']['PASSWORD'],
        'HOST': settings.DATABASES['default']['HOST'],
        'PORT': settings.DATABASES['default']['PORT'],
    }