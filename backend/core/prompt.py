import requests

# autorization for Cloudflare
API_BASE_URL = "https://api.cloudflare.com/client/v4/accounts/8616e5f43a82acfae566426dc9fdc527/ai/run/"
headers = {"Authorization": "Bearer hewWvVr1qsqzHQvVZSxWZaoQ5ZnXI1xrXClknLgk"}

# def runModel():
#     #run("@cf/meta/llama-3-8b-instruct", processUserInput())
#     return

def create_prompt(background: str, char_sheet_paths: list[str]):
    return "create_prompt placeholder output"

# run function for LLM
def run(model, inputs):
    
    # LLM prompt
    prompt = [  
    { "role": "system", "content": """You are a co-dungeon master for a game of Dungeons & Dragons. Given a story and characters provided by the user, 
        you will generate the following, each paragraph surrounded by double square brackets:
        \n- A generalized storyline specifying what challenges await the players within the next game session. Be vague in the path the players take, as that may change over the course of the session.
        \n- A list of friendly NPCs the players may encounter. List their traits, their items, and their personalities.
        \n- A list of significant enemies the players may encounter. List their traits, motivations, items, stats, and movesets.
        \n- Puzzles/Challenges that the players may encounter. Do not provide the solutions to these problems, but rather potential solutions - incorporate spells, items, and character traits that players have into the problems and their solutions.""" },
    
    { "role": "user", "content": inputs}
];

    input = {"messages": prompt, "max_tokens": 6000, "temperature": 0.3}
    response = requests.post(   f"{API_BASE_URL}{model}", headers=headers, json=input)
    print(response.json)
    return response.json()

# # removes all plaintext lines of 1 word or less
# def read_filtered_lines(file_path):
#     with open(file_path, 'r', encoding='utf-8') as file:
#         filtered_text = "\n".join(line.strip() for line in file if len(line.split()) > 1)
#     return filtered_text

# --- example code generation ---
# summary = """Our players are on a quest from the city of Waterdeep to the far north in rumors of a mighty goddess 
#      with the power to grant wishes to anyone brave enought to survive the journey to her throne room. From where we last left off, our players have not traveled
#       far from Waterdeep, resting by the coastal town of Silverport where rumors of an oncoming army from a faraway lands in search of the goddess are abound.
#       Our players consist of the following: """

# file = 'Merthin_Oleren.txt'
# summary += read_filtered_lines(file)

# file = 'DarinsMerfolk.txt'
# summary += read_filtered_lines(file)

# file = 'Gareth_Stonecobble.txt'
# summary += read_filtered_lines(file)

# --- end example code generation ---

# output = run("@cf/deepseek-ai/deepseek-r1-distill-qwen-32b", inputs)
# print(output)