#!/bin/bash

# Change to the directory containing the images
# Uncomment and modify the next line if the images are in a different directory
# cd /path/to/image/directory

# Loop through each file in the current directory
for file in *; do
    # Check if the file is a regular file (not a directory or link, etc.)
    if [ -f "$file" ]; then
        # Convert the filename to lowercase
        lowercase_file=$(echo "$file" | tr '[:upper:]' '[:lower:]')
        
        # Rename the file if the new name is different
        if [ "$file" != "$lowercase_file" ]; then
            mv "$file" "$lowercase_file"
        fi
    fi
done

echo "Filenames converted to lowercase."
