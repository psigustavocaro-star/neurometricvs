import json

def analyze_json_structure(file_path):
    print(f"Analyzing {file_path}...")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We can't just parse it with json.load because it might have duplicates which standard parsers might merge or overwrite silently.
    # We want to find the duplicates.
    # Let's read line by line and track indentation to find top-level keys.
    
    lines = content.split('\n')
    path_stack = []
    
    found_dashboards = []
    
    for i, line in enumerate(lines):
        stripped = line.strip()
        if not stripped:
            continue
            
        # Very rough parsing just to find keys
        if stripped.startswith('"'):
            # It's a key
            parts = stripped.split('":')
            key = parts[0].strip('"')
            
            # Determine indentation
            indent_level = len(line) - len(line.lstrip())
            
            if indent_level == 4: # Level 1
                print(f"Line {i+1}: {key}")
                if key == "Dashboard":
                    found_dashboards.append(i+1)
            
            if indent_level == 8 and key == "Dashboard":
                 print(f"Line {i+1}: Nested Dashboard found")

    print(f"Found {len(found_dashboards)} top-level 'Dashboard' keys at lines: {found_dashboards}")

if __name__ == "__main__":
    analyze_json_structure("messages/es.json")
