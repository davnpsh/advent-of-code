#!/bin/bash

current_year=$(date +'%Y')

year=$current_year
number=""

execute() {
    local file="$1"
    local extension="${file##*.}"
    
    echo "executing $file:"
    
    case "$extension" in
        ts|js)
            bun "$file"
            ;;
        *)
            echo "unsupported file type: .$extension"
            ;;
    esac
}

while getopts ":y:d:" opt; do
    case $opt in
        y)
            year="$OPTARG"
            ;;
        d)
            number="$OPTARG"
            ;;
        *)
            echo "usage: $0 [-y year] [-d day]"
            exit 1
            ;;
    esac
done

# no args
if [ -z "$number" ] && [ "$OPTIND" -eq 1 ]; then
    # find most recent file within all these directories
    recent_file=$(find . -type f ! -name "run.sh" ! -name "README.md" ! -path "./.git/*" ! -path "*/inputs/*" -print0 | xargs -0 stat --format="%Y %n" | sort -nr | head -n 1 | cut -d' ' -f2-)
    
    if [ -n "$recent_file" ]; then
        execute "$recent_file"
    else
        echo "no files found."
    fi
    exit
fi

# number as an arg
if [ -n "$number" ]; then
    if [[ "$number" =~ ^[0-9]+$ ]] && [ "$number" -ge 1 ] && [ "$number" -le 31 ]; then
        :
    else
        echo "please provide a valid number (1-31)."
        exit 1
    fi
else
    echo "day must be provided using -d option."
    exit 1
fi

file="./${year}/${number}"

matched_file=$(find "$file."* -type f ! -name "README.md" ! -path "./.git/*" ! -path "*/inputs/*")

if [ -n "$matched_file" ]; then
    execute "$matched_file"
else
    echo "file for ${year}/${number} does not exist."
fi