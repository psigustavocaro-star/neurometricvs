import json
import sys

def check_keys(file_path):
    print(f"Loading {file_path}...")
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    keys_to_check = [
        "Dashboard",
        "Dashboard.Tests",
        "Dashboard.Tests.Catalog",
        "Dashboard.Tests.Catalog.start_protocol",
        "Dashboard.Tests.Catalog.start_evaluation",
        "Dashboard.Tests.Catalog.catalog_title"
    ]

    for key_path in keys_to_check:
        parts = key_path.split('.')
        current = data
        path_exists = True
        for part in parts:
            if isinstance(current, dict) and part in current:
                current = current[part]
            else:
                print(f"FAIL: {key_path} -> Stopped at {part}")
                path_exists = False
                break
        
        if path_exists:
            value_preview = str(current)[:50] + "..." if len(str(current)) > 50 else str(current)
            if isinstance(current, dict) or isinstance(current, list):
                 print(f"OK: {key_path} (Type: {type(current).__name__})")
            else:
                 print(f"OK: {key_path} = {value_preview}")

if __name__ == "__main__":
    check_keys("messages/es.json")
    print("-" * 20)
    check_keys("messages/en.json")
