import requests
import sys
import json

API_BASE_URL = "https://api.cloudflare.com/client/v4/accounts/8616e5f43a82acfae566426dc9fdc527/ai/run/"
HEADERS = {"Authorization": "Bearer hewWvVr1qsqzHQvVZSxWZaoQ5ZnXI1xrXClknLgk"}

def run(model, inputs):
    input_data = {"messages": inputs}
    
    try:
        response = requests.post(f"{API_BASE_URL}{model}", headers=HEADERS, json=input_data)

        if response.status_code != 200:
            return json.dumps({"error": f"API returned status {response.status_code}: {response.text}"})

        api_response = response.json()

        # Debugging Log (Ensure response is printed for debugging but not returned as text)
        print("Raw API Response:", json.dumps(api_response, indent=2))

        if "result" in api_response and "response" in api_response["result"]:
            return json.dumps({"choices": [{"text": api_response["result"]["response"]}]})  # Always return valid JSON
        
        return json.dumps({"error": "Invalid AI response format"})

    except requests.RequestException as e:
        return json.dumps({"error": f"Request failed: {str(e)}"})

    except json.JSONDecodeError:
        return json.dumps({"error": "Failed to parse API response as JSON"})

# Read extracted text and background info
extracted_text = sys.argv[1] if len(sys.argv) > 1 else ""
background_info = sys.argv[2] if len(sys.argv) > 2 else ""

inputs = [
    {
        "role": "system",
        "content": """You are a co-dungeon master for a game of Dungeons & Dragons. Given a story and characters provided by the user, 
        generate the following as separate paragraphs:
        \n- A storyline specifying what challenges await the players in the next session.
        \n- A list of friendly NPCs, including traits, items, and personalities.
        \n- A list of enemies, including traits, items, stats, and movesets.
        \n- Puzzles/Challenges the players may encounter, with potential solutions involving spells, items, or traits they have."""
    },
    {
        "role": "user",
        "content": f"Story Background:\n{background_info}\n\nExtracted Text from PDF:\n{extracted_text}"
    }
]

output = run("@cf/meta/llama-3-8b-instruct", inputs)

# Ensure valid JSON is returned
print(output)
