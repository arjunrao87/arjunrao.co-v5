#!/bin/bash

# Frontend Test Hook - Automatically runs frontend-test-engineer subagent when code changes
# This script receives tool usage information via stdin and triggers appropriate testing

# Read the JSON input from stdin
INPUT=$(cat)

# Parse the tool name and file path from the JSON input
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool.name // empty')
FILE_PATH=$(echo "$INPUT" | jq -r '.tool.parameters.file_path // empty')

# Only proceed if we have a valid file path
if [ -z "$FILE_PATH" ] || [ "$FILE_PATH" = "null" ]; then
    exit 0
fi

# Get the file extension and directory
FILE_EXT="${FILE_PATH##*.}"
FILE_DIR=$(dirname "$FILE_PATH")

# Determine if this is a code file that needs testing
should_test_file() {
    local file="$1"
    local ext="$2"
    local dir="$3"
    
    # Skip non-code files
    case "$ext" in
        js|jsx|ts|tsx|vue|svelte) ;;
        *) return 1 ;;
    esac
    
    # Skip certain directories
    case "$dir" in
        */.claude/*|*/node_modules/*|*/.git/*|*/.next/*|*/dist/*|*/build/*) return 1 ;;
    esac
    
    # Skip test files themselves
    case "$file" in
        *.test.*|*.spec.*|*/__tests__/*) return 1 ;;
    esac
    
    return 0
}

# Check if we should test this file
if ! should_test_file "$FILE_PATH" "$FILE_EXT" "$FILE_DIR"; then
    exit 0
fi

# Log the trigger for debugging
echo "🧪 Frontend test hook triggered for: $FILE_PATH" >&2

# Change to project directory
cd "$CLAUDE_PROJECT_DIR" || exit 1

# Create a minimal prompt for the frontend-test-engineer subagent
PROMPT="A code file has been modified: $FILE_PATH

Please analyze this file and any related components to determine if existing tests need to be updated or if new tests should be created. Focus on:

1. Testing core functionality that may be affected by the changes
2. Updating only the minimal set of tests required 
3. Ensuring tests remain non-brittle and focused on behavior rather than implementation
4. Avoiding over-testing or creating unnecessary test files

If the file is a component, test user interactions and rendering. If it's a utility or service, test the public API and edge cases. Only create new test files if none exist for critical functionality.

Please provide a concise summary of what testing actions were taken."

# Run the frontend-test-engineer subagent via claude command
# Note: This assumes the claude command is available in PATH
if command -v claude >/dev/null 2>&1; then
    echo "$PROMPT" | claude --agent frontend-test-engineer --quiet
else
    echo "⚠️  Claude CLI not found in PATH. Skipping automated testing." >&2
fi

exit 0