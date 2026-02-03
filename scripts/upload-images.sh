#!/bin/bash

# Configuration
STORAGE_ZONE="warynessy"
ACCESS_KEY="de0d4ce0-5d72-4e60-b8e481f7a28d-5250-4756"
LOCAL_DIR="media"

echo "🚀 Starting upload of local media to Bunny.net storage ($STORAGE_ZONE)..."

# Create a list of files to upload
FILES=$(ls "$LOCAL_DIR")
COUNT=0
TOTAL=$(ls "$LOCAL_DIR" | wc -l)

for FILE in $FILES; do
    # Skip hidden files
    if [[ "$FILE" == .* ]]; then
        continue
    fi

    # Skip directories
    if [ -d "$LOCAL_DIR/$FILE" ]; then
        continue
    fi

    COUNT=$((COUNT + 1))
    echo "[$COUNT/$TOTAL] Uploading: $FILE..."

    curl --request PUT \
         --url "https://storage.bunnycdn.com/$STORAGE_ZONE/$FILE" \
         --header "AccessKey: $ACCESS_KEY" \
         --header "Content-Type: application/octet-stream" \
         --upload-file "$LOCAL_DIR/$FILE" \
         --silent \
         --output /dev/null

    if [ $? -eq 0 ]; then
        echo "✅ Success: $FILE"
    else
        echo "❌ Failed: $FILE"
    fi
done

echo "🎉 Upload completed! $COUNT files processed."
