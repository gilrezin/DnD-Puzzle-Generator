import requests

API_BASE_URL = "https://api.cloudflare.com/client/v4/accounts/8616e5f43a82acfae566426dc9fdc527/ai/run/"
headers = {"Authorization": "Bearer hewWvVr1qsqzHQvVZSxWZaoQ5ZnXI1xrXClknLgk"}

def run(model, inputs):
    input = { "messages": inputs }
    response = requests.post(f"{API_BASE_URL}{model}", headers=headers, json=input)
    return response.json()

inputs = [
    { "role": "system", "content": """You are a co-dungeon master for a game of Dungeons & Dragons. Given a story and characters provided by the user, 
        you will generate the following, each as their own paragraph:
        \n- A generalized storyline specifying what challenges await the players within the next game session. Be vague in the path the players take, as that may change over the course of the session.
        \n- A list of friendly NPCs the players may encounter. List their traits, their items, and their personalities.
        \n- A list of significant enemies the players may encounter. List their traits, items, stats, and movesets.
        \n- Puzzles/Challenges that the players may encounter. Do not provide the solutions to these problems, but rather potential solutions - incorporate spells, items, and character traits that players have into the problems and their solutions.""" },
    
    { "role": "user", "content": """Our players are on a quest from the city of Waterdeep to the far north in rumors of a mighty goddess 
     with the power to grant wishes to anyone brave enought to survive the journey to her throne room. So far, our players have not traveled
      far from Waterdeep, resting by the coastal town of Silverport where rumors of an oncoming army from a faraway lands in search of the goddess are abound.
     Our players consist of the following: """}
];
output = run("@cf/meta/llama-3-8b-instruct", inputs)
print(output)