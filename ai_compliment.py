import os
import openai
openai.api_key = os.getenv("OPENAI_API_KEY")


def get_compliment():
    completion = openai.ChatCompletion.create(
      model="gpt-3.5-turbo",
      messages=[
        {"role": "system", "content": os.getenv("PROMT_AGENT")},
        {"role": "user", "content": os.getenv("PROMT_GENERAL")}
      ]
    )
    return completion['choices'][0]['message']['content']