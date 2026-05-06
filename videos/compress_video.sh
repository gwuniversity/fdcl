#!/bin/bash

# Loop through both .mp4 and .mov files (case-insensitive)
for file in *.[Mm][Pp]4 *.[Mm][Oo][Vv]; do
    # Check if any matching files exist to avoid errors
    [ -e "$file" ] || continue
    
    echo "Processing: $file"
    
    # Extract filename without extension
    filename="${file%.*}"
    
    # Run the Safari-compatible command, saving as .mp4
    ffmpeg -i "$file" -vcodec libx264 -pix_fmt yuv420p -movflags +faststart -crf 28 "${filename}_compressed.mp4"
done

echo "Batch processing complete!"


